import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  @Input() project: any;
  @Input() deployments: Array<any>;

  history: any;

  constructor() { }

  ngOnInit() {
    this.history = new Array();
  }

  setDate(event: any): void {
    const dateGiven = event.target.value.split('T')[0];
    this.history = this.deployments.filter(d => d.date.split('_')[0] === dateGiven);
  }

}
