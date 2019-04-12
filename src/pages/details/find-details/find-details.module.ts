import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindDetailsPage } from './find-details';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    FindDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FindDetailsPage),
    ComponentsModule
  ],
  exports: [
    FindDetailsPage
  ]
})
export class FindDetailsPageModule {}
