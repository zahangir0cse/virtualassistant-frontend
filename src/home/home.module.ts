import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './containers/index/index.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { HomeComponent } from './home.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import {ServiceModule} from '../services/service.module';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
    ]
  }
];

@NgModule({
  imports: [SharedModule, AgmCoreModule, AgmDirectionModule, RouterModule.forChild(ROUTES), ServiceModule],
  exports: [
    LoginComponent
  ],
  declarations: [
    IndexComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,

  ]
})
export class HomeModule { }
