import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopSelectPage } from './pop-select';

@NgModule({
  declarations: [
    PopSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(PopSelectPage),
  ],
  exports: [
    PopSelectPage
  ]
})
export class PopSelectPageModule {}
