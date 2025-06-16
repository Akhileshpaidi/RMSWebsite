import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/guards/auth.guard';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { HomeComponent } from './Modules/dashboard/home/home.component';
import { ForgotpasswordComponent } from './Modules/onboard/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Modules/onboard/login/login.component';
import { SignupComponent } from './Modules/onboard/signup/signup.component';
import { UserComponent } from './Modules/user/user.component';
import { UserListComponent } from './Modules/user/user-list/user-list.component';
import { CreateUserComponent } from './Modules/user/create-user/create-user.component';
import { UpdateUserComponent } from './Modules/user/update-user/update-user.component';
import { RoleComponent } from './Modules/role/role.component';
import { RoleListComponent } from './Modules/role/role-list/role-list.component';
import { CreateRoleComponent } from './Modules/role/create-role/create-role.component';
import { UpdateRoleComponent } from './Modules/role/update-role/update-role.component';
import { InspectionComponent } from './Modules/inspections/inspection.component';
import { InspectionListComponent } from './Modules/inspections/Admin/inspection-list/inspection-list.component';
import { CreateInspectionComponent } from './Modules/inspections/Admin/create-inspection/create-inspection.component';
import { AssignInspectionComponent } from './Modules/inspections/Admin/assign-inspection/assign-inspection.component';
import { SelfInspectionComponent } from './Modules/inspections/Inspector/self-inspection/self-inspection.component';
import { ReviewInspectionComponent } from './Modules/inspections/Reviewer/review-inspection/review-inspection.component';
import { UnregisterInspectionComponent } from './Modules/inspections/Inspector/unregister-inspection/unregister-inspection.component';
import { ReviewerInspectionListComponent } from './Modules/inspections/Reviewer/reviewer-inspection-list/reviewer-inspection-list.component';
import { InspectorInspectionListComponent } from './Modules/inspections/Inspector/inspector-inspection-list/inspector-inspection-list.component';
import { QuestionBankComponent } from './Modules/inspections/Admin/question-bank/question-bank.component';
import { AddQuestionComponent } from './Modules/inspections/Admin/add-question/add-question.component';
import { ImportQuestionsComponent } from './Modules/inspections/Admin/import-questions/import-questions.component';
import { ImportSectionComponent } from './Modules/inspections/Admin/import-section/import-section.component';
import { StratInspectionComponent } from './Modules/inspections/Inspector/strat-inspection/strat-inspection.component';
import { AssignedInspectionListComponent } from './Modules/inspections/Admin/assigned-inspection-list/assigned-inspection-list.component';
import { ProfileComponent } from './Modules/dashboard/profile/profile.component';
import { InventoryComponent } from './Modules/inventory/inventory.component';
import { BridgeListComponent } from './Modules/inventory/bridge-list/bridge-list.component';
import { CreateBridgeComponent } from './Modules/inventory/create-bridge/create-bridge.component';
import { UpdateInspectionComponent } from './Modules/inspections/Admin/update-inspection/update-inspection.component';
import { TermsConditionPageComponent } from './Modules/onboard/terms-condition-page/terms-condition-page.component';
import { BridgeMasterComponent } from './Modules/inventory/bridge-master/bridge-master.component';
import { CreateBridgeMasterComponent } from './Modules/inventory/create-bridge-master/create-bridge-master.component';
import { EditBridgeMasterComponent } from './Modules/inventory/edit-bridge-master/edit-bridge-master.component';
import { UpdateBridgeComponent } from './Modules/inventory/update-bridge/update-bridge.component';
import { BridgeReportsComponent } from './Modules/inventory/bridge-reports/bridge-reports.component';
import { ReportComponent } from './Modules/report/report.component';
import { InspectionReportComponent } from './Modules/report/inspection-report/inspection-report.component';
import { ReportListComponent } from './Modules/report/report-list/report-list.component';
import { RemedyBankComponent } from './Modules/report/remedy-bank/remedy-bank.component';
import { CrateRemedyComponent } from './Modules/report/crate-remedy/crate-remedy.component';
import { UpdateReportComponent } from './Modules/report/update-report/update-report.component';
import { ViewReportComponent } from './Modules/report/view-report/view-report/view-report.component';
import { ProjetComponent } from './Modules/project/project.component';
import { ProjectlistComponent } from './Modules/project/projectlist/projectlist.component';
import { CreateUpdateprojectComponent } from './Modules/project/create-update-project/create-update-project.component';
import { ManufacturerComponent } from './Modules/manufacturer/manufacturer.component';
import { ManufacturerListComponent } from './Modules/manufacturer/manufacturer-list/manufacturer-list.component';
import { CreateUpdateManufacturerComponent } from './Modules/manufacturer/create-update-manufacturer/create-update-manufacturer.component';
import { ProductListComponent } from './Modules/product/productList/product-list/product-list.component';
import { CareateUpdateProductComponent } from './Modules/product/createUpdateProduct/careate-update-product/careate-update-product.component';
import { AssignAuthorityComponent } from './Modules/inspections/Admin/assign-authority/assign-authority.component';
import { AuthorityNameComponent } from './Modules/inspections/Admin/authority-name/authority-name.component';
import { NatureOfDocumentComponent } from './Modules/inspections/Admin/nature-of-document/nature-of-document.component';
import { RemoveUserAccessComponent } from './Modules/report/remove-user-access/remove-user-access.component';
import { AckRequestComponent } from './Modules/inventory/ack-request/ack-request.component';
import { DocUserAccessComponent } from './Modules/inventory/doc-user-access/doc-user-access.component';
import { DocRepositoryComponent } from './Modules/inventory/doc-repository/doc-repository.component';
import { PubNewDocComponent } from './Modules/inspections/pub-new-doc/pub-new-doc.component';
import { PubNewVerComponent } from './Modules/inspections/pub-new-ver/pub-new-ver.component';
import { ViewPubDocComponent } from './Modules/inspections/view-pub-doc/view-pub-doc.component';
import { UpdatePubDocComponent } from './Modules/inspections/update-pub-doc/update-pub-doc.component';
import { DisablePubDocComponent } from './Modules/inspections/disable-pub-doc/disable-pub-doc.component';
import { ScoreIndicatorComponent } from './Modules/GovernanceAssessment/score-indicator/score-indicator.component';
import { CompetencySkillLevelComponent } from './Modules/GovernanceAssessment/competency-skill-level/competency-skill-level.component';
import { KeyImprovementIndicatorsComponent } from './Modules/GovernanceAssessment/key-improvement-indicators/key-improvement-indicators.component';
import { GovernanceAssessmentComponent } from './Modules/GovernanceAssessment/governance-assessment.component';
import { AppComponent } from './app.component';
import { TaskMasterComponent } from './Modules/inspections/task-master/task-master.component';
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
import { ProvideAccessComponent } from './Modules/map-assessment-template-access/provide-access/provide-access.component';
import { MapAssessmentTemplateAccessComponent } from './Modules/map-assessment-template-access/map-assessment-template-access.component';
import { EditAccessComponent } from './Modules/map-assessment-template-access/edit-access/edit-access.component';
import { RemoveAccessComponent } from './Modules/map-assessment-template-access/remove-access/remove-access.component';
import { CheckLevelComponent } from './Modules/governance-question-bank/check-level/check-level.component';
import { MasterComponent } from './Modules/master/master.component';
import { UnitLocationMasterComponent } from './Modules/master/unit-location-master/unit-location-master.component';
import { DepartmentMasterComponent } from './Modules/master/department-master/department-master.component';
import { UserLocationMappingComponent } from './Modules/master/user-location-mapping/user-location-mapping.component';
import { AdminConfigComponent } from './Modules/master/admin-config/admin-config.component';
import { DocRevPeriodStatusComponent } from './Modules/inspections/doc-rev-period-status/doc-rev-period-status.component';
import { ReactivatePubDocComponent } from './Modules/inspections/Admin/reactivate-pub-doc/reactivate-pub-doc.component';
import { AssessmentGenerateComponent } from './Modules/GovernanceAssessment/assessment-generate/assessment-generate.component';
import { DocumentReviewStatusComponent } from './Modules/master/document-review-status/document-review-status.component';
import { DocumentReviewDisableComponent } from './Modules/inspections/document-review-disable/document-review-disable.component';
import { DocumentReviewUpdateComponent } from './Modules/inspections/document-review-update/document-review-update.component';
import { DocumentReviewVersionChangeComponent } from './Modules/inspections/document-review-version-change/document-review-version-change.component';
import { EntityMasterComponent } from './Modules/master/entity-master/entity-master.component';
import { MonitoringCompliancesComponent } from './Modules/user-manual-reporting-head/monitoring-compliances/monitoring-compliances.component';
import { ReportWindowComponent } from './Modules/user-manual-reporting-head/report-window/report-window.component';
import { SectorMasterComponent } from './Modules/master/sector-master/sector-master.component';
import { SubSectorMasterComponent } from './Modules/master/sub-sector-master/sub-sector-master.component';
import { UnitMaster } from './inspectionservices.service';
import { UnitMasterComponent } from './Modules/master/unit-master/unit-master.component';
import { UnitTypeMasterComponent } from './Modules/master/unit-type-master/unit-type-master.component';
import { ContactUsChangeRequestFormComponent } from './Modules/user-manual-reporting-head/contact-us-change-request-form/contact-us-change-request-form.component';

