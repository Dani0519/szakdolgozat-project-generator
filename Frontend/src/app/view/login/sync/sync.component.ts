import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JenkinsApiService } from 'src/app/services/jenkins/jenkins-api.service';

@Component({
  selector: 'sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

  syncLabel: string;

  @Output() readyEmitter = new EventEmitter();

  constructor(private jenkinsApi: JenkinsApiService) {
    this.syncLabel = 'Loading the application';
    setTimeout(() => {
      this.setReady();
    }, 1000);
  }

  ngOnInit() { }


  setReady(): void {
    setTimeout(() => {
      this.readyEmitter.emit(true);
    }, 1000);
  }

}
