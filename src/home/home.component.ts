import { Component, OnInit } from '@angular/core';
// <header></header>
@Component({
  selector: 'app-home',
  template: `
    <nav-bar [fixed]="fixed" [top]="top"></nav-bar>
    <div *ngIf="fixed" class="blank"></div>
    <router-outlet></router-outlet>
    <footer></footer>
  `,
  styles: [`
  .blank{
    height: 98px;
  }
  @media (max-width: 767px) {
    .blank{
      height: 62px;
    }
  }
  `]
})
export class HomeComponent implements OnInit {
  fixed = true;
  top = 0;
  constructor() { }

  ngOnInit() { }
}
