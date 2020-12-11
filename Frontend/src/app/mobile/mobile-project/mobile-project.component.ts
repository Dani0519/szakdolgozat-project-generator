import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mobile-project',
  templateUrl: './mobile-project.component.html',
  styleUrls: ['./mobile-project.component.scss'],
})
export class MobileProjectComponent implements OnInit {

  @Input() chartData;
  @Input() project;

  constructor() { }

  ngOnInit() {}

}
