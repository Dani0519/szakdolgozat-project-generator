import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'history-expansion',
  templateUrl: './history-expansion.component.html',
  styleUrls: ['./history-expansion.component.scss'],
})
export class HistoryExpansionComponent implements OnInit {

  @Input() deployment;

  expanded: boolean;

  constructor() { }

  ngOnInit() {
    this.expanded = false;
    console.log(this.deployment);
  }

  expand(): void {
    if (this.expanded) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
  }

}
