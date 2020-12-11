import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StashApiService } from '../../services/stash/stash-api.service';
import { FirebaseapiService } from '../../services/firebase/firebaseapi.service';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.scss'],
})
export class DeploymentPage implements OnInit {

  currentDate = new Date();

  @Input() project: any;

  loaded: boolean;
  menuOption: string;

  commits: Array<any>;
  stagingTags: Array<any>;
  productionTags: Array<any>;

  deployments: Array<any>;
  pullRequests: Array<any>;

  chart = {
    labels: Array(),
    monthlySuccess: Array(),
    monthlyFailed: Array()
  };

  constructor(
    private modalCtrl: ModalController,
    private stash: StashApiService,
    private firebaseApi: FirebaseapiService
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.commits = new Array();
    this.menuOption = 'project';
    this.initDeploy().then(() => {
      this.loaded = true;
    });
  }

  segmentChanged(event: any) {
    this.menuOption = event.target.value;
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async initDeploy(): Promise<any> {
    const repo = this.project.repository.split('/')[5].replace('.git', '');
    await this.stash.getCommits(this.project.jiraKey, repo).then(data => {
      data.forEach(commit => {
        this.commits.push({ id: commit.id.substring(0, 11), message: commit.message });
      });
    });

    await this.stash.getTags(this.project.jiraKey, this.project.repository.split('/')[5].replace('.git', '')).then(data => {
      this.stagingTags = data.filter(tag => tag.displayId.indexOf('-') === -1 || tag.displayId.includes('-S'));
      this.productionTags = data.filter(tag => tag.displayId.includes('-') && tag.displayId.indexOf('-S') === -1);
    });

    await this.firebaseApi.getDeployments(this.project.name).then(data => {
      this.deployments = data.deployments;
    });

    await this.stash.getPullRequests(this.project.name).then(data => {
      try {
        this.pullRequests = data.values;
      } catch(err) {
        this.pullRequests = [];
      }
    });

    this.chart.labels = this.getCurrentMonthDaysNumber(this.currentDate.getMonth() + 1, this.currentDate.getFullYear());
    this.chart.monthlySuccess = this.monthlySuccessData();
    this.chart.monthlyFailed = this.monthlyFailedData();

  }

  getCurrentMonthDaysNumber(month, year): Array<number> {
    const numberOfDays = new Date(year, month, 0).getDate();
    const days = new Array();
    let i = 1;
    while (i <= numberOfDays) {
      days.push(i);
      i++;
    }
    return days;
  }

  monthlySuccessData(): Array<number> {
    const data = Array(new Date(this.currentDate.getMonth() + 1, this.currentDate.getFullYear(), 0).getDate() + 1).fill(0);
    // tslint:disable-next-line: max-line-length
    const filteredSuccessful = this.deployments.filter(deployment => deployment.mode.includes('pre') && deployment.deploy === true && Number(deployment.date.split(' ')[0].split('-')[1]) === (this.currentDate.getMonth() + 1));
    filteredSuccessful.forEach(deployment => {
      const index = Number(deployment.date.split('_')[0].split('-')[2]) - 1;
      data[index] += 1;
    });
    return data;
  }

  monthlyFailedData(): Array<number> {
    const data = Array(new Date(this.currentDate.getMonth() + 1, this.currentDate.getFullYear(), 0).getDate() + 1).fill(0);
    // tslint:disable-next-line: max-line-length
    const filteredFailed = this.deployments.filter(deployment => deployment.mode.includes('pre') && deployment.deploy === false && Number(deployment.date.split(' ')[0].split('-')[1]) === (this.currentDate.getMonth() + 1));
    filteredFailed.forEach(deployment => {
      const index = Number(deployment.date.split('_')[0].split('-')[2]) - 1;
      data[index] += 1;
    });
    return data;
  }

}
