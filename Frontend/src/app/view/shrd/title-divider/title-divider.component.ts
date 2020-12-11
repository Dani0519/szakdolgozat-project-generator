import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'title-divider',
  templateUrl: './title-divider.component.html',
  styleUrls: ['./title-divider.component.scss'],
})
export class TitleDividerComponent implements OnInit {


  @Input() title: string;
  @Input() subtitle: string;
  @Input() icon: string;
  @Input() badge: number;

  constructor() { }

  ngOnInit() { }

}
