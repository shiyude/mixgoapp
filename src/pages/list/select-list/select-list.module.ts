import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectListPage } from './select-list';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    SelectListPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectListPage),
    ComponentsModule
  ],
  exports: [
    SelectListPage
  ]
})
export class SelectListPageModule {}
