import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';

@NgModule({
  imports: [
    Daterangepicker,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    CommonModule,
    Daterangepicker,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    NavBarComponent
  ],
})
export class SharedModule {}
