import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  username: string;

  constructor(private auth: AngularFireAuth, private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.username = this.auth.auth.currentUser.displayName == null || this.auth.auth.currentUser.displayName == undefined ? this.username = 'Inclouded Dashboard Admin' : this.auth.auth.currentUser.displayName;
  }

  logout(): void {
    this.auth.auth.signOut();
    this.popoverController.dismiss();
    this.router.navigate(['/login']);
  }

}
