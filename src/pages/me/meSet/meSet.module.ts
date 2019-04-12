import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeSetPage } from './meSet';


@NgModule({
  declarations: [
    MeSetPage,
  ],
  imports: [
    IonicPageModule.forChild(MeSetPage)
  ],
  exports: [
    MeSetPage
  ]
})
export class MeSetPageModule {}