import { TypeOfComplianceMasterComponent } from './Modules/master/type-of-compliance-master/type-of-compliance-master.component';
import { GroupOfCompanyComponent } from './Modules/master/group-of-company/group-of-company.component';
import { GroupTypeComponent } from './Modules/master/group-type/group-type.component';
import { NatureOfLawComponent } from './Modules/master/nature-of-law/nature-of-law.component';
import { RegionMasterComponent } from './Modules/master/region-master/region-master.component';
import { RiskCategoryComponent } from './Modules/master/risk-category/risk-category.component';
import { SubRegionMasterComponent } from './Modules/master/sub-region-master/sub-region-master.component';
import { LegalHeadMonitoringCompliancesComponent } from './Modules/user-manual-legal-head/legal-head-monitoring-compliances/legal-head-monitoring-compliances.component';
import { GenerationOfEcomplianceCertificateComponent } from './Modules/user-manual-legal-head/generation-of-ecompliance-certificate/generation-of-ecompliance-certificate.component';
import { ViewAssessmentTemplateComponent } from './Modules/assessment-template-library/view-assessment-template/view-assessment-template.component';
import { UpdateAssessmentTemplateComponent } from './Modules/assessment-template-library/update-assessment-template/update-assessment-template.component';
import { ReactiveAssessmentTemplateComponent } from './Modules/assessment-template-library/reactive-assessment-template/reactive-assessment-template.component';
import { DisableAssessmentTemplateComponent } from './Modules/assessment-template-library/disable-assessment-template/disable-assessment-template.component';
import { MyTasksComponent } from './Modules/GGT_Governance/my-tasks/my-tasks.component';
import { MonitoredTasksComponent } from './Modules/GGT_Governance/monitored-tasks/monitored-tasks.component';
import { RaiseQueriesComponent } from './Modules/GGT_Governance/raise-queries/raise-queries.component';
import { TrackStatusComponent } from './Modules/GGT_Governance/track-status/track-status.component';
import { ViewQueryComponent } from './Modules/GGT_Governance/view-query/view-query.component';
import { HelpDeskComponent } from './Modules/GGT_Governance/help-desk/help-desk.component';
import { MyAssessmentComponent } from './Modules/assessment-result/my-assessment/my-assessment.component';
import { ScheduledAssessmentsComponent } from './Modules/assessment-result/scheduled-assessments/scheduled-assessments.component';
import { MonitoredAssessmentsComponent } from './Modules/assessment-result/monitored-assessments/monitored-assessments.component';
import { AddUserRoleComponent } from './Modules/master/add-user-role/add-user-role.component';
import { RepeatFrequencyComponent } from './Modules/schedule-assessment-internal/repeat-frequency/repeat-frequency.component';
//import { OneTimeFrequencyComponent } from './Modules/schedule-assessment-internal/one-time-frequency/one-time-frequency.component';
import { CreateNewQuestionsComponent } from './Modules/assessment-template-library/create-new-questions/create-new-questions.component';
import { AddNewUserComponent } from './Modules/schedule-assessment-internal/add-new-user/add-new-user.component';
import { BulkUploadQuestionsComponent } from './Modules/governance-question-bank/bulk-upload-questions/bulk-upload-questions.component';
import { EntitytypemasterComponent } from './Modules/master/entitytypemaster/entitytypemaster.component';
import { DefinesubtypeComponent } from './Modules/master/definesubtype/definesubtype.component';
import { ManagemyassessementComponent } from './Modules/ScheduleAssessment/managemyassessement/managemyassessement.component';
import { BeginassessmentscheduleComponent } from './Modules/ScheduleAssessment/beginassessmentschedule/beginassessmentschedule.component';
//import { OneTimeFrequencySelfComponent } from './Modules/schedule-assessment-internal/one-time-frequency-self/one-time-frequency-self.component';
import { ViewtpiuserComponent } from './Modules/schedule-assessment-internal/viewtpiuser/viewtpiuser.component';
import { UpdatetpiuserComponent } from './Modules/schedule-assessment-internal/updatetpiuser/updatetpiuser.component';
import { CreatetpauserComponent } from './Modules/schedule-assessment-internal/createtpauser/createtpauser.component';
import { TPAEntityComponent } from './Modules/master/tpaentity/tpaentity.component';
import { SelfRepeatFrequencyComponent } from './Modules/schedule-assessment-internal/self-repeat-frequency/self-repeat-frequency.component';
import { InitiateExternalAssessmentComponent } from './Modules/schedule-assessment-internal/initiate-external-assessment/initiate-external-assessment.component';
import { MyAssessmentsMitigationComponent } from './Modules/mitigation-controls/my-assessments-mitigation/my-assessments-mitigation.component';
import { ScheduledAssessmentsMitigationComponent } from './Modules/mitigation-controls/scheduled-assessments-mitigation/scheduled-assessments-mitigation.component';
import { MonitoredAssessmentsMitigationComponent } from './Modules/mitigation-controls/monitored-assessments-mitigation/monitored-assessments-mitigation.component';
import { AcknowledgeMonitoredAssessMitigationComponent } from './Modules/mitigation-controls/acknowledge-monitored-assess-mitigation/acknowledge-monitored-assess-mitigation.component';
import { MyMitigationTasksComponent } from './Modules/mitigation-controls/my-mitigation-tasks/my-mitigation-tasks.component';
import { UpdateMitigationActionComponent } from './Modules/mitigation-controls/update-mitigation-action/update-mitigation-action.component';
import { ViewActionTakenMitigationComponent } from './Modules/mitigation-controls/view-action-taken-mitigation/view-action-taken-mitigation.component';
import { IndusteryTypeListComponent } from './Modules/master/industery-type-list/industery-type-list.component';
import { BusinesssectorlistComponent } from './Modules/master/businesssectorlist/businesssectorlist.component';
import { CommonEntityAttributesComponent } from './Modules/common-entity-attributes/common-entity-attributes.component';
import { CommoncomplianceattributesComponent } from './Modules/common-compliance-attributes/common-compliance-attributes.component';
import { FrequencyMasterComponent } from './Modules/common-entity-attributes/frequency-master/frequency-master.component';
import { HolidaymasterComponent } from './Modules/common-entity-attributes/holidaymaster/holidaymaster.component';
import { CategoryOfLawComponent } from './Modules/common-compliance-attributes/category-of-law/category-of-law.component';
import { JurisdictionCategoryListComponent } from './Modules/common-compliance-attributes/jurisdiction-category-list/jurisdiction-category-list.component';
import { jurisdictionlocationlist } from './Modules/common-compliance-attributes/jurisdiction-location-list/jurisdiction-location-list.component';
import { ComplianceRecordTypeComponent } from './Modules/common-compliance-attributes/compliance-record-type/compliance-record-type.component';
import { ComplianceGroupComponent } from './Modules/common-compliance-attributes/compliance-group/compliance-group.component';
import { RegulatoryAuthorityComponent } from './Modules/common-compliance-attributes/regulatory-authority/regulatory-authority.component';
import { ComplianceRiskClassificationComponent } from './Modules/common-compliance-attributes/compliance-risk-classification/compliance-risk-classification.component';
import { PenalityCategoryComponent } from './Modules/common-compliance-attributes/penality-category/penality-category.component';
import { ComplianceNotifiedStatusComponent } from './Modules/common-compliance-attributes/compliance-notified-status/compliance-notified-status.component';
import { ComplianceRiskClassificationCriteriaComponent } from './Modules/common-compliance-attributes/compliance-risk-classification-criteria/compliance-risk-classification-criteria.component';
import { ActRegulatorMasterComponent } from './Modules/Act/regulatory-universe/act-regulator-master/act-regulator-master.component';
import { AddRulesRegulationsProcedureComponent } from './Modules/Act/add-rules-regulations-procedure/add-rules-regulations-procedure.component';
import { StatutoryFormsRecordsComponent } from './Modules/Act/statutory-forms-records/statutory-forms-records.component';
import { CompliancePenaltyMasterComponent } from './Modules/Act/compliance-penalty-master/compliance-penalty-master.component';
import { CreateComplainceDepartmentMappingComponent } from './Modules/complaince-department-mapping/create-complaince-department-mapping/create-complaince-department-mapping.component';
import { CreateComplainceContentComponent } from './Modules/company-complaince-content-library/create-complaince-content/create-complaince-content.component';
import { GlobalComplianceContentLibraryComponent } from './Modules/global-compliance-content-library/global-compliance-content-library.component';
import { CreateGlobalComplianceMasterComponent } from './Modules/global-compliance-content-library/create-global-compliance-master/create-global-compliance-master.component';
import { CreateActivityWorkgroupComponent } from './Modules/activity-workgroup-creation/create-activity-workgroup/create-activity-workgroup.component';
import { ManagementinputsComponent } from './Modules/mitigation-controls/managementinputs/managementinputs.component';
import { EComplianceDashboardComponent } from './Modules/dashboard/e-compliance-dashboard/e-compliance-dashboard.component';
import { RemediateComplianceTaskComponent } from './Modules/dashboard/remediate-compliance-task/remediate-compliance-task.component';
import { ReviewComplianceTasksComponent } from './Modules/dashboard/review-compliance-tasks/review-compliance-tasks.component';
import { ApproveComplianceTasksComponent } from './Modules/dashboard/approve-compliance-tasks/approve-compliance-tasks.component';
import { AduitComplianceTasksComponent } from './Modules/dashboard/aduit-compliance-tasks/aduit-compliance-tasks.component';
import { ViewUserAccessDocumentComponent } from './Modules/report/view-user-access-document/view-user-access-document.component';
import { SupadminEntitytypeMasterComponent } from './Modules/dashboard/supadmin-entitytype-master/supadmin-entitytype-master.component';
import { SupadminUnitLocationTypeComponent } from './Modules/dashboard/supadmin-unit-location-type/supadmin-unit-location-type.component';
import { SupadminBusinessSectorListComponent } from './Modules/dashboard/supadmin-business-sector-list/supadmin-business-sector-list.component';
import { SupadminIndustryTypeListComponent } from './Modules/dashboard/supadmin-industry-type-list/supadmin-industry-type-list.component';
import { SupadminRegionMasterComponent } from './Modules/dashboard/supadmin-region-master/supadmin-region-master.component';
import { SupadminSubRegionMasterComponent } from './Modules/dashboard/supadmin-sub-region-master/supadmin-sub-region-master.component';
import { CompliancePeriodComponent } from './Modules/common-compliance-attributes/compliance-period/compliance-period.component';
import { CreateUserWorkgroupMappingComponent } from './Modules/user-workgroup-mapping/create-user-workgroup-mapping/create-user-workgroup-mapping.component';
import { SupadminFrequencyMasterComponent } from './Modules/dashboard/supadmin-frequency-master/supadmin-frequency-master.component';
import { SupadminHolidayMasterComponent } from './Modules/dashboard/supadmin-holiday-master/supadmin-holiday-master.component';
import { CreateLocationComplaintMappingComponent } from './Modules/create-location-complaint-mapping/create-location-complaint-mapping.component';
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
import { SupadminCompliancePeriodComponent } from './supadmin-compliance-period/supadmin-compliance-period.component';
import { SupadminComplianceRiskCriteriaComponent } from './supadmin-compliance-risk-criteria/supadmin-compliance-risk-criteria.component';
import { SupadminJurisdictionLocationComponent } from './supadmin-jurisdiction-location/supadmin-jurisdiction-location.component';
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
import { UpdateLocationComplaintMappingComponent } from './Modules/create-location-complaint-mapping/update-location-complaint-mapping/update-location-complaint-mapping.component';
import { AppSpecificConfigurationSettingsComponent } from './Modules/app-specific-configuration-settings/app-specific-configuration-settings.component';
import { EntityhierarchylevelsetupComponent } from './Modules/common-entity-attributes/entityhierarchylevelsetup/entityhierarchylevelsetup.component';
import { EditActRegulatoryComponent } from './Modules/Act/regulatory-universe/edit-act-regulatory/edit-act-regulatory.component';
import { PublishedDocListComponent } from './Modules/gctreports/published-doc-list/published-doc-list.component';
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
import { AssesscompletedwithresultComponent } from './Modules/gcareports/assesscompletedwithresult/assesscompletedwithresult.component';
import { AssessresulttaskownerComponent } from './Modules/gcareports/assessresulttaskowner/assessresulttaskowner.component';
import { DiscardeddraftlistComponent } from './Modules/gctreports/discardeddraftlist/discardeddraftlist.component';
import { DocumentdraftsavedlistComponent } from './Modules/gctreports/documentdraftsavedlist/documentdraftsavedlist.component';
import { DocumentversoninglistComponent } from './Modules/gctreports/documentversoninglist/documentversoninglist.component';
import { DisableddocumentslistComponent } from './Modules/gctreports/disableddocumentslist/disableddocumentslist.component';
import { PublisheddocreviewstatusComponent } from './Modules/gctreports/publisheddocreviewstatus/publisheddocreviewstatus.component';
import { ViewCompanyComplianceComponent } from './Modules/company-complaince-content-library/view-company-compliance/view-company-compliance.component';
import { AckRequestedDocListComponent } from './Modules/gctreports/ack-requested-doc-list/ack-requested-doc-list.component';
import { DefaultNotifierComponent } from './Modules/inspections/default-notifier/default-notifier.component';
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
import { CreateOtherCommonSettingsComponent } from './Modules/Act/create-other-common-settings/create-other-common-settings.component';
import { RisksupadminTypeofriskComponent } from './Modules/dashboard/risksupadmin-typeofrisk/risksupadmin-typeofrisk.component';
import { RisksupadminRiskClassificationComponent } from './Modules/dashboard/risksupadmin-risk-classification/risksupadmin-risk-classification.component';
import { RisksupadminRiskImpactRatingComponent } from './Modules/dashboard/risksupadmin-risk-impact-rating/risksupadmin-risk-impact-rating.component';
import { LossEventThreatCategoryL3Component } from './Modules/Risk_Components/loss-event-threat-category-l3/loss-event-threat-category-l3.component';
import { LossEventThreatCategoryL2Component } from './Modules/Risk_Components/loss-event-threat-category-l2/loss-event-threat-category-l2.component';
import { LossEventThreatCategoryL1Component } from './Modules/Risk_Components/loss-event-threat-category-l1/loss-event-threat-category-l1.component';
import { PotentialBusinessImpactComponent } from './Modules/Risk_Components/potential-business-impact/potential-business-impact.component';
import { RiskPriorityComponent } from './Modules/Risk_Components/risk-priority/risk-priority.component';
import { RiskCauseListComponent } from './Modules/Risk_Components/risk-cause-list/risk-cause-list.component';
import { RiskCategorizationComponent } from './Modules/Risk_Components/risk-categorization/risk-categorization.component';
import { RiskLikelihoodOfOccFactorComponent } from './Modules/Risk_Components/risk-likelihood-of-occ-factor/risk-likelihood-of-occ-factor.component';
import { CustomerregformComponent } from './Modules/onboard/customerregform/customerregform.component';
import { RiskBusinessFunctionMappingComponent } from './risk-business-function-mapping/risk-business-function-mapping.component';
import { UpdateRiskBusinessFunctionMappingComponent } from './risk-business-function-mapping/update-risk-business-function-mapping/update-risk-business-function-mapping.component';
import { NatureOfControlPerformanceComponent } from './Modules/Risk Control Matrix Attributes/nature-of-control-performance/nature-of-control-performance.component';
import { NatureOfControlOccurrenceComponent } from './Modules/Risk Control Matrix Attributes/nature-of-control-occurrence/nature-of-control-occurrence.component';
import { ControlLevelComponent } from './Modules/Risk Control Matrix Attributes/control-level/control-level.component';
import { FrequencyOfControlAppliedComponent } from './Modules/Risk Control Matrix Attributes/frequency-of-control-applied/frequency-of-control-applied.component';
import { ControlDependenciesComponent } from './Modules/Risk Control Matrix Attributes/control-dependencies/control-dependencies.component';
import { RiskControlEffectiveRatingComponent } from './Modules/Risk Control Matrix Attributes/risk-control-effective-rating/risk-control-effective-rating.component';
import { RiskKeyFocusAresComponent } from './risk-key-focus-ares/risk-key-focus-ares.component';
import { ControlReferenceTypeComponent } from './Modules/Risk_Components/control-reference-type/control-reference-type.component';
import { ControlActivityTypeComponent } from './Modules/Risk_Components/control-activity-type/control-activity-type.component';
import { ControlMeasureComponent } from './Modules/Risk_Components/control-measure/control-measure.component';
import { ResidualRiskRatingComponent } from './Modules/Risk_Components/residual-risk-rating/residual-risk-rating.component';
import { ControlRiskOfAssessmentComponent } from './Modules/Risk_Components/control-risk-of-assessment/control-risk-of-assessment.component';
import { RiskBusinessProcessComponent } from './Modules/dashboard/risk-business-process/risk-business-process.component';
import { RiskBusinessSubProcessl1Component } from './Modules/dashboard/risk-business-sub-processl1/risk-business-sub-processl1.component';
import { RiskBusinessSubProcessl2Component } from './Modules/dashboard/risk-business-sub-processl2/risk-business-sub-processl2.component';
import { RiskBusinessSubProcessl3Component } from './Modules/dashboard/risk-business-sub-processl3/risk-business-sub-processl3.component';
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
import { InitialAssessmentImpactFactComponent } from './Modules/Risk_Components/initial-assessment-impact-fact/initial-assessment-impact-fact.component';
import { RiskMitigDecisionListComponent } from './Modules/Risk_Components/risk-mitig-decision-list/risk-mitig-decision-list.component';
import { AssControlAcceptCriteComponent } from './Modules/Risk_Components/ass-control-accept-crite/ass-control-accept-crite.component';
import { ControlAssessmentTestAttrComponent } from './Modules/Risk_Components/control-assessment-test-attr/control-assessment-test-attr.component';
import { ControlHierarchySettingComponent } from './Modules/Risk_Components/control-hierarchy-setting/control-hierarchy-setting.component';
import { BpMaturityRatingScaleComponent } from './Modules/Risk_Components/bp-maturity-rating-scale/bp-maturity-rating-scale.component';
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
import { ControlTestDecisionListComponent } from './Modules/Risk_Components/control-test-decision-list/control-test-decision-list.component';
import { RiskTreatmentDecisionMatrixComponent } from './Modules/Risk_Components/risk-treatment-decision-matrix/risk-treatment-decision-matrix.component';
import { RiskTreatmentDecisionListComponent } from './Modules/Risk_Components/risk-treatment-decision-list/risk-treatment-decision-list.component';
import { RiskSamplingStandardsComponent } from './Modules/risk-common-assessment-template-rules/risk-sampling-standards/risk-sampling-standards.component';
import { ViewlistriskstatementComponent } from './risk-createrisk-document/risk-statement/viewlistriskstatement/viewlistriskstatement.component';
import { ViewriskstatementComponent } from './risk-createrisk-document/risk-statement/viewriskstatement/viewriskstatement.component';
import { EditriskstatementComponent } from './risk-createrisk-document/risk-statement/editriskstatement/editriskstatement.component';
import { RiskAdminNatContPerfComponent } from './Modules/riskAdminAttributes/risk-admin-nat-cont-perf/risk-admin-nat-cont-perf.component';
import { RiskAdminNatContOccurComponent } from './Modules/riskAdminAttributes/risk-admin-nat-cont-occur/risk-admin-nat-cont-occur.component';
import { RiskAdminContLevComponent } from './Modules/riskAdminAttributes/risk-admin-cont-lev/risk-admin-cont-lev.component';
import { RiskAdminFreqcontAppComponent } from './Modules/riskAdminAttributes/risk-admin-freqcont-app/risk-admin-freqcont-app.component';
import { RiskAdminContDependComponent } from './Modules/riskAdminAttributes/risk-admin-cont-depend/risk-admin-cont-depend.component';
import { RiskAdminRiskCOnteffRatComponent } from './Modules/riskAdminAttributes/risk-admin-risk-conteff-rat/risk-admin-risk-conteff-rat.component';
import { RiskAdminContRiskAssComponent } from './Modules/riskAdminAttributes/risk-admin-cont-risk-ass/risk-admin-cont-risk-ass.component';
import { RiskAdminResiduRiskRatComponent } from './Modules/riskAdminAttributes/risk-admin-residu-risk-rat/risk-admin-residu-risk-rat.component';
import { RiskAdminContrRefeTypeComponent } from './Modules/riskAdminAttributes/risk-admin-contr-refe-type/risk-admin-contr-refe-type.component';
import { RiskAdminContMeasureComponent } from './Modules/riskAdminAttributes/risk-admin-cont-measure/risk-admin-cont-measure.component';
import { RiskAdminIntercontrcomponComponent } from './Modules/riskAdminAttributes/risk-admin-intercontrcompon/risk-admin-intercontrcompon.component';
import { RiskAdminInterContPrincipleComponent } from './Modules/riskAdminAttributes/risk-admin-inter-cont-principle/risk-admin-inter-cont-principle.component';
import { RiskAdminContActivityTypeComponent } from './Modules/riskAdminAttributes/risk-admin-cont-activity-type/risk-admin-cont-activity-type.component';
import { RiskAdminContActNatureComponent } from './Modules/riskAdminAttributes/risk-admin-cont-act-nature/risk-admin-cont-act-nature.component';
import { RiskAdminContrActvSubNatureComponent } from './Modules/riskAdminAttributes/risk-admin-contr-actv-sub-nature/risk-admin-contr-actv-sub-nature.component';
import { RiskAdminContAsserCheckComponent } from './Modules/riskAdminAttributes/risk-admin-cont-asser-check/risk-admin-cont-asser-check.component';
import { RiskAdminContrAccepBechMarkComponent } from './Modules/riskAdminAttributes/risk-admin-contr-accep-bech-mark/risk-admin-contr-accep-bech-mark.component';
import { DeleteriskstatementComponent } from './risk-createrisk-document/risk-statement/deleteriskstatement/deleteriskstatement.component';
import { ReactivateriskstatementComponent } from './Modules/master/reactivateriskstatement/reactivateriskstatement.component';
import { RequestToRemediateComponent } from './Modules/dashboard/e-compliance-dashboard/request-to-remediate/request-to-remediate.component';
import { ApproveToRemediateComponent } from './Modules/dashboard/remediate-compliance-task/approve-to-remediate/approve-to-remediate.component';

