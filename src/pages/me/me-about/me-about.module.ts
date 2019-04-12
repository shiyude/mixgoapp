import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeAboutPage } from './me-about';

@NgModule({
  declarations: [
    MeAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(MeAboutPage)
  ],
  exports: [
    MeAboutPage
  ]
})
export class MeAboutPageModule {}
