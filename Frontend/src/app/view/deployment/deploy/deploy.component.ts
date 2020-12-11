import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DeployAPIService } from '../../../services/deploy/deploy-api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
})
export class DeployComponent implements OnInit {

  @Input() project;
  @Input() commits: Array<any>;

  type: string;

  stagingData = {
    version: '',
    checkout: 'master'
  };

  productionData = {
    version: '',
    checkout: 'master'
  };

  constructor(
    private angularFireAuth: AngularFireAuth,
    private deployAPI: DeployAPIService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.type = 'pre';
  }

  setType(type: string): void {
    this.type = type;
  }

  startPreStaging(): void {
    const user = this.angularFireAuth.auth.currentUser;
    if (user.displayName == null || user.displayName === undefined) {
      this.deployAPI.startPreStaging(this.project.name, 'Inclouded Dashboard Admin').then(() => {
        this.showMessage('success');
      }).catch(err => {
        this.showMessage('failed');
      });
    } else {
      this.deployAPI.startPreStaging(this.project.name, user.displayName).then(() => {
        this.showMessage('success');
      }).catch(err => {
        this.showMessage('failed');
      });
    }
  }

  startStaging(): void {
    // tslint:disable-next-line: max-line-length
    if (this.stagingData.version === undefined || this.stagingData.version === '' || this.stagingData.checkout === undefined || this.stagingData.checkout === '') {
      this.alert('Fill the version & the checkout!');
    } else {
      const user = this.angularFireAuth.auth.currentUser;
      if (user.displayName == null || user.displayName === undefined) {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.startStaging(this.project.name, 'Inclouded Dashboard Admin', this.stagingData.version, this.stagingData.checkout, 'Staging deployment').then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      } else {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.startStaging(this.project.name, user.displayName, this.stagingData.version, this.stagingData.checkout, 'Staging deployment').then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      }
    }
  }

  startProduction(): void {
    // tslint:disable-next-line: max-line-length
    if (this.productionData.version === undefined || this.productionData.version === '' || this.productionData.checkout === undefined || this.productionData.checkout === '') {
      this.alert('Fill the version & the checkout!');
    } else {
      const user = this.angularFireAuth.auth.currentUser;
      if (user.displayName == null || user.displayName === undefined) {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.startProduction(this.project.name, 'Inclouded Dashboard Admin', this.productionData.version, this.productionData.checkout, 'Production deployment').then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      } else {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.startProduction(this.project.name, user.displayName, this.productionData.version, this.productionData.checkout, 'Production deployment').then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      }
    }
  }

  async showMessage(status: string) {
    let header = 'Alert';
    const subHeader = this.project.sites[this.type];
    let message = 'I don\'t know what is going on! :(';

    switch (this.type) {
      case 'pre':
        header = 'PRE STAGING';
        break;
      case 'staging':
        header = 'STAGING';
        break;
      case 'production':
        header = 'PRODUCTION';
        break;
    }

    if (status === 'success') {
      message = 'Deployment started successfully!';
    } else {
      message = 'Failed to start the deployment!';
    }

    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['COOL'],
      mode: 'ios'
    });
    alert.onDidDismiss().then(() => {
      this.closePanel();
    });
    await alert.present();
  }

  async alert(message: string): Promise<any> {
    const alert = await this.alertController.create({
      header: 'CAREFULLY',
      subHeader: 'Watch yourself',
      message,
      buttons: ['UNDERSTAND'],
      mode: 'ios'
    });

    await alert.present();
  }

  getStagingVersion(event: any) {
    this.stagingData.version = event.target.value;
  }

  getStagingCheckout(event: any) {
    this.stagingData.checkout = event.target.value;
  }

  getProductionVersion(event: any) {
    console.log(event.target.value);
    this.productionData.version = event.target.value;
  }

  getProductionCheckout(event: any) {
    this.productionData.checkout = event.target.value;
  }

  closePanel(): void {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