import { DocumentConfidentialityComponent } from './Modules/document-confidentiality/document-confidentiality.component';
import { UpdateMappingComplianceComponent } from './Modules/dashboard/update-mapping-compliance/update-mapping-compliance.component';


import { RiskAdminBpMaturRatScaleComponent } from './Modules/riskAdminAttributes/risk-admin-bp-matur-rat-scale/risk-admin-bp-matur-rat-scale.component';
import { RiskAdminContrHierSettComponent } from './Modules/riskAdminAttributes/risk-admin-contr-hier-sett/risk-admin-contr-hier-sett.component';
import { RiskAdminInitiaAssImpactRatComponent } from './Modules/riskAdminAttributes/risk-admin-initia-ass-impact-rat/risk-admin-initia-ass-impact-rat.component';
import { RiskAdminRiskMitDesListComponent } from './Modules/riskAdminAttributes/risk-admin-risk-mit-des-list/risk-admin-risk-mit-des-list.component';
import { RiskAdminAsseContrAcctCriComponent } from './Modules/riskAdminAttributes/risk-admin-asse-contr-acct-cri/risk-admin-asse-contr-acct-cri.component';
import { RiskAdminRiskTrDeciListComponent } from './Modules/riskAdminAttributes/risk-admin-risk-tr-deci-list/risk-admin-risk-tr-deci-list.component';
import { RiskAdminRisktrDeciMatrComponent } from './Modules/riskAdminAttributes/risk-admin-risktr-deci-matr/risk-admin-risktr-deci-matr.component';
import { RiskAdminMitActReqComponent } from './Modules/riskAdminAttributes/risk-admin-mit-act-req/risk-admin-mit-act-req.component';
import { RiskAdminActionPrioListComponent } from './Modules/riskAdminAttributes/risk-admin-action-prio-list/risk-admin-action-prio-list.component';
import { ViewcustomerregformComponent } from './Modules/onboard/viewcustomerregform/viewcustomerregform.component';
import { RiskAdminContrasstestattComponent } from './Modules/riskAdminAttributes/risk-admin-contrasstestatt/risk-admin-contrasstestatt.component';
import { RisksuperadmineventfrequencyComponent } from './Modules/Risk_Components/risksuperadmineventfrequency/risksuperadmineventfrequency.component';
import { RisksuperadminactivityfrequencyComponent } from './Modules/Risk_Components/risksuperadminactivityfrequency/risksuperadminactivityfrequency.component';
import { RisksuperadmincontrolcomponentComponent } from './Modules/Risk_Components/risksuperadmincontrolcomponent/risksuperadmincontrolcomponent.component';
import { RisksuperadmincontrolmonitoringmechanismComponent } from './Modules/Risk_Components/risksuperadmincontrolmonitoringmechanism/risksuperadmincontrolmonitoringmechanism.component';
import { RiskadminactivityfrequencyComponent } from './Modules/riskAdminAttributes/riskadminactivityfrequency/riskadminactivityfrequency.component';
import { RiskadmineventfrequencyComponent } from './Modules/riskAdminAttributes/riskadmineventfrequency/riskadmineventfrequency.component';
import { RiskadmincontrolcomponentComponent } from './Modules/riskAdminAttributes/riskadmincontrolcomponent/riskadmincontrolcomponent.component';
import { RiskadmincontrolmonitoringmechanismComponent } from './Modules/riskAdminAttributes/riskadmincontrolmonitoringmechanism/riskadmincontrolmonitoringmechanism.component';
import { RiskDefaultNotifiersComponent } from './risk-default-notifiers/risk-default-notifiers.component';
import { ViewCommonAssesmentRulesComponent } from './Modules/risk-common-assessment-template-rules/view-common-assesment-rules/view-common-assesment-rules.component';
import { ReviewUpdatedComplianceComponent } from './Modules/dashboard/review-compliance-tasks/review-updated-compliance/review-updated-compliance.component';
import { EditUpdationComplianceComponent } from './Modules/dashboard/review-compliance-tasks/review-updated-compliance/edit-updation-compliance/edit-updation-compliance.component';
import { ReviewReviewerComplianceComponent } from './Modules/dashboard/approve-compliance-tasks/review-reviewer-compliance/review-reviewer-compliance.component';
import { EditReviewerComplianceComponent } from './Modules/dashboard/approve-compliance-tasks/review-reviewer-compliance/edit-reviewer-compliance/edit-reviewer-compliance.component';
import { AuditApproveComplianceComponent } from './Modules/dashboard/aduit-compliance-tasks/audit-approve-compliance/audit-approve-compliance.component';
import { RiskEditsamplingstandardsComponent } from './Modules/risk-common-assessment-template-rules/risk-editsamplingstandards/risk-editsamplingstandards.component';
import { UnauthorizedComponent } from './Modules/onboard/unauthorized/unauthorized.component';
import { ViewRiskRegisterComponent } from './risk-createrisk-document/view-risk-register/view-risk-register.component';
import { CreatecontrolstatementComponent } from './Modules/createcontrolstatement/createcontrolstatement.component';
import { CreateControlDocumentComponent } from './Modules/create-control-document/create-control-document.component';
import { ViewListRiskStatementComponent } from './Modules/Risk_Components/view-list-risk-statement/view-list-risk-statement.component';
import { EditControlStatementComponent } from './Modules/edit-control-statement/edit-control-statement.component';
import { ViewControlStatementComponent } from './Modules/view-control-statement/view-control-statement.component';
import { ViewRiskMatrixComponent } from './Modules/view-risk-matrix/view-risk-matrix.component';
import { ViewControlMatrixComponent } from './Modules/view-control-matrix/view-control-matrix.component';
import { EditRiskRegisterComponent } from './Modules/Risk_Components/edit-risk-register/edit-risk-register.component';
import { ViewProvideAccessComponent } from './Modules/map-assessment-template-access/view-provide-access/view-provide-access.component';
import { TaskownerDashboardComponent } from './Modules/dashboard/taskowner-dashboard/taskowner-dashboard.component';
import { ManagementDashboardComponent } from './Modules/dashboard/management-dashboard/management-dashboard.component';
import { NotificationCenterComponent } from './Modules/NotificationCenter/notification-center/notification-center.component';
import { ReviewQueryStatusComponent } from './Modules/GGT_Governance/review-query-status/review-query-status.component';
import { ViewReviewQueryStatusComponent } from './Modules/GGT_Governance/view-review-query-status/view-review-query-status.component';
import { GovernanceHomepageComponent } from './Modules/dashboard/governance-homepage/governance-homepage.component';
import { FocrechangepasswordComponent } from './Modules/onboard/focrechangepassword/focrechangepassword.component';
import { CrcMitigationActionPlanComponent } from './Modules/gcareports/crc-mitigation-action-plan/crc-mitigation-action-plan.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgot-passwrod', component: ForgotpasswordComponent },
  { path: 'create-new-questions', component: CreateNewQuestionsComponent },
  { path: 'T&Cpage', component: TermsConditionPageComponent },
  { path: 'add-new-user', component: AddNewUserComponent },
  { path: 'customer-form', component: CustomerregformComponent },
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'forcechangepassord', component: FocrechangepasswordComponent},
   //  id: ComponentIdList.RaiseQueriesComponent,title: 'Raise Queries',link: 'GGT_Governance/raise-queries', 


  {
    path: 'dashboard',
    component: DashboardComponent,
   // pathMatch: 'full',
   // canActivate: [AuthGuard],
    children: [
      // { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'home', component: HomeComponent, pathMatch: 'full' },
     // { path: '', component: GovernanceHomepageComponent, pathMatch: 'full' },
      { path: 'home', component: GovernanceHomepageComponent, pathMatch: 'full' },
      { path: 'compliancehome', component: GovernanceHomepageComponent, pathMatch: 'full' },
      { path: 'commonadminhome', component: GovernanceHomepageComponent, pathMatch: 'full' },
      { path: 'userlist', component: UserListComponent , pathMatch: 'full'},


           //Dashboard
           {
            path: 'Dashboards',
            component: AppComponent,
            children: [
              {
                path: 'contentcontroller-dashboard',
                component: HomeComponent,
              },
              {
                path: 'taskowner-dashboard',
                component: TaskownerDashboardComponent,
              },
              {
                path: 'management-dashboard',
                component: ManagementDashboardComponent,
              },
            ],
          },
          {
            path: 'NotificationCenter',
            component: AppComponent,
            canActivate: [AuthGuard],
            children: [
              {
                path: 'app-notification-center',
                component: NotificationCenterComponent,
                canActivate: [AuthGuard],
                data: { componentId:77 }
              },
            ],
          },
      //GCTreports
      {
        path: 'ReportsGCT',
        component: AppComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'published-doc-list',
            component: PublishedDocListComponent,
            canActivate: [AuthGuard],
            data: { componentId:77 }
          },
          {
            path: 'app-discardeddraftlist',
            component: DiscardeddraftlistComponent,
            canActivate: [AuthGuard],
            data: { componentId: 78 }
          },
          {
            path: 'app-documentdraftsavedlist',
            component: DocumentdraftsavedlistComponent,
            canActivate: [AuthGuard],
            data: { componentId: 79 }
          },
          {
            path: 'app-documentversoninglist',
            component: DocumentversoninglistComponent,
            canActivate: [AuthGuard],
            data: { componentId: 80 }
          },
          {
            path: 'app-disableddocumentslist',
            component: DisableddocumentslistComponent,
            canActivate: [AuthGuard],
            data: { componentId: 81 }
          },
          {
            path: 'app-publisheddocreviewstatus',
            component: PublisheddocreviewstatusComponent,
            canActivate: [AuthGuard],
            data: { componentId: 82 }
          },
          {
            path: 'app-ack-requested-doc-list',
            component: AckRequestedDocListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 83 }
          },
          {
            path: 'app-doc-access-status-list',
            component: DocAccessStatusListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 84 }
          },
          {
            path: 'app-doc-access-mapping-status-list',
            component: DocAccessMappingStatusListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 85 }
          },
          {
            path: 'app-pub-doc-repository',
            component: PubDocRepositoryComponent,
            canActivate: [AuthGuard],
            data: { componentId: 86 }
          },
          
          
         
        ],
      },
      //GCAreports
      {
        path: 'ReportsGCA',
        component: AppComponent,
        children: [
          {
            path: 'assess-temp-list',
            component: AssessTempListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 87 }
          },
          {
            path: 'assess-disabled-temp-list',
            component: AssessDisabledTempListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 88 }
          },
          {
            path: 'assess-temp-access-mapping',
            component: AssessTempAccessMappingComponent,
            canActivate: [AuthGuard],
            data: { componentId: 89 }
          },
          {
            path: 'app-ackreqassessment',
            component: AckreqassessmentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 90 }
          },
          {
            path: 'app-scheduledassessmentstatuslist',
            component: ScheduledassessmentstatuslistComponent,
            canActivate: [AuthGuard],
            data: { componentId: 91 }
          },
          {
            path: 'app-scheduledasslistwithstatus',
            component: ScheduledasslistwithstatusComponent,
            canActivate: [AuthGuard],
            data: { componentId: 92 }
          },
          {
            path: 'app-assesscompletedwithresult',
            component: AssesscompletedwithresultComponent,
            canActivate: [AuthGuard],
            data: { componentId: 93 }
          },
          {
            path: 'app-assessresulttaskowner',
            component: AssessresulttaskownerComponent,
            canActivate: [AuthGuard],
            data: { componentId: 94 }
          },
          {
            path: 'app-assess-perf-indicators-analysis',
            component: AssessPerfIndicatorsAnalysisComponent,
            canActivate: [AuthGuard],
            data: { componentId: 95 }
          },
          {
            path: 'app-mitigation-action-plan',
            component: MitigationActionPlanComponent,
            canActivate: [AuthGuard],
            data: { componentId: 96 }
          },
            {
            path: 'CrcMitigationActionPlanComponent',
            component: CrcMitigationActionPlanComponent,
            canActivate: [AuthGuard],
            data: { componentId: 96 }
          },
          {
            path: 'app-question-bank-reserve-listing',
            component: QuestionBankReserveListingComponent,
            canActivate: [AuthGuard],
            data: { componentId: 97 }
          },
          {
            path: 'app-my-question-bank-listing',
            component: MyQuestionBankListingComponent,
            canActivate: [AuthGuard],
            data: { componentId: 98 }
          },
          {
            path: 'app-my-question-bank-listing',
            component: DocumentConfidentialityComponent,/// path not spesified
            canActivate: [AuthGuard],
            data: { componentId: 99 }
          },
        ],
      },

