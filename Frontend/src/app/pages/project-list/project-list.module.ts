import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectListPage } from './project-list.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserComponent } from 'src/app/view/popovers/user/user.component';
import { ProjectViewPage } from '../../modals/project-view/project-view.page';
import {ProjectCreatePage} from '../../modals/project-create/project-create.page';
import { MaterialModule } from '../../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';




const routes: Routes = [
  {
    path: '',
    component: ProjectListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ProjectListPage, ProjectViewPage, ProjectCreatePage],
  entryComponents: [
    UserComponent,
    ProjectViewPage,
    ProjectCreatePage
  ]
})
export class ProjectListPageModule {}
