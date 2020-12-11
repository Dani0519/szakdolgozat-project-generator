import { Component, OnInit } from '@angular/core';
import { JenkinsApiService } from 'src/app/services/jenkins/jenkins-api.service';
import { ModalController, Platform } from '@ionic/angular';
import { FirebaseapiService } from 'src/app/services/firebase/firebaseapi.service';
import { DeploymentPage } from '../../modals/deployment/deployment.page';
import { MobileDeploymentPage } from '../../modals/mobile-deployment/mobile-deployment.page';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.page.html',
  styleUrls: ['./deployments.page.scss'],
})
export class DeploymentsPage implements OnInit {

  mobile: boolean;
  loaded: boolean;

  projects: Array<any>;
  filteredProjects: Array<any>;

  projectType: string;
  mobileTitle: string;

  displayedColumns: string[] = ['name', 'health', 'status', 'pre', 'staging', 'production', 'url'];

  constructor(
    private jenkins: JenkinsApiService,
    public modalController: ModalController,
    private firebaseApi: FirebaseapiService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.projectType = 'web';
    this.mobileTitle = 'Web';
    if (this.platform.width() < 970) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.getData(this.projectType);
  }

  onResize(event) {
    const threshold = 970;
    if (event.target.innerWidth <= threshold) {
      this.mobile = true;
    }
    if (event.target.innerWidth > threshold) {
      this.mobile = false;
    }
  }

  filter(event: any): void {
    if (event.target.value === 'undefined' || event.target.value === '') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(pipeline => pipeline.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  async initStatusAndHealth(): Promise<any> {
    for (let i = 0; i < this.projects.length; i++) {
      await this.jenkins.getPipeline(this.projects[i].name).then(data => {
        try {
          if (data.healthReport[0].iconUrl === undefined) {
            this.projects[i]['healthIcon'] = 'health-80plus.png';
          } else {
            this.projects[i]['healthIcon'] = data.healthReport[0].iconUrl;
          }
        } catch (err) {
          this.projects[i]['healthIcon'] = 'health-80plus.png';
        }
        switch (data.color) {
          case 'blue':
            this.projects[i]['status'] = 'Successful';
            this.projects[i]['color'] = 'var(--ion-color-success)';
            break;
          case 'red':
            this.projects[i]['status'] = 'Failed';
            this.projects[i]['color'] = 'var(--ion-color-danger)';
            break;
          case 'notbuilt':
            this.projects[i]['status'] = 'Not build yet';
            this.projects[i]['color'] = 'var(--ion-color-light)';
            break;
          case 'aborted':
            this.projects[i]['status'] = 'Aborted';
            this.projects[i]['color'] = 'var(--ion-color-medium)';
            break;
          case 'disabled':
            this.projects[i]['status'] = 'Disabled';
            this.projects[i]['color'] = 'var(--ion-color-dark)';
            break;
          default:
            this.projects[i]['status'] = 'In progress';
            this.projects[i]['color'] = 'var(--ion-color-secondary)';
        }
      });
    }
  }

  getData(type: string): void {
    this.loaded = false;
    this.firebaseApi.getProjects().toPromise().then(data => {
      this.projects = data.filter(project => project.type === type);
      this.filteredProjects = data.filter(project => project.type === type);
      this.initStatusAndHealth().then(() => {
        this.loaded = true;
        setInterval(() => {
          this.initStatusAndHealth();
        }, 5000);
      });
    });
  }

  segmentChanged(event: any): void {
    this.setTitle(this.projectType);
    this.getData(event.target.value);
  }

  async showDetails(project: any) {
    const modal = await this.modalController.create({
      component: DeploymentPage,
      cssClass: 'details-modal',
      componentProps: {
        project
      }
    });
    modal.onWillDismiss().then(() => {
      this.initStatusAndHealth();
    });
    return await modal.present();
  }

  // Moblie

  setTab(projectType): void {
    this.setTitle(projectType);
    this.getData(projectType);
  }

  async showDetailsMobile(project: any) {
    const modal = await this.modalController.create({
      component: MobileDeploymentPage,
      cssClass: 'details-modal-mobile',
      componentProps: {
        project
      }
    });
    modal.onWillDismiss().then(() => {
      this.initStatusAndHealth();
    });
    return await modal.present();
  }

  setTitle(type: string): void {
    switch (type) {
      case 'web':
        this.mobileTitle = 'Web';
        break;
      case 'mobil':
        this.mobileTitle = 'Mobile Web';
        break;
      case 'mobil-ios':
        this.mobileTitle = 'iOS';
        break;
      case 'mobil-android':
        this.mobileTitle = 'Android';
        break;
    }
  }

}
