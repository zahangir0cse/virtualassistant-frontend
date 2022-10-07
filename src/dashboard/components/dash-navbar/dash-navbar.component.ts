import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/services/auth.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dash-navbar',
  templateUrl: './dash-navbar.component.html',
  styleUrls: ['./dash-navbar.component.scss']
})
export class DashNavbarComponent implements OnInit {
  username = 'user';
  isPrepaidAgent = false;
  role = '';
  show = false;
  dashboardLink = '/dashboard';

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.clear();
  }

  toggleCollapse() {
    this.show = !this.show;
  }
}


