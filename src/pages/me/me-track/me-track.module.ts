import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeTrackPage } from './me-track';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    MeTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(MeTrackPage),
    ComponentsModule
  ],
  exports: [
    MeTrackPage
  ]
})
export class MeTrackPageModule {}
