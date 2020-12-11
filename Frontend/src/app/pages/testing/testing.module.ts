import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestingPage } from './testing.page';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { E2eComponent } from 'src/app/view/testing/e2e/e2e.component';
import { UserComponent } from '../../view/popovers/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: TestingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    TestingPage,
    E2eComponent
  ],
  entryComponents: [
    UserComponent
  ]
})
export class TestingPageModule {}
