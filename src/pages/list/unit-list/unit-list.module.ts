import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitListPage } from './unit-list';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    UnitListPage,
  ],
  imports: [
    IonicPageModule.forChild(UnitListPage),
    ComponentsModule
  ],
  exports: [
    UnitListPage
  ]
})
export class UnitListPageModule {}
