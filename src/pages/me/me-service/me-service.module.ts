import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeServicePage } from './me-service';

@NgModule({
  declarations: [
    MeServicePage,
  ],
  imports: [
    IonicPageModule.forChild(MeServicePage)
  ],
  exports: [
    MeServicePage
  ]
})
export class MeServicePageModule {}
