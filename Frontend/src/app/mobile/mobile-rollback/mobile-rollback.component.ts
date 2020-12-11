import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, AlertController } from '@ionic/angular';
import { DeployAPIService } from 'src/app/services/deploy/deploy-api.service';

@Component({
  selector: 'app-mobile-rollback',
  templateUrl: './mobile-rollback.component.html',
  styleUrls: ['./mobile-rollback.component.scss'],
})
export class MobileRollbackComponent implements OnInit {

  @Input() project: any;
  @Input() stagingTags: Array<any>;
  @Input() productionTags: Array<any>;

  stagingCheckout: string;
  productionCheckout: string;

  type: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private deployAPI: DeployAPIService
  ) { }

  ngOnInit() {
    this.type = 'staging';
  }

  segmentChanged(event: any): void {
    this.type = event.target.value;
  }

  getStagingCheckout(event: any): void {
    this.stagingCheckout = event.target.value;
  }

  getProductionCheckout(event: any): void {
    this.productionCheckout = event.target.value;
  }

  startStaging(): void {
    // tslint:disable-next-line: max-line-length
    if (this.stagingCheckout === undefined || this.stagingCheckout === '') {
      this.alert('Give the checkout!');
    } else {
      const user = this.angularFireAuth.auth.currentUser;
      if (user.displayName == null || user.displayName === undefined) {
          // tslint:disable-next-line: max-line-length
          this.deployAPI.stagingRollback(this.project.name, 'Inclouded Dashboard Admin', this.stagingCheckout).then(() => {
            this.showMessage('success');
          }).catch(err => {
            this.showMessage('failed');
          });
      } else {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.stagingRollback(this.project.name, user.displayName, this.stagingCheckout).then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      }
    }
  }

  startProduction(): void {
    // tslint:disable-next-line: max-line-length
    if (this.productionCheckout === undefined || this.productionCheckout === '') {
      this.alert('Give the checkout!');
    } else {
      const user = this.angularFireAuth.auth.currentUser;
      if (user.displayName == null || user.displayName === undefined) {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.productionRollback(this.project.name, 'Inclouded Dashboard Admin', this.productionCheckout).then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      } else {
        // tslint:disable-next-line: max-line-length
        this.deployAPI.productionRollback(this.project.name, user.displayName, this.productionCheckout).then(() => {
          this.showMessage('success');
        }).catch(err => {
          this.showMessage('failed');
        });
      }
    }
  }

  // Tools ----

  async showMessage(status: string) {
    let header = 'Alert';
    const subHeader = this.project.sites[this.type];
    let message = 'I don\'t know what is going on! :(';

    switch (this.type) {
      case 'staging':
        header = 'STAGING';
        break;
      case 'production':
        header = 'PRODUCTION';
        break;
    }

    if (status === 'success') {
      message = 'Rollback started successfully!';
    } else {
      message = 'Failed to start the rollback!';
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

  closePanel(): void {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