//Master Module
{
  path: 'Master',
  component: AppComponent,
  children: [
    {
      path: 'department-master',
      component: DepartmentMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 2 }
    },
    {
      path: 'unit-location-master',
      component: UnitLocationMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 5 }
    },
    {
      path: 'user-location-mapping',
      component: UserLocationMappingComponent,
      canActivate: [AuthGuard],
      data: { componentId: 6 }
    },

    {
      path: 'admin-config',
      component: AdminConfigComponent,
      canActivate: [AuthGuard],
      data: { componentId: 8 }
    },
    
    {
      path: 'document-review-status',
      component: DocumentReviewStatusComponent
    },
   
    {
      path: 'entity-master',
      component: EntityMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 4 }
    },
    {
      path: 'TPA-entity-master',
      component: TPAEntityComponent,
      canActivate: [AuthGuard],
      data: { componentId: 3 }
    },
   
    {
      path: 'sector-master',
      component: SectorMasterComponent
    },
    {
      path: 'sub-sector-master',
      component: SubSectorMasterComponent
    },
   
    {
      path: 'unit-master',
      component: UnitMasterComponent
    },
    {
      path: 'type-of-compliance-master',
      component: TypeOfComplianceMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 254 }
    },
    {
      path: 'group-of-company',
      component: GroupOfCompanyComponent
    },
    {
      path: 'group-type',
      component: GroupTypeComponent
    },
    {
      path: 'nature-of-law',
      component: NatureOfLawComponent,
      canActivate: [AuthGuard],
      data: { componentId: 250 }
    },
   
    {
      path: 'risk-category',
      component: RiskCategoryComponent
    },
   


   
  ],
},
{
  path: 'CommonEntityAttribute',
  component: AppComponent,
  children: [
    {
      path: 'entity-type-master',
      component: EntitytypemasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 241 }
    },

    {
      path: 'region-master',
      component: RegionMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 245 }
    },
    {
      path: 'sub-region-master',
      component: SubRegionMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 246 }
    },
    {
      path: 'unit-type-master',
      component: UnitTypeMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 242 }
    },
    {
      path: 'Industry-Type',
      component: IndusteryTypeListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 244 }
    },
    {
      path: 'Businesssectorlist',
      component: BusinesssectorlistComponent,
      canActivate: [AuthGuard],
      data: { componentId: 243 }
    },
    {
      path: 'FrequencyMastre',
      component: FrequencyMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 247 }
    },
    {
      path: 'HoildayMaster',
      component: HolidaymasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 248 }
    },
    {
      path: 'entity-hierarchy',
      component: EntityhierarchylevelsetupComponent,
      canActivate: [AuthGuard],
      data: { componentId: 249 }
    },
    
  ]},
  {
    path: 'Complaincedepartmentmapping',
    component: AppComponent,
    children: [
      {
        path:'createdepartmentmapping',
        component:CreateComplainceDepartmentMappingComponent,
        canActivate: [AuthGuard],
        data: { componentId: 275 }
      },
      {
        path:'Updatedepartmentmapping',
        component:UpdateComplianceDepartmentMappingComponent,
        canActivate: [AuthGuard],
        data: { componentId: 276 }
      }
    ]},
    {
      path: 'complianceusermapping',
      component: AppComponent,
      children: [
        {
          path:'creatcomplianceusermapping',
          component:CreateComplianceUserMappingComponent,
          canActivate: [AuthGuard],
          data: { componentId: 284 }
        }
      ]},
    {
      path: 'userworkgroupmapping',
      component: AppComponent,
      children: [
       {
          path:'createuserworkgroupmapping',
          component:  CreateUserWorkgroupMappingComponent,
          canActivate: [AuthGuard],
          data: { componentId: 279 }
          
        },
        {
          path:'updateuserworkgroupmapping',
          component: UpdateUserWorkgroupMappingComponent,
          canActivate: [AuthGuard],
          data: { componentId: 280 }
        }
      ]},
      {
        path: 'locationcomplaincemapping',
        component: AppComponent,
        children: [
          {
            path:'createlocationcomplaincemapping',
            component:  CreateLocationComplaintMappingComponent,
            canActivate: [AuthGuard],
            data: { componentId: 281 }
            
          },
          {
            path:'Viewlocationcomplaincemapping',
            component:  ViewCreateLocationCompliantMappingComponent,
            canActivate: [AuthGuard],
            data: { componentId: 283 }
            
          },
          {
            path:'Updatelocationcomplaincemapping',
            component:  UpdateLocationComplaintMappingComponent,
            canActivate: [AuthGuard],
            data: { componentId: 282 }
            
          },
        ]},
  
        {
          path: 'Appspecificsettings',
          component: AppComponent,
          children: [
            {
              path:'createAppspecificsettings',
              component:AppSpecificConfigurationSettingsComponent,
              canActivate: [AuthGuard],
              data: { componentId: 272 }
            }
          ]},
          {
            path: 'Alertandreminder',
            component: AppComponent,
            children: [
              {
                path:'createAlert&Reminder',
                component:CreateAlertsRemindersComponent,
                canActivate: [AuthGuard],
                data: { componentId: 287 }
              }
            ]},
    {
      path: 'companyComplaincecontent',
      component: AppComponent,
      children: [
        {
          path:'createcomplaincecontent',
          component:CreateComplainceContentComponent,
          canActivate: [AuthGuard],
          data: { componentId: 273 }
        },
        {
          path:'viewcompanycompliance',
          component:ViewCompanyComplianceComponent,
          canActivate: [AuthGuard],
          data: { componentId: 274 }
        }
      ]},

      {
        path: 'Activity-workgroup-Creation',
        component: AppComponent,
        children: [
          {
            path:'createActivityworkgroup',
            component:CreateActivityWorkgroupComponent,
            canActivate: [AuthGuard],
            data: { componentId: 277 }
          },
          {
            path:'UpdateActivityworkgroup',
            component:UpdateActivityWorkgroupComponent,
            canActivate: [AuthGuard],
            data: { componentId: 278 }
          }
        ]},

