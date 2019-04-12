import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeekPage } from './seek';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    SeekPage,
  ],
  imports: [
    IonicPageModule.forChild(SeekPage),
    ComponentsModule
  ],
  exports: [
    SeekPage
  ]
})
export class SeekPageModule {}
