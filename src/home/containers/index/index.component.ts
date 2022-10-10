import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/model/user';
import {RestDataService} from '../../../services/rest-data.service';
import {Message} from '../../../shared/model/message';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  users: User[];
  messages: Message[];
  searchElement = '';
  constructor(private restDataService: RestDataService) {}
  url = 'api/v1/user';
  getUserList() {
    this.restDataService.sendAuthenticateGetRequestObserver(this.url, null).subscribe(data => {
      this.users =  data.content as User[];
    });
  }
  ngOnInit() {
    this.getUserList();
  }

  backtotop() {
    window.scrollTo(0, 0);
  }

  getMessageHistory(id: number) {
    this.restDataService.sendAuthenticateGetRequestObserver(this.url + '/user-msg/' + id , null).subscribe(data => {
      this.messages =  data.content as Message[];
    });
  }
}
