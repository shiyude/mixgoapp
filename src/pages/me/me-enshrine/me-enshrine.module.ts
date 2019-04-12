import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeEnshrinePage } from './me-enshrine';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    MeEnshrinePage,
  ],
  imports: [
    IonicPageModule.forChild(MeEnshrinePage),
    ComponentsModule
  ],
  exports: [
    MeEnshrinePage
  ]
})
export class MeEnshrinePageModule {}
