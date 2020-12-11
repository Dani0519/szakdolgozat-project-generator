import { Component, OnInit, Input } from '@angular/core';
import { StashApiService } from 'src/app/services/stash/stash-api.service';
import { ModalController } from '@ionic/angular';
import { FirebaseapiService } from '../../services/firebase/firebaseapi.service';

@Component({
  selector: 'app-mobile-deployment',
  templateUrl: './mobile-deployment.page.html',
  styleUrls: ['./mobile-deployment.page.scss'],
})
export class MobileDeploymentPage implements OnInit {

  currentDate = new Date();

  @Input() project: any;

  page: string;
  loaded: boolean;

  commits: Array<any>;
  stagingTags: Array<any>;
  productionTags: Array<any>;

  deployments: Array<any>;

  chart = {
    labels: Array(),
    monthlySuccess: 0,
    monthlyFailed: 0
  };

  mobileChart = {
    failed: 0,
    success: 0
  };

  constructor(
    private modalCtrl: ModalController,
    private stash: StashApiService,
    private firebaseApi: FirebaseapiService
  ) { }

  ngOnInit() {
    this.page = 'info';
    this.loaded = false;
    this.commits = new Array();
    this.initDeploy().then(() => {
      this.loaded = true;
    });
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  setPage(page: string): void {
    this.page = page;
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
      this.chart = this.getCurrentMonthChartData(this.deployments);
    });

  }

  getCurrentMonthChartData(deployments: Array<any>): any {
    deployments.forEach(deployment => {
      if (deployment.deploy === true) {
        this.mobileChart.success++;
      } else {
        this.mobileChart.failed++;
      }
    });
    return new Array();
  }

}
