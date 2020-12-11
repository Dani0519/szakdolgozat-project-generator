import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'e2e',
  templateUrl: './e2e.component.html',
  styleUrls: ['./e2e.component.scss'],
})
export class E2eComponent implements OnInit {

  @Input() project;
  @Input() data;

  selectedSuite: any;
  selectedType: string;

  constructor() { }

  ngOnInit() {
    this.selectedSuite = this.data[0];
    this.selectedType = 'all';
    console.log(this.selectedSuite);
  }

  loadSuite(event: any): void {
    this.selectedSuite = event.source.value;
  }

  typeChange(event: any): void {
    this.loadType(event.source.value);
  }

  loadType(type: string): void {
    console.log(type);
  }

}
