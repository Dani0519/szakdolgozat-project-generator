import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeploymentsPage } from './deployments.page';
import { MaterialModule } from '../../modules/material/material.module';
import { DeploymentPage } from '../../modals/deployment/deployment.page';
import { ProjectComponent } from 'src/app/view/deployment/project/project.component';
import { DeployComponent } from '../../view/deployment/deploy/deploy.component';
import { RollbackComponent } from '../../view/deployment/rollback/rollback.component';
import { HistoryComponent } from '../../view/deployment/history/history.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { UserComponent } from '../../view/popovers/user/user.component';
import { MobileDeploymentPage } from 'src/app/modals/mobile-deployment/mobile-deployment.page';
import { MobileDeployComponent } from '../../mobile/mobile-deploy/mobile-deploy.component';
import { MobileRollbackComponent } from '../../mobile/mobile-rollback/mobile-rollback.component';
import { MobileProjectComponent } from '../../mobile/mobile-project/mobile-project.component';

const routes: Routes = [
  {
    path: '',
    component: DeploymentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ],
  declarations: [
    DeploymentsPage,
    DeploymentPage,
    MobileDeploymentPage,
    ProjectComponent,
    DeployComponent,
    RollbackComponent,
    HistoryComponent,
    MobileDeployComponent,
    MobileRollbackComponent,
    MobileProjectComponent
  ],
  entryComponents: [
    DeploymentPage,
    MobileDeploymentPage,
    UserComponent
  ]
})
export class DeploymentsPageModule {}
