import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { DashNavbarComponent } from './components/dash-navbar/dash-navbar.component';
import { UnautorizedComponent } from './containers/unautorized/unautorized.component';
import {ServiceModule} from '../services/service.module';
import { ItemListComponent } from './containers/item-list/item-list.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ItemListComponent
      }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ROUTES), ServiceModule],
  declarations: [
    DashboardComponent,
    DashNavbarComponent,
    UnautorizedComponent,
    ItemListComponent,
  ]
})
export class DashboardModule { }
