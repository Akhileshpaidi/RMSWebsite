import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerComponent } from './manufacturer.component';
import { CreateUpdateManufacturerComponent } from './create-update-manufacturer/create-update-manufacturer.component';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ManufacturerComponent,
    CreateUpdateManufacturerComponent,
    ManufacturerListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    ManufacturerRoutingModule
  ],
  providers: [ManufacturerComponent],
  exports: [ManufacturerComponent],
})
export class ManufacturerModule { }
