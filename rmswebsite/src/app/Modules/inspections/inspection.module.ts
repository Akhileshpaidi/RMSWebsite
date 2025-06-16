import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionComponent } from './inspection.component';

import { CreateInspectionComponent } from './Admin/create-inspection/create-inspection.component';
import { AssignInspectionComponent } from './Admin/assign-inspection/assign-inspection.component';
import { SelfInspectionComponent } from './Inspector/self-inspection/self-inspection.component';
import { ReviewInspectionComponent } from './Reviewer/review-inspection/review-inspection.component';
import { UnregisterInspectionComponent } from './Inspector/unregister-inspection/unregister-inspection.component';
import { InspectorInspectionListComponent } from './Inspector/inspector-inspection-list/inspector-inspection-list.component';
import { ReviewerInspectionListComponent } from './Reviewer/reviewer-inspection-list/reviewer-inspection-list.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { QuestionBankComponent } from './Admin/question-bank/question-bank.component';
import { AddQuestionComponent } from './Admin/add-question/add-question.component';
import { ImportSectionComponent } from './Admin/import-section/import-section.component';
import { ImportQuestionsComponent } from './Admin/import-questions/import-questions.component';
import { StratInspectionComponent } from './Inspector/strat-inspection/strat-inspection.component';
import { AssignedInspectionListComponent } from './Admin/assigned-inspection-list/assigned-inspection-list.component';
import { UpdateInspectionComponent } from './Admin/update-inspection/update-inspection.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AssignAuthorityComponent } from './Admin/assign-authority/assign-authority.component';
import { AuthorityNameComponent } from './Admin/authority-name/authority-name.component';
import { NatureOfDocumentComponent } from './Admin/nature-of-document/nature-of-document.component';
import { PubDocListComponent } from './pub-doc-list/pub-doc-list.component';
import { PubNewDocComponent } from './pub-new-doc/pub-new-doc.component';
import { PubNewVerComponent } from './pub-new-ver/pub-new-ver.component';
import { ViewPubDocComponent } from './view-pub-doc/view-pub-doc.component';
import { UpdatePubDocComponent } from './update-pub-doc/update-pub-doc.component';
import { DisablePubDocComponent } from './disable-pub-doc/disable-pub-doc.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDateBoxModule, DxFormModule, DxListModule, DxNumberBoxModule, DxPopoverModule, DxSelectBoxModule, DxSliderModule, DxTagBoxModule, DxTextAreaModule } from 'devextreme-angular';


import {
  DxDropDownBoxModule,
  DxTreeViewModule,
 
  DxSelectBoxComponent,
 
 } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { DocRevPeriodStatusComponent } from './doc-rev-period-status/doc-rev-period-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentReviewDisableComponent } from './document-review-disable/document-review-disable.component';
import { DocumentReviewUpdateComponent } from './document-review-update/document-review-update.component';
import { DocumentReviewVersionChangeComponent } from './document-review-version-change/document-review-version-change.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DefaultNotifierComponent } from './default-notifier/default-notifier.component';
// import dxTagBox from 'devextreme/ui/tag_box';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';


@NgModule({
  declarations: [
    InspectionComponent,
  
    CreateInspectionComponent,
    AssignInspectionComponent,
    SelfInspectionComponent,
    ReviewInspectionComponent,
    UnregisterInspectionComponent,
    InspectorInspectionListComponent,
    ReviewerInspectionListComponent,
    QuestionBankComponent,
    AddQuestionComponent,
    ImportSectionComponent,
    ImportQuestionsComponent,
    StratInspectionComponent,
    AssignedInspectionListComponent,
    UpdateInspectionComponent,
    AssignAuthorityComponent,
    AuthorityNameComponent,
    NatureOfDocumentComponent,
    PubDocListComponent,
    PubNewDocComponent,
    PubNewVerComponent,
    ViewPubDocComponent,
    UpdatePubDocComponent,
    DisablePubDocComponent,
  
    DocRevPeriodStatusComponent,
    DocumentReviewDisableComponent,
    DocumentReviewUpdateComponent,
    DocumentReviewVersionChangeComponent,
    DefaultNotifierComponent,
    
   
  ],
  imports: [CommonModule, InspectionRoutingModule, SharedMaterialModule, NgImageSliderModule,
    DxDataGridModule,
    DxButtonModule,DxSelectBoxModule,DxTreeViewModule,
    DxDropDownBoxModule, 
    DxListModule,
    DxFormModule,
   BrowserModule,DxDateBoxModule,
   DxNumberBoxModule,ReactiveFormsModule,DxTextAreaModule,
   NgxDocViewerModule,DxTagBoxModule,DxPopoverModule,DxSliderModule
    
  ],
})
export class InspectionModule {}
