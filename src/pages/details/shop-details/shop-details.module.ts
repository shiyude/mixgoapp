import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDetailsPage } from './shop-details';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    ShopDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopDetailsPage),
    ComponentsModule
  ],
  exports: [
    ShopDetailsPage
  ]
})
export class ShopDetailsPageModule {}
