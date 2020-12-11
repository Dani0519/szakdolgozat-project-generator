import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

// Components
import { SyncComponent } from '../../view/login/sync/sync.component';
import { HeaderComponent } from '../../view/login/header/header.component';
import { LoginPanelComponent } from '../../view/login/login-panel/login-panel.component';
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
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
    LoginPage,
    SyncComponent,
    HeaderComponent,
    LoginPanelComponent
  ],
  providers: [],
  entryComponents: []
})
export class LoginPageModule {}
