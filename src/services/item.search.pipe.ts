import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'UserSearchPipe'
})
export class UserSearchPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      args = args.toString().toLocaleLowerCase();
      if (val.firstName == null) {
        val.firstName = '';
      }
      if (val.lastName == null) {
        val.lastName = '';
      }
      if (val.email == null) {
        val.email = '';
      }
      // tslint:disable-next-line:max-line-length
      return (val.firstName.toLocaleLowerCase().includes(args)) || (val.lastName.toLocaleLowerCase().includes(args)) || (val.email.toLocaleLowerCase().includes(args));
    });
  }

}