{
    path: 'CommonComplianceLibrary',
    component: AppComponent,
    children: [
      {
        path:'categoryoflaw',
        component:CategoryOfLawComponent,
        canActivate: [AuthGuard],
        data: { componentId: 251 }
      },
      {
        path:'Jurisdictionlist',
        component:JurisdictionCategoryListComponent,
        canActivate: [AuthGuard],
        data: { componentId: 252 }
      },
      {
        path:'jurisdictionlocation',
        component:jurisdictionlocationlist,
        canActivate: [AuthGuard],
        data: { componentId: 253 }
      },
      {
        path:'compliancerecordtype',
        component:ComplianceRecordTypeComponent,
        canActivate: [AuthGuard],
        data: { componentId: 255 }
      },
      {
        path:'compliancegroup',
        component:ComplianceGroupComponent,
        canActivate: [AuthGuard],
        data: { componentId: 256 }
      },
      {
        path:'regulatoryauthority',
        component:RegulatoryAuthorityComponent,
        canActivate: [AuthGuard],
        data: { componentId: 257 }
      },
      {
        path:'complianceriskclassification',
        component:ComplianceRiskClassificationComponent,
        canActivate: [AuthGuard],
        data: { componentId: 258 }
      },
      {
        path:'penalitycategory',
        component:PenalityCategoryComponent,
        canActivate: [AuthGuard],
        data: { componentId: 260 }
      },
      {
        path:'compliancenotifiedstatus',
        component:ComplianceNotifiedStatusComponent,
        canActivate: [AuthGuard],
        data: { componentId: 261 }
      },
      {
        path:'complianceriskcriteria',
        component:ComplianceRiskClassificationCriteriaComponent,
        canActivate: [AuthGuard],
        data: { componentId: 259 }
      },
      {
        path:'CommonComplianceAttributes',
        component:CommoncomplianceattributesComponent
      },
      {
        path:'CompliancePeriod',
        component:CompliancePeriodComponent,
        canActivate: [AuthGuard],
        data: { componentId: 271 }
      },
      {
        path:'commonsettings',
        component:CreateOtherCommonSettingsComponent,
        canActivate: [AuthGuard],
        data: { componentId: 288 }
      }
    ]},
 {
  path: 'GlobalComplianceLibrary',
  component:AppComponent,
  canActivate: [AuthGuard],
  data: { componentId: 231 },
  children:[
  {
    path:'CreateGlobalComplianceMaster',
    component:CreateGlobalComplianceMasterComponent,
    canActivate: [AuthGuard],
    data: { componentId: 231 }
    
  },
  {
    path:'ViewGlobalCompliance',
    component:ViewGlobalComplianceComponent,
    canActivate: [AuthGuard],
    data: { componentId: 232 }
  }
    ]},

    {
      path: 'Actregulation',
      component: AppComponent,
      children: [
        {
          path: 'Actregulator',
          component: ActRegulatorMasterComponent,
          canActivate: [AuthGuard],
          data: { componentId: 262 }
        },
        {
          path: 'viewActregulator',
          component: ViewActRegulatoryComponent,
          canActivate: [AuthGuard],
          data: { componentId: 263 }
        },
        {
          path: 'editActregulator',
          component: EditActRegulatoryComponent,
          canActivate: [AuthGuard],
          data: { componentId: 263 }
        },
        {
          path: 'Addrulesregulations',
          component: AddRulesRegulationsProcedureComponent,
          canActivate: [AuthGuard],
          data: { componentId: 264 }
        },
        {
          path: 'ViewActrulesregulations',
          component: ViewActRuleRegulationComponent,
          canActivate: [AuthGuard],
          data: { componentId: 265 }
        },
        {
          path: 'editActrulesregulations',
          component: EditActRuleRegulationComponent,
          canActivate: [AuthGuard],
          data: { componentId: 265 }
        },
        {
          path: 'Bare-Act-Rule-repository',
          component: RuleRepositoryComponent,
          canActivate: [AuthGuard],
          data: { componentId: 266 }
        },
        {
          path: 'statutoryforms',
          component: StatutoryFormsRecordsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 267 }
        },
        {
          path: 'viewstatutoryforms',
          component: ViewStatutoryFromsRecordsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 268 }
        },
        {
          path: 'Editstatutoryforms',
          component: EditStatutoryFormsRecordComponent,
          canActivate: [AuthGuard],
          data: { componentId: 268 }
        },
        {
          path: 'Addcompliancepenalty',
          component: CompliancePenaltyMasterComponent,
          canActivate: [AuthGuard],
          data: { componentId: 269 }
        },
        {
          path: 'viewcompliancepenalty',
          component: ViewCompliancePenaltyMasterComponent,
          canActivate: [AuthGuard],
          data: { componentId: 270 }
        },
        {
          path: 'Editcompliancepenalty',
          component: EditCompliancePenaltyComponent,
          canActivate: [AuthGuard],
          data: { componentId: 270 }
        },
    
    ]
    },

    {
      path: 'SuperAd_Common_Entity',
      component: AppComponent,
      children: [ 
        {
          path: 'supadmin-act-regulator-master',
          component: SupadminActRegulatorMasterComponent,
          canActivate: [AuthGuard],
          data: { componentId: 221 }
        },
        {
          path: 'supadmin-view-actregulator',
          component: SupadminViewActregulatorComponent,
          canActivate: [AuthGuard],
          data: { componentId: 222 }
        },
        {
          path: 'supadmin-addrules-regulations',
          component: SupadminAddrulesRegulationsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 223 }
        },
        {
          path: 'supadmin-view-actrules-regulations',
          component: SupadminViewActrulesRegulationsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 224 }
        },
        {
          path: 'supadmin-edit-actregulator',
          component:SuperadminEditActregulatoryComponent,
          canActivate: [AuthGuard],
          data: { componentId: 222}
        },
        {
          path: 'supadmin-addrules-regulations',
          component: SupadminAddrulesRegulationsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 223 }
        },
        {
          path: 'supadmin-view-actrules-regulations',
          component: SupadminViewActrulesRegulationsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 224 }
        },
        {
          path: 'supadmin-Edit-actrules-regulations',
          component: SuperadminEditRuleregulationComponent,
          canActivate: [AuthGuard],
          data: { componentId: 224 }
        },
        {
          path: 'supadmin-bare-act-rule-repository',
          component: SupadminBareActRuleRepositoryComponent,
          canActivate: [AuthGuard],
          data: { componentId: 225 }
        },
        {
          path: 'supadmin-statutory-forms',
          component: SupadminStatutoryFormsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 226}
        },
        {
          path: 'supadmin-viewstatutoryforms',
          component: SupadminViewstatutoryformsComponent,
          canActivate: [AuthGuard],
          data: { componentId: 227 }
        },
        {
           path:'supadmin-editstatutoryforms',
           component:SupAdminEditStatutoryfromsComponent,
           canActivate: [AuthGuard],
           data: { componentId: 22 }
        },
        {
          path: 'supadmin-addcompliancepenalty',
          component: SupadminAddcompliancepenaltyComponent,
          canActivate: [AuthGuard],
          data: { componentId:  228}
        },
        {
          path: 'supadmin-viewcompliancepenalty',
          component: SupadminViewcompliancepenaltyComponent,
          canActivate: [AuthGuard],
          data: { componentId: 229 }
        },
        {
          path:'supAdmin-editcompliancepenalty',
          component:SupAdminEditCompliancepenaltyComponent,
          canActivate: [AuthGuard],
          data: { componentId: 229 }
        }
    
    ]
    },
{
  path: 'GGT_Governance',
  component: AppComponent,
  children: [
    {
      path: 'my-tasks',
      component: MyTasksComponent,
      canActivate: [AuthGuard],
      data: { componentId: 52 }
    },
    {
      path: 'monitored-tasks',
      component: MonitoredTasksComponent,
      canActivate: [AuthGuard],
      data: { componentId: 52 }
    },
    {
      path: 'raise-queries',
      component: RaiseQueriesComponent,
      canActivate: [AuthGuard],
      data: { componentId: 53 }
    },
    {
      path: 'track-status',
      component: TrackStatusComponent,
      canActivate: [AuthGuard],
      data: { componentId: 53 }
    },
    {
      path: 'help-desk',
      component: HelpDeskComponent,
      canActivate: [AuthGuard],
      data: { componentId: 53 }
    },
    {
      path: 'view-query',
      component: ViewQueryComponent,
      //canActivate: [AuthGuard],
      data: { componentId: 53 }
    },
    {
      path: 'review-query-status',
      component: ReviewQueryStatusComponent,
      canActivate: [AuthGuard],
      data: { componentId: 53 }
    },
    {
      path: 'view-review-query',
      component: ViewReviewQueryStatusComponent,
      canActivate: [AuthGuard],
      data: { componentId: 53 }
    },
    
  ],
},
{
  path: 'SuperAd_Common_Entity',
  component: AppComponent,
  children: [
    {
      path: 'supadmin-entitytype-master',
      component: SupadminEntitytypeMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 201 }
    },
    {
      path: 'supadmin-unit-location-type',
      component: SupadminUnitLocationTypeComponent,
      canActivate: [AuthGuard],
      data: { componentId: 202 }
    },
    {
      path: 'supadmin-business-sector-list',
      component: SupadminBusinessSectorListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 203 }
    },
    {
      path: 'supadmin-industry-type-list',
      component: SupadminIndustryTypeListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 204 }
    },
    {
      path: 'supadmin-region-master',
      component: SupadminRegionMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 205 }
    },
    {
      path: 'supadmin-sub-region-master',
      component: SupadminSubRegionMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 206 }
    },
    {
      path: 'supadmin-frequency-master',
      component: SupadminFrequencyMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 207 }
    },
    {
      path: 'supadmin-holiday-master',
      component: SupadminHolidayMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 208 }
    },
    {
      path: 'supadmin-nature-of-law',
      component: SupadminNatureOfLawComponent,
      canActivate: [AuthGuard],
      data: { componentId: 209 }
    },
    {
      path: 'supadmin-category-of-law',
      component: SupadminCategoryOfLawComponent,
      canActivate: [AuthGuard],
      data: { componentId: 210 }
    },
    {
      path: 'supadmin-jurisdiction-category-list',
      component:SupadminJurisdictionCategoryListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 211 }
      
    },
    {
      path: 'supadmin-compliance-type',
      component:SupadminComplianceTypeComponent,
      canActivate: [AuthGuard],
      data: { componentId: 213 }
    },
    {
      path: 'supadmin-compliance-record-type',
      component:SupadminComplianceRecordTypeComponent,
      canActivate: [AuthGuard],
      data: { componentId: 214 }
    },
    // {
    //   path: 'supadmin-compliance-record-type',
    //   component:SupadminComplianceRecordTypeComponent,
    // },
    {
      path: 'supadmin-regulatory-authority',
      component:SupadminRegulatoryAuthorityComponent,
      canActivate: [AuthGuard],
      data: { componentId: 216 }
    },
    {
      path: 'supadmin-compliance-risk-classification',
      component:SupadminComplianceRiskClassificationComponent,
      canActivate: [AuthGuard],
      data: { componentId: 217 }
    },
    {
      path: 'supadmin-penalty-category',
      component:SupadminPenaltyCategoryComponent,
      canActivate: [AuthGuard],
      data: { componentId: 219 }
    },
    {
      path: 'supadmin-compliance-notified-status',
      component:SupadminComplianceNotifiedStatusComponent,
      canActivate: [AuthGuard],
      data: { componentId: 220 }
    },
    {
      path: 'supadmin-compliance-group',
      component:SupadminComplianceGroupComponent,
      canActivate: [AuthGuard],
      data: { componentId: 215 }
    },
    {
      path: 'supadmin-compliance-period',
      component:SupadminCompliancePeriodComponent,
      canActivate: [AuthGuard],
      data: { componentId: 230 }
    },
    {
      path: 'supadmin-compliance-risk-criteria',
      component:SupadminComplianceRiskCriteriaComponent,
      canActivate: [AuthGuard],
      data: { componentId: 218 }
    },
    {
      path: 'supadmin-jurisdiction-location',
      component:SupadminJurisdictionLocationComponent,
      canActivate: [AuthGuard],
      data: { componentId: 212 }
    },
    {
      path: 'data-imported',
      component:DataImportedComponent,
      canActivate: [AuthGuard],
      data: { componentId: 285 }
    },
    {
      path: 'import-compliance-controller-master',
      component:ImportComplianceControllerMasterComponent,
      canActivate: [AuthGuard],
      data: { componentId: 286 }
    },
    {
      path: 'review-status-settings',
      component:ReviewStatusSettingsComponent,
      canActivate: [AuthGuard],
      data: { componentId: 75 }
    },

  ],
},

{
  path: 'monitoring-compliances',
  component: AppComponent,
  children: [
    {
      path: '',
      component: MonitoringCompliancesComponent
    },
    {
      path: 'report-window',
      component: ReportWindowComponent
    },
    {
      path: 'contact-us-change-request-form',
      component: ContactUsChangeRequestFormComponent
    },
  ],
},

