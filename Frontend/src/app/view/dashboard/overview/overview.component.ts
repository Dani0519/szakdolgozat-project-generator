import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { JenkinsApiService } from '../../../services/jenkins/jenkins-api.service';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  jenkinsChart: any[];
  zabbixChart: any[];

  jenkinsLoaded = false;
  zabbixLoaded = false;

  constructor(private jenkins: JenkinsApiService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.initJenkinsChart().then(() => {
      setTimeout(() => {
        this.jenkinsLoaded = true;
      }, 1000);
    });
  }

  async initJenkinsChart(): Promise<any> {
    this.jenkins.getJenkinsData().subscribe(data => {
      this.jenkinsChart = new Chart('basicJenkins', {
        type: 'horizontalBar',
        data: {
          labels: ['Views', 'Pipeline'],
          datasets: [{
            label: '# of item',
            data: [data.views, data.pipelines],
            backgroundColor: [
              'rgba(102, 255, 102, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(102, 255, 102, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            text: 'Number of items',
            display: true
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                max: 100,
              }
            }]
          }
        }
      });
    });
  }

}
