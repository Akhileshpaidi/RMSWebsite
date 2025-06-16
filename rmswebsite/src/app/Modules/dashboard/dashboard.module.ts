import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { routes } from './dashboard-routing.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { FooterComponent } from './footer/footer.component';
import { OnboardModule } from '../onboard/onboard.module';
import { LogoutComponent } from '../onboard/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPassDialogComponent } from './reset-pass-dialog/reset-pass-dialog.component';
import { InventoryModule } from '../inventory/inventory.module';
import { ReviewComplianceTasksComponent } from './review-compliance-tasks/review-compliance-tasks.component';
import { ApproveComplianceTasksComponent } from './approve-compliance-tasks/approve-compliance-tasks.component';
import { AduitComplianceTasksComponent } from './aduit-compliance-tasks/aduit-compliance-tasks.component';
import { SupadminUnitLocationTypeComponent } from './supadmin-unit-location-type/supadmin-unit-location-type.component';
import { SupadminBusinessSectorListComponent } from './supadmin-business-sector-list/supadmin-business-sector-list.component';
import { SupadminIndustryTypeListComponent } from './supadmin-industry-type-list/supadmin-industry-type-list.component';
import { SupadminRegionMasterComponent } from './supadmin-region-master/supadmin-region-master.component';
import { SupadminFrequencyMasterComponent } from './supadmin-frequency-master/supadmin-frequency-master.component';
import { SupadminHolidayMasterComponent } from './supadmin-holiday-master/supadmin-holiday-master.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFileUploaderModule, DxTextAreaModule,
  DxDropDownButtonModule ,
  DxDropDownBoxModule ,DxNumberBoxModule,
  DxListModule,DxSelectBoxModule, DxPopupModule, 
  DxCheckBoxModule, DxLookupModule, DxSchedulerModule,DxPivotGridModule,    
  DxDateBoxModule,
  DxRangeSliderModule,
  DxSliderModule} from 'devextreme-angular';
import { RisksupadminTypeofriskComponent } from './risksupadmin-typeofrisk/risksupadmin-typeofrisk.component';
import { RisksupadminRiskClassificationComponent } from './risksupadmin-risk-classification/risksupadmin-risk-classification.component';
import { RisksupadminRiskImpactRatingComponent } from './risksupadmin-risk-impact-rating/risksupadmin-risk-impact-rating.component';

import { RiskBusinessProcessComponent } from './risk-business-process/risk-business-process.component';
import { RiskBusinessSubProcessl1Component } from './risk-business-sub-processl1/risk-business-sub-processl1.component';
import { RiskBusinessSubProcessl2Component } from './risk-business-sub-processl2/risk-business-sub-processl2.component';
import { RiskBusinessSubProcessl3Component } from './risk-business-sub-processl3/risk-business-sub-processl3.component';
import { DxColorBoxModule } from 'devextreme-angular';
import { RequestToRemediateComponent } from './e-compliance-dashboard/request-to-remediate/request-to-remediate.component';
import { ApproveToRemediateComponent } from './remediate-compliance-task/approve-to-remediate/approve-to-remediate.component';
import { UpdateMappingComplianceComponent } from './update-mapping-compliance/update-mapping-compliance.component';
import { ReviewUpdatedComplianceComponent } from './review-compliance-tasks/review-updated-compliance/review-updated-compliance.component';
import { EditUpdationComplianceComponent } from './review-compliance-tasks/review-updated-compliance/edit-updation-compliance/edit-updation-compliance.component';
import { ReviewReviewerComplianceComponent } from './approve-compliance-tasks/review-reviewer-compliance/review-reviewer-compliance.component';
import { EditReviewerComplianceComponent } from './approve-compliance-tasks/review-reviewer-compliance/edit-reviewer-compliance/edit-reviewer-compliance.component';
import { AuditApproveComplianceComponent } from './aduit-compliance-tasks/audit-approve-compliance/audit-approve-compliance.component';
import { MatSelectModule } from '@angular/material/select';

  
@NgModule({
  declarations: [
   // HomeComponent,
    DashboardComponent,
    FooterComponent,
    LogoutComponent,
    ProfileComponent,
    ResetPassDialogComponent,
    RisksupadminTypeofriskComponent,
    RisksupadminRiskClassificationComponent,
    RisksupadminRiskImpactRatingComponent,
    
    RiskBusinessProcessComponent,
    RiskBusinessSubProcessl1Component,
    RiskBusinessSubProcessl2Component,
    RiskBusinessSubProcessl3Component,
    RequestToRemediateComponent,
    ApproveToRemediateComponent,
    UpdateMappingComplianceComponent,
    ReviewUpdatedComplianceComponent,
    EditUpdationComplianceComponent,
    ReviewReviewerComplianceComponent,
    EditReviewerComplianceComponent,
    AuditApproveComplianceComponent,

    
    
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    InventoryModule,
    UserModule,
    RoleModule,
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
    DxRangeSliderModule,
    DxSliderModule,
    DxColorBoxModule,
    MatSelectModule
  ],
})
export class DashboardModule {
  routes = routes;
}