{
  path: 'legal-head-monitoring-compliances',
  component: AppComponent,
  children: [
    {
      path: '',
      component: LegalHeadMonitoringCompliancesComponent
    },
    {
      path: 'generation-of-ecompliance-certificate',
      component: GenerationOfEcomplianceCertificateComponent
    },
    // {
    //   path: 'contact-us-change-request-form',
    //   component: ContactUsChangeRequestFormComponent,
    // },
  ],
},

      //Inventory Module
      {
        path: 'inventory',
        component: InventoryComponent,
        children: [
          {
            path: '',
            component: InventoryComponent
          },
          {
            path: 'bridge-list',
            component: BridgeListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 16 }
          },
          {
            path: 'create-bridge',
            component: CreateBridgeComponent
          },
          {
            path: 'bridge-master',
            component: BridgeMasterComponent,
            canActivate: [AuthGuard],
            data: { componentId: 17 }
          },
          {
            path: 'boq-reports',
            component: BridgeReportsComponent
          },
          {
            path: 'add-bridge',
            component: CreateBridgeMasterComponent
          },

          {
            path: 'edit-bridge',
            component: EditBridgeMasterComponent
          },
          {
            path: 'update-inventory',
            component: UpdateBridgeComponent
          },
          {
            path: 'ack-request',
            component: AckRequestComponent,
            canActivate: [AuthGuard],
            data: { componentId: 22 }
          },
          {
            path: 'doc-user-access',
            component: DocUserAccessComponent,
            canActivate: [AuthGuard],
            data: { componentId: 23 }
          },
          {
            path: 'doc-repository',
            component: DocRepositoryComponent,
            canActivate: [AuthGuard],
            data: { componentId: 24 }
          },
        ],
      },

      //Governance control attributes
      {
        path: 'inspection',
        component: InspectionComponent,
        children: [
          // {
          //   path: '',
          //   component: InspectionListComponent,
          // },

          {
            path: 'TaskMaster',
            component: TaskMasterComponent,
            canActivate: [AuthGuard],
            data: { componentId: 9 }
          },
          {
            path: 'add-user-role', 
            component: AddUserRoleComponent,
            canActivate: [AuthGuard],
            data: { componentId: 7 }
          },
          {
            path: 'inspection-list',
            component: InspectionListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 10 }
          },
          {
            path: 'question-bank',
            component: QuestionBankComponent,
            canActivate: [AuthGuard],
            data: { componentId: 11 }
          },
          {
            path:'Client-Registration',
            component:ScheduledAssessmentsComponent
            },
          {
            path: 'assigned-inspection-list',
            component: AssignedInspectionListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 12 }
          },
          {
            path: 'inspector-inspection-list',
            component: InspectorInspectionListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 13 }
          },

          {
            path: 'assign-authority',
            component: AssignAuthorityComponent
          },
          {
            path: 'authority-name',
            component: AuthorityNameComponent,
            canActivate: [AuthGuard],
            data: { componentId: 14 }
          },
          {
            path: 'reviewer-inspection-list',
            component: ReviewerInspectionListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 15 }
          },
          {
            path: 'default-notifier',
            component: DefaultNotifierComponent,
            canActivate: [AuthGuard],
            data: { componentId: 76 }
          },

          {
            path: 'document-review-disable',
            component: DocumentReviewDisableComponent
          },
          {
            path: 'document-review-update',
            component: DocumentReviewUpdateComponent
          },
          {
            path: 'document-review-version-change',
            component: DocumentReviewVersionChangeComponent
          },
          {
            path:'document-confidentiality',
            component:DocumentConfidentialityComponent,
            canActivate: [AuthGuard],
            data: { componentId: 99 }
          }

          // // {
          // //   path: 'create-inspection',
          // //   component: CreateInspectionComponent,
          // // },

          // // {
          // //   path: 'update-inspection',
          // //   component: UpdateInspectionComponent,
          // // },
          // {
          //   path: 'assign-inspection',
          //   component: AssignInspectionComponent,
          // },
          
          
          // {
          //   path: 'self-inspection',
          //   component: SelfInspectionComponent,
          // },
          // {
          //   path: 'review-inspection',
          //   component: ReviewInspectionComponent,
          // },
          // {
          //   path: 'unregister-inspection',
          //   component: UnregisterInspectionComponent,
          // },
         
          // {
          //   path: 'add-question',
          //   component: AddQuestionComponent,
          // },
            
         
          // {
          //   path: 'nature-of-document',
          //   component: NatureOfDocumentComponent,
          // },
        ],
      },

      //User Module
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: UserListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 130 }
          },
          {
            path: 'user-list',
            component: UserListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 130 }
          },
          {
            path: 'create-user',
            component: CreateUserComponent
          },
          {
            path: 'update-user',
            component: UpdateUserComponent
          },
        ],
      },

      //Role Module
      {
        path: 'role',
        component: RoleComponent,
        children: [
          {
            path: '',
            component: RoleListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 129 }
          },
          {
            path: 'role-list',
            component: RoleListComponent,
            canActivate: [AuthGuard],
            data: { componentId: 129 }
          },
          {
            path: 'create-role',
            component: CreateRoleComponent,
            canActivate: [AuthGuard],
            data: { componentId: 129 }
          },
          {
            path: 'update-role',
            component: UpdateRoleComponent,
            canActivate: [AuthGuard],
            data: { componentId: 129 }
          },
        ],
      },
   //Project
      {
        path: 'project',
        component: ProjetComponent,
        children: [
          {
            path: '',
            component: ProjectlistComponent
          },
          {
            path: 'project-list',
            component: ProjectlistComponent
          },
          {
            path: 'create-update-project',
            component: CreateUpdateprojectComponent
          },
        ],
      },

      //Manufacturer
      {
        path: 'manufacturer',
        component: ManufacturerComponent,
        children: [
          {
            path: '',
            component: ManufacturerListComponent
          },
          {
            path: 'manufacturer-list',
            component: ManufacturerListComponent
          },
          {
            path: 'create-update-manufacturer',
            component: CreateUpdateManufacturerComponent
          },
        ],
      },
      {
        path: 'manufacturer',
        component: ManufacturerComponent,
        children: [
          {
            path: '',
            component: ProductListComponent
          },
          {
            path: 'product-list',
            component: ProductListComponent
          },
          {
            path: 'create-update-product',
            component: CareateUpdateProductComponent
          },
        ],
      },

      //Report Module
      {
        path: 'report',
        component: ReportComponent,
        children: [
          {
            path: 'report-list',  //GCT doc Provide Access
             component: ReportListComponent,
             canActivate: [AuthGuard],
             data: { componentId: 18 }
          },
           {
            path: 'remedy-bank', //GCT doc Edit Access
            component: RemedyBankComponent,
            canActivate: [AuthGuard],
            data: { componentId: 19 }
          },
          // {
          //   path: 'create-remedy',
          //   component: CrateRemedyComponent,
          // },
          // {
          //   path: 'update-report',
          //   component: UpdateReportComponent,
          // },
          {
            path: 'remove-user-access', //GCT doc Remove Access
            component: RemoveUserAccessComponent,
            canActivate: [AuthGuard],
            data: { componentId: 20 }
          },
          {
            path: 'view-user-access-document', //GCT doc Remove Access
            component: ViewUserAccessDocumentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 21 }
          },
          // {
          //   path: 'view-report',
          //   component: ViewReportComponent,
          // }
        ],
      },

      {
        path: 'inspection',
        component: InspectionComponent,
        children: [
          // {
          //   path: 'pub-new-doc',
          //   component: PubNewDocComponent,
          // },
          {
            path: 'view-pub-doc',
            component: ViewPubDocComponent,
            canActivate: [AuthGuard],
            data: { componentId: 25 }
          },
          {
            path: 'update-pub-doc',
            component: UpdatePubDocComponent,
            canActivate: [AuthGuard],
            data: { componentId: 26 }
          },
          {
            path: 'disable-pub-doc',
            component: DisablePubDocComponent,
            canActivate: [AuthGuard],
            data: { componentId: 27 }
          },
          {
            path: 'reactivate-pub-doc',
            component: ReactivatePubDocComponent,
            canActivate: [AuthGuard],
            data: { componentId: 28 }
          },
          {
            path: 'pub-new-ver',
            component: PubNewVerComponent,
            canActivate: [AuthGuard],
            data: { componentId: 29 }
          },
          {
            path: 'doc-rev-period-status',
            component: DocRevPeriodStatusComponent,
            canActivate: [AuthGuard],
            data: { componentId: 30 }
          },
        ],
      },

     


//Governance Assessment 

        {
        path: 'Governance-Assessment',
        component: AppComponent,
        children: [
          {
            path: '',
            component: ScoreIndicatorComponent,
            canActivate: [AuthGuard],
            data: { componentId: 31 }
          },
          {
            path: 'competency-skill-level',
            component: CompetencySkillLevelComponent,
            canActivate: [AuthGuard],
            data: { componentId: 32 }
          },
          {
            path: 'key-improvement-indicators',
            component: KeyImprovementIndicatorsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 33 }
          }, 

          {
            path: 'define-type',
            component: DefineTypeComponent,
            canActivate: [AuthGuard],
            data: { componentId: 34 }
          },
          {
            path: 'define-sub-type',
            component: DefinesubtypeComponent,
            canActivate: [AuthGuard],
            data: { componentId: 35 }
          },
          {
            path: 'assessment-builder',
            component: AssessmentBuilderComponent,
            canActivate: [AuthGuard],
            data: { componentId: 36 }
          },
          {
            path: 'customized-assessment',
            component: CustomizedAssessmentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 37 }
          },
          {
            path: 'assessment-generate',
            component: AssessmentGenerateComponent
          }
          
        ],
      },



      {
        path: 'assessment-template-library',
        component: AppComponent,
        children: [
          {
            path: 'view-assessment-template',
            component: ViewAssessmentTemplateComponent,
            canActivate: [AuthGuard],
            data: { componentId: 38 }
          },
          {
            path: 'update-assessment-template',
            component: UpdateAssessmentTemplateComponent,
            canActivate: [AuthGuard],
            data: { componentId: 39 }
          },
          {
            path: 'disable-assessment-template',
            component: DisableAssessmentTemplateComponent,
            canActivate: [AuthGuard],
            data: { componentId: 40 }
          },
          {
            path: 'reactive-assessment-template',
            component: ReactiveAssessmentTemplateComponent,
            canActivate: [AuthGuard],
            data: { componentId: 41 }
          },

         
         
        ],
      },

      {
        path: 'assessment-result',
        component: AppComponent,
        children: [
          {
            path: 'my-assessment',
            component: MyAssessmentComponent
          },
          // {
          //   path: 'scheduled-assessments',
          //   component: ScheduledAssessmentsComponent,
          // },
          {
            path: 'monitored-assessments',
            component: MonitoredAssessmentsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 56 }
          },
          

        ],
      },


      {
        path: 'governance-question-bank',
        component:  AppComponent,
        children: [
          {
            path: '',
            component: DefineSubjectComponent,
            canActivate: [AuthGuard],
            data: { componentId: 65 }
          },
          {
            path: 'define-topic',
            component: DefineTopicComponent,
            canActivate: [AuthGuard],
            data: { componentId: 66 }
          },
          {
            path: 'check-level',
            component: CheckLevelComponent,
            canActivate: [AuthGuard],
            data: { componentId: 67 }
          },
          {
            path: 'add-questions',
            component: AddQuestionsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 69 }
          },
          {
            path: 'bulk-upload-questions',
            component: BulkUploadQuestionsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 68 }
          },
          {
            path: 'edit-questions',
            component: EditQuestionsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 70 }
          },
          {
            path: 'disable-question',
            component: DisableQuestionComponent,
            canActivate: [AuthGuard],
            data: { componentId: 71 }
          },
          
          {
            path: 'reactivate-questions',
            component: ReactivateQuestionsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 72 }
          },
          {
            path: 'my-questions',
            component: MyQuestionsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 73 }
          },
          {
            path: 'question-bank-reserve',
            component: QuestionBankReserveComponent,
            canActivate: [AuthGuard],
            data: { componentId: 74 }
          },
        ],
      },

      {
        path: 'map-assessment-template-access',
        component:  AppComponent,
        children: [
          {
            path: '',
            component: ProvideAccessComponent,
            canActivate: [AuthGuard],
            data: { componentId: 42 }
          },
          {
            path: 'view-provide-access',
            component: ViewProvideAccessComponent,
            canActivate: [AuthGuard],
            data: { componentId: 42 }
          },
          {
            path: 'edit-access',
            component: EditAccessComponent,
            canActivate: [AuthGuard],
            data: { componentId: 43 }
          },
          {
            path: 'remove-access',
            component: RemoveAccessComponent,
            canActivate: [AuthGuard],
            data: { componentId: 44 }
          },
          
        ],
      },


      {
        path: 'schedule-assessment-internal',
        component:  AppComponent,
        children: [

          {
            path: '',
            component: AddNewUserComponent,
            canActivate: [AuthGuard],
            data: { componentId: 47 }
          },
          {
            path: 'view-tpa-user',
            component: ViewtpiuserComponent,
            canActivate: [AuthGuard],
            data: { componentId: 51 }
          },
          {
            path: 'update-tpa-user',
            component: UpdatetpiuserComponent,
            canActivate: [AuthGuard],
            data: { componentId: 51 }
          },

          {
            path: 'create-tpa-user',
            component: CreatetpauserComponent,
            canActivate: [AuthGuard],
            data: { componentId: 51 }
          },
          {
            path: 'repeat-frequency',
            component: RepeatFrequencyComponent,
            canActivate: [AuthGuard],
            data: { componentId: 45 }
          },

	  
          {
            path: 'self-repeat-frequency',
            component: SelfRepeatFrequencyComponent,
            canActivate: [AuthGuard],
            data: { componentId: 48 }
          },

          // {
          //   path: 'one-time-frequency',
          //   component: OneTimeFrequencyComponent,
          //   canActivate: [AuthGuard],
          //   data: { componentId: 46 }
          // },
        
          // {
          //   path: 'one-time-frequency-self',
          //   component: OneTimeFrequencySelfComponent,
          //   canActivate: [AuthGuard],
          //   data: { componentId: 49 }
          // },
          {
            path: 'initiate-external-assessment',
            component: InitiateExternalAssessmentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 50 }
          },
         
          
        ],
      },
      {
        path: 'Begin-Assessement',
        component:  BeginassessmentscheduleComponent,
        canActivate: [AuthGuard],
        data: { componentId: 54 }
      
      },
      
      {
        path: 'Manage-assessment',
        component:  AppComponent,
        children: [
          // {
          //   path: '',
          //   component: RepeatFrequencyComponent,
          // },
          {
            path: 'My Assessements',
            component: ManagemyassessementComponent,
            canActivate: [AuthGuard],
            data: { componentId:55 }
          },
          {
            path: 'Monitored Assessements',
            component: MonitoredAssessmentsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 56 }
          },
      
          
        ],
      },
      {
        path: 'mitigation-controls',
        component:  AppComponent,
        children: [

          {
            path: '',
            component: MyAssessmentsMitigationComponent,
            canActivate: [AuthGuard],
            data: { componentId: 57 }
          },
        
          {
            path: 'scheduled-assessments-mitigation',
            component: ScheduledAssessmentsMitigationComponent,
            canActivate: [AuthGuard],
            data: { componentId: 58 }
          },

          {
            path: 'monitored-assessments-mitigation',
            component: MonitoredAssessmentsMitigationComponent,
            canActivate: [AuthGuard],
            data: { componentId: 59 }
          },
          {
            path: 'management-monitored-assessment',
            component: ManagementMonitoredAssessmentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 59 }
          },
        
          {
            path: 'acknowledge-monitored-assess-mitigation',
            component: AcknowledgeMonitoredAssessMitigationComponent,
            canActivate: [AuthGuard],
            data: { componentId: 60 }
          },
          {
            path: 'managementinputs',
            component: ManagementinputsComponent,
            canActivate: [AuthGuard],
            data: { componentId: 61 }
          },

          {
            path: 'my-mitigation-tasks',
            component: MyMitigationTasksComponent,
            canActivate: [AuthGuard],
            data: { componentId: 62 }
          },
          {
            path: 'update-mitigation-action',
            component: UpdateMitigationActionComponent,
            canActivate: [AuthGuard],
            data: { componentId: 63 }
          },

          {
            path: 'view-action-taken-mitigation',
            component: ViewActionTakenMitigationComponent,
            canActivate: [AuthGuard],
            data: { componentId: 64 }
          },
   
          
        ],
      },

      {
        path: 'assessment-reporting',
        component:  AssessmentReportingComponent,
        canActivate: [AuthGuard],
        data: { componentId: 35 }
      
      },


      {
        path: 'e-compliance-dashboard',
        component:  AppComponent,
        children: [
          
          {
            path: 'Compliance',
            component: EComplianceDashboardComponent,
            canActivate: [AuthGuard],
            data: { componentId: 301 }
          
          },

          {
            path: 'RequestToRemediate',
            component: RequestToRemediateComponent
          
          },
          {
            path: 'Remediates',
            component: RemediateComplianceTaskComponent,
            canActivate: [AuthGuard],
            data: { componentId: 302 }
          
          },          {
            path: 'ApproveToRemediate',
            component: ApproveToRemediateComponent
          
          },
          {
            path: 'Review',
            component: ReviewComplianceTasksComponent,
            canActivate: [AuthGuard],
            data: { componentId: 303 }
          
          },
          {
            path: 'ReviewUpdatedCompliance',
            component: ReviewUpdatedComplianceComponent
          
          },          {
            path: 'EditUpdationCompliance',
            component: EditUpdationComplianceComponent
          
          },
          {
            path: 'Approve',
            component: ApproveComplianceTasksComponent, 
            canActivate: [AuthGuard],
            data: { componentId: 304 }
          
          },
          {
            path: 'ReviewReviewerCompliance',
            component: ReviewReviewerComplianceComponent
          
          },          {
            path: 'EditReviewerCompliance',
            component: EditReviewerComplianceComponent
          
          },
          {
            path: 'Audit',
            component: AduitComplianceTasksComponent,
            canActivate: [AuthGuard],
            data: { componentId: 305 }
          
          },
          {
            path: 'AuditApproveCompliance',
            component: AuditApproveComplianceComponent
          
          },
          {
            path: 'update-mapping-compliance',
            component: UpdateMappingComplianceComponent
          
          },

          
        ],
      },
