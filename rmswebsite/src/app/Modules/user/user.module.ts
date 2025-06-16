import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { UserPassResetComponent } from './user-pass-reset/user-pass-reset.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule, } from 'devextreme-angular/ui/button';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxFileUploaderModule, DxTextAreaModule,DxDropDownButtonModule ,DxDropDownBoxModule ,DxNumberBoxModule,DxListModule,DxSelectBoxModule  } from 'devextreme-angular';
import { DxRadioGroupModule } from 'devextreme-angular';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserPassResetComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    DxSelectBoxModule,
    DxDateBoxModule,
    DxRadioGroupModule,
    MatSortModule
  ],
  providers: [UserComponent],
  exports: [UserComponent],
  
})
export class UserModule {}
