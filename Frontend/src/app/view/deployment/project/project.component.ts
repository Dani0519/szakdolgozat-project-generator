import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  currentDate = new Date();
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  @Input() project: any;
  @Input() deployments: any;
  @Input() chart: any;
  @Input() pullRequests: Array<any>;

  deployChart: Chart;

  constructor() { }

  ngOnInit() {
    this.initChart();
  }

  openRepo(): void {
    window.open(this.project.repository, '_blank');
  }

  openSite(siteId: string): void {
    window.open('https://' + siteId + '.web.app', '_blank');
  }

  openPullRequestSite(source: string): void {
    window.open('https://' + source.replace('/', '-') + '.web.app', '_blank');
  }

  initChart(): void {
    this.deployChart = new Chart('deployChart', {
      type: 'line',
      data: {
        labels: this.chart.labels,
        datasets: [{
          label: 'Successful',
          data: this.chart.monthlySuccess,
          fill: false,
          lineTension: 0.2,
          borderColor: 'rgb(56, 128, 255)',
          borderWidth: 2
        },
        {
          label: 'Failed',
          data: this.chart.monthlyFailed,
          fill: false,
          lineTension: 0.2,
          borderColor: 'rgb(245, 61, 61)',
          borderWidth: 2
        }
        ]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          text: 'Successful & Failed builds in ' + this.monthNames[this.currentDate.getMonth()] + ' (Pre Staging)',
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true,
              max: 40
            }
          }],
        },
      }
    });
  }

}
