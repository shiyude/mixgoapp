import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeAccountPage } from './meAccount';

@NgModule({
  declarations: [
    MeAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MeAccountPage)
  ],
  exports: [
    MeAccountPage
  ]
})
export class MeAccountPageModule {}
