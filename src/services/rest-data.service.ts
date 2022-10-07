// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import {map, tap, take, catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  Headers,
  Http,
  Request,
  RequestMethod,
  RequestOptions
} from '@angular/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Login} from '../shared/model/login.model';
import {any} from 'codelyzer/util/function';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestDataService {
  urlFlag = true;
  baseUrl: string;

  constructor(
    private router: Router,
    private http: Http,
    private httpClient: HttpClient,
    private Cookie: CookieService // private oauthService: OAuthService
  ) {
    this.baseUrl = `${environment.PROTOCOL}://${environment.SERVER}${
      environment.PORT
    }/`;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  obtainAccessToken(login: Login): Observable<any> {
    const url = this.baseUrl + 'api/auth/login';
    return this.http.post(url, login).pipe(
      map(ref => {
        return ref;
      })
    );
  }

  async obtainAccessTokenByRefreshToken() {
    /*
     * Using urlFlag as a semaphorse for exclusive execution.
     * whenever access token expires all method who are using access_token will
     * hit this method. but this will execute only once;
     */
    if (this.urlFlag) {
      this.urlFlag = false;
      // console.log('obtaining access token by refresh token');
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', this.Cookie.get('refresh_token'));
      params.append('client_id', environment.client_id);
      params.append('client_secret', environment.client_secret);

      const url = this.baseUrl + 'oauth/token?' + params.toString();
      await this.http
        .get(url, null)
        .pipe(map(res => res.json()))
        .subscribe(
          data => {
            this.saveToken(data);

            window.location.reload();
            // console.lo
            this.urlFlag = true;
          },
          error => {
            this.Cookie.removeAll();
            this.router.navigateByUrl('/login');
            // console.log('obst error', error);
          }
        );
    }
  }

  saveToken(token) {
    // console.log(token);
    const exDate = new Date();
    exDate.setTime(exDate.getTime() + token.expires_in * 1000);
    this.Cookie.put('access_token', token.access_token, {expires: exDate});
    return;
  }

  get_access_token() {
    return this.Cookie.get('access_token');
  }

  public sendRequest(
    method: RequestMethod,
    url: string,
    body?,
    auth: boolean = false,
    par?
  ): Observable<any> {
    const params = new URLSearchParams();
    par = par == null ? '' : par;
    if (par !== '') {
      url = this.baseUrl + url + '?' + par + params.toString();
    } else {
      url = this.baseUrl + url;
    }
    const acc = this.Cookie.get('access_token');

    // if no authentication required
    if (!auth) {
      const request = new Request({
        method: method,
        url: url,
        // url: this.baseUrl + url ,
        body: body
      });
      // console.log('Condition 1 : ', request);
      return this.http.request(request).pipe(
        map(response => {
          if (response['_body'] === '') {
            console.log(response);
            return response;
          }
          return response.json();
        })
      );

      // if authentication required and access_token present
    } else if (auth && !!acc) {
      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.get_access_token());
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({
        headers: headers,
        body: body,
        method: method
      });
      // console.log('Condition 2 : ', request);
      if (method === RequestMethod.Get) {
        return this.http.get(url, requestOptions).pipe(
          map(response => {
            if (response['_body'] === '') {
              return response;
            }
            console.log(response);
            return response.json();
          }),
          catchError((error: Response) => {
            Observable.throw(this.handleError(error));
            if (error.status === 404) {
              console.log(error);
              // return throwError(new NotFoundError(error));
            }
            return throwError(error);
          })
        );
      }
      if (method === RequestMethod.Post) {
        return this.http.post(url, requestOptions).pipe(
          map(response => {
            if (response['_body'] === '') {
              return response;
            }
            console.log(response);
            return response.json();
          }),
          catchError((error: Response) => {
            Observable.throw(this.handleError(error));
            if (error.status === 404) {
              console.log(error);
              // return throwError(new NotFoundError(error));
            }
            return throwError(error);
          })
        );
      }
      if (method === RequestMethod.Patch) {
        return this.http.patch(url, requestOptions).pipe(
          map(response => {
            if (response['_body'] === '') {
              return response;
            }
            console.log(response);
            return response.json();
          }),
          catchError((error: Response) => {
            Observable.throw(this.handleError(error));
            if (error.status === 404) {
              console.log(error);
              // return throwError(new NotFoundError(error));
            }
            return throwError(error);
          })
        );
      }
      if (method === RequestMethod.Options) {
        return this.http.options(url, requestOptions).pipe(
          map(response => {
            if (response['_body'] === '') {
              return response;
            }
            console.log(response);
            return response.json();
          }),
          catchError((error: Response) => {
            Observable.throw(this.handleError(error));
            if (error.status === 404) {
              console.log(error);
              // return throwError(new NotFoundError(error));
            }
            return throwError(error);
          })
        );
      }
      if (method === RequestMethod.Put) {
        return this.http.put(url, requestOptions).pipe(
          map(response => {
            if (response['_body'] === '') {
              return response;
            }
            return response.json();
          }),
          catchError((error: Response) => {
            Observable.throw(this.handleError(error));
            if (error.status === 404) {
              console.log(error);
              // return throwError(new NotFoundError(error));
            }
            return throwError(error);
          })
        );
      }
      if (method === RequestMethod.Delete) {
        return this.http.delete(url, requestOptions).pipe(
          map(response => {
            if (response['_body'] === '') {
              return response;
            }
            return response.json();
          }),
          catchError((error: Response) => {
            Observable.throw(this.handleError(error));
            if (error.status === 404) {
              console.log(error);
              // return throwError(new NotFoundError(error));
            }
            return throwError(error);
          })
        );
      }
    }
  }

  loginErrorHandler(err) {
    // console.log('Error code ' + err.status);
    this.Cookie.removeAll();
    this.router.navigateByUrl('/login/UserName or password error');
  }

  parseJSON(response) {
    return response.text().then(function (text) {
      return text ? JSON.parse(text) : {};
    });
  }

  /**
   * for use as a http request header
   */
  getAuthorizationHeader() {
    return {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.get_access_token(),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token'
    };
  }

  sendAuthorizedPostRequest(url: string, dataPayload: any) {

    // @ts-ignore
    this.http.post<any>(this.baseUrl + url, dataPayload, {'headers': this.getAuthorizationHeader()}).subscribe({
      next: response => {
        // tslint:disable-next-line:no-debugger
        if (response['_body'] === '') {
          return response;
        }
        return response.json();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  sendAuthorizedPutRequest(url: string, dataPayload: any) {
    // @ts-ignore
    this.http.put<any>(this.baseUrl + url, dataPayload, {'headers': this.getAuthorizationHeader()}).subscribe({
      next: response => {
        // tslint:disable-next-line:no-debugger
        if (response['_body'] === '') {
          return response;
        }
        return response.json();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  private handleError(error: Response) {
    console.log('Error with status : ' + error.status);
    console.log(error);
    const st = +error.status;
    // console.log(st);
    if (st === 0 || st === 401) {
      // console.log('clearing access token');
      this.Cookie.remove('access_token');
    }

    this.router.navigate(['/error', error.status, error['_body']]);
    // if (error.status === 403) {
    //   return error;
    // }
  }

  sendAuthorizedGetRequest(url: string) {
    // @ts-ignore
    this.http.get<any>(this.baseUrl + url, {'headers': this.getAuthorizationHeader()}).subscribe({
      next: response => {
        // tslint:disable-next-line:no-debugger
        if (response['_body'] === '') {
          return response;
        }
        return response.json();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Common method for send any GET request
   */
  sendAuthenticateGetRequestObserver(url: string, params: any): Observable<any> {
    if (params == null) {
      params = '';
    } else {
      params = '?' + params?.toString();
    }
    return this.httpClient.get<any>(this.getBaseUrl() + url + params?.toString(), {
      headers: this.getAuthorizationHeader(),
    }).pipe(map((res => res)));
  }


  /**
   * Common method for send any POST request
   */
  sendAuthenticatePostRequestObserver(url: string, params: any, data: any): Observable<any> {
    if (params == null) {
      params = '';
    } else {
      params = '?' + params?.toString();
    }
    return this.httpClient.post<any>(this.getBaseUrl() + url + params?.toString(), data, {
      headers: this.getAuthorizationHeader(),
    });
  }





  /**
   * Common method for send any PUT request
   */
  sendAuthenticatePutRequestObserver(url: string, params: any, data: any): Observable<any> {
    if (params == null) {
      params = '';
    } else {
      params = '?' + params?.toString();
    }
    return this.httpClient.put<any>(this.getBaseUrl() + url + params?.toString(), data, {
      headers: this.getAuthorizationHeader(),
    });
  }

  sendAuthenticateDeleteRequestObserver(url: string, params: any): Observable<any> {
    if (params == null) {
      params = '';
    } else {
      params = '?' + params?.toString();
    }
    return this.httpClient.delete<any>(this.getBaseUrl() + url + params?.toString(), {headers: this.getAuthorizationHeader()});
  }

  /**
   * Common method for send any Patch request
   */
  sendAuthenticatePATCHRequestObserver(url: string, params: any, data: any): Observable<any> {
    if (params == null) {
      params = '';
    } else {
      params = '?' + params?.toString();
    }
    return this.httpClient.patch<any>(this.getBaseUrl() + url +  params?.toString(), data, {
      headers: this.getAuthorizationHeader()
    });
  }


  /**
   * Common For Send Image/Multipart file to server
   */
  sendAuthenticatePutRequestObserverForMultiPart(url: string, data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    headers = headers.append('Authorization', 'Bearer ' + this.get_access_token());
    return this.httpClient.put<any>(this.getBaseUrl() + url, data, {
      headers
    });
  }

}
