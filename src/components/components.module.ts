import { NgModule } from "@angular/core";
import { CargoListComponent } from "./cargo-list/cargo-list";
import { IonicPageModule } from "ionic-angular";
import { CommonModule } from "@angular/common";
import { CollectListComponent } from "./collect-list/collect-list";
@NgModule({
  declarations: [CargoListComponent, CollectListComponent],
  imports: [
    CommonModule,
    IonicPageModule.forChild(CargoListComponent)
  ],
  exports: [CargoListComponent, CollectListComponent]
})
export class ComponentsModule {}
