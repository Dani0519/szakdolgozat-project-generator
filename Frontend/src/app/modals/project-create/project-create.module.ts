import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectCreatePage } from './project-create.page';
import { MaterialModule } from '../../modules/material/material.module';



const routes: Routes = [
  {
    path: '',
    component: ProjectCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: []
})
export class ProjectCreatePageModule {}
