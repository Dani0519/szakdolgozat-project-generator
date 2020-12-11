import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserComponent } from '../../popovers/user/user.component';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
})
export class UserButtonComponent implements OnInit {

  username: string;

  constructor(
    private auth: AngularFireAuth,
    private popoverController: PopoverController
    ) { }

  ngOnInit() { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
