import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeHelpPage } from './me-help';

@NgModule({
  declarations: [
    MeHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(MeHelpPage)
  ],
  exports: [
    MeHelpPage
  ]
})
export class MeHelpPageModule {}
