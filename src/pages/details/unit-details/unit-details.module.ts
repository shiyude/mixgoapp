import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitDetailsPage } from './unit-details';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    UnitDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UnitDetailsPage),
    ComponentsModule
  ],
  exports: [
    UnitDetailsPage
  ]
})
export class UnitDetailsPageModule {}
