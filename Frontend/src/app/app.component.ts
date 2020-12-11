import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pages: any[] = [
    {
      name: 'Dashboard',
      icon: '../assets/icon/dashboard.svg',
      path: '/dashboard'
    },
    {
      name: 'Deployments',
      icon: '../assets/icon/deploy.svg',
      path: '/deployments'
    },
    {
      name: 'Testing',
      icon: '../assets/icon/testing1.svg',
      path: '/testing'
    },
    {
      name: 'System monitoring',
      icon: '../assets/icon/system-monitoring.svg',
      path: '/system-monitoring'
    },
    {
      name: 'User management',
      icon: '../assets/icon/group-2.svg',
      path: '/usermanagement'
    },
    {
    name: 'Integrated projects',
    icon: '../assets/icon/menu-projects.svg',
    path: '/project-list'
  }
    // {
    //   name: 'About',
    //   icon: '../assets/icon/info.svg',
    //   path: '/about'
    // }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private firebaseAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
