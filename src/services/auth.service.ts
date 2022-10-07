import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {map} from 'rxjs/operators';
import {User} from 'src/shared/model/user.model';
import {RestDataService} from './rest-data.service';
import {Observable} from 'rxjs';
import {Login} from '../shared/model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;
  authorities = [];
  errorMessage = '';
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private datasource: RestDataService,
    private Cookie: CookieService
  ) {
    if (this.isAuthenticated()) {
      this.user = JSON.parse(Cookie.get('user'));
      this.authorities = JSON.parse(Cookie.get('authorities'));
    }
  }
  getCurrentUser(): User {
    return this.user;
  }

  isAuthenticated(): boolean {
    const access_token = this.Cookie.get('access_token');
    const refresh_token = this.Cookie.get('refresh_token');
    if (!access_token && !!refresh_token && this.datasource.urlFlag) {
      this.getAccessTokenByRefreshToken();
      return false;
    }
    return !!access_token;
  }

  async getAccessTokenByRefreshToken() {
    await this.datasource.obtainAccessTokenByRefreshToken();
    // this.router.navigateByUrl('/dashboard/index');
  }

  authenticate(login: Login): Observable<any> {
    this.errorMessage = '';
    const returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return this.datasource
      .obtainAccessToken(login)
      .pipe(map((res) => res.json()));
  }

  saveToken(data) {
    const value = {
      username: data.username,
      roles: [{role: data.authorities[0].authority}]
    } as User;
    this.user = value;
    this.authorities = [];
    for (let i = 0; i < data.authorities.length; i++) {
      this.authorities.push(data.authorities[i].authority);
    }

    const exDate = new Date();
    exDate.setTime(exDate.getTime() + data.expires_in * 1000);
    // @ts-ignore
    this.Cookie.put('access_token', data.token, {expires: exDate});
    this.Cookie.putObject('user', this.user, {expires: exDate});
    this.Cookie.putObject('authorities', this.authorities, {expires: exDate});
  }
  clear() {
    this.datasource.sendAuthenticatePostRequestObserver('api/auth/logout', null, null).subscribe(value => {
      this.Cookie.removeAll();
      localStorage.clear();
      sessionStorage.clear();
      this.user = null;
      this.authorities = [];
      this.router.navigateByUrl('/login');
    });
  }
}
