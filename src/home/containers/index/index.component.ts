import { Component, OnInit, HostListener } from '@angular/core';
import {User} from '../../../shared/model/user';
import {RestDataService} from '../../../services/rest-data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  users: User[];
  searchElement = '';
  constructor(private restDataService: RestDataService) {}
  getItemList() {
    const url = 'api/v1/user';
    this.restDataService.sendAuthenticateGetRequestObserver(url, null).subscribe(data => {
      this.users =  data.content as User[];
    });
  }
  ngOnInit() {
    this.getItemList();
  }

  backtotop() {
    window.scrollTo(0, 0);
  }
}
