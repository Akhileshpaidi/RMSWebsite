import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFileUploaderModule, DxTextAreaModule,DxDropDownButtonModule ,DxDropDownBoxModule ,DxNumberBoxModule,DxListModule,DxSelectBoxModule  } from 'devextreme-angular';

@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    RoleListComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    RouterModule,
    SharedMaterialModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxDropDownButtonModule ,
    DxDropDownBoxModule ,
    DxNumberBoxModule ,
    DxListModule,
    DxSelectBoxModule
  ],
  providers: [RoleComponent],
  exports: [RoleComponent],
})
export class RoleModule { }
