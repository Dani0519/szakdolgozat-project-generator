import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FirebaseapiService } from 'src/app/services/firebase/firebaseapi.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {

  loaded: boolean;
  dataLoaded: boolean;

  selectedProject: any;
  projects: [];
  e2e: any;

  resultChart: any[];
  @ViewChild('resultChart', { static: false }) resultChartRef: ElementRef;

  constructor(private firebase: FirebaseapiService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.loaded = false;
    this.dataLoaded = true;
    this.initProjects();
  }

  async initProjects(): Promise<any> {
    this.firebase.getProjects().subscribe(data => {
      this.projects = data;
      this.loaded = true;
    });
  }

  loadProject(event: any): void {
    this.selectedProject = event.source.value;
    this.dataLoaded = false;
    this.firebase.getDeployments(event.source.value.name).then(data => {
      let e2e = new Array();
      for (let suite in data.e2e) {
        e2e.push(data.e2e[suite]);
      }
      this.e2e = this.bubbleSort(e2e);
      this.e2e.forEach(suite => {
        suite.id = suite.id.replace('suite', 'Suite ');
      });
      this.dataLoaded = true;
      this.changeDetector.detectChanges();
      this.resultChart = new Chart(this.resultChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Failed', 'Success'],
          datasets: [{
            data: [data.deployments[0].e2e.failed, data.deployments[0].e2e.success],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)'
            ]
          }]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            text: 'Dispersion of the outcomes',
            display: true
          }
        }
      });
    });
  }

  bubbleSort(arr): Array<any> {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (Number(arr[j - 1].id.replace('suite', '')) > Number(arr[j].id.replace('suite', ''))) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }

}
