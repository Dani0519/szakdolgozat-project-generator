import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SystemMonitoringPage } from './system-monitoring.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { UserComponent } from '../../view/popovers/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: SystemMonitoringPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [SystemMonitoringPage],
  entryComponents: [
    UserComponent
  ]
})
export class SystemMonitoringPageModule {}
