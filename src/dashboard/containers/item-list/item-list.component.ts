import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/model/user';
import {RestDataService} from '../../../services/rest-data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: User[];
  searchElement = '';
  constructor(private restDataService: RestDataService) {}
  getItemList() {
    const url = 'api/v1/dashboard/all';
    this.restDataService.sendAuthenticateGetRequestObserver(url, null).subscribe(data => {
      this.items =  data.content as User[];
    });
  }
  ngOnInit() {
    this.getItemList();
  }
}
