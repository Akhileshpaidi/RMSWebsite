import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardModule } from './Modules/dashboard/dashboard.module';
import { LayoutComponent } from './Common/layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { OnboardModule } from './Modules/onboard/onboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './Modules/user/user.module';
import { UserRoutingModule } from './Modules/user/user-routing.module';
import { RoleModule } from './Modules/role/role.module';
import { RoleRoutingModule } from './Modules/role/role-routing.module';
import { InspectionModule } from './Modules/inspections/inspection.module';
import { InspectionRoutingModule } from './Modules/inspections/inspection-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedMaterialModule } from './shared/shared-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './Common/Loader/network.interceptor';
import { InventoryModule } from './Modules/inventory/inventory.module';
import { InventoryRoutingModule } from './Modules/inventory/inventory-routing.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { ToasterComponent } from './Common/toaster/toaster.component';
import { DaidailogeComponent } from './Common/daidailoge/daidailoge.component';
import { ReportModule } from './Modules/report/report.module';
import { ProjectModule } from './Modules/project/project.module';
import { ProjectRoutingModule } from './Modules/project/project-routing.module';
import { ManufacturerModule } from './Modules/manufacturer/manufacturer.module';
import { ProductModule } from './Modules/product/product.module';
import { ScoreIndicatorComponent } from './Modules/GovernanceAssessment/score-indicator/score-indicator.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';


import { CompetencySkillLevelComponent } from './Modules/GovernanceAssessment/competency-skill-level/competency-skill-level.component';
import { KeyImprovementIndicatorsComponent } from './Modules/GovernanceAssessment/key-improvement-indicators/key-improvement-indicators.component';
import { GovernanceQuestionBankComponent } from './Modules/governance-question-bank/governance-question-bank.component';
import { AddQuestionsComponent } from './Modules/governance-question-bank/add-questions/add-questions.component';
import { EditQuestionsComponent } from './Modules/governance-question-bank/edit-questions/edit-questions.component';
import { DefineTypeComponent } from './Modules/GovernanceAssessment/define-type/define-type.component';
import { DisableQuestionComponent } from './Modules/governance-question-bank/disable-question/disable-question.component';
import { MyQuestionsComponent } from './Modules/governance-question-bank/my-questions/my-questions.component';
import { ReactivateQuestionsComponent } from './Modules/governance-question-bank/reactivate-questions/reactivate-questions.component';
import { QuestionBankReserveComponent } from './Modules/governance-question-bank/question-bank-reserve/question-bank-reserve.component';
import { AssessmentBuilderComponent } from './Modules/GovernanceAssessment/assessment-builder/assessment-builder.component';
import { CustomizedAssessmentComponent } from './Modules/GovernanceAssessment/customized-assessment/customized-assessment.component';
import { DefineSubjectComponent } from './Modules/governance-question-bank/define-subject/define-subject.component';
import { DefineTopicComponent } from './Modules/governance-question-bank/define-topic/define-topic.component';
import { MapAssessmentTemplateAccessComponent } from './Modules/map-assessment-template-access/map-assessment-template-access.component';
import { ProvideAccessComponent } from './Modules/map-assessment-template-access/provide-access/provide-access.component';
import { EditAccessComponent } from './Modules/map-assessment-template-access/edit-access/edit-access.component';
import { RemoveAccessComponent } from './Modules/map-assessment-template-access/remove-access/remove-access.component';
import { CheckLevelComponent } from './Modules/governance-question-bank/check-level/check-level.component';
import { EntityMasterComponent } from './Modules/master/entity-master/entity-master.component';
import { MasterComponent } from './Modules/master/master.component';
import { DepartmentMasterComponent } from './Modules/master/department-master/department-master.component';
import { UnitLocationMasterComponent } from './Modules/master/unit-location-master/unit-location-master.component';
import { InfoDialogComponent } from './Common/daidailoge/info-dialog/info-dialog.component';

// import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFileUploaderModule, DxTextAreaModule,
  DxDropDownButtonModule ,
  DxDropDownBoxModule ,DxNumberBoxModule,
  DxListModule,DxSelectBoxModule, DxPopupModule, 
  DxCheckBoxModule, DxLookupModule, DxSchedulerModule,DxPivotGridModule,    
  DxPopoverModule,
  DxSliderModule,
  DxColorBoxModule,
  DxRangeSliderModule,
  DxFormModule,
  DxToolbarModule,
  DxTextBoxModule,
  DxSwitchModule} from 'devextreme-angular';
