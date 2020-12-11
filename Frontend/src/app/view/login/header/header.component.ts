import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  headerImage = '../../../../assets/icon/dashboard.svg';

  constructor() { }

  ngOnInit() {}

}
