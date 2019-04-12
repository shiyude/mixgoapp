import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelateGoodsPage } from './relate-goods';
import { ComponentsModule } from './../../../components/components.module'; 

@NgModule({
  declarations: [
    RelateGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(RelateGoodsPage),
    ComponentsModule
  ],
  exports: [
    RelateGoodsPage
  ]
})
export class GoodsListPageModule {}