// Risk Master pages 
{
  path: 'SuperAd_Common_Entity',
  component: AppComponent,
  children: [
    {
      path: 'risksupadmin-typeofrisk',
      component: RisksupadminTypeofriskComponent,
      canActivate: [AuthGuard],
      data: { componentId: 401 }
    },
    {
      path: 'risksupadmin-risk-classification',
      component: RisksupadminRiskClassificationComponent,
      canActivate: [AuthGuard],
      data: { componentId: 402 }
    },
    {
      path: 'risksupadmin-risk-impact-rating',
      component: RisksupadminRiskImpactRatingComponent,
      canActivate: [AuthGuard],
      data: { componentId: 403 }
    },

    {
      path: 'risk-likelihood-of-occ-factor',
      component: RiskLikelihoodOfOccFactorComponent,
      canActivate: [AuthGuard],
      data: { componentId: 404 }
    },
    {
      path: 'RiskCategorizationComponent',
      component: RiskCategorizationComponent,
      canActivate: [AuthGuard],
      data: { componentId: 405 }
    },
    {
      path: 'risk-cause-list',
      component: RiskCauseListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 406 }
    },
    {
      path: 'risk-priority',
      component: RiskPriorityComponent,
      canActivate: [AuthGuard],
      data: { componentId: 407 }
    },
    {
      path: 'potential-business-impact',
      component: PotentialBusinessImpactComponent,
      canActivate: [AuthGuard],
      data: { componentId: 408 }
    },
    {
      path: 'loss-event-threat-category-l1',
      component: LossEventThreatCategoryL1Component,
      canActivate: [AuthGuard],
      data: { componentId: 409 }
    },
    {
      path: 'loss-event-threat-category-l2',
      component: LossEventThreatCategoryL2Component,
      canActivate: [AuthGuard],
      data: { componentId: 410 }
    },
    {
      path: 'loss-event-threat-category-l3',
      component: LossEventThreatCategoryL3Component,
      canActivate: [AuthGuard],
      data: { componentId: 411 }
    },

    {
      path: 'app-risk-intensity',
      component: InherentRiskRatingLevelComponent,
      canActivate: [AuthGuard],
      data: { componentId: 412 }
    },

    {
      path: 'app-inherent-risk-rating-level',
      component: RiskIntensityComponent,
      canActivate: [AuthGuard],
      data: { componentId: 413 }
    },
    {
      path: 'Risk-Event-Frequency',
      component: RisksuperadmineventfrequencyComponent,
      canActivate: [AuthGuard],
      data: { componentId: 414 }
    },
    {
      path: 'Risk-Activity-Frequency',
      component: RisksuperadminactivityfrequencyComponent,
      canActivate: [AuthGuard],
      data: { componentId: 415 }
    },
  
  ],
},



{
  path: 'Super_control_matrix_attributes',
  component: AppComponent,
  children: [
    {
      path: 'app-nature-of-control-performance',
      component: NatureOfControlPerformanceComponent,
      canActivate: [AuthGuard],
      data: { componentId: 416 }
    },
    {
      path: 'app-nature-of-control-occurrence',
      component: NatureOfControlOccurrenceComponent,
      canActivate: [AuthGuard],
      data: { componentId: 417 }
    },
    {
      path: 'app-control-level',
      component: ControlLevelComponent,
      canActivate: [AuthGuard],
      data: { componentId: 418 }
    },

    {
      path: 'app-frequency-of-control-applied',
      component: FrequencyOfControlAppliedComponent,
      canActivate: [AuthGuard],
      data: { componentId: 419 }
    },
    {
      path: 'app-control-dependencies',
      component: ControlDependenciesComponent,
      canActivate: [AuthGuard],
      data: { componentId: 420 }
    },
    {
      path: 'app-risk-control-effective-rating',
      component: RiskControlEffectiveRatingComponent,
      canActivate: [AuthGuard],
      data: { componentId: 421 }
    },
    {
      path: 'control-risk-of-assessment',
      component: ControlRiskOfAssessmentComponent,
      canActivate: [AuthGuard],
      data: { componentId: 422 }
    },
    {
      path: 'residual-risk-rating',
      component: ResidualRiskRatingComponent,
      canActivate: [AuthGuard],
      data: { componentId: 423 }
    },
    {
      path: 'control-measure',
      component: ControlMeasureComponent,
      canActivate: [AuthGuard],
      data: { componentId: 424 }
    },
    {
      path: 'control-activity-type',
      component: ControlActivityTypeComponent,
      canActivate: [AuthGuard],
      data: { componentId: 425 }
    },
    {
      path: 'control-reference-type',
      component: ControlReferenceTypeComponent,
      canActivate: [AuthGuard],
      data: { componentId: 426 }
    },
    {
      path: 'control-Component',
      component: RisksuperadmincontrolcomponentComponent,
      canActivate: [AuthGuard],
      data: { componentId: 427 }
    },
    {
      path: 'control-Monitoring-Mechanism',
      component: RisksuperadmincontrolmonitoringmechanismComponent,
      canActivate: [AuthGuard],
      data: { componentId: 428 }
    },
    {
      path: 'mitigation-action-required',
      component: MitigationActionRequiredComponent,
      canActivate: [AuthGuard],
      data: { componentId: 439 }
    },
  
    {
      path: 'action-priority-list',
      component: ActionPriorityListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 440 }
    },
  
  
    
  
  ],
},


{
  path: 'Super_control_matrix_attributes',
  component: AppComponent,
  children: [
    {
      path: 'app-bp-maturity-rating-scale',
      component: BpMaturityRatingScaleComponent,
      canActivate: [AuthGuard],
      data: { componentId: 429 }
    },
    {
      path: 'app-control-hierarchy-setting',
      component: ControlHierarchySettingComponent,
      canActivate: [AuthGuard],
      data: { componentId: 430 }
    },
    {
      path: 'app-control-assessment-test-attr',
      component: ControlAssessmentTestAttrComponent,
      canActivate: [AuthGuard],
      data: { componentId: 431 }
    },

    {
      path: 'app-initial-assessment-impact-fact',
      component: InitialAssessmentImpactFactComponent,
      canActivate: [AuthGuard],
      data: { componentId: 432 }
    },
    {
      path: 'app-risk-mitig-decision-list',
      component: RiskMitigDecisionListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 433 }
    },
    {
      path: 'app-ass-control-accept-crite',
      component: AssControlAcceptCriteComponent,
      canActivate: [AuthGuard],
      data: { componentId: 434 }
    },

    {
      path: 'app-contr-test-para-rele-catg',
      component: ContrTestParaReleCatgComponent,
      canActivate: [AuthGuard],
      data: { componentId: 435 }
    },
    {
      path: 'risk-treatment-decision-list',
      component: RiskTreatmentDecisionListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 436 }
    },
    {
      path: 'risk-treatment-decision-matrix',
      component: RiskTreatmentDecisionMatrixComponent,
      canActivate: [AuthGuard],
      data: { componentId: 437 }
    },
    {
      path: 'control-test-decision-list',
      component: ControlTestDecisionListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 438 }
    },
   
  ],
},




