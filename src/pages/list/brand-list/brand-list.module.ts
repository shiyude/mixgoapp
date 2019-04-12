import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandListPage } from './brand-list';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    BrandListPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandListPage),
    ComponentsModule
  ],
  exports: [
    BrandListPage
  ]
})
export class BrandListPageModule {}
