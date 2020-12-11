import { Component, OnInit, HostListener, Host } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
})
export class LoginPanelComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  constructor(private router: Router, private toastController: ToastController, private firebaseAuth: AngularFireAuth, public dialog: MatDialog) { }

  ngOnInit() { }

  getEmail(event: any): void {
    this.credentials.email = event.target.value;
  }

  getPassword(event: any): void {
    this.credentials.password = event.target.value;
  }

  login(): void {
    this.firebaseAuth.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password).catch(err => {
      this.showMessage('Bad credentials!');
    }).then(result => {
      if (result !== undefined) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  async showMessage(message: string): Promise<any> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
