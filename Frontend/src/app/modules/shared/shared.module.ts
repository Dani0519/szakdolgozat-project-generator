import { BreakComponent } from './../../view/shrd/break/break.component';
import { TitleDividerComponent } from './../../view/shrd/title-divider/title-divider.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CircleLoaderComponent } from '../../view/shrd/circle-loader/circle-loader.component';
import { LineLoaderComponent } from 'src/app/view/shrd/line-loader/line-loader.component';
import { UserButtonComponent } from '../../view/shrd/user-button/user-button.component';
import { UserComponent } from '../../view/popovers/user/user.component';
import { HistoryExpansionComponent } from '../../view/shrd/history-expansion/history-expansion.component';


@NgModule({
  declarations: [
    TitleDividerComponent,
    BreakComponent,
    CircleLoaderComponent,
    LineLoaderComponent,
    UserButtonComponent,
    UserComponent,
    HistoryExpansionComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TitleDividerComponent,
    BreakComponent,
    CircleLoaderComponent,
    LineLoaderComponent,
    UserButtonComponent,
    UserComponent,
    HistoryExpansionComponent
  ]
})
export class SharedModule { }
