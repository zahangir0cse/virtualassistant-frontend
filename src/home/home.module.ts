import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './containers/index/index.component';
import { HomeComponent } from './home.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import {ServiceModule} from '../services/service.module';

export const ROUTES: Routes = [
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
  ],
  declarations: [
    IndexComponent,
    HomeComponent,

  ]
})
export class HomeModule { }