import { UserLocationMappingComponent } from './Modules/master/user-location-mapping/user-location-mapping.component';
import { DxDateBoxModule } from 'devextreme-angular';
import { AdminConfigComponent } from './Modules/master/admin-config/admin-config.component';
import { ReactivatePubDocComponent } from './Modules/inspections/Admin/reactivate-pub-doc/reactivate-pub-doc.component';
// import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';
import { AssessmentGenerateComponent } from './Modules/GovernanceAssessment/assessment-generate/assessment-generate.component';
import { DxRadioGroupModule, DxTemplateModule } from 'devextreme-angular';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DocumentReviewStatusComponent } from './Modules/master/document-review-status/document-review-status.component';
import { UserManualReportingHeadComponent } from './Modules/user-manual-reporting-head/user-manual-reporting-head.component';
import { MonitoringCompliancesComponent } from './Modules/user-manual-reporting-head/monitoring-compliances/monitoring-compliances.component';
import { ReportWindowComponent } from './Modules/user-manual-reporting-head/report-window/report-window.component';
import { SectorMasterComponent } from './Modules/master/sector-master/sector-master.component';
import { SubSectorMasterComponent } from './Modules/master/sub-sector-master/sub-sector-master.component';
import { UnitMasterComponent } from './Modules/master/unit-master/unit-master.component';
import { ContactUsChangeRequestFormComponent } from './Modules/user-manual-reporting-head/contact-us-change-request-form/contact-us-change-request-form.component';
import { ViewContactDetailsComponent } from './Modules/user-manual-reporting-head/view-contact-details/view-contact-details.component';
import { ChangeRequestFormComponent } from './Modules/user-manual-reporting-head/change-request-form/change-request-form.component';
import { UnitTypeMasterComponent } from './Modules/master/unit-type-master/unit-type-master.component';
import { ApplyPipe} from './Modules/schedule-assessment-internal/repeat-frequency/repeat-frequency.component';
import { TypeOfComplianceMasterComponent } from './Modules/master/type-of-compliance-master/type-of-compliance-master.component';
import { RegionMasterComponent } from './Modules/master/region-master/region-master.component';
import { SubRegionMasterComponent } from './Modules/master/sub-region-master/sub-region-master.component';
import { NatureOfLawComponent } from './Modules/master/nature-of-law/nature-of-law.component';
import { RiskCategoryComponent } from './Modules/master/risk-category/risk-category.component';
import { GroupOfCompanyComponent } from './Modules/master/group-of-company/group-of-company.component';
import { GroupTypeComponent } from './Modules/master/group-type/group-type.component';
import { UserManualLegalHeadComponent } from './Modules/user-manual-legal-head/user-manual-legal-head.component';
import { LegalHeadMonitoringCompliancesComponent } from './Modules/user-manual-legal-head/legal-head-monitoring-compliances/legal-head-monitoring-compliances.component';
import { GenerationOfEcomplianceCertificateComponent } from './Modules/user-manual-legal-head/generation-of-ecompliance-certificate/generation-of-ecompliance-certificate.component';
import { DxoPopupModule } from 'devextreme-angular/ui/nested';
import { AssessmentTemplateLibraryComponent } from './Modules/assessment-template-library/assessment-template-library.component';
import { UpdateAssessmentTemplateComponent } from './Modules/assessment-template-library/update-assessment-template/update-assessment-template.component';
import { DisableAssessmentTemplateComponent } from './Modules/assessment-template-library/disable-assessment-template/disable-assessment-template.component';
import { ReactiveAssessmentTemplateComponent } from './Modules/assessment-template-library/reactive-assessment-template/reactive-assessment-template.component';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { MyTasksComponent } from './Modules/GGT_Governance/my-tasks/my-tasks.component';
import { MonitoredTasksComponent } from './Modules/GGT_Governance/monitored-tasks/monitored-tasks.component';
import { RaiseQueriesComponent } from './Modules/GGT_Governance/raise-queries/raise-queries.component';
import { TrackStatusComponent } from './Modules/GGT_Governance/track-status/track-status.component';
import { ViewQueryComponent } from './Modules/GGT_Governance/view-query/view-query.component';
import { HelpDeskComponent } from './Modules/GGT_Governance/help-desk/help-desk.component';
import { ViewAssessmentTemplateComponent } from './Modules/assessment-template-library/view-assessment-template/view-assessment-template.component';
import { TaskMasterComponent } from './Modules/inspections/task-master/task-master.component';
import { InspectionListComponent } from './Modules/inspections/Admin/inspection-list/inspection-list.component';
import { AssessmentResultComponent } from './Modules/assessment-result/assessment-result.component';
import { MyAssessmentComponent } from './Modules/assessment-result/my-assessment/my-assessment.component';
import { ScheduledAssessmentsComponent } from './Modules/assessment-result/scheduled-assessments/scheduled-assessments.component';
import { MonitoredAssessmentsComponent } from './Modules/assessment-result/monitored-assessments/monitored-assessments.component';
import { AddUserRoleComponent } from './Modules/master/add-user-role/add-user-role.component';
import { ScheduleAssessmentInternalComponent } from './Modules/schedule-assessment-internal/schedule-assessment-internal.component';
import { RepeatFrequencyComponent } from './Modules/schedule-assessment-internal/repeat-frequency/repeat-frequency.component';
import { OneTimeFrequencyComponent } from './Modules/schedule-assessment-internal/one-time-frequency/one-time-frequency.component';
import { CreateNewQuestionsComponent } from './Modules/assessment-template-library/create-new-questions/create-new-questions.component';
import { AddNewUserComponent } from './Modules/schedule-assessment-internal/add-new-user/add-new-user.component';
import { BulkUploadQuestionsComponent } from './Modules/governance-question-bank/bulk-upload-questions/bulk-upload-questions.component';
import { BeginassessmentscheduleComponent } from './Modules/ScheduleAssessment/beginassessmentschedule/beginassessmentschedule.component';
import { ManagemyassessementComponent } from './Modules/ScheduleAssessment/managemyassessement/managemyassessement.component';
import { MonitoredassessementsComponent } from './Modules/ScheduleAssessment/monitoredassessements/monitoredassessements.component';
import { ConfirmmessageComponent } from './Modules/ScheduleAssessment/confirmmessage/confirmmessage.component';
import { DefinesubtypeComponent } from './Modules/master/definesubtype/definesubtype.component';
import { EntitytypemasterComponent } from './Modules/master/entitytypemaster/entitytypemaster.component';
import { OneTimeFrequencyExternalComponent } from './Modules/schedule-assessment-internal/one-time-frequency-external/one-time-frequency-external.component';
import { OneTimeFrequencySelfComponent } from './Modules/schedule-assessment-internal/one-time-frequency-self/one-time-frequency-self.component';
import { UpdatetpiuserComponent } from './Modules/schedule-assessment-internal/updatetpiuser/updatetpiuser.component';
import { ViewtpiuserComponent } from './Modules/schedule-assessment-internal/viewtpiuser/viewtpiuser.component';
import { CreatetpauserComponent } from './Modules/schedule-assessment-internal/createtpauser/createtpauser.component';
import { TPAEntityComponent } from './Modules/master/tpaentity/tpaentity.component';
import { SelfRepeatFrequencyComponent } from './Modules/schedule-assessment-internal/self-repeat-frequency/self-repeat-frequency.component';
import { InitiateExternalAssessmentComponent } from './Modules/schedule-assessment-internal/initiate-external-assessment/initiate-external-assessment.component';
import { MonitoredAssessmentsMitigationComponent } from './Modules/mitigation-controls/monitored-assessments-mitigation/monitored-assessments-mitigation.component';
import { ScheduledAssessmentsMitigationComponent } from './Modules/mitigation-controls/scheduled-assessments-mitigation/scheduled-assessments-mitigation.component';
import { MyAssessmentsMitigationComponent } from './Modules/mitigation-controls/my-assessments-mitigation/my-assessments-mitigation.component';
import { MitigationControlsComponent } from './Modules/mitigation-controls/mitigation-controls.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AcknowledgeMonitoredAssessMitigationComponent } from './Modules/mitigation-controls/acknowledge-monitored-assess-mitigation/acknowledge-monitored-assess-mitigation.component';
import { MyMitigationTasksComponent } from './Modules/mitigation-controls/my-mitigation-tasks/my-mitigation-tasks.component';

