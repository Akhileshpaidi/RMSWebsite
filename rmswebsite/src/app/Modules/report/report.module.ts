import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from '../report/report.component';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';
import { RouterModule } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { RemedyBankComponent } from './remedy-bank/remedy-bank.component';
import { CrateRemedyComponent } from './crate-remedy/crate-remedy.component';
import { ImportRemedyComponent } from './import-remedy/import-remedy.component';
import { UpdateReportComponent } from './update-report/update-report.component';
import { RemoveUserAccessComponent } from './remove-user-access/remove-user-access.component';

import { DxDataGridModule, DxDateBoxModule, DxFormModule, DxSelectBoxModule, DxTreeViewModule } from 'devextreme-angular';
import { DxFileUploaderModule, DxTextAreaModule,DxDropDownButtonModule ,DxDropDownBoxModule ,DxNumberBoxModule,DxListModule  } from 'devextreme-angular';
//import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { BrowserModule } from '@angular/platform-browser';
import { ViewUserAccessDocumentComponent } from './view-user-access-document/view-user-access-document.component';

@NgModule({
  declarations: [
    ReportComponent,
    InspectionReportComponent,
    ReportListComponent,
    RemedyBankComponent,
    CrateRemedyComponent,
    ImportRemedyComponent,
    UpdateReportComponent,
    RemoveUserAccessComponent,
    ViewUserAccessDocumentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    DxDataGridModule,
    DxSelectBoxModule,
    
    DxButtonModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxDropDownButtonModule ,
    DxDropDownBoxModule ,
    DxNumberBoxModule ,
    DxListModule,
  
   DxTreeViewModule,
   DxFormModule,
   BrowserModule,
   DxDateBoxModule
  ],
  providers: [ReportComponent],
  exports: [ReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ReportModule { }
