import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArPage } from './ar';

@NgModule({
  declarations: [
    ArPage,
  ],
  imports: [
    IonicPageModule.forChild(ArPage),
  ],
  exports: [
    ArPage
  ]
})
export class ArPageModule {}
