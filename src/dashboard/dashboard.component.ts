import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  // templateUrl: './dashboard.component.html',
  template: `
    <dash-navbar></dash-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .content {
        -webkit-transition: margin-left 0.8s;
        -moz-transition: margin-left 0.8s;
        transition: margin-left 0.8s;
      }
      .menu-side {
        width: 245px;
        left: -245px;
        transition: 0.8s;
      }
      .menu-open .menu-side {
        left: 0;
        z-index: 0;
      }
      .menu-open .content {
        margin-left: 245px;
      }
      @media (max-width: 767px) {
        .menu-side {
          top: 72px;
        }
        .menu-open .content {
          margin-left: 0;
        }
      }
    `
  ]
})
export class DashboardComponent {
  menuState = 'in';
  compState = 'narrow';
  constructor() {}

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  openNav() {
    this.menuState = 'in';
  }

  closeNav() {
    this.menuState = 'out';
  }
}
