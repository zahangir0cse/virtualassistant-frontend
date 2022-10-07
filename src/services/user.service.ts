import {Injectable} from '@angular/core';
import {User} from 'src/shared/model/user.model';
import {RestDataService} from './rest-data.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registrationUrl = 'api/auth/register';
  constructor(private dataSource: RestDataService, private toastrService: ToastrService) {
  }
  userRegistration(user: User) {
    this.dataSource
      .sendAuthenticatePostRequestObserver(this.registrationUrl, null, user)
      .subscribe(
        data => {
          if (data !== null && data.statusCode === 200) {
            this.toastrService.success('Registration successful', 'Success');
          } else {
            this.toastrService.error('Registration Failed', 'Error');
          }
        },
        error => {
          this.toastrService.error('Registration Failed', 'Error');
        }
      );
  }
}
