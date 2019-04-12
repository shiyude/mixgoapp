import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkShopPage } from './mark-shop';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    MarkShopPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkShopPage),
    ComponentsModule
  ],
  exports: [
    MarkShopPage
  ]
})
export class MarkShopPageModule {}
