import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsermanagementPage } from './usermanagement.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { MaterialModule } from '../../modules/material/material.module';
import { RegisterComponent } from '../../view/login/register/register.component';
import { RegisteredComponent } from '../../view/usermanagement/registered/registered.component';
import { UserComponent } from '../../view/popovers/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UsermanagementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule
  ],
  declarations: [
    UsermanagementPage,
    RegisterComponent,
    RegisteredComponent
  ],
  entryComponents: [
    RegisterComponent,
    UserComponent
  ]
})
export class UsermanagementPageModule {}