import { UpdateMitigationActionComponent } from './Modules/mitigation-controls/update-mitigation-action/update-mitigation-action.component';
import { ViewActionTakenMitigationComponent } from './Modules/mitigation-controls/view-action-taken-mitigation/view-action-taken-mitigation.component';
import { IndusteryTypeListComponent } from './Modules/master/industery-type-list/industery-type-list.component';
import { BusinesssectorlistComponent } from './Modules/master/businesssectorlist/businesssectorlist.component';
import { CommonEntityAttributesComponent } from './Modules/common-entity-attributes/common-entity-attributes.component';
import { FrequencyMasterComponent } from './Modules/common-entity-attributes/frequency-master/frequency-master.component';
import { HolidaymasterComponent } from './Modules/common-entity-attributes/holidaymaster/holidaymaster.component';
import { CommoncomplianceattributesComponent } from './Modules/common-compliance-attributes/common-compliance-attributes.component';
import { CategoryOfLawComponent } from './Modules/common-compliance-attributes/category-of-law/category-of-law.component';
import { RegulatoryAuthorityComponent } from './Modules/common-compliance-attributes/regulatory-authority/regulatory-authority.component';
import { ComplianceRiskClassificationComponent } from './Modules/common-compliance-attributes/compliance-risk-classification/compliance-risk-classification.component';
import { PenalityCategoryComponent } from './Modules/common-compliance-attributes/penality-category/penality-category.component';
import { ComplianceNotifiedStatusComponent } from './Modules/common-compliance-attributes/compliance-notified-status/compliance-notified-status.component';
import { ComplianceRiskClassificationCriteriaComponent } from './Modules/common-compliance-attributes/compliance-risk-classification-criteria/compliance-risk-classification-criteria.component';
import { ComplianceRecordTypeComponent } from './Modules/common-compliance-attributes/compliance-record-type/compliance-record-type.component';
import { ComplianceGroupComponent } from './Modules/common-compliance-attributes/compliance-group/compliance-group.component';
import { JurisdictionCategoryListComponent } from './Modules/common-compliance-attributes/jurisdiction-category-list/jurisdiction-category-list.component';
import { jurisdictionlocationlist } from './Modules/common-compliance-attributes/jurisdiction-location-list/jurisdiction-location-list.component';
import { RegulatoryUniverseComponent } from './Modules/Act/regulatory-universe/regulatory-universe.component';
import { ActRegulatorMasterComponent } from './Modules/Act/regulatory-universe/act-regulator-master/act-regulator-master.component';
import { AddRulesRegulationsProcedureComponent } from './Modules/Act/add-rules-regulations-procedure/add-rules-regulations-procedure.component';
import { StatutoryFormsRecordsComponent } from './Modules/Act/statutory-forms-records/statutory-forms-records.component';
import { CompliancePenaltyMasterComponent } from './Modules/Act/compliance-penalty-master/compliance-penalty-master.component';
import { ComplainceDepartmentMappingComponent } from './Modules/complaince-department-mapping/complaince-department-mapping.component';
import { CreateComplainceDepartmentMappingComponent } from './Modules/complaince-department-mapping/create-complaince-department-mapping/create-complaince-department-mapping.component';
import { CompanyComplainceContentLibraryComponent } from './Modules/company-complaince-content-library/company-complaince-content-library.component';
import { CreateComplainceContentComponent } from './Modules/company-complaince-content-library/create-complaince-content/create-complaince-content.component';
import { GlobalComplianceContentLibraryComponent } from './Modules/global-compliance-content-library/global-compliance-content-library.component';
import { CreateGlobalComplianceMasterComponent } from './Modules/global-compliance-content-library/create-global-compliance-master/create-global-compliance-master.component';
import { ActivityWorkgroupCreationComponent } from './Modules/activity-workgroup-creation/activity-workgroup-creation.component';
import { CreateActivityWorkgroupComponent } from './Modules/activity-workgroup-creation/create-activity-workgroup/create-activity-workgroup.component';
import { ManagementinputsComponent } from './Modules/mitigation-controls/managementinputs/managementinputs.component';
import { EComplianceDashboardComponent } from './Modules/dashboard/e-compliance-dashboard/e-compliance-dashboard.component';
import { RemediateComplianceTaskComponent } from './Modules/dashboard/remediate-compliance-task/remediate-compliance-task.component';
import { ReviewComplianceTasksComponent } from './Modules/dashboard/review-compliance-tasks/review-compliance-tasks.component';
import { AduitComplianceTasksComponent } from './Modules/dashboard/aduit-compliance-tasks/aduit-compliance-tasks.component';
import { ApproveComplianceTasksComponent } from './Modules/dashboard/approve-compliance-tasks/approve-compliance-tasks.component';
import { SupadminEntitytypeMasterComponent } from './Modules/dashboard/supadmin-entitytype-master/supadmin-entitytype-master.component';
import { SupadminUnitLocationTypeComponent } from './Modules/dashboard/supadmin-unit-location-type/supadmin-unit-location-type.component';
import { SupadminBusinessSectorListComponent } from './Modules/dashboard/supadmin-business-sector-list/supadmin-business-sector-list.component';
import { SupadminIndustryTypeListComponent } from './Modules/dashboard/supadmin-industry-type-list/supadmin-industry-type-list.component';
import { SupadminSubRegionMasterComponent } from './Modules/dashboard/supadmin-sub-region-master/supadmin-sub-region-master.component';
import { SupadminRegionMasterComponent } from './Modules/dashboard/supadmin-region-master/supadmin-region-master.component';
import { CompliancePeriodComponent } from './Modules/common-compliance-attributes/compliance-period/compliance-period.component';
import { UserWorkgroupMappingComponent } from './Modules/user-workgroup-mapping/user-workgroup-mapping.component';
import { CreateUserWorkgroupMappingComponent } from './Modules/user-workgroup-mapping/create-user-workgroup-mapping/create-user-workgroup-mapping.component';
import { SupadminFrequencyMasterComponent } from './Modules/dashboard/supadmin-frequency-master/supadmin-frequency-master.component';
import { SupadminHolidayMasterComponent } from './Modules/dashboard/supadmin-holiday-master/supadmin-holiday-master.component';
import { CreateLocationComplaintMappingComponent } from './Modules/create-location-complaint-mapping/create-location-complaint-mapping.component';
import { UsersListOfQuestionsComponent } from './Modules/mitigation-controls/users-list-of-questions/users-list-of-questions.component';
import { SupadminNatureOfLawComponent } from './supadmin-nature-of-law/supadmin-nature-of-law.component';
import { SupadminCategoryOfLawComponent } from './supadmin-category-of-law/supadmin-category-of-law.component';
import { SupadminJurisdictionCategoryListComponent } from './supadmin-jurisdiction-category-list/supadmin-jurisdiction-category-list.component';
import { SupadminComplianceTypeComponent } from './supadmin-compliance-type/supadmin-compliance-type.component';
import { SupadminComplianceRecordTypeComponent } from './supadmin-compliance-record-type/supadmin-compliance-record-type.component';
import { SupadminRegulatoryAuthorityComponent } from './supadmin-regulatory-authority/supadmin-regulatory-authority.component';
import { SupadminComplianceRiskClassificationComponent } from './supadmin-compliance-risk-classification/supadmin-compliance-risk-classification.component';
import { SupadminPenaltyCategoryComponent } from './supadmin-penalty-category/supadmin-penalty-category.component';
import { SupadminComplianceNotifiedStatusComponent } from './supadmin-compliance-notified-status/supadmin-compliance-notified-status.component';
import { UpdateUserWorkgroupMappingComponent } from './Modules/user-workgroup-mapping/update-user-workgroup-mapping/update-user-workgroup-mapping.component';
import { CreateComplianceUserMappingComponent } from './Modules/create-compliance-user-mapping/create-compliance-user-mapping.component';
import { AssessmentReportingComponent } from './Modules/mitigation-controls/assessment-reporting/assessment-reporting.component';
import { UpdateComplianceDepartmentMappingComponent } from './Modules/complaince-department-mapping/update-compliance-department-mapping/update-compliance-department-mapping.component';
import { SupadminComplianceGroupComponent } from './supadmin-compliance-group/supadmin-compliance-group.component';
import { UpdateActivityWorkgroupComponent } from './Modules/activity-workgroup-creation/update-activity-workgroup/update-activity-workgroup.component';
import { RuleRepositoryComponent } from './Modules/Act/Bare-Act/rule-repository/rule-repository.component';
import { SupadminJurisdictionLocationComponent } from './supadmin-jurisdiction-location/supadmin-jurisdiction-location.component';
import { SupadminComplianceRiskCriteriaComponent } from './supadmin-compliance-risk-criteria/supadmin-compliance-risk-criteria.component';
import { SupadminCompliancePeriodComponent } from './supadmin-compliance-period/supadmin-compliance-period.component';
import { ViewActRegulatoryComponent } from './Modules/Act/regulatory-universe/view-act-regulatory/view-act-regulatory.component';
import { ViewActRuleRegulationComponent } from './Modules/Act/view-act-rule-regulation/view-act-rule-regulation.component';
import { DataImportedComponent } from './Modules/Act/data-imported/data-imported.component';
import { ImportComplianceControllerMasterComponent } from './Modules/Act/import-compliance-controller-master/import-compliance-controller-master.component';
import { ViewStatutoryFromsRecordsComponent } from './Modules/Act/view-statutory-froms-records/view-statutory-froms-records.component';
import { ViewCompliancePenaltyMasterComponent } from './Modules/Act/view-compliance-penalty-master/view-compliance-penalty-master.component';
import { ManagementMonitoredAssessmentComponent } from './Modules/mitigation-controls/management-monitored-assessment/management-monitored-assessment.component';
import { SupadminActRegulatorMasterComponent } from './supadmin-act-regulator-master/supadmin-act-regulator-master.component';
import { SupadminViewActregulatorComponent } from './supadmin-view-actregulator/supadmin-view-actregulator.component';
import { SupadminAddrulesRegulationsComponent } from './supadmin-addrules-regulations/supadmin-addrules-regulations.component';
import { SupadminViewActrulesRegulationsComponent } from './supadmin-view-actrules-regulations/supadmin-view-actrules-regulations.component';
import { SupadminBareActRuleRepositoryComponent } from './supadmin-bare-act-rule-repository/supadmin-bare-act-rule-repository.component';
import { SupadminStatutoryFormsComponent } from './supadmin-statutory-forms/supadmin-statutory-forms.component';
import { SupadminViewstatutoryformsComponent } from './supadmin-viewstatutoryforms/supadmin-viewstatutoryforms.component';
import { SupadminAddcompliancepenaltyComponent } from './supadmin-addcompliancepenalty/supadmin-addcompliancepenalty.component';
import { SupadminViewcompliancepenaltyComponent } from './supadmin-viewcompliancepenalty/supadmin-viewcompliancepenalty.component';
import { ViewCreateLocationCompliantMappingComponent } from './Modules/create-location-complaint-mapping/view-create-location-compliant-mapping/view-create-location-compliant-mapping.component';
import { AddnewquestionsComponent } from './Modules/GovernanceAssessment/addnewquestions/addnewquestions.component';
import { UpdateLocationComplaintMappingComponent } from './Modules/create-location-complaint-mapping/update-location-complaint-mapping/update-location-complaint-mapping.component';
import { AppSpecificConfigurationSettingsComponent } from './Modules/app-specific-configuration-settings/app-specific-configuration-settings.component';
import { EntityhierarchylevelsetupComponent } from './Modules/common-entity-attributes/entityhierarchylevelsetup/entityhierarchylevelsetup.component';
import { EditActRegulatoryComponent } from './Modules/Act/regulatory-universe/edit-act-regulatory/edit-act-regulatory.component';
import { GCTreportsComponent } from './Modules/gctreports/gctreports.component';
import { PublishedDocListComponent } from './Modules/gctreports/published-doc-list/published-doc-list.component';
import { GCAreportsComponent } from './Modules/gcareports/gcareports.component';
import { AssessTempListComponent } from './Modules/gcareports/assess-temp-list/assess-temp-list.component';
import { ViewGlobalComplianceComponent } from './Modules/global-compliance-content-library/create-global-compliance-master/view-global-compliance/view-global-compliance.component';
import { AssessDisabledTempListComponent } from './Modules/gcareports/assess-disabled-temp-list/assess-disabled-temp-list.component';
import { AssessTempAccessMappingComponent } from './Modules/gcareports/assess-temp-access-mapping/assess-temp-access-mapping.component';
import { ReviewStatusSettingsComponent } from './Modules/review-status-settings/review-status-settings.component';
import { EditActRuleRegulationComponent } from './Modules/Act/view-act-rule-regulation/edit-act-rule-regulation/edit-act-rule-regulation.component';
import { EditStatutoryFormsRecordComponent } from './Modules/Act/view-statutory-froms-records/edit-statutory-forms-record/edit-statutory-forms-record.component';
import { EditCompliancePenaltyComponent } from './Modules/Act/view-compliance-penalty-master/edit-compliance-penalty/edit-compliance-penalty.component';
import { CreateAlertsRemindersComponent } from './Modules/create-alerts-reminders/create-alerts-reminders.component';
import { AckreqassessmentComponent } from './Modules/gcareports/ackreqassessment/ackreqassessment.component';
import { ScheduledassessmentstatuslistComponent } from './Modules/gcareports/scheduledassessmentstatuslist/scheduledassessmentstatuslist.component';
import { ScheduledasslistwithstatusComponent } from './Modules/gcareports/scheduledasslistwithstatus/scheduledasslistwithstatus.component';
import { AddMoreorSubmitComplianceComponent } from './Common/toaster/add-moreor-submit-compliance/add-moreor-submit-compliance.component';
import { AssesscompletedwithresultComponent } from './Modules/gcareports/assesscompletedwithresult/assesscompletedwithresult.component';
import { AssessresulttaskownerComponent } from './Modules/gcareports/assessresulttaskowner/assessresulttaskowner.component';
import { DiscardeddraftlistComponent } from './Modules/gctreports/discardeddraftlist/discardeddraftlist.component';
import { DocumentdraftsavedlistComponent } from './Modules/gctreports/documentdraftsavedlist/documentdraftsavedlist.component';
import { DocumentversoninglistComponent } from './Modules/gctreports/documentversoninglist/documentversoninglist.component';
import { DisableddocumentslistComponent } from './Modules/gctreports/disableddocumentslist/disableddocumentslist.component';
import { PublisheddocreviewstatusComponent } from './Modules/gctreports/publisheddocreviewstatus/publisheddocreviewstatus.component';
import { GlobalComplianceDailogeboxComponent } from './Common/daidailoge/global-compliance-dailogebox/global-compliance-dailogebox.component';
import { ViewCompanyComplianceComponent } from './Modules/company-complaince-content-library/view-company-compliance/view-company-compliance.component';
import { AckRequestedDocListComponent } from './Modules/gctreports/ack-requested-doc-list/ack-requested-doc-list.component';
import { SuperadminEditActregulatoryComponent } from './supadmin-view-actregulator/superadmin-edit-actregulatory/superadmin-edit-actregulatory.component';
import { SuperadminEditRuleregulationComponent } from './supadmin-view-actrules-regulations/superadmin-edit-ruleregulation/superadmin-edit-ruleregulation.component';
import { DocAccessStatusListComponent } from './Modules/gctreports/doc-access-status-list/doc-access-status-list.component';
import { DocAccessMappingStatusListComponent } from './Modules/gctreports/doc-access-mapping-status-list/doc-access-mapping-status-list.component';
import { PubDocRepositoryComponent } from './Modules/gctreports/pub-doc-repository/pub-doc-repository.component';
import { SupAdminEditStatutoryfromsComponent } from './supadmin-viewstatutoryforms/sup-admin-edit-statutoryfroms/sup-admin-edit-statutoryfroms.component';
import { SupAdminEditCompliancepenaltyComponent } from './supadmin-viewcompliancepenalty/sup-admin-edit-compliancepenalty/sup-admin-edit-compliancepenalty.component';
import { AssessPerfIndicatorsAnalysisComponent } from './Modules/gcareports/assess-perf-indicators-analysis/assess-perf-indicators-analysis.component';
import { MitigationActionPlanComponent } from './Modules/gcareports/mitigation-action-plan/mitigation-action-plan.component';
import { QuestionBankReserveListingComponent } from './Modules/gcareports/question-bank-reserve-listing/question-bank-reserve-listing.component';
import { MyQuestionBankListingComponent } from './Modules/gcareports/my-question-bank-listing/my-question-bank-listing.component';
import { TpaUserPassResetComponentComponent } from './Modules/schedule-assessment-internal/tpa-user-pass-reset-component/tpa-user-pass-reset-component.component';
import { DxDataGridModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import { CreateOtherCommonSettingsComponent } from './Modules/Act/create-other-common-settings/create-other-common-settings.component';
import { AddDocDailogeComponent } from './Common/daidailoge/add-doc-dailoge/add-doc-dailoge.component';
import { RiskPriorityComponent } from './Modules/Risk_Components/risk-priority/risk-priority.component';
import { PotentialBusinessImpactComponent } from './Modules/Risk_Components/potential-business-impact/potential-business-impact.component';
import { LossEventThreatCategoryL1Component } from './Modules/Risk_Components/loss-event-threat-category-l1/loss-event-threat-category-l1.component';
import { LossEventThreatCategoryL2Component } from './Modules/Risk_Components/loss-event-threat-category-l2/loss-event-threat-category-l2.component';
import { LossEventThreatCategoryL3Component } from './Modules/Risk_Components/loss-event-threat-category-l3/loss-event-threat-category-l3.component';
import { RiskLikelihoodOfOccFactorComponent } from './Modules/Risk_Components/risk-likelihood-of-occ-factor/risk-likelihood-of-occ-factor.component';
import { RiskCategorizationComponent } from './Modules/Risk_Components/risk-categorization/risk-categorization.component';
import { RiskCauseListComponent } from './Modules/Risk_Components/risk-cause-list/risk-cause-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RiskBusinessFunctionMappingComponent } from './risk-business-function-mapping/risk-business-function-mapping.component';
import { UpdateRiskBusinessFunctionMappingComponent } from './risk-business-function-mapping/update-risk-business-function-mapping/update-risk-business-function-mapping.component';
import { ControlLevelComponent } from './Modules/Risk Control Matrix Attributes/control-level/control-level.component';
import { FrequencyOfControlAppliedComponent } from './Modules/Risk Control Matrix Attributes/frequency-of-control-applied/frequency-of-control-applied.component';
import { ControlDependenciesComponent } from './Modules/Risk Control Matrix Attributes/control-dependencies/control-dependencies.component';
import { NatureOfControlOccurrenceComponent } from './Modules/Risk Control Matrix Attributes/nature-of-control-occurrence/nature-of-control-occurrence.component';
import { NatureOfControlPerformanceComponent } from './Modules/Risk Control Matrix Attributes/nature-of-control-performance/nature-of-control-performance.component';
import { RiskControlEffectiveRatingComponent } from './Modules/Risk Control Matrix Attributes/risk-control-effective-rating/risk-control-effective-rating.component';
import { RiskKeyFocusAresComponent } from './risk-key-focus-ares/risk-key-focus-ares.component';
import { ControlRiskOfAssessmentComponent } from './Modules/Risk_Components/control-risk-of-assessment/control-risk-of-assessment.component';
import { ResidualRiskRatingComponent } from './Modules/Risk_Components/residual-risk-rating/residual-risk-rating.component';
import { ControlMeasureComponent } from './Modules/Risk_Components/control-measure/control-measure.component';
import { ControlActivityTypeComponent } from './Modules/Risk_Components/control-activity-type/control-activity-type.component';
import { ControlReferenceTypeComponent } from './Modules/Risk_Components/control-reference-type/control-reference-type.component';
import { RiskCreateriskDocumentComponent } from './risk-createrisk-document/risk-createrisk-document.component';
import { RiskSetOverallRiskAppetiteComponent } from './Modules/risk-set-overall-risk-appetite/risk-set-overall-risk-appetite.component';
import { RiskLossEventTrackerComponent } from './risk-loss-event-tracker/risk-loss-event-tracker.component';
import { RiskAssessmentTempleteTypeComponent } from './risk-assessment-templete-type/risk-assessment-templete-type.component';
import { RiskAssessmentTempleteSubtypeComponent } from './risk-assessment-templete-subtype/risk-assessment-templete-subtype.component';
import { MitigationActionRequiredComponent } from './Modules/Risk_Components/mitigation-action-required/mitigation-action-required.component';
import { ActionPriorityListComponent } from './Modules/Risk_Components/action-priority-list/action-priority-list.component';
import { RiskUpdateKeyFocusAreaComponent } from './risk-key-focus-ares/risk-update-key-focus-area/risk-update-key-focus-area.component';
import { InherentRiskRatingLevelComponent } from './Modules/Risk_Components/inherent-risk-rating-level/inherent-risk-rating-level.component';
import { RiskIntensityComponent } from './Modules/Risk_Components/risk-intensity/risk-intensity.component';
import { RiskUpdateOverallRiskAppetiteComponent } from './Modules/risk-set-overall-risk-appetite/risk-update-overall-risk-appetite/risk-update-overall-risk-appetite.component';
import { BpMaturityRatingScaleComponent } from './Modules/Risk_Components/bp-maturity-rating-scale/bp-maturity-rating-scale.component';
import { ControlHierarchySettingComponent } from './Modules/Risk_Components/control-hierarchy-setting/control-hierarchy-setting.component';
import { ControlAssessmentTestAttrComponent } from './Modules/Risk_Components/control-assessment-test-attr/control-assessment-test-attr.component';
import { InitialAssessmentImpactFactComponent } from './Modules/Risk_Components/initial-assessment-impact-fact/initial-assessment-impact-fact.component';
import { RiskMitigDecisionListComponent } from './Modules/Risk_Components/risk-mitig-decision-list/risk-mitig-decision-list.component';
import { AssControlAcceptCriteComponent } from './Modules/Risk_Components/ass-control-accept-crite/ass-control-accept-crite.component';
import { ContrTestParaReleCatgComponent } from './Modules/Risk_Components/contr-test-para-rele-catg/contr-test-para-rele-catg.component';
import { UpdateriskLossEventTrackerComponent } from './risk-loss-event-tracker/updaterisk-loss-event-tracker/updaterisk-loss-event-tracker.component';
import { RiskQuestionBankAttributeKeyAreComponent } from './Modules/risk-question-bank-attribute-key-are/risk-question-bank-attribute-key-are.component';
import { RiskQuestionbankSubKeyAreaComponent } from './Modules/risk-question-bank-attribute-key-are/risk-questionbank-sub-key-area/risk-questionbank-sub-key-area.component';
import { RiskCommonAssessmentTemplateRulesComponent } from './Modules/risk-common-assessment-template-rules/risk-common-assessment-template-rules.component';
import { RiskAdminTypeofRiskComponent } from './Modules/riskAdminAttributes/risk-admin-typeof-risk/risk-admin-typeof-risk.component';
import { RiskAdminRiskClassificationComponent } from './Modules/riskAdminAttributes/risk-admin-risk-classification/risk-admin-risk-classification.component';
import { RiskAdminRiskImpactRatingComponent } from './Modules/riskAdminAttributes/risk-admin-risk-impact-rating/risk-admin-risk-impact-rating.component';
import { RiskAdminRiskLikeOfOccuFactorComponent } from './Modules/riskAdminAttributes/risk-admin-risk-like-of-occu-factor/risk-admin-risk-like-of-occu-factor.component';
import { RiskAdminRiskCategorizationComponent } from './Modules/riskAdminAttributes/risk-admin-risk-categorization/risk-admin-risk-categorization.component';
import { RiskAdminRiskCauseListComponent } from './Modules/riskAdminAttributes/risk-admin-risk-cause-list/risk-admin-risk-cause-list.component';
import { RiskAdminRiskPriorityComponent } from './Modules/riskAdminAttributes/risk-admin-risk-priority/risk-admin-risk-priority.component';
import { RiskAdminPotenBussinImpactComponent } from './Modules/riskAdminAttributes/risk-admin-poten-bussin-impact/risk-admin-poten-bussin-impact.component';
import { RiskAdminLossEvntThrCatgComponent } from './Modules/riskAdminAttributes/risk-admin-loss-evnt-thr-catg/risk-admin-loss-evnt-thr-catg.component';
import { RiskAdminLossEvntThrCatg2Component } from './Modules/riskAdminAttributes/risk-admin-loss-evnt-thr-catg2/risk-admin-loss-evnt-thr-catg2.component';
import { RiskAdminLossEvntThrCatg3Component } from './Modules/riskAdminAttributes/risk-admin-loss-evnt-thr-catg3/risk-admin-loss-evnt-thr-catg3.component';
import { RiskAdminRiskAppetiteComponent } from './Modules/riskAdminAttributes/risk-admin-risk-appetite/risk-admin-risk-appetite.component';
import { RiskAdminRiskToleranceComponent } from './Modules/riskAdminAttributes/risk-admin-risk-tolerance/risk-admin-risk-tolerance.component';
import { RiskAdminInherentRiskRatingLevelComponent } from './Modules/riskAdminAttributes/risk-admin-inherent-risk-rating-level/risk-admin-inherent-risk-rating-level.component';
import { RiskAdminRiskIntensityComponent } from './Modules/riskAdminAttributes/risk-admin-risk-intensity/risk-admin-risk-intensity.component';

import { RiskStatementComponent } from './risk-createrisk-document/risk-statement/risk-statement.component';
import { RiskTreatmentDecisionMatrixComponent } from './Modules/Risk_Components/risk-treatment-decision-matrix/risk-treatment-decision-matrix.component';
import { ControlTestDecisionListComponent } from './Modules/Risk_Components/control-test-decision-list/control-test-decision-list.component';
import { RiskTreatmentDecisionListComponent } from './Modules/Risk_Components/risk-treatment-decision-list/risk-treatment-decision-list.component';
import { RiskSamplingStandardsComponent } from './Modules/risk-common-assessment-template-rules/risk-sampling-standards/risk-sampling-standards.component';
import { ViewriskstatementComponent } from './risk-createrisk-document/risk-statement/viewriskstatement/viewriskstatement.component';
import { EditriskstatementComponent } from './risk-createrisk-document/risk-statement/editriskstatement/editriskstatement.component';
import { ViewlistriskstatementComponent } from './risk-createrisk-document/risk-statement/viewlistriskstatement/viewlistriskstatement.component';
import { RiskAdminNatContPerfComponent } from './Modules/riskAdminAttributes/risk-admin-nat-cont-perf/risk-admin-nat-cont-perf.component';
import { RiskAdminNatContOccurComponent } from './Modules/riskAdminAttributes/risk-admin-nat-cont-occur/risk-admin-nat-cont-occur.component';
import { RiskAdminContLevComponent } from './Modules/riskAdminAttributes/risk-admin-cont-lev/risk-admin-cont-lev.component';
import { RiskAdminFreqcontAppComponent } from './Modules/riskAdminAttributes/risk-admin-freqcont-app/risk-admin-freqcont-app.component';
import { RiskAdminContDependComponent } from './Modules/riskAdminAttributes/risk-admin-cont-depend/risk-admin-cont-depend.component';
import { RiskAdminRiskCOnteffRatComponent } from './Modules/riskAdminAttributes/risk-admin-risk-conteff-rat/risk-admin-risk-conteff-rat.component';
import { RiskAdminContRiskAssComponent } from './Modules/riskAdminAttributes/risk-admin-cont-risk-ass/risk-admin-cont-risk-ass.component';
import { RiskAdminResiduRiskRatComponent } from './Modules/riskAdminAttributes/risk-admin-residu-risk-rat/risk-admin-residu-risk-rat.component';
import { RiskAdminContMeasureComponent } from './Modules/riskAdminAttributes/risk-admin-cont-measure/risk-admin-cont-measure.component';
import { RiskAdminIntercontrcomponComponent } from './Modules/riskAdminAttributes/risk-admin-intercontrcompon/risk-admin-intercontrcompon.component';
import { RiskAdminInterContPrincipleComponent } from './Modules/riskAdminAttributes/risk-admin-inter-cont-principle/risk-admin-inter-cont-principle.component';
import { RiskAdminContActivityTypeComponent } from './Modules/riskAdminAttributes/risk-admin-cont-activity-type/risk-admin-cont-activity-type.component';
import { RiskAdminContActNatureComponent } from './Modules/riskAdminAttributes/risk-admin-cont-act-nature/risk-admin-cont-act-nature.component';
import { RiskAdminContrActvSubNatureComponent } from './Modules/riskAdminAttributes/risk-admin-contr-actv-sub-nature/risk-admin-contr-actv-sub-nature.component';
import { RiskAdminContAsserCheckComponent } from './Modules/riskAdminAttributes/risk-admin-cont-asser-check/risk-admin-cont-asser-check.component';
import { RiskAdminContrRefeTypeComponent } from './Modules/riskAdminAttributes/risk-admin-contr-refe-type/risk-admin-contr-refe-type.component';
import { RiskAdminContrAccepBechMarkComponent } from './Modules/riskAdminAttributes/risk-admin-contr-accep-bech-mark/risk-admin-contr-accep-bech-mark.component';
import { DeleteriskstatementComponent } from './risk-createrisk-document/risk-statement/deleteriskstatement/deleteriskstatement.component';
import { ReactivateriskstatementComponent } from './Modules/master/reactivateriskstatement/reactivateriskstatement.component';
import { RiskAdminBpMaturRatScaleComponent } from './Modules/riskAdminAttributes/risk-admin-bp-matur-rat-scale/risk-admin-bp-matur-rat-scale.component';
import { RiskAdminContrHierSettComponent } from './Modules/riskAdminAttributes/risk-admin-contr-hier-sett/risk-admin-contr-hier-sett.component';
import { RiskAdminContrasstestattComponent } from './Modules/riskAdminAttributes/risk-admin-contrasstestatt/risk-admin-contrasstestatt.component';
import { RiskAdminInitiaAssImpactRatComponent } from './Modules/riskAdminAttributes/risk-admin-initia-ass-impact-rat/risk-admin-initia-ass-impact-rat.component';
import { RiskAdminRiskMitDesListComponent } from './Modules/riskAdminAttributes/risk-admin-risk-mit-des-list/risk-admin-risk-mit-des-list.component';
import { RiskAdminAsseContrAcctCriComponent } from './Modules/riskAdminAttributes/risk-admin-asse-contr-acct-cri/risk-admin-asse-contr-acct-cri.component';
import { RiskAdminRiskTrDeciListComponent } from './Modules/riskAdminAttributes/risk-admin-risk-tr-deci-list/risk-admin-risk-tr-deci-list.component';
import { RiskAdminRisktrDeciMatrComponent } from './Modules/riskAdminAttributes/risk-admin-risktr-deci-matr/risk-admin-risktr-deci-matr.component';
import { RiskAdminMitActReqComponent } from './Modules/riskAdminAttributes/risk-admin-mit-act-req/risk-admin-mit-act-req.component';
import { RiskAdminActionPrioListComponent } from './Modules/riskAdminAttributes/risk-admin-action-prio-list/risk-admin-action-prio-list.component';
import { DocumentConfidentialityComponent } from './Modules/document-confidentiality/document-confidentiality.component';
import { HomeComponent } from './Modules/dashboard/home/home.component';
import { CircleCardComponent } from './circle-card/circle-card.component';
import { DxPieChartModule,DxChartModule }  from 'devextreme-angular';
import { RisksuperadmineventfrequencyComponent } from './Modules/Risk_Components/risksuperadmineventfrequency/risksuperadmineventfrequency.component';
import { RisksuperadminactivityfrequencyComponent } from './Modules/Risk_Components/risksuperadminactivityfrequency/risksuperadminactivityfrequency.component';
import { RisksuperadmincontrolcomponentComponent } from './Modules/Risk_Components/risksuperadmincontrolcomponent/risksuperadmincontrolcomponent.component';
import { RisksuperadmincontrolmonitoringmechanismComponent } from './Modules/Risk_Components/risksuperadmincontrolmonitoringmechanism/risksuperadmincontrolmonitoringmechanism.component';
import { RiskadmineventfrequencyComponent } from './Modules/riskAdminAttributes/riskadmineventfrequency/riskadmineventfrequency.component';
import { RiskadminactivityfrequencyComponent } from './Modules/riskAdminAttributes/riskadminactivityfrequency/riskadminactivityfrequency.component';
import { RiskadmincontrolcomponentComponent } from './Modules/riskAdminAttributes/riskadmincontrolcomponent/riskadmincontrolcomponent.component';
import { RiskadmincontrolmonitoringmechanismComponent } from './Modules/riskAdminAttributes/riskadmincontrolmonitoringmechanism/riskadmincontrolmonitoringmechanism.component';
import { RiskDefaultNotifiersComponent } from './risk-default-notifiers/risk-default-notifiers.component';
import { ViewCommonAssesmentRulesComponent } from './Modules/risk-common-assessment-template-rules/view-common-assesment-rules/view-common-assesment-rules.component';
import { RiskEditsamplingstandardsComponent } from './Modules/risk-common-assessment-template-rules/risk-editsamplingstandards/risk-editsamplingstandards.component';
import { RiskRegisterDailogeComponent } from './Common/daidailoge/risk-register-dailoge/risk-register-dailoge.component';
import { RiskDailogeboxComponent } from './Common/daidailoge/risk-dailogebox/risk-dailogebox.component';
import { RiskpromptedDailogeboxComponent } from './Common/daidailoge/riskprompted-dailogebox/riskprompted-dailogebox.component';
import { ViewRiskRegisterComponent } from './risk-createrisk-document/view-risk-register/view-risk-register.component';
import { CreatecontrolstatementComponent } from './Modules/createcontrolstatement/createcontrolstatement.component';
import { CreateControlDocumentComponent } from './Modules/create-control-document/create-control-document.component';
import { ViewListRiskStatementComponent } from './Modules/Risk_Components/view-list-risk-statement/view-list-risk-statement.component';
import { ViewControlStatementComponent } from './Modules/view-control-statement/view-control-statement.component';
import { EditControlStatementComponent } from './Modules/edit-control-statement/edit-control-statement.component';
import { ViewRiskMatrixComponent } from './Modules/view-risk-matrix/view-risk-matrix.component';
import { ViewControlMatrixComponent } from './Modules/view-control-matrix/view-control-matrix.component';
import { EditRiskRegisterComponent } from './Modules/Risk_Components/edit-risk-register/edit-risk-register.component';
import { ViewProvideAccessComponent } from './Modules/map-assessment-template-access/view-provide-access/view-provide-access.component';
import { ManagementDashboardComponent } from './Modules/dashboard/management-dashboard/management-dashboard.component';
import { TaskownerDashboardComponent } from './Modules/dashboard/taskowner-dashboard/taskowner-dashboard.component';
import { DxCircularGaugeModule } from 'devextreme-angular';
import { NotificationCenterComponent } from './Modules/NotificationCenter/notification-center/notification-center.component';
import { ReviewQueryStatusComponent } from './Modules/GGT_Governance/review-query-status/review-query-status.component';
import { ViewReviewQueryStatusComponent } from './Modules/GGT_Governance/view-review-query-status/view-review-query-status.component';
import { GovernanceHomepageComponent } from './Modules/dashboard/governance-homepage/governance-homepage.component';
import { CrcMitigationActionPlanComponent } from './Modules/gcareports/crc-mitigation-action-plan/crc-mitigation-action-plan.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, ToasterComponent, DaidailogeComponent, AddMoreorSubmitComplianceComponent, BulkUploadQuestionsComponent
,ScoreIndicatorComponent, CompetencySkillLevelComponent, KeyImprovementIndicatorsComponent, GovernanceQuestionBankComponent, AddQuestionsComponent, EditQuestionsComponent, DefineTypeComponent, DisableQuestionComponent, MyQuestionsComponent,TaskMasterComponent,InspectionListComponent, ReactivateQuestionsComponent, QuestionBankReserveComponent, AssessmentBuilderComponent, CustomizedAssessmentComponent, DefineSubjectComponent, DefineTopicComponent, MapAssessmentTemplateAccessComponent, ProvideAccessComponent, EditAccessComponent, RemoveAccessComponent,CheckLevelComponent, MasterComponent, DepartmentMasterComponent, UnitLocationMasterComponent, UserLocationMappingComponent, AdminConfigComponent,ReactivatePubDocComponent ,AssessmentGenerateComponent, DocumentReviewStatusComponent, EntityMasterComponent,SectorMasterComponent, SubSectorMasterComponent, UnitMasterComponent, UserManualReportingHeadComponent, MonitoringCompliancesComponent, ReportWindowComponent, ContactUsChangeRequestFormComponent, ViewContactDetailsComponent, ChangeRequestFormComponent,UnitTypeMasterComponent,TypeOfComplianceMasterComponent, RegionMasterComponent, SubRegionMasterComponent, NatureOfLawComponent, RiskCategoryComponent, GroupOfCompanyComponent, GroupTypeComponent,UserManualLegalHeadComponent,LegalHeadMonitoringCompliancesComponent,GenerationOfEcomplianceCertificateComponent,  AssessmentTemplateLibraryComponent,ViewAssessmentTemplateComponent, UpdateAssessmentTemplateComponent, DisableAssessmentTemplateComponent, ReactiveAssessmentTemplateComponent, OtpDialogComponent, MyTasksComponent, MonitoredTasksComponent, RaiseQueriesComponent, TrackStatusComponent, HelpDeskComponent, AssessmentResultComponent, MyAssessmentComponent, ScheduledAssessmentsComponent, MonitoredAssessmentsComponent, AddUserRoleComponent, ScheduleAssessmentInternalComponent, RepeatFrequencyComponent, OneTimeFrequencyComponent, CreateNewQuestionsComponent  ,ApplyPipe, AddNewUserComponent,BeginassessmentscheduleComponent,ManagemyassessementComponent, MonitoredassessementsComponent, ConfirmmessageComponent, DefinesubtypeComponent, EntitytypemasterComponent,MyAssessmentComponent,OneTimeFrequencyExternalComponent, OneTimeFrequencySelfComponent, UpdatetpiuserComponent, ViewtpiuserComponent,CreatetpauserComponent, TPAEntityComponent,SelfRepeatFrequencyComponent, InitiateExternalAssessmentComponent, MitigationControlsComponent, MyAssessmentsMitigationComponent, ScheduledAssessmentsMitigationComponent, 
MonitoredAssessmentsMitigationComponent, AcknowledgeMonitoredAssessMitigationComponent, MyMitigationTasksComponent, UpdateMitigationActionComponent,ViewActionTakenMitigationComponent, IndusteryTypeListComponent, BusinesssectorlistComponent, CommonEntityAttributesComponent, FrequencyMasterComponent, HolidaymasterComponent,CommoncomplianceattributesComponent, CategoryOfLawComponent, jurisdictionlocationlist, RegulatoryAuthorityComponent, ComplianceRiskClassificationComponent, PenalityCategoryComponent, ComplianceNotifiedStatusComponent, ComplianceRiskClassificationCriteriaComponent, ComplianceRecordTypeComponent, ComplianceGroupComponent,JurisdictionCategoryListComponent, RegulatoryUniverseComponent, ActRegulatorMasterComponent, AddRulesRegulationsProcedureComponent, StatutoryFormsRecordsComponent, CompliancePenaltyMasterComponent, ComplainceDepartmentMappingComponent, CreateComplainceDepartmentMappingComponent, CompanyComplainceContentLibraryComponent, CreateComplainceContentComponent, GlobalComplianceContentLibraryComponent, CreateGlobalComplianceMasterComponent, ActivityWorkgroupCreationComponent, CreateActivityWorkgroupComponent, ManagementinputsComponent,
EComplianceDashboardComponent, RemediateComplianceTaskComponent,RiskStatementComponent,
ReviewComplianceTasksComponent,    ApproveComplianceTasksComponent,InfoDialogComponent,
AduitComplianceTasksComponent,SupadminEntitytypeMasterComponent,SupadminUnitLocationTypeComponent,
SupadminBusinessSectorListComponent,SupadminIndustryTypeListComponent,
SupadminRegionMasterComponent,SupadminSubRegionMasterComponent,CompliancePeriodComponent, UserWorkgroupMappingComponent, CreateUserWorkgroupMappingComponent
,SupadminFrequencyMasterComponent,
SupadminHolidayMasterComponent,
CreateLocationComplaintMappingComponent,
UsersListOfQuestionsComponent,
SupadminNatureOfLawComponent,
SupadminCategoryOfLawComponent,
SupadminJurisdictionCategoryListComponent,
SupadminComplianceTypeComponent,
SupadminComplianceRecordTypeComponent,
SupadminRegulatoryAuthorityComponent,
SupadminComplianceRiskClassificationComponent,
SupadminPenaltyCategoryComponent,
SupadminComplianceNotifiedStatusComponent,
UpdateUserWorkgroupMappingComponent,
CreateComplianceUserMappingComponent,
AssessmentReportingComponent,
UpdateComplianceDepartmentMappingComponent,
SupadminComplianceGroupComponent,
UpdateActivityWorkgroupComponent,
RuleRepositoryComponent,
SupadminJurisdictionLocationComponent,
SupadminComplianceRiskCriteriaComponent,
SupadminCompliancePeriodComponent,
ViewActRegulatoryComponent,
ViewActRuleRegulationComponent,
DataImportedComponent,
ImportComplianceControllerMasterComponent,
ViewStatutoryFromsRecordsComponent,
ViewCompliancePenaltyMasterComponent,
ManagementMonitoredAssessmentComponent,
SupadminActRegulatorMasterComponent,
SupadminViewActregulatorComponent,
SupadminAddrulesRegulationsComponent,
SupadminViewActrulesRegulationsComponent,
SupadminBareActRuleRepositoryComponent,
SupadminStatutoryFormsComponent,
SupadminViewstatutoryformsComponent,
SupadminAddcompliancepenaltyComponent,
SupadminViewcompliancepenaltyComponent,
ViewCreateLocationCompliantMappingComponent,
AddnewquestionsComponent,
UpdateLocationComplaintMappingComponent,
AppSpecificConfigurationSettingsComponent,
EntityhierarchylevelsetupComponent,
EditActRegulatoryComponent,
GCTreportsComponent,
PublishedDocListComponent,
GCAreportsComponent,
AssessTempListComponent,
ViewGlobalComplianceComponent,
AssessDisabledTempListComponent,
AssessTempAccessMappingComponent,
ReviewStatusSettingsComponent,
EditActRuleRegulationComponent,
EditStatutoryFormsRecordComponent,
EditCompliancePenaltyComponent,
CreateAlertsRemindersComponent,
AckreqassessmentComponent,
ScheduledassessmentstatuslistComponent,
ScheduledasslistwithstatusComponent,
AssesscompletedwithresultComponent,
AssessresulttaskownerComponent,
DiscardeddraftlistComponent,
DocumentdraftsavedlistComponent,
DocumentversoninglistComponent,
DisableddocumentslistComponent,
PublisheddocreviewstatusComponent,
GlobalComplianceDailogeboxComponent,
ViewCompanyComplianceComponent,
AckRequestedDocListComponent,
SuperadminEditActregulatoryComponent,
SuperadminEditRuleregulationComponent,
DocAccessStatusListComponent,
DocAccessMappingStatusListComponent,
PubDocRepositoryComponent,
SupAdminEditStatutoryfromsComponent,
SupAdminEditCompliancepenaltyComponent,
AssessPerfIndicatorsAnalysisComponent,
MitigationActionPlanComponent,
QuestionBankReserveListingComponent,
MyQuestionBankListingComponent,
TpaUserPassResetComponentComponent,
CreateOtherCommonSettingsComponent,
AddDocDailogeComponent,
RiskPriorityComponent,
PotentialBusinessImpactComponent,
LossEventThreatCategoryL1Component,
LossEventThreatCategoryL2Component,
LossEventThreatCategoryL3Component,
RiskLikelihoodOfOccFactorComponent,
RiskCategorizationComponent,
RiskCauseListComponent,
RiskBusinessFunctionMappingComponent,
UpdateRiskBusinessFunctionMappingComponent,
NatureOfControlOccurrenceComponent,
ControlLevelComponent,
FrequencyOfControlAppliedComponent,
ControlDependenciesComponent,
NatureOfControlPerformanceComponent,
RiskControlEffectiveRatingComponent,
RiskKeyFocusAresComponent,
ControlRiskOfAssessmentComponent,
ResidualRiskRatingComponent,
ControlMeasureComponent,
ControlActivityTypeComponent,
ControlReferenceTypeComponent,
RiskSetOverallRiskAppetiteComponent,
RiskCreateriskDocumentComponent,
RiskLossEventTrackerComponent,
RiskAssessmentTempleteTypeComponent,
RiskAssessmentTempleteSubtypeComponent,
MitigationActionRequiredComponent,
ActionPriorityListComponent,
RiskUpdateKeyFocusAreaComponent,
InherentRiskRatingLevelComponent,
RiskIntensityComponent,
RiskUpdateOverallRiskAppetiteComponent,
BpMaturityRatingScaleComponent,
ControlHierarchySettingComponent,
ControlAssessmentTestAttrComponent,
InitialAssessmentImpactFactComponent,
RiskMitigDecisionListComponent,
AssControlAcceptCriteComponent,
ContrTestParaReleCatgComponent,
UpdateriskLossEventTrackerComponent,
RiskQuestionBankAttributeKeyAreComponent,
RiskQuestionbankSubKeyAreaComponent,
RiskCommonAssessmentTemplateRulesComponent,
RiskAdminTypeofRiskComponent,
RiskAdminRiskClassificationComponent,
RiskAdminRiskImpactRatingComponent,
RiskAdminRiskLikeOfOccuFactorComponent,
RiskAdminRiskCategorizationComponent,
RiskAdminRiskCauseListComponent,
RiskAdminRiskPriorityComponent,
RiskAdminPotenBussinImpactComponent,
RiskAdminLossEvntThrCatgComponent,
RiskAdminLossEvntThrCatg2Component,
RiskAdminLossEvntThrCatg3Component,
RiskAdminRiskAppetiteComponent,
RiskAdminRiskToleranceComponent,
RiskAdminInherentRiskRatingLevelComponent,
RiskAdminRiskIntensityComponent,

RiskStatementComponent,
  RiskTreatmentDecisionListComponent,
  RiskTreatmentDecisionMatrixComponent,
  ControlTestDecisionListComponent,
  RiskSamplingStandardsComponent,
  ViewriskstatementComponent,
  EditriskstatementComponent,
  ViewlistriskstatementComponent,
  RiskAdminNatContPerfComponent,
  RiskAdminNatContOccurComponent,
  RiskAdminContLevComponent,
  RiskAdminFreqcontAppComponent,
  RiskAdminContDependComponent,
  RiskAdminRiskCOnteffRatComponent,
  RiskAdminContRiskAssComponent,
  RiskAdminResiduRiskRatComponent,
  RiskAdminContMeasureComponent,
  RiskAdminIntercontrcomponComponent,
  RiskAdminInterContPrincipleComponent,
  RiskAdminContActivityTypeComponent,
  RiskAdminContActNatureComponent,
  RiskAdminContrActvSubNatureComponent,
  RiskAdminContAsserCheckComponent,
  RiskAdminContrRefeTypeComponent,
  RiskAdminContrAccepBechMarkComponent,
  DeleteriskstatementComponent,
  ReactivateriskstatementComponent,
  RiskAdminBpMaturRatScaleComponent,
  RiskAdminContrHierSettComponent,
  RiskAdminContrasstestattComponent,
  RiskAdminInitiaAssImpactRatComponent,
  RiskAdminRiskMitDesListComponent,
  RiskAdminAsseContrAcctCriComponent,
  RiskAdminRiskTrDeciListComponent,
  RiskAdminRisktrDeciMatrComponent,
  RiskAdminMitActReqComponent,
  RiskAdminActionPrioListComponent,
  DocumentConfidentialityComponent,
  ViewCommonAssesmentRulesComponent,
  CircleCardComponent,
   HomeComponent,
   RisksuperadmineventfrequencyComponent,
   RisksuperadminactivityfrequencyComponent,
   RisksuperadmincontrolcomponentComponent,
   RisksuperadmincontrolmonitoringmechanismComponent,
   RiskadmineventfrequencyComponent,
   RiskadminactivityfrequencyComponent,
   RiskadmincontrolcomponentComponent,
   RiskadmincontrolmonitoringmechanismComponent,
   RiskDefaultNotifiersComponent,
   RiskEditsamplingstandardsComponent,
   RiskRegisterDailogeComponent,
   RiskDailogeboxComponent,
   RiskpromptedDailogeboxComponent,
   ViewRiskRegisterComponent,
   CreatecontrolstatementComponent,
   CreateControlDocumentComponent,
   ViewListRiskStatementComponent,
   ViewControlStatementComponent,
   EditControlStatementComponent,
   ViewRiskMatrixComponent,
   ViewControlMatrixComponent,
   EditRiskRegisterComponent,
   ViewProvideAccessComponent,
   ManagementDashboardComponent,
   TaskownerDashboardComponent,
   NotificationCenterComponent,
   ViewQueryComponent,
   ReviewQueryStatusComponent,
   ViewReviewQueryStatusComponent,
   GovernanceHomepageComponent,
   CrcMitigationActionPlanComponent


],

  imports: [
    DxCircularGaugeModule,
    DxPieChartModule,
    DxChartModule,
    MatButtonToggleModule,
    DxPivotGridModule  ,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    //DashboardModule,
    DxSwitchModule,
    DxTextBoxModule,
    SharedModule,
    OnboardModule,
    BrowserAnimationsModule,
    InventoryModule,
    UserModule,
    UserRoutingModule,
    RoleModule,
    ProjectModule,
    ManufacturerModule,
    ProductModule,
    ProjectRoutingModule,
    RoleRoutingModule,
    InspectionModule,
    InspectionRoutingModule,
    SharedMaterialModule,
    InventoryRoutingModule, 
    NgImageSliderModule,
    ReportModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
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
    CommonModule,
    DxTagBoxModule,
    DxRadioGroupModule,
    MatRadioModule,
    MatFormFieldModule,
     MatInputModule, 
     TextFieldModule,
      MatButtonModule,DxoPopupModule,
      DxPopupModule,
      DxTemplateModule,
      BrowserTransferStateModule,
      DxSchedulerModule,
      DxCheckBoxModule,
      DxValidatorModule,
      DxCheckBoxModule,
      DxPopoverModule,
      DxSliderModule,
      DxColorBoxModule,
      MatSelectModule,
      MatSliderModule, 
      DxColorBoxModule,
      DxRangeSliderModule, DxFormModule,
      DxToolbarModule,
      
    
  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true,

  },DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
