import { NgModule } from '@angular/core';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RestDataService } from './rest-data.service';
import {UserSearchPipePipe} from './item.search.pipe';

@NgModule({
  providers: [
    AuthGuardService,
    AuthService,
    RestDataService,
  ],
  exports: [
    UserSearchPipePipe
  ],
  declarations: [UserSearchPipePipe]
})
export class ServiceModule { }
