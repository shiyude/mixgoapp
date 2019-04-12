import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';
import { ComponentsModule } from './../../components/components.module'; 
@NgModule({
  declarations: [
    MePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MePage)
  ],
  exports: [
    MePage
  ]
})
export class MePageModule {}
