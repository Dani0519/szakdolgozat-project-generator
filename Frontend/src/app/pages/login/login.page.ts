import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ready: any;

  constructor() { }

  ngOnInit() { }

  setReady(res: any): void {
    this.ready = res;
  }

}
