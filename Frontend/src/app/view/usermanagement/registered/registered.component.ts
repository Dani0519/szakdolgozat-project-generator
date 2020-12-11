import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FirebaseapiService } from '../../../services/firebase/firebaseapi.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../login/register/register.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss'],
})
export class RegisteredComponent implements OnInit {

  loaded: boolean;

  displayedColumns = ['name', 'email', 'status', 'lastsign', 'delete'];
  users: [];

  constructor(private firebaseApi: FirebaseapiService, public dialog: MatDialog, private toastController: ToastController) { }

  ngOnInit() {
    this.loaded = false;
    this.firebaseApi.getUsers().then(data => {
      this.users = data;
      setTimeout(() => {
        this.loaded = true;
      }, 1000);
    });
  }

  refresh(): void {
    this.firebaseApi.getUsers().then(data => {
      this.users = data;
    });
  }

  register(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  async delete(user: any): Promise<any> {
    this.firebaseApi.deleteUser(user.uid);
    this.firebaseApi.getUsers().then(data => {
      this.users = data;
      this.refresh();
      this.presentToast(user.displayName + ' deleted!');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