//Risk part 2
{
  path: 'RiskAdmincontrol',
  component: AppComponent,
  children: [

    {    path: 'BusinessFunctionMappingComponent',
      component: RiskBusinessFunctionMappingComponent,
      canActivate: [AuthGuard],
      data: { componentId: 501 }
    },
    {
     path: 'updateBusinessfunction',
     component:UpdateRiskBusinessFunctionMappingComponent,
     canActivate: [AuthGuard],
     data: { componentId: 502 }
    },
    {
     path: 'KeyFocusAre',
     component:RiskKeyFocusAresComponent,
     canActivate: [AuthGuard],
     data: { componentId: 549 }
     },
     {
      path:'updatekeyfocusarea',
      component:RiskUpdateKeyFocusAreaComponent,
      canActivate: [AuthGuard],
      data: { componentId: 550 }
     },

 { 
  path:'overallappetite',
  component:RiskSetOverallRiskAppetiteComponent,
  canActivate: [AuthGuard],
  data: { componentId: 551 }
},
{
  path:'UpdateoverallriskAppetite',
  component:RiskUpdateOverallRiskAppetiteComponent,
  canActivate: [AuthGuard],
  data: { componentId: 552 }     
},
{
  path:'losseventtracker',
  component:RiskLossEventTrackerComponent,
  canActivate: [AuthGuard],
  data: { componentId: 553 }     
},
{
  path:'Updatelosseventtracker',
  component:UpdateriskLossEventTrackerComponent,
  canActivate: [AuthGuard],
  data: { componentId: 554 }     
},
{
  path:'Asessmenttemplatetype',
  component: RiskAssessmentTempleteTypeComponent,
  canActivate: [AuthGuard],
  data: { componentId: 555 }
},
{
  path:'Assessmenttemplatesubtype',
  component:RiskAssessmentTempleteSubtypeComponent,
  canActivate: [AuthGuard],
  data: { componentId: 556 }    
},
{
  path:'Definekeyare',
  component:RiskQuestionBankAttributeKeyAreComponent,
  canActivate: [AuthGuard],
  data: { componentId: 571 }
},
{
  path:'Definesubkeyarea',
  component:RiskQuestionbankSubKeyAreaComponent,
  canActivate: [AuthGuard],
  data: { componentId: 572 }
}
,
{
  path:'Commontemplaterule',
  component:RiskCommonAssessmentTemplateRulesComponent,
  canActivate: [AuthGuard],
  data: { componentId: 557 }
},
{
  path:'SamplingStandardsComponent',
  component:RiskSamplingStandardsComponent,
  canActivate: [AuthGuard],
  data: { componentId: 559 }    
},
{
  path:'UpdateRisksamplingstandards',
  component:RiskEditsamplingstandardsComponent,
  canActivate: [AuthGuard],
  data: { componentId: 560 }

},  
{
  path:'ViewAssessmenttemplate',
  component:ViewCommonAssesmentRulesComponent,
  canActivate: [AuthGuard],
  data: { componentId: 558}
},
  ],
 },

 {
  path: 'RiskMatrixAttributes',
  component: AppComponent,
  children: [

    {    path: 'app-risk-admin-typeof-risk',
      component: RiskAdminTypeofRiskComponent,
      canActivate: [AuthGuard],
      data: { componentId: 503 }
    },
    {
     path: 'app-risk-admin-risk-classification',
     component:RiskAdminRiskClassificationComponent,
     canActivate: [AuthGuard],
     data: { componentId: 504 }
    },
    {
     path: 'app-risk-admin-risk-impact-rating',
     component:RiskAdminRiskImpactRatingComponent,
     canActivate: [AuthGuard],
     data: { componentId: 505 }
     },
     {
      path:'app-risk-admin-risk-like-of-occu-factor',
      component:RiskAdminRiskLikeOfOccuFactorComponent,
      canActivate: [AuthGuard],
      data: { componentId: 506 }
     },
{
  path:'app-risk-admin-risk-categorization',
  component:RiskAdminRiskCategorizationComponent,
  canActivate: [AuthGuard],
  data: { componentId: 507 }
},
{
  path:'app-risk-admin-risk-cause-list',
  component:RiskAdminRiskCauseListComponent,
  canActivate: [AuthGuard],
  data: { componentId: 508 }
},
{
  path:'app-risk-admin-risk-priority',
  component:RiskAdminRiskPriorityComponent,
  canActivate: [AuthGuard],
  data: { componentId: 509 }
},
{
  path:'app-risk-admin-poten-bussin-impact',
  component:RiskAdminPotenBussinImpactComponent,
  canActivate: [AuthGuard],
  data: { componentId: 510 }
},
{
  path:'app-risk-admin-loss-evnt-thr-catg',
  component:RiskAdminLossEvntThrCatgComponent,
  canActivate: [AuthGuard],
  data: { componentId: 511 }
},
{
  path:'app-risk-admin-loss-evnt-thr-catg2',
  component:RiskAdminLossEvntThrCatg2Component,
  canActivate: [AuthGuard],
  data: { componentId: 512 }
},
{
  path:'app-risk-admin-loss-evnt-thr-catg3',
  component:RiskAdminLossEvntThrCatg3Component,
  canActivate: [AuthGuard],
  data: { componentId: 513 }
},
{
  path:'app-risk-admin-risk-appetite',
  component:RiskAdminRiskAppetiteComponent,
  canActivate: [AuthGuard],
  data: { componentId: 514 }
},
{
  path:'app-risk-admin-risk-tolerance',
  component:RiskAdminRiskToleranceComponent,
  canActivate: [AuthGuard],
  data: { componentId: 515 }
},
{
  path:'app-risk-admin-inherent-risk-rating-level',
  component:RiskAdminInherentRiskRatingLevelComponent,
  canActivate: [AuthGuard],
  data: { componentId: 516 }
},
{
  path:'app-risk-admin-risk-intensity',
  component:RiskAdminRiskIntensityComponent,
  canActivate: [AuthGuard],
  data: { componentId: 517 }
},
{
  path:'app-risk-admin-risk-event-frequency',
  component:RiskadmineventfrequencyComponent,
  canActivate: [AuthGuard],
  data: { componentId: 518 }
},
{
  path:'app-risk-admin-risk-activity-frequency',
  component:RiskadminactivityfrequencyComponent,
  canActivate: [AuthGuard],
  data: { componentId: 519 }
},

  ],
 },


 {
  path: 'RiskControlMatrix',
  component: AppComponent,
  children: [

    {    path: 'app-risk-admin-nat-cont-perf',
      component: RiskAdminNatContPerfComponent,
      canActivate: [AuthGuard],
      data: { componentId: 520 }
    },
    {
     path: 'app-risk-admin-nat-cont-occur',
     component:RiskAdminNatContOccurComponent,
     canActivate: [AuthGuard],
     data: { componentId: 521 }
    },
    {
     path: 'app-risk-admin-cont-lev',
     component:RiskAdminContLevComponent,
     canActivate: [AuthGuard],
     data: { componentId: 522 }
     },
     {
      path:'app-risk-admin-freqcont-app',
      component:RiskAdminFreqcontAppComponent,
      canActivate: [AuthGuard],
      data: { componentId: 523 }
     },
{
  path:'app-risk-admin-cont-depend',
  component:RiskAdminContDependComponent,
  canActivate: [AuthGuard],
  data: { componentId: 524 }
},
{
  path:'app-risk-admin-risk-conteff-rat',
  component:RiskAdminRiskCOnteffRatComponent,
  canActivate: [AuthGuard],
  data: { componentId: 525 }
},
{
  path:'app-risk-admin-cont-risk-ass',
  component:RiskAdminContRiskAssComponent,
  canActivate: [AuthGuard],
  data: { componentId: 526 }
},
{
  path:'app-risk-admin-residu-risk-rat',
  component:RiskAdminResiduRiskRatComponent,
  canActivate: [AuthGuard],
  data: { componentId: 527 }
},

{
  path:'app-risk-admin-cont-measure',
  component:RiskAdminContMeasureComponent,
  canActivate: [AuthGuard],
  data: { componentId: 528 }
},
{
  path:'app-risk-admin-intercontrcompon',
  component:RiskAdminIntercontrcomponComponent,
  canActivate: [AuthGuard],
  data: { componentId: 529 }
},
{
  path:'app-risk-admin-inter-cont-principle',
  component:RiskAdminInterContPrincipleComponent,
  canActivate: [AuthGuard],
  data: { componentId: 530 }
},
{
  path:'app-risk-admin-cont-activity-type',
  component:RiskAdminContActivityTypeComponent,
  canActivate: [AuthGuard],
  data: { componentId: 531 }
},
{
  path:'app-risk-admin-cont-act-nature',
  component:RiskAdminContActNatureComponent,
  canActivate: [AuthGuard],
  data: { componentId: 532 }
},
{
  path:'app-risk-admin-contr-actv-sub-nature',
  component:RiskAdminContrActvSubNatureComponent,
  canActivate: [AuthGuard],
  data: { componentId: 533 }
},
{
  path:'app-risk-admin-cont-asser-check',
  component:RiskAdminContAsserCheckComponent,
  canActivate: [AuthGuard],
  data: { componentId: 534 }
},
{
  path:'app-risk-admin-contr-refe-type',
  component:RiskAdminContrRefeTypeComponent,
  canActivate: [AuthGuard],
  data: { componentId: 535 }
},
{
  path:'app-risk-admin-contr-accep-bech-mark',
  component:RiskAdminContrAccepBechMarkComponent,
  canActivate: [AuthGuard],
  data: { componentId: 536 }
},
{
  path:'app-risk-admin-control-component',
  component:RiskadmincontrolcomponentComponent,
  canActivate: [AuthGuard],
  data: { componentId: 537 }
},
{
  path:'app-risk-admin-contr-monitoring-mech',
  component:RiskadmincontrolmonitoringmechanismComponent,
  canActivate: [AuthGuard],
  data: { componentId: 538 }
},
  ],
 },
 {
  path: 'AssessmentcontrolSetting',
  component: AppComponent,
  children: [

    {    path: 'app-risk-admin-bp-matur-rat-scale',
      component: RiskAdminBpMaturRatScaleComponent,
      canActivate: [AuthGuard],
      data: { componentId: 539 }
    },
    {
     path: 'app-risk-admin-contr-hier-sett',
     component:RiskAdminContrHierSettComponent,
     canActivate: [AuthGuard],
     data: { componentId: 540 }
    },
    {
      path: 'app-risk-admin-contrasstestatt',
      component:RiskAdminContrasstestattComponent,
      canActivate: [AuthGuard],
      data: { componentId: 541 }
     },
    {
     path: 'app-risk-admin-initia-ass-impact-rat',
     component:RiskAdminInitiaAssImpactRatComponent,
     canActivate: [AuthGuard],
     data: { componentId: 542 }
     },
     {
      path:'app-risk-admin-risk-mit-des-list',
      component:RiskAdminRiskMitDesListComponent,
      canActivate: [AuthGuard],
      data: { componentId: 543 }
     },
     {
path:'app-risk-admin-asse-contr-acct-cri',
component:RiskAdminAsseContrAcctCriComponent,
canActivate: [AuthGuard],
data: { componentId: 544 }
     },

{
  path:'app-risk-admin-risk-tr-deci-list',
  component:RiskAdminRiskTrDeciListComponent,
  canActivate: [AuthGuard],
  data: { componentId: 545 }
},
{
  path:'app-risk-admin-risktr-deci-matr',
  component:RiskAdminRisktrDeciMatrComponent,
  canActivate: [AuthGuard],
  data: { componentId: 546 }
},
  ],
 },

 {
  path: 'MitigationControlSettings',
  component: AppComponent,
  children: [

    {    path: 'app-risk-admin-mit-act-req',
      component: RiskAdminMitActReqComponent,
      canActivate: [AuthGuard],
      data: { componentId: 547 }
    },
    {
     path: 'app-risk-admin-action-prio-list',
     component:RiskAdminActionPrioListComponent,
     canActivate: [AuthGuard],
     data: { componentId: 548 }
    },
   
  ],
 },



// Risk Part3 
{
  path: 'Business_Mapping',
  component: AppComponent,
  children: [
    {
      path:'risk-business-process',
      component:RiskBusinessProcessComponent,
      canActivate: [AuthGuard],
      data: { componentId: 601 }
    },
    {
      path:'business-sub-processl1',
      component:RiskBusinessSubProcessl1Component,
      canActivate: [AuthGuard],
      data: { componentId: 602 }
    },
    {
      path:'business-sub-processl2',
      component:RiskBusinessSubProcessl2Component,
      canActivate: [AuthGuard],
      data: { componentId: 603 }
    },
    {
      path:'business-sub-processl3',
      component:RiskBusinessSubProcessl3Component,
      canActivate: [AuthGuard],
      data: { componentId: 604 }
    },
    {
      path:'risk-default-notifiers',
      component:RiskDefaultNotifiersComponent,
      canActivate: [AuthGuard],
      data: { componentId: 608 }
    },
  ]},

  {
    path: 'Risk_Matrix',
    component: AppComponent,
    children: [
      {
        path:'view-risk-matrix',
        component:ViewRiskMatrixComponent,
        canActivate: [AuthGuard],
        data: { componentId: 615 }
      },
      
    ]},
    {
      path: 'Risk_Library',
      component: AppComponent,
      children: [
        {
          path:'risk-statement',
          component:RiskStatementComponent,
          canActivate: [AuthGuard],
          data: { componentId: 606 }
        },
        {
          path:'editriskstatement',
          component:EditriskstatementComponent,
          
        },
        {
          path:'viewriskstatement',
          component:ViewriskstatementComponent,
         
        },
        {
          path:'deleteriskstatement',
          component:DeleteriskstatementComponent
        },
        {
          path:'reactivateriskstatement',
          component:ReactivateriskstatementComponent
        },
        {
          path:'viewlistriskstatement',
          component:ViewlistriskstatementComponent
        },
       
      ]},

      {
        path: 'CreateRisk_Document',
        component: AppComponent,
        children: [
          {
            path:'risk-createrisk-document',
            component:RiskCreateriskDocumentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 605 }
          },
          {
            path:'view-risk-register',
            component:ViewRiskRegisterComponent,
            canActivate: [AuthGuard],
            data: { componentId: 611 }
            
          },
         
          {
            path:'view-list-risk-statement',
            component:ViewListRiskStatementComponent,
            canActivate: [AuthGuard],
            data: { componentId: 611 }
          },
          {
            path:'edit-risk-register',
            component:EditRiskRegisterComponent
          }, 
         
        
          {
            path:'create-control-document',
            component:CreateControlDocumentComponent,
            canActivate: [AuthGuard],
            data: { componentId: 612 }
          },
    
          {
            path:'reactivateriskstatement',
            component:ReactivateriskstatementComponent,
            canActivate: [AuthGuard],
            data: { componentId: 617 }
          },
        
          
        ]},
    {
      path: 'Control_Matrix',
      component: AppComponent,
      children: [
       {
          path:'view-control-matrix',
          component:ViewControlMatrixComponent,
          canActivate: [AuthGuard],
          data: { componentId: 616 }
        },
        
      ]},
      {
        path: 'Control_Library',
        component: AppComponent,
        children: [
          {
            path:'createcontrolstatement',
            component:CreatecontrolstatementComponent,
            canActivate: [AuthGuard],
            data: { componentId: 610 }
          },
          {
            path:'edit-control-statement',
            component:EditControlStatementComponent,
            canActivate: [AuthGuard],
            data: { componentId: 613 }
          },
          {
            path:'view-control-statement',
            component:ViewControlStatementComponent,
            canActivate: [AuthGuard],
            data: { componentId: 614 }
          },
          
        ]},
      //profile
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'raiseQuery',
        component: RaiseQueriesComponent,
        pathMatch: 'full',
      },
      {
        path: 'track-status',
        component: TrackStatusComponent,
        pathMatch: 'full',
      },
      {
        path: 'Review-Query',
        component: ReviewQueryStatusComponent,
        pathMatch: 'full',
      },
      {
        path: 'Notification',
        component: NotificationCenterComponent,
        pathMatch: 'full',
      },
    ],
  },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
