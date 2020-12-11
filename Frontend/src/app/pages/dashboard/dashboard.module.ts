import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { OverviewComponent } from '../../view/dashboard/overview/overview.component';
import { UserComponent } from '../../view/popovers/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
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
  declarations: [
    DashboardPage,
    OverviewComponent
  ],
  entryComponents: [
    UserComponent
  ]
})
export class DashboardPageModule {}
