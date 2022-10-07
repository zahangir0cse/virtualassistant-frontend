import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import {Login} from '../../../shared/model/login.model';
import {User} from '../../../shared/model/user';
import {RestDataService} from '../../../services/rest-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
}
