import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { BridgeListComponent } from './bridge-list/bridge-list.component';
import { CreateBridgeComponent } from './create-bridge/create-bridge.component';
import { BridgeDetailComponent } from './bridge-detail/bridge-detail.component';
import { UpdateBridgeComponent } from './update-bridge/update-bridge.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { BridgeMasterComponent } from './bridge-master/bridge-master.component';
import { CreateBridgeMasterComponent } from './create-bridge-master/create-bridge-master.component';
import { EditBridgeMasterComponent } from './edit-bridge-master/edit-bridge-master.component';
import { BridgeReportsComponent } from './bridge-reports/bridge-reports.component';
import { AckRequestComponent } from './ack-request/ack-request.component';
import { DocUserAccessComponent } from './doc-user-access/doc-user-access.component';
import { DocRepositoryComponent } from './doc-repository/doc-repository.component';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';

import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxSelectBoxComponent,
  DxButtonModule,
  DxListModule,
  DxTemplateModule,
  DxFormModule,
  DxCheckBoxModule,
  DxNumberBoxModule,
  DxTextBoxModule,
  DxFileUploaderModule,
  DxDateBoxModule,
  DxTagBoxModule
 } from 'devextreme-angular';
import { DxoDataSourceModule } from 'devextreme-angular/ui/nested';
import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {TextFieldModule} from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    InventoryComponent,
    BridgeListComponent,
    CreateBridgeComponent,
    BridgeDetailComponent,
    UpdateBridgeComponent,
    BridgeMasterComponent,
    CreateBridgeMasterComponent,
    EditBridgeMasterComponent,
    BridgeReportsComponent,
    AckRequestComponent,
    DocUserAccessComponent,
    DocRepositoryComponent,
   
 
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedMaterialModule,MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule,   DxTreeViewModule,
    DxDropDownBoxModule,DxDataGridModule,DxTemplateModule,
    DxListModule,
    DxButtonModule,DxSelectBoxModule,DxFormModule,DxoDataSourceModule,
    BrowserModule,BrowserTransferStateModule,
    MatFormFieldModule, MatChipsModule, MatIconModule,
    DxCheckBoxModule,
   DxFileUploaderModule,
    DxNumberBoxModule,
    DxFormModule,
   DxTextBoxModule,
   DxSelectBoxModule,
   NgxDocViewerModule,
   TextFieldModule,
   DxDateBoxModule,
   MatDatepickerModule 
   ,DxTagBoxModule
  ]
})
export class InventoryModule { }
