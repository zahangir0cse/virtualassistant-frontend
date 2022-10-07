import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/services/auth.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() fixed: boolean;
  @Input() top: number;

  show = false;
  smallCart = true;

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit() {
  }

  toggleCollapse() {
    this.show = !this.show;
  }
  scroll(el: HTMLElement) {
    this.toggleCollapse();
    el.scrollIntoView({ behavior: 'smooth' });
  }

  onHideClick() {
    this.smallCart = true;
  }

  logout() {
    this.auth.clear();
  }

  getMyStyles() {
    if (!this.fixed) {
      return {
        top: 133 - this.top + 'px'
      };
    }
  }
}
