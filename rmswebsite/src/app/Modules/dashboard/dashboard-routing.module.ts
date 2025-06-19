import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentIdList } from '../../shared/comsponent-list';
import { InspectionComponent } from '../inspections/inspection.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { RoleComponent } from '../role/role.component';
import { UserComponent } from '../user/user.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from '../report/report.component';
import { ProjectlistComponent } from '../project/projectlist/projectlist.component';
import { ProjetComponent } from '../project/project.component';
import { ProductComponent } from '../product/product.component';
import { ManufacturerComponent } from '../manufacturer/manufacturer.component';
import { AppComponent } from 'src/app/app.component';
import { MasterComponent } from '../master/master.component';
import { CommonEntityAttributesComponent } from '../common-entity-attributes/common-entity-attributes.component';
import { CommoncomplianceattributesComponent } from '../common-compliance-attributes/common-compliance-attributes.component';
import { Title } from 'chart.js';


//import { GovernanceQuestionBankComponent } from '../governance-question-bank/governance-question-bank.component';
//import { ScoreIndicatorComponent } from '../GovernanceAssessment/score-indicator/score-indicator.component'

export const routes1 = [
  //Governance Module
  {
    path: 'governance',
    component: AppComponent,
    label: 'Governance',
    icon: '../../../assets/images/Dashboard/Inventory.svg',
    tabs: [
      //Governance Control Assessment
      {
        label: 'Governance Control Assessment',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          {
            label: "Governance Question Bank",
            pages: [
              { id: ComponentIdList.AddQuestionsComponent,title: "Add Questions", link: 'governance-question-bank/add-questions' },
              { id: ComponentIdList.EditQuestionsComponent,title: "Edit Questions", link: 'governance-question-bank/edit-questions' },
              { id: ComponentIdList.DisableQuestionComponent,title: "Disable Questions", link: 'governance-question-bank/disable-question' },
              { id: ComponentIdList.ReactivateQuestionsComponent,title: "Reactivate Questions", link: 'governance-question-bank/reactivate-questions' },
              { id: ComponentIdList.MyQuestionsComponent,title: "My Questions", link: 'governance-question-bank/my-questions' },
              { id: ComponentIdList.QuestionBankReserveComponent ,title: "Question Bank Reserve", link: 'governance-question-bank/question-bank-reserve' },
              { id: ComponentIdList.BulkUploadQuestionsComponent,title: "Bulk Upload Questions", link: 'governance-question-bank/bulk-upload-questions' }
            ]
          },
          {
            label: "Governance Assessment Template",
            pages: [
              { id: ComponentIdList.AssessmentBuilderComponent,title: "Assessment Builder", link: 'Governance-Assessment/assessment-builder' },
              { id: ComponentIdList.CustomizedAssessmentComponent,title: "Customized Assessment", link: 'Governance-Assessment/customized-assessment' }
            ]
          },
          {
            label: "Assessment Template Library",
            pages: [
              { id: ComponentIdList.UpdateAssessmentTemplateComponent,title: "Update Assessment Template", link: 'assessment-template-library/update-assessment-template' },
              { id: ComponentIdList.ReactiveAssessmentTemplateComponent,title: "Re-activate Assessment Template", link: 'assessment-template-library/reactive-assessment-template' },
              { id: ComponentIdList.ViewAssessmentTemplateComponent,title: "View Assessment Template", link: 'assessment-template-library/view-assessment-template' },
              { id: ComponentIdList.DisableAssessmentTemplateComponent,title: "Disable Assessment Template", link: 'assessment-template-library/disable-assessment-template' }
            ]
          },
          {
            label: "Map Assessment Template Access",
            pages: [
              { id: ComponentIdList.ProvideAccessComponent ,title: "Provide Access", link: 'map-assessment-template-access' },
              { id: ComponentIdList.EditAccessComponent,title: "Edit Access", link: 'map-assessment-template-access/edit-access' },
              { id: ComponentIdList.RemoveAccessComponent,title: "Remove Access", link: 'map-assessment-template-access/remove-access' }
            ]
          },
          {
            label: "Scheduled Assessment",
            pages: [
              { id: ComponentIdList.RepeatFrequencyComponent ,title: "Internal Repeat Frequency", link: 'schedule-assessment-internal/repeat-frequency' },
            //  { id: ComponentIdList.OneTimeFrequencyComponent,title: "External One-time Frequency", link: 'schedule-assessment-internal/one-time-frequency' },
              { id: ComponentIdList.SelfRepeatFrequencyComponent,title: "Self Repeat Frequency", link: 'schedule-assessment-internal/self-repeat-frequency' },
             // { id: ComponentIdList.OneTimeFrequencySelfComponent ,title: "Self One-time Frequency", link: 'schedule-assessment-internal/one-time-frequency-self' },
              { id: ComponentIdList.InitiateExternalAssessmentComponent,title: "Initiate External Assessment", link: 'schedule-assessment-internal/initiate-external-assessment' },
              //{ id: ComponentIdList.OneTimeFrequencyComponent,title: "Internal One-time Frequency", link: 'schedule-assessment-internal/one-time-frequency' }
            ]
          },
          {
            label: "Begin Assessment",
            pages: [
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "Begin Assessment Scheduled", link: 'Begin-Assessement' }
            ]
          },
          {
            label: "Assessment Result",
            pages: [
              { id: ComponentIdList.MonitoredAssessmentsComponent,title: "Monitored Assessment", link: 'assessment-result/monitored-assessments' },
              { id: ComponentIdList.MyAssessmentComponent,title: "My Assessments", link: 'assessment-result/my-assessment' },
              { id: ComponentIdList.ScheduledAssessmentsMitigationComponent,title: "Scheduled Assessment", link: 'mitigation-controls/scheduled-assessments-mitigation' }
            ]
          },
          {
            label: "Manage Assessments",
            pages: [
              { id: ComponentIdList.QuestionBankReserveComponent ,title: "Monitored Assessments", link: 'governance-question-bank/question-bank-reserve' },
              { id: ComponentIdList.MyQuestionsComponent,title: "My Assessments", link: 'governance-question-bank/my-questions' }
            ]
          },
          {
            label: "Assessment Mitigation",
            pages: [
              { id: ComponentIdList.ManagementinputsComponent,title: "Management Inputs", link: 'mitigation-controls/managementinputs'},
              { title: "Acknowledge Mitigation Tasks", link: "/module1/tab1/menu1/component2" },
              { id: ComponentIdList.UpdateMitigationActionComponent,title: 'Update Mitigation Action', link: 'mitigation-controls/update-mitigation-action'  },
              { id: ComponentIdList.MyMitigationTasksComponent,title: 'My Mitigation Tasks', link: 'mitigation-controls/my-mitigation-tasks' },
              { id: ComponentIdList.ViewActionTakenMitigationComponent,title: 'View Action Taken', link: 'mitigation-controls/view-action-taken-mitigation' },
              // { label: "My Mitigation Tasks", path: "/module1/tab1/menu1/component2" },
              // { label: "View Action Taken", path: "/module1/tab1/menu1/component2" }
            ]
          },



          {
            label: "Governance Assessment Reports",
            pages: [
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "Assessment Performance Indicators Analysis", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessments Completed with Result", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessments Completed with Result", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessments Scheduled with Status", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessments Scheduled with Status", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Acknowledgement Requested Assessments", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessment Templates Access Mapping", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessment Templates Disabled", link: 'Begin-Assessement' },
              { id: ComponentIdList.BeginassessmentscheduleComponent,title: "List of Assessment Templates", link: 'Begin-Assessement' },
              { id: ComponentIdList.QuestionBankReserveListingComponent,title: "Question Bank Reserve Listing", link: 'ReportsGCA/app-question-bank-reserve-listing' },
              { id: ComponentIdList.MyQuestionBankListingComponent,title: "My Question Bank Listing", link: 'ReportsGCA/app-my-question-bank-listing' },
              { id: ComponentIdList.MitigationActionPlanComponent,title: "Mitigation Action Plan", link: 'ReportsGCA/app-mitigation-action-plan' }
            ]
          },



        ],

      },
     //Module Admin Management
     {
      label: 'Module Admin Management',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        {
          label: "Default Notifier",
          pages: [
            { id: ComponentIdList.DefaultNotifierComponent,title: "Default Notifier", link: 'inspection/default-notifier'},
          ]
        },
        {
          label: "Govenance Document Attributes",
          pages: [
            { id: ComponentIdList.MonitoredAssessmentsComponent,title: "Nature of Document", link: 'assessment-result/monitored-assessments' },
            { id: ComponentIdList.AuthorityNameComponent,title: "Authority Name", link: 'inspection/authority-name' },
            { id: ComponentIdList.InspectorInspectionListComponent,title: "Authority Type", link: 'inspection/inspector-inspection-list' },
            { id: ComponentIdList.InspectionListComponent,title: "Document Type", link: 'inspection/inspection-list' },
            { id: ComponentIdList.QuestionBankComponent,title: "Document Category", link: 'inspection/question-bank' },
            { id: ComponentIdList.AssignedInspectionListComponent,title: "Document Sub Category", link: 'inspection/assigned-inspection-list' },
            { id: ComponentIdList.ScheduledAssessmentsMitigationComponent,title: "Document Confidentiality", link: 'mitigation-controls/scheduled-assessments-mitigation' }
          ]
        },
        {
          label: "Governance Assessment Attributes",
          pages: [
            { id: ComponentIdList.CheckLevelComponent,title: 'Check Level', link: 'governance-question-bank/check-level' },
            { id: ComponentIdList.DefineTopicComponent,title: 'Define Topic', link: 'governance-question-bank/define-topic' },
            { id: ComponentIdList.DefineSubjectComponent,title: 'Define Subject', link: 'governance-question-bank' },
            { title: 'Assessment Template Attributes Sub-Type', link: 'reports/govassessment/risk' },
            { title: 'Assessment Template Attributes Type Master', link: 'reports/govassessment/metrics' },
            { id: ComponentIdList.KeyImprovementIndicatorsComponent,title: 'Key Improvement Indicators', link: 'Governance-Assessment/key-improvement-indicators' },
            { id: ComponentIdList.CompetencySkillLevelComponent,title: 'Competency Skill Levels', link: 'Governance-Assessment/competency-skill-level' },
            { id: ComponentIdList.ScoreIndicatorComponent,title: 'Score Indicators', link: 'Governance-Assessment' },
          ]
        },

      ],

     },
     //Governance Control Tasks
     {
      label: 'Governance Control Tasks',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        {
          label: "Document Awareness",
          pages: [
            { id: ComponentIdList.AckRequestComponent,title: "Acknowledgement Requested", link: 'inventory/ack-request'},
            { id: ComponentIdList.DocUserAccessComponent,title: "Document User Accessibility", link: 'inventory/doc-user-access'},
            { id: ComponentIdList.DocRepositoryComponent,title: "Document Repository", link: 'inventory/doc-repository'},
          ]
        },
        {
          label: "Govenance Dashboard",
          pages: [
            { id: ComponentIdList.MonitoredAssessmentsComponent,title: "My Tasks and Monitored Tasks", link: 'assessment-result/monitored-assessments' },
          ]
        },
        {
          label: "Governance Control Reports",
          pages: [
            { id: ComponentIdList.CheckLevelComponent,title: 'List of Published Document Repository', link: 'governance-question-bank/check-level' },
          ]
        },

      ],

     },
     //Governance Content Management
     {
      label: 'Governance Content Management',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        {
          label: "Governance Content Reports",
          pages: [
           // { id: ComponentIdList.DocAccessStatusListComponent,title: "List of Document Accessibility Status", link: 'inventory/ack-request'},
           { id: ComponentIdList.DocAccessStatusListComponent,title: "List of Document Accessibility Status", link: 'ReportsGCT/app-doc-access-status-list'},
           { id: ComponentIdList.DocAccessMappingStatusListComponent,title: "List of Document Access Mapping Status", link: 'ReportsGCT/app-doc-access-mapping-status-list'},
            { id: ComponentIdList.AckRequestedDocListComponent,title: " List of Acknowledgement Requested Documents", link: 'ReportsGCT/app-ack-requested-doc-list'},
            { id: ComponentIdList.PublisheddocreviewstatusComponent,title: "List of Published Document Review Status", link: 'ReportsGCT/app-publisheddocreviewstatus'},
            { id: ComponentIdList.DisableddocumentslistComponent,title: "List of Disabled Published Documents", link: 'ReportsGCT/app-disableddocumentslist'},
            { id: ComponentIdList.DocumentversoninglistComponent,title: "List of Published Document Versoning", link: 'ReportsGCT/app-documentversoninglist'},
            { id: ComponentIdList.DocumentdraftsavedlistComponent,title: "List of Document draft saved", link: 'ReportsGCT/app-documentdraftsavedlist'},
            { id: ComponentIdList.DiscardeddraftlistComponent,title: "List of Discarded Draft", link: 'ReportsGCT/app-discardeddraftlist'},
          ]
        },
        {
          label: "Publish Governance Document",
          pages: [
            { id: ComponentIdList.BridgeListComponent,title: "Add Document", link: 'inventory/bridge-list' },
            { id: ComponentIdList.BridgeMasterComponent,title: 'Saved Drafts', link: 'inventory/bridge-master' },
          ]
        },
        {
          label: "Published Document Listing",
          pages: [
            { id: ComponentIdList.DocRevPeriodStatusComponent,title: 'Document Review Period Status', link: 'inspection/doc-rev-period-statu' },
            { id: ComponentIdList.PubNewVerComponent,title: 'Version Change', link: 'inspection/pub-new-ver' },
            { id: ComponentIdList.ReactivatePubDocComponent,title: 'Reactive Published Document', link: 'inspection/reactivate-pub-doc' },
            { id: ComponentIdList.ViewPubDocComponent,title: 'View Published Document', link: 'inspection/view-pub-doc' },
            { id: ComponentIdList.DisablePubDocComponent,title: 'Disable Published Document', link: 'inspection/disable-pub-doc' },
          ]
        },
        {
          label: "User Access Mapping",
          pages: [
            { id: ComponentIdList.ViewUserAccessDocumentComponent,title: 'View Access', link: 'report/view-user-access-document' },
            { id: ComponentIdList.RemedyBankComponent,title: 'Edit Access', link: 'report/remedy-ban' },
            { id: ComponentIdList.ReportListComponent,title: 'Provide Access', link: 'report/report-list' },
            { id: ComponentIdList.RemoveUserAccessComponent,title: 'Remove Access', link: 'report/remove-user-access' },
          ]
        },

      ],

     },
     // For Admin Masters
     {
      label: 'Governance Masters',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        {
          label: "Masters",
          //icon: '../../../assets/images/Dashboard/Inventory.svg',
          pages: [
           { id: ComponentIdList.DepartmentMasterComponent,title: 'Department',link: 'Master/department-master'},
           { id: ComponentIdList.TPAEntityComponent,title: 'TPA-Entity',link: 'Master/TPA-entity-master'},
           { id: ComponentIdList.EntityMasterComponent,title: 'Entity',link: 'Master/entity-master'},
           { id: ComponentIdList.UnitLocationMasterComponent,title: 'Unit Location',link: 'Master/unit-location-master'},
           { id: ComponentIdList.UserLocationMappingComponent,title: 'User Location Mapping',link: 'Master/user-location-mapping'},
           { id: ComponentIdList.AdminConfigComponent,title: 'Upload FileConfig',link: 'Master/admin-config'},
           { id: ComponentIdList.TaskMasterComponent,title: 'App Module',link: 'inspection/TaskMaster'},
           { id: ComponentIdList.AddUserRoleComponent,title: 'Add User Role',link: 'inspection/add-user-role'},
           { id: ComponentIdList.ReviewStatusSettingsComponent, title: 'Review Status Master',link: 'SuperAd_Common_Entity/review-status-settings'},
          ]
        },
      ],
     },
     //For Admin Menu GGT Management
     {
      label: 'GGT Management',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        {
          label: "GGT Governance",
          //icon: '../../../assets/images/Dashboard/Inventory.svg',
          pages: [
          { id: ComponentIdList.MyTasksComponent,title: 'My Tasks', link: 'GGT_Governance/my-tasks', },
          { id: ComponentIdList.MonitoredTasksComponent,title: 'Monitored Tasks',link: 'GGT_Governance/monitored-tasks', },
          { id: ComponentIdList.HelpDeskComponent,title: 'Help Desk', link: 'GGT_Governance/help-desk',},
                ]
        },
        {
          label: "User Management",
          pages: [
            { id: ComponentIdList.UserListComponent,title: ' User Managment',link: 'user',},
            { id: ComponentIdList.ViewtpiuserComponent, title: 'TPA User Managment', link: 'schedule-assessment-internal/view-tpa-user',},
            ]
        },
        {
          label: "Role Management",
          pages: [
            { id: ComponentIdList.RoleListComponent,title: 'Role Management', link: 'role' },
          ]
        },

      ],

     },
    ],
  },
  //Risk Module
  {
    path: 'risk',
    component: AppComponent,
    label: 'Risk',
    icon: '../../../assets/images/Dashboard/Inventory.svg',
    tabs: [
      //Risk Control Assessment
      {
        label: 'Risk Control Assessment',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          {
            label: "Risk Registration",
            pages: [
              { id: ComponentIdList.ManagementinputsComponent,title: "Risk Management Inputs", link: 'mitigation-controls/managementinputs'},
              { title: "Risk Acknowledge Mitigation Tasks", link: "/module1/tab1/menu1/component2" },
              { id: ComponentIdList.UpdateMitigationActionComponent,title: 'Risk Update Mitigation Action', link: 'mitigation-controls/update-mitigation-action'  },
              { id: ComponentIdList.MyMitigationTasksComponent,title: 'Risk My Mitigation Tasks', link: 'mitigation-controls/my-mitigation-tasks' },
              { id: ComponentIdList.ViewActionTakenMitigationComponent,title: 'Risk View Action Taken', link: 'mitigation-controls/view-action-taken-mitigation' },
            ]
          },
          {
            label: "Risk Assessment Result",
            pages: [
              { id: ComponentIdList.MonitoredAssessmentsComponent,title: "Risk Monitored Assessment", link: 'assessment-result/monitored-assessments' },
              { id: ComponentIdList.MyAssessmentComponent,title: "Risk My Assessments", link: 'assessment-result/my-assessment' },
              { id: ComponentIdList.ScheduledAssessmentsMitigationComponent,title: "Risk Scheduled Assessment", link: 'mitigation-controls/scheduled-assessments-mitigation' }
            ]
          },

        ],

      },

    ],
  },
  

];


export const routes = [
  //Governance Module
  {
    path: 'governance',
    component: AppComponent,
    label: 'GOVERNace',
    icon: '../../../assets/images/g-sidelogo2.png',
    tabs: [
//Governance Control Tasks
      {
        label: 'Governance Control Tasks',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          {
            id: ComponentIdList.MasterComponent,
            path: 'dashboard',
            component: AppComponent,
            icon: '../../../assets/images/Dashboard/Inventory.svg',
            label: "Govenance Documents Dashboard",  
            pages: [
              
              { id: ComponentIdList.TaskownerDashboardComponent, title: 'My Tasks', link: 'Dashboards/taskowner-dashboard'},// TaskOwner 
              { id: ComponentIdList.HomeComponent,  title: 'Content Controller Dashboard', link: 'Dashboards/contentcontroller-dashboard'},
              {id: ComponentIdList.ManagementDashboardComponent, title: 'Management Dashboard', link: 'Dashboards/management-dashboard'},
            ]
            // pages: [
            //   { id: ComponentIdList.MonitoredAssessmentsComponent,title: "My Tasks and Monitored Tasks", link: 'assessment-result/monitored-assessments' },
            // ]
          },
          // {
          //   label:"Governance Documents Dashboard", // under Governance Control Tasks
          //   pages:[
          //     { id: ComponentIdList.MyTasksComponent,title: 'My Tasks', link: 'GGT_Governance/my-tasks', },
          //     { id: ComponentIdList.MonitoredTasksComponent,title: 'Monitored Tasks',link: 'GGT_Governance/monitored-tasks', },
          //   ]
          // },
          {
             label: "Governance Control Reports",  // under Governance Control Tasks in DB 77
            pages: [
              {id:ComponentIdList.PubDocRepositoryComponent,title:"List of Document Repository",link: 'ReportsGCT/app-pub-doc-repository'}
              //{ id: ComponentIdList.PublishedDocListComponent,title: "List of Published Documents (Depository)", link: 'ReportsGCT/published-doc-list'},

  
              ]
          },
          {
           label: "Governance Documents",  // under Governance Control Tasks
            pages: [
              { id: ComponentIdList.AckRequestComponent,title: "Acknowledgement Requested", link: 'inventory/ack-request'},
              { id: ComponentIdList.DocUserAccessComponent,title: "Access Governance Document Here", link: 'inventory/doc-user-access'},
              { id: ComponentIdList.DocRepositoryComponent,title: "Governance Documents Repository", link: 'inventory/doc-repository'},
            ]
          },
      ]
   
   // -------------------------- FInish of Governance control Tasks -----------------------------------------------------------------
    },
         //Governance Content Management
         {
          label: 'Governance Content Management',
          icon: '../../../assets/images/Dashboard/Inventory.svg',
          menuItems: [
            {
              label: "Governance Content Reports",
              pages: [
              { id: ComponentIdList.PublishedDocListComponent,title: "List of Published Documents (Depository)", link: 'ReportsGCT/published-doc-list'},

                 //{ id: ComponentIdList.DocAccessStatusListComponent,title: "List of Document Accessibility Status", link: 'inventory/ack-request'},
                { id: ComponentIdList.DocAccessStatusListComponent,title: "List of Document Accessibility Status", link: 'ReportsGCT/app-doc-access-status-list'}, // in DB 84
                { id: ComponentIdList.DocAccessMappingStatusListComponent,title: "List of Document Access Mapping Status", link: 'ReportsGCT/app-doc-access-mapping-status-list'}, //85
                { id: ComponentIdList.AckRequestedDocListComponent,title: " List of Acknowledgement Requested Documents", link: 'ReportsGCT/app-ack-requested-doc-list'}, //83
                { id: ComponentIdList.PublisheddocreviewstatusComponent,title: "List of Published Document Review Status", link: 'ReportsGCT/app-publisheddocreviewstatus'},//82
                { id: ComponentIdList.DisableddocumentslistComponent,title: "List of Disabled Published Documents", link: 'ReportsGCT/app-disableddocumentslist'},//81
                { id: ComponentIdList.DocumentversoninglistComponent,title: "List of Published Document Versioning", link: 'ReportsGCT/app-documentversoninglist'},//80
                { id: ComponentIdList.DocumentdraftsavedlistComponent,title: "List of Document Drafts Saved", link: 'ReportsGCT/app-documentdraftsavedlist'},// 79
                { id: ComponentIdList.DiscardeddraftlistComponent,title: "List of Discarded Drafts", link: 'ReportsGCT/app-discardeddraftlist'},// 78
                
               // {id:ComponentIdList.PubDocRepositoryComponent,title:"List of Document Repositry",link: 'ReportsGCT/app-pub-doc-repository'}
              ]
            },
            {
              label: "Publish Governance Document",
              pages: [
                { id: ComponentIdList.BridgeListComponent,title: "Add Document", link: 'inventory/bridge-list' },
                { id: ComponentIdList.BridgeMasterComponent,title: 'Saved Drafts', link: 'inventory/bridge-master' },
              ]
            },

            {
              label: "Published Document Listing",
              pages: [
                { id: ComponentIdList.ViewPubDocComponent,title: 'View Published Document', link: 'inspection/view-pub-doc' },
                {id:ComponentIdList.UpdatePubDocComponent,title:' Update Published Document',link:'inspection/update-pub-doc'},
                { id: ComponentIdList.DisablePubDocComponent,title: 'Disable Published Document', link: 'inspection/disable-pub-doc' },
                { id: ComponentIdList.ReactivatePubDocComponent,title: 'Reactivate Published Document', link: 'inspection/reactivate-pub-doc' },
                { id: ComponentIdList.PubNewVerComponent,title: 'Published Document Versioning', link: 'inspection/pub-new-ver' },
                { id: ComponentIdList.DocRevPeriodStatusComponent,title: 'Document Review Period Status', link: 'inspection/doc-rev-period-status' },
               
                
              ]
            },
            {
              label: "User Access Mapping",
              pages: [
                { id: ComponentIdList.ReportListComponent,title: 'Provide Access', link: 'report/report-list' },
                { id: ComponentIdList.RemedyBankComponent,title: 'Edit Access', link: 'report/remedy-bank' },
                { id: ComponentIdList.RemoveUserAccessComponent,title: 'Remove Access', link: 'report/remove-user-access' },
                { id: ComponentIdList.ViewUserAccessDocumentComponent,title: 'View User Access Document', link: 'report/view-user-access-document' },
              ]
            },
          
    
          ],
    
         },

          //Module Admin Management
       {
        label: 'Module Admin Management',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          {
            label: "Masters",
            //icon: '../../../assets/images/Dashboard/Inventory.svg',
            pages: [
             { id: ComponentIdList.DepartmentMasterComponent,title: 'Department',link: 'Master/department-master'},
             { id: ComponentIdList.TPAEntityComponent,title: 'TPA-Entity',link: 'Master/TPA-entity-master'},
             { id: ComponentIdList.EntityMasterComponent,title: 'Entity',link: 'Master/entity-master'},
             { id: ComponentIdList.UnitLocationMasterComponent,title: 'Unit Location',link: 'Master/unit-location-master'},
             { id: ComponentIdList.UserLocationMappingComponent,title: 'User Location Mapping',link: 'Master/user-location-mapping'},
             { id: ComponentIdList.AdminConfigComponent,title: 'Upload FileConfig',link: 'Master/admin-config'},
             { id: ComponentIdList.TaskMasterComponent,title: 'App Module',link: 'inspection/TaskMaster'},
             { id: ComponentIdList.AddUserRoleComponent,title: 'Add User Role',link: 'inspection/add-user-role'},
             { id: ComponentIdList.ReviewStatusSettingsComponent, title: 'Review Status Master',link: 'SuperAd_Common_Entity/review-status-settings'},
            ]
          },
          {
            // path: '',
            // component: InspectionComponent,
            // icon: '../../../assets/images/Dashboard/Inspection.svg',
            label: "Governance Document Attributes",
            pages: [
              // { title: "Nature of Document", link: '' },
              { id: ComponentIdList.InspectionListComponent,title: "Document Type", link: 'inspection/inspection-list' },
              { id: ComponentIdList.QuestionBankComponent,title: "Document Category", link: 'inspection/question-bank' },
              { id: ComponentIdList.AssignedInspectionListComponent,title: "Document Sub Category", link: 'inspection/assigned-inspection-list' },
              { id: ComponentIdList.InspectorInspectionListComponent,title: "Authority Type", link: 'inspection/inspector-inspection-list' },
              { id: ComponentIdList.AuthorityNameComponent,title: "Authority Name", link: 'inspection/authority-name' },
              { id: ComponentIdList.ReviewerInspectionListComponent,title: "Document Classification", link: 'inspection/reviewer-inspection-list' },
              { id: ComponentIdList.DefaultNotifierComponent,title: "Default Notifiers", link: 'inspection/default-notifier' }
            ]
          },
          {
            // id: ComponentIdList.ScoreIndicatorComponent,
            // path: 'Governance-Assessment',
            // component: AppComponent,
            // icon: '../../../assets/images/Dashboard/Users.svg',
            label: "Governance Assessment Attributes",
            pages: [
              { id: ComponentIdList.CheckLevelComponent,title: 'Competency Check Level', link: 'governance-question-bank/check-level' },
                  { id: ComponentIdList.DefineSubjectComponent,title: 'Define Subject', link: 'governance-question-bank' },
              { id: ComponentIdList.DefineTopicComponent,title: 'Define Topic', link: 'governance-question-bank/define-topic' },
          { id: ComponentIdList.DefineTypeComponent,title: 'Assessment Template Type ', link: 'Governance-Assessment/define-type' },
              { id: ComponentIdList.DefinesubtypeComponent,title: 'Assessment Template  Sub-Type', link: 'Governance-Assessment/define-sub-type' },
                { id: ComponentIdList.ScoreIndicatorComponent,title: 'Score Indicators', link: 'Governance-Assessment' },
              { id: ComponentIdList.CompetencySkillLevelComponent,title: 'Competency Skill Levels', link: 'Governance-Assessment/competency-skill-level' },
             { id: ComponentIdList.KeyImprovementIndicatorsComponent,title: 'Key Improvement Indicators', link: 'Governance-Assessment/key-improvement-indicators' },
            ]
          },
          {
            label: "User Management",
            pages: [
              { id: ComponentIdList.UserListComponent,title: ' User Management',link: 'user',},
              { id: ComponentIdList.ViewtpiuserComponent, title: 'TPA User Management', link: 'schedule-assessment-internal/view-tpa-user',},
              ]
          },
          {
            label: "Role Management",
            pages: [
              { id: ComponentIdList.RoleListComponent,title: 'Role Management', link: 'role' },
            ]
          },

        ],

       },

  
     //Governance Control Assessment
     {
      label: 'Governance Control Assessment',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        // GCA Reports

        {
          id: ComponentIdList.MasterComponent,
          path: 'ReportsGCA',
          component: AppComponent,
          //label: 'GCA Reports ',
          icon: '../../../assets/images/Dashboard/Inventory.svg',
          label: "Governance Assessment Reports",
          pages: [
            {
              id: ComponentIdList.AssessTempListComponent,
              title: 'Assessment Templates',
              link: 'ReportsGCA/assess-temp-list',
            },
            {
              id: ComponentIdList.AssessDisabledTempListComponent,
              title: 'Assessment Templates Disabled',
              link: 'ReportsGCA/assess-disabled-temp-list',
            },
            {
              id: ComponentIdList.AssessTempAccessMappingComponent,
              title: 'Assessment Templates Access Mapping',
              link: 'ReportsGCA/assess-temp-access-mapping',
            },
            {
              id: ComponentIdList.AckreqassessmentComponent,
              title: 'Acknowledgement Requested Assessments',
              link: 'ReportsGCA/app-ackreqassessment',
            },
            {
              id: ComponentIdList.ScheduledassessmentstatuslistComponent,
              title: 'Assessments Scheduled With Status(Task Owners)',
              link: 'ReportsGCA/app-scheduledassessmentstatuslist',
            },
            {
              id: ComponentIdList.ScheduledasslistwithstatusComponent,
              title: 'Assessments Scheduled With Status',
              link: 'ReportsGCA/app-scheduledasslistwithstatus',
            },
            {
              id: ComponentIdList.AssesscompletedwithresultComponent,
              title: 'Assessments Completed With Result',
              link: 'ReportsGCA/app-assesscompletedwithresult',
            },
            {
              id: ComponentIdList.AssessresulttaskownerComponent,
              title: 'Assessments Completed With Result(Task Owner)',
              link: 'ReportsGCA/app-assessresulttaskowner',
            },
            {
              id: ComponentIdList.AssessPerfIndicatorsAnalysisComponent,
              title: 'Performance Indicators Analysis',
              link: 'ReportsGCA/app-assess-perf-indicators-analysis',
            },
            {
              id: ComponentIdList.MitigationActionPlanComponent,
              title: 'Mitigation Action Plan',
              link: 'ReportsGCA/app-mitigation-action-plan',
            },
                 {
              id: ComponentIdList.CrcMitigationActionPlanComponent,
              title: 'Mitigation Action Plan(Monitoring)',
              link: 'ReportsGCA/CrcMitigationActionPlanComponent',
            },
            {
              id: ComponentIdList.QuestionBankReserveListingComponent,
              title: 'Question Bank Reserve Listing',
              link: 'ReportsGCA/app-question-bank-reserve-listing',
            },
            {
              id: ComponentIdList.MyQuestionBankListingComponent,
              title: 'My Question Bank Listing',
              link: 'ReportsGCA/app-my-question-bank-listing',
            },
          ]
        },
       
       //Governance Assessments Dashboard
        {
           label: "Governance Assessment Dashboard",
             pages: [
            { id: ComponentIdList.MyAssessmentsMitigationComponent,  title: 'My Dashboard', link: '' },//
          
          ]
        },
        
  
     //Governance Question Bank
        {
          id: ComponentIdList.GovernanceQuestionBankComponent,
          path: 'governance-question-bank',
          component:AppComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          label: "Governance Question Bank",
          pages: [
            { id: ComponentIdList.AddQuestionsComponent,title: "Add Questions", link: 'governance-question-bank/add-questions' },
            { id: ComponentIdList.EditQuestionsComponent,title: "Edit Questions", link: 'governance-question-bank/edit-questions' },
            { id: ComponentIdList.DisableQuestionComponent,title: "Disable Questions", link: 'governance-question-bank/disable-question' },
            { id: ComponentIdList.ReactivateQuestionsComponent,title: "Reactivate Questions", link: 'governance-question-bank/reactivate-questions' },
            { id: ComponentIdList.MyQuestionsComponent,title: "My Questions", link: 'governance-question-bank/my-questions' },
            { id: ComponentIdList.QuestionBankReserveComponent ,title: "Question Bank Reserve", link: 'governance-question-bank/question-bank-reserve' },
            //{ id: ComponentIdList.BulkUploadQuestionsComponent,title: "Bulk Upload Questions", link: 'governance-question-bank/bulk-upload-questions' }
          ]
        },
         // Governance Assessment Template

        {
          id: ComponentIdList.ScoreIndicatorComponent,
          path: 'Governance-Assessment',
          component: AppComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          label: "Governance Assessment Template",
          pages: [
            { id: ComponentIdList.AssessmentBuilderComponent,title: "Assessment Builder", link: 'Governance-Assessment/assessment-builder' },
            { id: ComponentIdList.CustomizedAssessmentComponent,title: "Customized Assessment", link: 'Governance-Assessment/customized-assessment' }
          ]
        },
        //Assessment Template Library
        {
          path: 'assessment-template-library',
          component: AppComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          label: "Assessment Template Library",
          pages: [
            { id: ComponentIdList.ViewAssessmentTemplateComponent,title: "View Assessment Template", link: 'assessment-template-library/view-assessment-template' },
            { id: ComponentIdList.UpdateAssessmentTemplateComponent,title: "Update Assessment Template", link: 'assessment-template-library/update-assessment-template' },

            { id: ComponentIdList.DisableAssessmentTemplateComponent,title: "Disable Assessment Template", link: 'assessment-template-library/disable-assessment-template' },
            { id: ComponentIdList.ReactiveAssessmentTemplateComponent,title: "Re-activate Assessment Template", link: 'assessment-template-library/reactive-assessment-template' },

          ]
        },
        //Map Assessment Template Access
        {
          id: ComponentIdList.MapAssessmentTemplateAccessComponent,
          path: 'map-assessment-template-access',
          component:AppComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          label: "Map Assessment Template Access",
          pages: [
            { id: ComponentIdList.ProvideAccessComponent ,title: "Provide Access", link: 'map-assessment-template-access' },
            { id: ComponentIdList.EditAccessComponent,title: "Edit Access", link: 'map-assessment-template-access/edit-access' },
            { id: ComponentIdList.RemoveAccessComponent,title: "Remove Access", link: 'map-assessment-template-access/remove-access' },
            {
              id: ComponentIdList.ViewProvideAccessComponent,
              title: 'View Access',
              link: 'map-assessment-template-access/view-provide-access',
            },
          ]
        },
        //Scheduled Assessment
        {
          id: ComponentIdList.ScheduleAssessmentInternalComponent,
          path: 'schedule-assessment-internal',
          component:UserComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          label: "Scheduled Assessment",
          pages: [
            {
              id: ComponentIdList.AddNewUserComponent,
              title: 'External Assessment ',
              link: 'schedule-assessment-internal',
            },
             {
               id: ComponentIdList.RepeatFrequencyComponent,
               title: 'Internal Assessment',
               link: 'schedule-assessment-internal/repeat-frequency',
             },
             {
              id: ComponentIdList.SelfRepeatFrequencyComponent,
              title: 'External Assessment',
              link: 'schedule-assessment-internal/self-repeat-frequency',
            },

            //  {
            //   id: ComponentIdList.OneTimeFrequencyComponent,
            //   title: 'one time Frequency',
            //   link: 'schedule-assessment-internal/one-time-frequency',
            // },

            // {
            //   id: ComponentIdList.OneTimeFrequencySelfComponent,
            //   title: 'one time Frequency self',
            //   link: 'schedule-assessment-internal/one-time-frequency-self',
            // },
            {
              id: ComponentIdList.InitiateExternalAssessmentComponent,
              title: 'Initiate External Assessment ',
              link: 'schedule-assessment-internal/initiate-external-assessment',
            },
            // { id: ComponentIdList.RepeatFrequencyComponent ,title: "Internal Repeat Frequency", link: 'schedule-assessment-internal/repeat-frequency' },
            // { id: ComponentIdList.OneTimeFrequencyComponent,title: "External One-time Frequency", link: 'schedule-assessment-internal/one-time-frequency' },
            // { id: ComponentIdList.SelfRepeatFrequencyComponent,title: "Self Repeat Frequency", link: 'schedule-assessment-internal/self-repeat-frequency' },
            // { id: ComponentIdList.OneTimeFrequencySelfComponent ,title: "Self One-time Frequency", link: 'schedule-assessment-internal/one-time-frequency-self' },
            // { id: ComponentIdList.InitiateExternalAssessmentComponent,title: "Initiate External Assessment", link: 'schedule-assessment-internal/initiate-external-assessment' },
            // { id: ComponentIdList.OneTimeFrequencyComponent,title: "Internal One-time Frequency", link: 'schedule-assessment-internal/one-time-frequency' }
          ]
        },
        //Begin Assessment
        {
          id: ComponentIdList.BeginassessmentscheduleComponent,
          path: 'Begin-Assessement',
          component: AppComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          // pages: [],
          label: "Begin Assessment",
          pages: [
            { id: ComponentIdList.BeginassessmentscheduleComponent,title: "Begin Assessment Scheduled", link: 'Begin-Assessement' }
          ]
        },
        //Manage assessment
        {
          id: ComponentIdList.ManageAssessment,
          path: 'Manage assessment',
          component: AppComponent,
          label: 'Manage Assessment',
          icon: '../../../assets/images/Dashboard/Users.svg',
          pages: [
            {
              id: ComponentIdList.ManagemyassessementComponent,
              title: 'My Assessments',
              link: 'Manage-assessment/My Assessements',
            },
            {
              id: ComponentIdList.MonitoredAssessmentsComponent, // same
              title: 'Monitored Assessments',
              link: 'Manage-assessment/Monitored Assessements',
            }
          ],
        },
        //Assessment Result
        {
          id: ComponentIdList.MitigationControlsComponent,
          path: 'mitigation-controls',
          component:UserComponent,
          icon: '../../../assets/images/Dashboard/Users.svg',
          label: "Assessment Result",
          pages: [
            {
              id: ComponentIdList.MyAssessmentsMitigationComponent,
              title: 'My Assessments',
              link: 'mitigation-controls',
            },

            {
              id: ComponentIdList.ScheduledAssessmentsMitigationComponent,
              title: 'Scheduled Assessment',
              link: 'mitigation-controls/scheduled-assessments-mitigation',
            },
            {
              id: ComponentIdList.MonitoredAssessmentsMitigationComponent,
              title: 'Monitored Assessment',
              link: 'mitigation-controls/monitored-assessments-mitigation',
            },

            {
              id: ComponentIdList.ManagementMonitoredAssessmentComponent,
              title: 'Management Monitored Assessment',
              link: 'mitigation-controls/management-monitored-assessment',
            },
            // { id: ComponentIdList.MonitoredAssessmentsComponent,title: "Monitored Assessment", link: 'assessment-result/monitored-assessments' },
            // { id: ComponentIdList.MyAssessmentComponent,title: "My Assessments", link: 'assessment-result/my-assessment' },
            // { id: ComponentIdList.ScheduledAssessmentsMitigationComponent,title: "Scheduled Assessment", link: 'mitigation-controls/scheduled-assessments-mitigation' }
          ]
        },
        //Assessment Mitigation
        {
          id: ComponentIdList.MitigationControlsComponent,
          path: 'mitigation-controls',
          component:UserComponent,
          label: 'Assessment Mitigation',
          icon: '../../../assets/images/Dashboard/Users.svg',
          pages: [
            { id: ComponentIdList.ManagementinputsComponent,title: "Management Inputs", link: 'mitigation-controls/managementinputs'},

            {
              id: ComponentIdList.AcknowledgeMonitoredAssessMitigationComponent,
              title: 'Monitored Assessments',
              link: 'mitigation-controls/acknowledge-monitored-assess-mitigation',
            },
          ]
        },
        //Assessment Mitigation Monitoring
        {
          id: ComponentIdList.MitigationControlsComponent,
          path: 'mitigation-controls',
          component:UserComponent,
          label: 'Assessment Mitigation Monitoring',
          icon: '../../../assets/images/Dashboard/Users.svg',
          pages: [
            { id: ComponentIdList.MyMitigationTasksComponent,title: 'My Mitigation Tasks', link: 'mitigation-controls/my-mitigation-tasks' },
            { id: ComponentIdList.ViewActionTakenMitigationComponent,title: 'View Action Taken', link: 'mitigation-controls/view-action-taken-mitigation' },
            { id: ComponentIdList.UpdateMitigationActionComponent,title: 'Update Mitigation Action', link: 'mitigation-controls/update-mitigation-action'  },


          ]
        },





        // {
        //   label: "Manage Assessments",
        //   pages: [
        //     { id: ComponentIdList.QuestionBankReserveComponent ,title: "Monitored Assessments", link: 'governance-question-bank/question-bank-reserve' },
        //     { id: ComponentIdList.MyQuestionsComponent,title: "My Assessments", link: 'governance-question-bank/my-questions' }
        //   ]
        // },


      ],

    },
      



    ],
  },

  //Risk Module
  {
    path: 'risk',
    component: AppComponent,
    label: 'Risk',
    icon: '../../../assets/images/Dashboard/Inventory.svg',
    tabs: [
      //Risk Control Assessment
      {
        label: 'Risk Control Assessment',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          {
            path: '',
            component: AppComponent,
            label: 'Assessment Control Default Settings',
            icon: '../../../assets/images/Dashboard/Inventory.svg',
            pages: [
          {
            id: ComponentIdList.BpMaturityRatingScaleComponent,
            title: 'BP Maturity Rating Scale Indicators',
            link: 'Super_control_matrix_attributes/app-bp-maturity-rating-scale',
          },
          {
            id: ComponentIdList.ControlHierarchySettingComponent,
            title: 'Control Hierarchy Settings',
            link: 'Super_control_matrix_attributes/app-control-hierarchy-setting',
          },
          {
            id: ComponentIdList.ControlAssessmentTestAttrComponent,
            title: 'Control Assessment Test Attributes',
            link: 'Super_control_matrix_attributes/app-control-assessment-test-attr',
          },
          {
            id: ComponentIdList.InitialAssessmentImpactFactComponent,
            title: 'Initial Assessment Impact Factor',
            link: 'Super_control_matrix_attributes/app-initial-assessment-impact-fact',
          },
          {
            id: ComponentIdList.RiskMitigDecisionListComponent,
            title: 'Risk Mitigation Decision List',
            link: 'Super_control_matrix_attributes/app-risk-mitig-decision-list',
          },
          {
            id: ComponentIdList.AssControlAcceptCriteComponent,
            title: 'Assessment Control Acceptance Criteria',
            link: 'Super_control_matrix_attributes/app-ass-control-accept-crite',
          },

          {
            id: ComponentIdList.ContrTestParaReleCatgComponent,
            title: 'contr testing param and relevance category',
            link: 'Super_control_matrix_attributes/app-contr-test-para-rele-catg',
          },
          {
            id: ComponentIdList.RiskTreatmentDecisionListComponent,
            title: 'Risk Treatment Decision List',
            link: 'Super_control_matrix_attributes/risk-treatment-decision-list',
          },
          {
            id: ComponentIdList.RiskTreatmentDecisionMatrixComponent,
            title: 'Risk Treatment Decision Matrix',
            link: 'Super_control_matrix_attributes/risk-treatment-decision-matrix',
          },
          {
            id: ComponentIdList.ControlTestDecisionListComponent,
            title: 'Control Test Decision List',
            link: 'Super_control_matrix_attributes/control-test-decision-list',
          },
          ],
          },

           {
            id: ComponentIdList.AssessmentReportingComponent,
            path: 'assessment-reporting',
            component: AppComponent,
            label: 'Assessement Reporting',
            icon: '../../../assets/images/Dashboard/Users.svg',
            pages: [],
          },

          {
            path: '',
            component: AppComponent,
            label: 'Assessment Control Settings',
            icon: '../../../assets/images/Dashboard/Inventory.svg',
            pages: [

              {
                id: ComponentIdList.RiskAdminBpMaturRatScaleComponent,
                title: 'BP Maturity Rating Scale Indicators',
                link: 'AssessmentcontrolSetting/app-risk-admin-bp-matur-rat-scale',
              },
              {
                id:ComponentIdList.RiskAdminContrHierSettComponent,
                title:'Control Hierarchy Settings',
                link:'AssessmentcontrolSetting/app-risk-admin-contr-hier-sett'
              },
              {
                id:ComponentIdList.RiskAdminContrasstestattComponent,
                title:'Control Assessment Test Attributes',
                link:'AssessmentcontrolSetting/app-risk-admin-contrasstestatt'
              },
              {
                id:ComponentIdList.RiskAdminInitiaAssImpactRatComponent,
                title:'Initial Assessment Impact Factor',
                link:'AssessmentcontrolSetting/app-risk-admin-initia-ass-impact-rat'

              },

              {
                id:ComponentIdList.RiskAdminRiskMitDesListComponent,
                title:'Risk Mitigation Decision List',
                link:'AssessmentcontrolSetting/app-risk-admin-risk-mit-des-list'

              },
              {
                id:ComponentIdList.RiskAdminAsseContrAcctCriComponent,
                title:'Assessment Control Acceptance Criteria',
                link:'AssessmentcontrolSetting/app-risk-admin-asse-contr-acct-cri'
              },
              {
                id:ComponentIdList.RiskAdminRiskTrDeciListComponent,
                title:'Risk Treatment Decision List',
                link:'AssessmentcontrolSetting/app-risk-admin-risk-tr-deci-list'
              },
              {
                id:ComponentIdList.RiskAdminRisktrDeciMatrComponent,
                title:'Risk Treatment Decision Matrix',
                link:'AssessmentcontrolSetting/app-risk-admin-risktr-deci-matr'
              },

            ]
            },

            {
              path: '',
              component: AppComponent,
              label: 'Risk Assessment Template ',
              icon: '../../../assets/images/Dashboard/Inventory.svg',
              pages: [
            {
              id: ComponentIdList.RiskAssessmentTempleteTypeComponent,
              title: 'Type',
              link: 'RiskAdmincontrol/Asessmenttemplatetype',
            },

            {
              id:ComponentIdList.RiskAssessmentTempleteSubtypeComponent,
            title:'SubType',
            link:'RiskAdmincontrol/Assessmenttemplatesubtype',
            },
             {
              id:ComponentIdList.RiskCommonAssessmentTemplateRulesComponent,
            title:'Assessment Common Template Rules',
            link:'RiskAdmincontrol/Commontemplaterule',
            } ,
            {
              id:ComponentIdList.ViewCommonAssesmentRulesComponent,
            title:'View Assessment Template Rules',
            link:'RiskAdmincontrol/ViewAssessmenttemplate',
            },
             {
              id:ComponentIdList.RiskSamplingStandardsComponent,
            title:'SamplingStandards',
            link:'RiskAdmincontrol/SamplingStandardsComponent',
            },
            {
              id:ComponentIdList.RiskEditsamplingstandardsComponent,
            title:' Update SamplingStandards',
            link:'RiskAdmincontrol/UpdateRisksamplingstandards',
            }
          ]

            },
        ],
      },
       //Risk Control Matrix Attributes
       {
        label: 'Risk Control Matrix Attributes',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
            // Risk Controls Path (Risk Matrix Attributes Masters)
 {
  path: '',
  component: AppComponent,
  label: 'SuperAdmin Risk Masters',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
{
  id: ComponentIdList.RisksupadminTypeofriskComponent,
  title: 'Type Of Risk',
  link: 'SuperAd_Common_Entity/risksupadmin-typeofrisk',
},
{
  id: ComponentIdList.RisksupadminRiskClassificationComponent,
  title: 'Risk Classification',
  link: 'SuperAd_Common_Entity/risksupadmin-risk-classification',
},
{
  id: ComponentIdList.RisksupadminRiskImpactRatingComponent,
  title: 'Risk Impact Rating',
  link: 'SuperAd_Common_Entity/risksupadmin-risk-impact-rating',
},
{
  id: ComponentIdList.RiskLikelihoodOfOccFactorComponent,
  title: 'Risk likelihood of Occ. Factor',
  link: 'SuperAd_Common_Entity/risk-likelihood-of-occ-factor',
},
{
  id: ComponentIdList.RiskCategorizationComponent,
  title: 'Risk Categorization',
  link: 'SuperAd_Common_Entity/RiskCategorizationComponent',
},
{
  id: ComponentIdList.RiskCauseListComponent,
  title: 'Risk Cause List',
  link: 'SuperAd_Common_Entity/risk-cause-list',
},
{
  id: ComponentIdList.RiskPriorityComponent,
  title: 'Risk Priority',
  link: 'SuperAd_Common_Entity/risk-priority',
},
{
  id: ComponentIdList.PotentialBusinessImpactComponent,
  title: 'Potential Business Impact',
  link: 'SuperAd_Common_Entity/potential-business-impact',
},
{
  id: ComponentIdList.LossEventThreatCategoryL1Component,
  title: 'Loss Event Threat Category L1',
  link: 'SuperAd_Common_Entity/loss-event-threat-category-l1',
},
{
  id: ComponentIdList.LossEventThreatCategoryL2Component,
  title: 'Loss Event Threat Category L2',
  link: 'SuperAd_Common_Entity/loss-event-threat-category-l2',
},
{
  id: ComponentIdList.LossEventThreatCategoryL3Component,
  title: 'Loss Event Threat Category L3',
  link: 'SuperAd_Common_Entity/loss-event-threat-category-l3',
},

{
  id: ComponentIdList.InherentRiskRatingLevelComponent,
  title: 'Inherent Risk Rating Level',
  link: 'SuperAd_Common_Entity/app-risk-intensity',
},
{
  id: ComponentIdList.RiskIntensityComponent,
  title: 'Risk Intensity',
  link: 'SuperAd_Common_Entity/app-inherent-risk-rating-level',
},
{
  id: ComponentIdList.RisksuperadmineventfrequencyComponent,
  title: 'Risk Event Frequency',
  link: 'SuperAd_Common_Entity/Risk-Event-Frequency',
},
{
  id: ComponentIdList.RisksuperadminactivityfrequencyComponent,
  title: 'Risk Activity Frequency',
  link: 'SuperAd_Common_Entity/Risk-Activity-Frequency',
},

],
},

//SuperAdmin Control Matrix Attributes
{
  path: '',
  component: AppComponent,
  label: 'SuperAdmin Control Matrix Attributes',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
{
  id: ComponentIdList.NatureOfControlPerformanceComponent,
  title: 'Nature of Control Performance',
  link: 'Super_control_matrix_attributes/app-nature-of-control-performance',
},
{
  id: ComponentIdList.NatureOfControlOccurrenceComponent,
  title: 'Nature of Control Occurrence',
  link: 'Super_control_matrix_attributes/app-nature-of-control-occurrence',
},
{
  id: ComponentIdList.ControlLevelComponent,
  title: 'Control Level',
  link: 'Super_control_matrix_attributes/app-control-level',
},
{
  id: ComponentIdList.FrequencyOfControlAppliedComponent,
  title: 'Frequency of Control Applied',
  link: 'Super_control_matrix_attributes/app-frequency-of-control-applied',
},
{
  id: ComponentIdList.ControlDependenciesComponent,
  title: 'Control Dependencies',
  link: 'Super_control_matrix_attributes/app-control-dependencies',
},
{
  id: ComponentIdList.RiskControlEffectiveRatingComponent,
  title: 'Risk Control Effectiveness Rating',
  link: 'Super_control_matrix_attributes/app-risk-control-effective-rating',
},
{
  id: ComponentIdList.ControlRiskOfAssessmentComponent,
  title: 'Control Risk of Assessment',
  link: 'Super_control_matrix_attributes/control-risk-of-assessment',
},
{
  id: ComponentIdList.ResidualRiskRatingComponent,
  title: 'Residual Risk Rating',
  link: 'Super_control_matrix_attributes/residual-risk-rating',
},
{
  id: ComponentIdList.ControlMeasureComponent,
  title: 'Control Measure',
  link: 'Super_control_matrix_attributes/control-measure',
},
{
  id: ComponentIdList.ControlActivityTypeComponent,
  title: 'Control Activity Type',
  link: 'Super_control_matrix_attributes/control-activity-type',
},
{
  id: ComponentIdList.ControlReferenceTypeComponent,
  title: 'Control Reference Type',
  link: 'Super_control_matrix_attributes/control-reference-type',
},

{
  id: ComponentIdList.RisksuperadmincontrolcomponentComponent,
  title: 'Control Component',
  link: 'Super_control_matrix_attributes/control-Component',
},

{
  id: ComponentIdList.RisksuperadmincontrolmonitoringmechanismComponent,
  title: 'Control Monitorin Mechanism',
  link: 'Super_control_matrix_attributes/control-Monitoring-Mechanism',
},

],
},


{
  path: '',
  component: AppComponent,
  label: 'Risk Admin Matrix Attributes',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [

    {
      id: ComponentIdList.RiskAdminTypeofRiskComponent,
      title: 'Type Of Risk',
      link: 'RiskMatrixAttributes/app-risk-admin-typeof-risk',
    },
    {
      id:ComponentIdList.RiskAdminRiskClassificationComponent,
      title:'Risk Classification',
      link:'RiskMatrixAttributes/app-risk-admin-risk-classification'
    },
    {
      id:ComponentIdList.RiskAdminRiskImpactRatingComponent,
      title:'Risk Impact Rating',
      link:'RiskMatrixAttributes/app-risk-admin-risk-impact-rating'

    },
    {
      id:ComponentIdList.RiskAdminRiskLikeOfOccuFactorComponent,
      title:'Risk Likelihood Of Occurrence Factor',
      link:'RiskMatrixAttributes/app-risk-admin-risk-like-of-occu-factor'

    },

    {
      id:ComponentIdList.RiskAdminRiskCategorizationComponent,
      title:'Risk Categorization',
      link:'RiskMatrixAttributes/app-risk-admin-risk-categorization'

    },
    {
      id:ComponentIdList.RiskAdminRiskCauseListComponent,
      title:'Risk Cause List',
      link:'RiskMatrixAttributes/app-risk-admin-risk-cause-list'
    },
    {
      id:ComponentIdList.RiskAdminRiskPriorityComponent,
      title:'Risk Priority',
      link:'RiskMatrixAttributes/app-risk-admin-risk-priority'
    },
    {
      id:ComponentIdList.RiskAdminPotenBussinImpactComponent,
      title:'Potential Bussiness Impact',
      link:'RiskMatrixAttributes/app-risk-admin-poten-bussin-impact'
    },
    {
      id:ComponentIdList.RiskAdminLossEvntThrCatgComponent,
      title:'Loss Event Threat Category1',
      link:'RiskMatrixAttributes/app-risk-admin-loss-evnt-thr-catg'
    },
    {
      id:ComponentIdList.RiskAdminLossEvntThrCatg2Component,
      title:'Loss Event Threat Category2',
      link:'RiskMatrixAttributes/app-risk-admin-loss-evnt-thr-catg2'
    },
    {
      id:ComponentIdList.RiskAdminLossEvntThrCatg3Component,
      title:'Loss Event Threat Category3',
      link:'RiskMatrixAttributes/app-risk-admin-loss-evnt-thr-catg3'
    },
    {
      id:ComponentIdList.RiskAdminRiskAppetiteComponent,
      title:'Risk Appetitte',
      link:'RiskMatrixAttributes/app-risk-admin-risk-appetite'
    },
    {
      id:ComponentIdList.RiskAdminRiskToleranceComponent,
      title:'Risk Tolerance',
      link:'RiskMatrixAttributes/app-risk-admin-risk-tolerance'
    },
    {
      id:ComponentIdList.RiskAdminInherentRiskRatingLevelComponent,
      title:'Inherence Risk Rating Level',
      link:'RiskMatrixAttributes/app-risk-admin-inherent-risk-rating-level'
    },
    {
      id:ComponentIdList.RiskAdminRiskIntensityComponent,
      title:'Risk Intensity',
      link:'RiskMatrixAttributes/app-risk-admin-risk-intensity'
    },
    {
      id:ComponentIdList.RiskadmineventfrequencyComponent,
      title:'Risk Event Frequency',
      link:'RiskMatrixAttributes/app-risk-admin-risk-event-frequency'
    },
    {
      id:ComponentIdList.RiskadminactivityfrequencyComponent,
      title:'Risk Activity Frequency',
      link:'RiskMatrixAttributes/app-risk-admin-risk-activity-frequency'
    },
    {
      id:ComponentIdList.RiskadminactivityfrequencyComponent,
      title:'Risk Event Frequency',
      link:'RiskMatrixAttributes/app-risk-admin-risk-event-frequency'
    },
    {
      id:ComponentIdList.RiskadmineventfrequencyComponent,
      title:'Risk Activity Frequency',
      link:'RiskMatrixAttributes/app-risk-admin-risk-activity-frequency'
    },

  ]
  },

  {
    path: '',
    component: AppComponent,
    label: 'Risk Admin Control Matrix Attributes',
    icon: '../../../assets/images/Dashboard/Inventory.svg',
    pages: [

      {
        id: ComponentIdList.RiskAdminNatContPerfComponent,
        title: 'nature of control performance',
        link: 'RiskControlMatrix/app-risk-admin-nat-cont-perf',
      },
      {
        id:ComponentIdList.RiskAdminNatContOccurComponent,
        title:'nature of control occurence',
        link:'RiskControlMatrix/app-risk-admin-nat-cont-occur'
      },
      {
        id:ComponentIdList.RiskAdminContLevComponent,
        title:'Control Level',
        link:'RiskControlMatrix/app-risk-admin-cont-lev'

      },
      {
        id:ComponentIdList.RiskAdminFreqcontAppComponent,
        title:'frequency control applied',
        link:'RiskControlMatrix/app-risk-admin-freqcont-app'

      },

      {
        id:ComponentIdList.RiskAdminContDependComponent,
        title:'Control Dependencies',
        link:'RiskControlMatrix/app-risk-admin-cont-depend'

      },
      {
        id:ComponentIdList.RiskAdminRiskCOnteffRatComponent,
        title:'control Effective rating',
        link:'RiskControlMatrix/app-risk-admin-risk-conteff-rat'
      },
      {
        id:ComponentIdList.RiskAdminContRiskAssComponent,
        title:'control risk Assessments',
        link:'RiskControlMatrix/app-risk-admin-cont-risk-ass'
      },
      {
        id:ComponentIdList.RiskAdminResiduRiskRatComponent,
        title:'residual risk rating',
        link:'RiskControlMatrix/app-risk-admin-residu-risk-rat'
      },
      {
        id:ComponentIdList.RiskAdminContMeasureComponent,
        title:'Content measure',
        link:'RiskControlMatrix/app-risk-admin-cont-measure'
      },
      {
        id:ComponentIdList.RiskAdminIntercontrcomponComponent,
        title:'internal control component',
        link:'RiskControlMatrix/app-risk-admin-intercontrcompon'
      },
      {
        id:ComponentIdList.RiskAdminInterContPrincipleComponent,
        title:'internal control principle',
        link:'RiskControlMatrix/app-risk-admin-inter-cont-principle'
      },
      {
        id:ComponentIdList.RiskAdminContActivityTypeComponent,
        title:'Control Activity Type',
        link:'RiskControlMatrix/app-risk-admin-cont-activity-type'
      },
      {
        id:ComponentIdList.RiskAdminContActNatureComponent,
        title:'Control Activity Nature',
        link:'RiskControlMatrix/app-risk-admin-cont-act-nature'
      },
      {
        id:ComponentIdList.RiskAdminContrActvSubNatureComponent,
        title:'Control Activity sub nature',
        link:'RiskControlMatrix/app-risk-admin-contr-actv-sub-nature'
      },
      {
        id:ComponentIdList.RiskAdminContAsserCheckComponent,
        title:'Control Assertion check',
        link:'RiskControlMatrix/app-risk-admin-cont-asser-check'
      },
      {
        id:ComponentIdList.RiskAdminContrRefeTypeComponent,
        title:'Control Reference Type',
        link:'RiskControlMatrix/app-risk-admin-contr-refe-type'
      },
      {
        id:ComponentIdList.RiskAdminContrAccepBechMarkComponent,
        title:'Control Acceptance Bench Mark',
        link:'RiskControlMatrix/app-risk-admin-contr-accep-bech-mark'
      },
      {
        id:ComponentIdList.RiskadmincontrolcomponentComponent,
        title:'Control Component',
        link:'RiskControlMatrix/app-risk-admin-control-component'
      },
      {
        id:ComponentIdList.RiskadmincontrolmonitoringmechanismComponent,
        title:'Control Monitoring Mechanism',
        link:'RiskControlMatrix/app-risk-admin-contr-monitoring-mech'
      },
    ]
    },
        ],
      },

      //Risk Admin Management
      {
        label: 'Risk Admin Management',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          // Risk part 2 Admin
{
  path: '',
  component: AppComponent,
  label: 'Business Function Mapping  ',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [

    {
      id: ComponentIdList.RiskBusinessFunctionMappingComponent,
      title: 'Create Business Function Mapping',
      link: 'RiskAdmincontrol/BusinessFunctionMappingComponent',
    },
    {
      id:ComponentIdList.UpdateRiskBusinessFunctionMappingComponent,
      title:'Edit Business Function Mapping',
      link:'RiskAdmincontrol/updateBusinessfunction'
    }
  ]
  },

      {
        path: '',
        component: AppComponent,
        label: 'Risk Admin Mitigation control settings',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        pages: [

          {
            id: ComponentIdList.RiskAdminMitActReqComponent,
            title: 'Mitigation action reuired',
            link: 'MitigationControlSettings/app-risk-admin-mit-act-req',
          },
          {
            id:ComponentIdList.RiskAdminActionPrioListComponent,
            title:'Action priority List',
            link:'MitigationControlSettings/app-risk-admin-action-prio-list'
          },

        ]
        },

  {
    path: '',
    component: AppComponent,
    label: 'Mangment Risk Objective  ',
    icon: '../../../assets/images/Dashboard/Inventory.svg',
    pages: [

      {
        id: ComponentIdList.RiskKeyFocusAresComponent,
        title: ' Set Key Foucs Areas',
        link: 'RiskAdmincontrol/KeyFocusAre',
      },
      {
        id: ComponentIdList.RiskUpdateKeyFocusAreaComponent,
        title: ' Update Key Foucs Areas',
        link: 'RiskAdmincontrol/updatekeyfocusarea',
      },
      {
        id: ComponentIdList.RiskSetOverallRiskAppetiteComponent,
        title: ' Set Overall Risk Appetite',
        link: 'RiskAdmincontrol/overallappetite',
      },
      {
        id: ComponentIdList.RiskUpdateOverallRiskAppetiteComponent,
        title: 'Update  Set Overall Risk Appetite',
        link: 'RiskAdmincontrol/UpdateoverallriskAppetite',
      },
      {
        id: ComponentIdList.RiskLossEventTrackerComponent,
        title: 'Loss Event Tracker ',
        link: 'RiskAdmincontrol/losseventtracker',
      },
      {
        id: ComponentIdList.UpdateriskLossEventTrackerComponent,
        title: 'Update Loss Event Tracker ',
        link: 'RiskAdmincontrol/Updatelosseventtracker',
      },
    ]
    },

    {
      path: '',
      component: AppComponent,
      label: 'Question Bank Attributes',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      pages: [
    {
      id: ComponentIdList.RiskQuestionBankAttributeKeyAreComponent,
      title: 'Define Key Area',
      link: 'RiskAdmincontrol/Definekeyare',
    },
    {
      id:ComponentIdList.RiskQuestionbankSubKeyAreaComponent,
    title:'Define Sub Key Area',
    link:'RiskAdmincontrol/Definesubkeyarea',
    }
  ]

    },

        ],
      },

      //Risk Control Management
      {
        label: 'Risk Control Management',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          // Risk Part3 Document
{
  path: '',
  component: AppComponent,
  label: 'Business Process Mapping',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [
{
  id: ComponentIdList.RiskBusinessProcessComponent,
  title: 'Business Process',
  link: 'Business_Mapping/risk-business-process',
},
{
  id: ComponentIdList.RiskBusinessSubProcessl1Component,
  title: 'Business Sub-ProcessL1',
  link: 'Business_Mapping/business-sub-processl1',
},
{
  id: ComponentIdList.RiskBusinessSubProcessl2Component,
  title: 'Business Sub-ProcessL2',
  link: 'Business_Mapping/business-sub-processl2',
},
{
  id: ComponentIdList.RiskBusinessSubProcessl3Component,
  title: 'Business Sub-ProcessL3',
  link: 'Business_Mapping/business-sub-processl3',
},
{
  id: ComponentIdList.RiskDefaultNotifiersComponent,
  title: 'Risk Default Notifiers',
  link: 'Business_Mapping/risk-default-notifiers',
},


],
},
{
  path: '',
  component: AppComponent,
  label: 'Risk Register',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [
    {
      id: ComponentIdList.RiskCreateriskDocumentComponent,
      title: 'Create Risk Document/Register',
      link: 'CreateRisk_Document/risk-createrisk-document',
    },
    {
      id: ComponentIdList.ViewRiskRegisterComponent,
      title: 'View Risk Register',
      link: 'CreateRisk_Document/view-risk-register',
    },
    {
      id: ComponentIdList.CreateControlDocumentComponent,
      title: 'Edit Risk Register',
      link: 'CreateRisk_Document/edit-risk-register',
    },

],
},
{
  path: '',
  component: AppComponent,
  label: 'Risk Matrix',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [
    {
      id: ComponentIdList.ViewRiskMatrixComponent,
      title: 'View Risk Matrix',
      link: 'Risk_Matrix/view-risk-matrix',
    },


],
},

{
  path: '',
  component: AppComponent,
  label: 'Risk Library',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [

{
  id: ComponentIdList.RiskStatementComponent,
  title: 'Create Risk Statement',
  link: 'Risk_Library/risk-statement',
},
{
  id: ComponentIdList.ViewriskstatementComponent,
  title: 'Risk Statement',
  link: 'Risk_Library/viewlistriskstatement',
},
{
  id: ComponentIdList.reactivateriskstatement,
  title: 'Reactivate Risk Statement',
  link: 'Risk_Library/reactivateriskstatement',
},

],
},
{
  path: '',
  component: AppComponent,
  label: 'Risk & Control Register',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [
    {
      id: ComponentIdList.CreateControlDocumentComponent,
      title: 'Create Control Document',
      link: 'Control_Register/create-control-document',
    },


],
},
{
  path: '',
  component: AppComponent,
  label: 'Risk & Control Matrix',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [
    {
      id: ComponentIdList.ViewControlMatrixComponent,
      title: 'View Control Matrix',
      link: 'Control_Matrix/view-control-matrix',
    },


],
},

{
  path: '',
  component: AppComponent,
  label: 'Control Library',
  icon: '../../../assets/images/Dashboard/Users.svg',
  pages: [
    {
      id: ComponentIdList.CreatecontrolstatementComponent,
      title: 'Create Control Statement',
      link: 'Control_Library/createcontrolstatement',
    },
    {
      id: ComponentIdList.EditControlStatementComponent,
      title: 'Edit Control Statement',
      link: 'Control_Library/edit-control-statement',
    },
    {
      id: ComponentIdList.ViewControlStatementComponent,
      title: 'View Control Statement',
      link: 'Control_Library/view-control-statement',
    },


],
},

{
  path: '',
  component: AppComponent,
  label: 'Mitigation Control Default Settings',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
{
  id: ComponentIdList.MitigationActionRequiredComponent,
  title: 'Mitigation Action Required',
  link: 'Super_control_matrix_attributes/mitigation-action-required',
},
{
  id: ComponentIdList.ActionPriorityListComponent,
  title: 'Action Priority List',
  link: 'Super_control_matrix_attributes/action-priority-list',
},
],
},

        ],
      },

    ],
  },

  //E-Complains Module
  {
  path: 'e-complains',
  component: AppComponent,
  label: 'e-COMPLIANCE',
  icon: '../../../assets/images/c-sidelogo2.png',
  tabs: [
     // Compliance Functional Tasks Tab
     {
      label: 'Compliance Functional Tasks',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
        {
          path: '',
          component: AppComponent,
          label: ' Compliance User Tasks',
          icon: '../../../assets/images/Dashboard/Inventory.svg',
          pages: [
            {
              id: ComponentIdList.EComplianceDashboardComponent,
              title: 'Update Compliance Tasks',
              link: 'e-compliance-dashboard/Compliance',
            },
            {
              id: ComponentIdList.RemediateComplianceTaskComponent,
              title: 'Remediate Compliance Tasks',
              link: 'e-compliance-dashboard/Remediates',
            },
            {
              id: ComponentIdList.ReviewComplianceTasksComponent,
              title: 'Review Compliance Tasks',
              link: 'e-compliance-dashboard/Review',
            },
            {
              id: ComponentIdList.ApproveComplianceTasksComponent,
              title: 'Approve Compliance Tasks',
              link: 'e-compliance-dashboard/Approve',
            },
            {
              id: ComponentIdList.AduitComplianceTasksComponent,
              title: 'Aduit Compliance Tasks',
              link: 'e-compliance-dashboard/Audit',
            },
           ],
        },
      ],
    },

    //Compliance Content Management TAb
    {
      label: 'Compliance Content Management',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
  // super Admin Global Complianc Content Library
  {
    path:'',
    component:AppComponent,
    label:'Global Compliance Content Library',
    icon:'../../../assets/images/Dashboard/Inventory.svg',
    pages:[
      {
        id: ComponentIdList.CreateGlobalComplianceMasterComponent,
        title:'Create Global Compliance Master',
        link:'GlobalComplianceLibrary/CreateGlobalComplianceMaster',
      },
      {
        id:ComponentIdList.ViewGlobalComplianceComponent,
        title:'View Global Compliance Master',
        link:'GlobalComplianceLibrary/ViewGlobalCompliance',
      }
    ]

  },
  // Group Admin Import Compliance Content
  {
    path:'',
    component:AppComponent,
    label:'Import Super Admin Masters',
    icon:'../../../assets/images/Dashboard/Inventory.svg',
    pages:[
      
      {
        id: ComponentIdList.DataImportedComponent,
        title: 'Common Entity Attributes',
        link: 'SuperAd_Common_Entity/data-imported',
      },
      {
        id: ComponentIdList.ImportComplianceControllerMasterComponent,
        title: 'Common Compliance Attributes',
        link: 'SuperAd_Common_Entity/import-compliance-controller-master',
      },
    ]

  },
// Group Admin COMPANY COMPLIANCE CONTENT LIBRARY
{
  path: '',
  component: AppComponent,
  label: ' Company Compliance  Content Library',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
  
    {
      id: ComponentIdList.CreateComplainceContentComponent,
      title: 'Create Company Compliance Content ',
      link: 'companyComplaincecontent/createcomplaincecontent',
    },
    {
      id: ComponentIdList.ViewCompanyComplianceComponent,
      title: 'View Company Compliance Content ',
      link: 'companyComplaincecontent/viewcompanycompliance',
    }
  ]
  },

      ],
    },

    //Compliance Mapping Activity Tab
    {
      label: 'Compliance Mapping Activity',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [

// Group Admin Complaince Department Mapping(cc)
{
path: '',
component: AppComponent,
label: 'Compliance Department Mapping ',
icon: '../../../assets/images/Dashboard/Inventory.svg',
pages: [

  {
    id: ComponentIdList.CreateComplainceDepartmentMappingComponent,
    title: 'Create Compliance Department Mapping',
    link: 'Complaincedepartmentmapping/createdepartmentmapping',
  },

  {
    id: ComponentIdList.UpdateComplianceDepartmentMappingComponent,
    title: 'Update Compliance Department Mapping',
    link: 'Complaincedepartmentmapping/Updatedepartmentmapping',
  }
]
},
// Group Admin Activity Workgroup
{
path: '',
component: AppComponent,
label: 'Compliance Activity Workgroup Creation',
icon: '../../../assets/images/Dashboard/Inventory.svg',
pages: [

  {
    id: ComponentIdList.CreateActivityWorkgroupComponent,
    title: 'Create Activity Workgroup ',
    link: 'Activity-workgroup-Creation/createActivityworkgroup',
  },
  {
    id: ComponentIdList.UpdateActivityWorkgroupComponent,
    title: 'Update Activity Workgroup ',
    link: 'Activity-workgroup-Creation/UpdateActivityworkgroup',
  }
]
},
// Group Admin compliance user Workgroup Mapping
{
path: '',
component: AppComponent,
label: 'Compliance User Workgroup Mapping',
icon: '../../../assets/images/Dashboard/Inventory.svg',
pages: [

  {
    id: ComponentIdList.CreateUserWorkgroupMappingComponent,
    title: 'Create User Workgroup Mapping ',
    link: 'userworkgroupmapping/createuserworkgroupmapping',
  },
  {
    id: ComponentIdList.UpdateUserWorkgroupMappingComponent,
    title: 'Update User Workgroup Mapping ',
    link: 'userworkgroupmapping/updateuserworkgroupmapping',
  }
]
},
// Group Admin compliance Loction Mapping
{
path: '',
component: AppComponent,
label: ' Locational Compliance  Mapping',
icon: '../../../assets/images/Dashboard/Inventory.svg',
pages: [

  {
    id: ComponentIdList.CreateLocationComplaintMappingComponent,
    title: 'Create Locational  Compliance  Mapping ',
    link: 'locationcomplaincemapping/createlocationcomplaincemapping',
  },

  {
    id: ComponentIdList.UpdateLocationComplaintMappingComponent,
    title: 'Update  Locational  Compliance Mapping ',
    link: 'locationcomplaincemapping/Updatelocationcomplaincemapping',
  },
  {
    id: ComponentIdList.ViewCreateLocationCompliantMappingComponent,
    title: 'View Compliance Locational  Mapping ',
    link: 'locationcomplaincemapping/Viewlocationcomplaincemapping',
  }
]
},
// Group Admin compliance user Mapping
{
path: '',
component: AppComponent,
label: ' Compliance User Mapping',
icon: '../../../assets/images/Dashboard/Inventory.svg',
pages: [

  {
    id: ComponentIdList.CreateComplainceContentComponent,
    title: 'Create Compliance user Mapping',
    link: 'complianceusermapping/creatcomplianceusermapping',
  }
]
},
// // compliance part 4 Scheduler Management
// {
// path: '',
// component: AppComponent,
// label: 'App Specific Configuration Settings',
// icon: '../../../assets/images/Dashboard/Inventory.svg',
// pages: [ {
//   id: ComponentIdList.AppSpecificConfigurationSettingsComponent,
//   title: ' Create App Specific Configuration Settings',
//   link: 'Appspecificsettings/createAppspecificsettings',
// }
// ]
// },


{
  path: '',
  component: AppComponent,
  label: 'E-Compliance Masters ',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [

    {
      id: ComponentIdList.SectorMasterComponent,
      title: 'Sector Master',
      link: 'Master/sector-master',
    },
    {
      id: ComponentIdList.SubSectorMasterComponent,
      title: 'Sub Sector Master',
      link: 'Master/sub-sector-master',
    },

    {
      id: ComponentIdList.UnitMasterComponent,
      title: 'Unit Master',
      link: 'Master/unit-master',
    },

    {
      id: ComponentIdList.GroupOfCompanyComponent,
      title: 'Group Of Compliance Master',
      link: 'Master/group-of-company',
    },
    {
      id: ComponentIdList.GroupTypeComponent,
      title: 'Group Type Master',
      link: 'Master/group-type',
    },

    {
      id: ComponentIdList.RiskCategoryComponent,
      title: 'Risk Category Master',
      link: 'Master/risk-category',
    },


],
},

      ],
    },

    //Module Admin Management  TAB
    {
      label: 'Module Admin Management',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
 // Super Admin E- Compliance  Common Entity  Attributes
        {
          path: '',
          component: AppComponent,
          label: 'Common Entity Attributes',
          icon: '../../../assets/images/Dashboard/Inventory.svg',
          pages: [
      
            {
              id: ComponentIdList.SupadminEntitytypeMasterComponent,
              title: 'Entity Type Master',
              link: 'SuperAd_Common_Entity/supadmin-entitytype-master',
            },
            {
              id: ComponentIdList.SupadminUnitLocationTypeComponent,
              title: 'Unit Location Type Master',
              link: 'SuperAd_Common_Entity/supadmin-unit-location-type',
            },
            {
              id: ComponentIdList.SupadminBusinessSectorListComponent,
              title: 'Business Sector List Master',
              link: 'SuperAd_Common_Entity/supadmin-business-sector-list',
            },
            {
              id: ComponentIdList.SupadminIndustryTypeListComponent,
              title: 'Industry Type List Master',
              link: 'SuperAd_Common_Entity/supadmin-industry-type-list',
            },
            {
              id: ComponentIdList.SupadminRegionMasterComponent,
              title: 'Region Master',
              link: 'SuperAd_Common_Entity/supadmin-region-master',
            },
            {
              id: ComponentIdList.SupadminSubRegionMasterComponent,
              title: 'Sub Region Master',
              link: 'SuperAd_Common_Entity/supadmin-sub-region-master',
            },
          ],
        },
         // Group Admin E- Compliance Entity  Attributes
 {
  path: '',
  component: AppComponent,
  label: 'Common Entity  Attributes (cc)',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [

    {
      id: ComponentIdList.EntitytypemasterComponent,
      title: 'Entity Type',
      link: 'CommonEntityAttribute/entity-type-master',
    },
    {
      id: ComponentIdList.UnitTypeMasterComponent,
      title: 'Unit Location Type',
      link: 'CommonEntityAttribute/unit-type-master',
    },
    {
      id: ComponentIdList.BusinesssectorlistComponent,
      title: 'Business sector List',
      link: 'CommonEntityAttribute/Businesssectorlist',
    },
    {
      id: ComponentIdList.IndusteryTypeListComponent,
      title: 'Industry-Type List',
      link: 'CommonEntityAttribute/Industry-Type',
    },
    {
      id: ComponentIdList.RegionMasterComponent,
      title: 'Region Master',
      link: 'CommonEntityAttribute/region-master',
    },

    {
      id: ComponentIdList.SubRegionMasterComponent,
      title: 'Sub Region Master',
      link: 'CommonEntityAttribute/sub-region-master',
    },
  ],
},

  //Group Admin E- compliance  Hierarchy Level Setup
  {
    path: '',
    component: AppComponent,
    label: 'Entity Hierarchy Level Setup',
    icon: '../../../assets/images/Dashboard/Inventory.svg',
    pages: [
    // {
    //   id: ComponentIdList.HolidaymasterComponent,
    //   title: 'Entity Hierarchy',
    //   link: 'CommonEntityAttribute/entity-hierarchy',
    // },

  ],
},

// super Admin  Other Common Masters 
{
  path: '',
  component: AppComponent,
  label: ' Other Common Masters ',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
    {
      id: ComponentIdList.SupadminFrequencyMasterComponent,
      title: 'Frequency Master',
      link: 'SuperAd_Common_Entity/supadmin-frequency-master',
    },
      {
        id: ComponentIdList.SupadminCompliancePeriodComponent,
        title: 'Compliance Period',
        link: 'SuperAd_Common_Entity/supadmin-compliance-period',
      },
    // {
    //   id: ComponentIdList.SupadminHolidayMasterComponent,
    //   title: 'Holiday Master',
    //   link: 'SuperAd_Common_Entity/supadmin-holiday-master',
    // },
 
  ],
  },
    //Group Admin E- compliance Other Common Masters
{
  path: '',
component: AppComponent,
label: 'Other Common Masters (cc)',
icon: '../../../assets/images/Dashboard/Inventory.svg',
pages: [
  {
    id: ComponentIdList.FrequencyMasterComponent,
    title: 'Frequency Master',
    link: 'CommonEntityAttribute/FrequencyMastre',
  },
  // {
  //   id: ComponentIdList.HolidaymasterComponent,
  //   title: 'Hoilday Master',
  //   link: 'CommonEntityAttribute/HoildayMaster',
  // },
],
},
  // Super Admin Other Common Settings added in Above suer admin common
  // {
  //   path: '',
  //   component: AppComponent,
  //   label: ' Other Common Masters ',
  //   icon: '../../../assets/images/Dashboard/Inventory.svg',
  //   pages: [

  //     {
  //       id: ComponentIdList.SupadminCompliancePeriodComponent,
  //       title: 'Compliance Period',
  //       link: 'SuperAd_Common_Entity/supadmin-compliance-period',
  //     },
  //   ],
  //   },
    // Group Admin Other common Settings
{
  path: '',
  component: AppComponent,
  label: ' Other Common Settings',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
    {
      id: ComponentIdList.CompliancePeriodComponent,
      title:'Compliance Period',
      link:'CommonComplianceLibrary/CompliancePeriod',
    },

    {
      id: ComponentIdList.AppSpecificConfigurationSettingsComponent,
      title: ' Create App Specific Configuration Settings',
      link: 'Appspecificsettings/createAppspecificsettings',
    },
    {
      id: ComponentIdList.CreateOtherCommonSettingsComponent,
      title:'Create Other  Common Settings',
      link:'CommonComplianceLibrary/commonsettings',
    },
  ]
  },
// Super Admin Common Compliance Library
{
  path: '',
  component: AppComponent,
  label: 'SuperAdmin Common Compliance Library Attributes',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
{
  id: ComponentIdList.SupadminNatureOfLawComponent,
  title: 'Law Type',
  link: 'SuperAd_Common_Entity/supadmin-nature-of-law',
},
{
  id: ComponentIdList.SupadminCategoryOfLawComponent,
  title: 'Category of Law',
  link: 'SuperAd_Common_Entity/supadmin-category-of-law',
},
{
  id: ComponentIdList.SupadminJurisdictionCategoryListComponent,
  title: 'Jurisdiction Category List',
  link: 'SuperAd_Common_Entity/supadmin-jurisdiction-category-list',
},
{
  id: ComponentIdList.SupadminJurisdictionLocationComponent,
  title: 'Jurisdiction Location ',
  link: 'SuperAd_Common_Entity/supadmin-jurisdiction-location',
},
{
  id: ComponentIdList.SupadminComplianceTypeComponent,
  title: 'Compliance Type',
  link: 'SuperAd_Common_Entity/supadmin-compliance-type',
},
{
  id: ComponentIdList.SupadminComplianceRecordTypeComponent,
  title: 'Compliance Record Type',
  link: 'SuperAd_Common_Entity/supadmin-compliance-record-type',
},
{
  id: ComponentIdList.SupadminComplianceGroupComponent,
  title: 'Compliance Group',
  link: 'SuperAd_Common_Entity/supadmin-compliance-group',
},
{
  id: ComponentIdList.SupadminRegulatoryAuthorityComponent,
  title: 'Regulatory Authortity',
  link: 'SuperAd_Common_Entity/supadmin-regulatory-authority',
},
{
  id: ComponentIdList.SupadminComplianceRiskClassificationComponent,
  title: 'Compliance Risk Classification',
  link: 'SuperAd_Common_Entity/supadmin-compliance-risk-classification',
},

{
  id: ComponentIdList.SupadminComplianceRiskCriteriaComponent,
  title: 'Compliance Risk Classification Criteria',
  link: 'SuperAd_Common_Entity/supadmin-compliance-risk-criteria',
},

{
  id: ComponentIdList.SupadminPenaltyCategoryComponent,
  title: 'Penalty Category',
  link: 'SuperAd_Common_Entity/supadmin-penalty-category',
},
{
  id: ComponentIdList.SupadminComplianceNotifiedStatusComponent,
  title: 'Compliance Notified Status',
  link: 'SuperAd_Common_Entity/supadmin-compliance-notified-status',
},

// {
//   id: ComponentIdList.ReviewStatusSettingsComponent,
//   title: 'Review Status Master',
//   link: 'SuperAd_Common_Entity/review-status-settings',
// },
],
},

 // Group Admin common compliance Library Attirbutes
 {
          path: '',
          component: AppComponent,
          label: 'Common Compliance Library Attirbutes(cc)',
          icon: '../../../assets/images/Dashboard/Inventory.svg',
          pages: [
            {
              id: ComponentIdList.NatureOfLawComponent,
              title: 'Law Type',
              link: 'Master/nature-of-law',
            },
            {
              id:ComponentIdList.CategoryOfLawComponent,
              title:'Category Of Law',
              link:'CommonComplianceLibrary/categoryoflaw',
            },
        
            {
              id:ComponentIdList.JurisdictionCategoryListComponent,
              title:'Jurisdiction Category List',
              link:'CommonComplianceLibrary/Jurisdictionlist',
            },
            {
              id:ComponentIdList.jurisdictionlocationlist,
              title:'Jurisdiction Location List',
              link:'CommonComplianceLibrary/jurisdictionlocation',
            },
            {
              id: ComponentIdList.TypeOfComplianceMasterComponent,
              title: 'Compliance Type',
              link: 'Master/type-of-compliance-master',
            },
        
            {
              id:ComponentIdList.ComplianceRecordTypeComponent,
              title:'Compliance Record Type',
              link:'CommonComplianceLibrary/compliancerecordtype',
            },
            {
              id:ComponentIdList.ComplianceGroupComponent,
              title:'Compliance Group',
              link:'CommonComplianceLibrary/compliancegroup',
            },
            {
              id:ComponentIdList.RegulatoryAuthorityComponent,
              title:'Regulatory Authority',
              link:'CommonComplianceLibrary/regulatoryauthority',
            },
            {
              id:ComponentIdList.ComplianceRiskClassificationComponent,
              title:'Compliance Risk Classification',
              link:'CommonComplianceLibrary/complianceriskclassification',
            },
            {
              id:ComponentIdList.ComplianceRiskClassificationCriteriaComponent,
              title:'Compliance Risk Classification Criteria',
              link:'CommonComplianceLibrary/complianceriskcriteria',
            },
            {
              id:ComponentIdList.PenalityCategoryComponent,
              title:'Penalty Category',
              link:'CommonComplianceLibrary/penalitycategory',
            },
            {
              id:ComponentIdList.ComplianceNotifiedStatusComponent,
              title:'Compliance Notified Status',
              link:'CommonComplianceLibrary/compliancenotifiedstatus',
            },
        
        
        
          ],
  },


    //Super Admin Act universe
    {

      path: '',
      component: AppComponent,
      label: 'Act/Regulatory Universe',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      pages: [
  
        {
          id: ComponentIdList.SupadminActRegulatorMasterComponent ,
          title: 'SupAdmin-Act-Regulatory Master',
          link: 'SuperAd_Common_Entity/supadmin-act-regulator-master',
        },
        {
          id: ComponentIdList.SupadminViewActregulatorComponent,
          title: 'SupAdmin-View-Act-Regulatory',
          link: 'SuperAd_Common_Entity/supadmin-view-actregulator',
        },
        {
          id: ComponentIdList.SupadminAddrulesRegulationsComponent,
          title: 'SupAdmin-Add-Rules-Regulation ',
          link: 'SuperAd_Common_Entity/supadmin-addrules-regulations',
        },
        {
          id: ComponentIdList.SupadminViewActrulesRegulationsComponent,
          title: 'SupAdmin-View-Act-Rules-Regulation ',
          link: 'SuperAd_Common_Entity/supadmin-view-actrules-regulations',
        },
        {
          id: ComponentIdList.SupadminBareActRuleRepositoryComponent,
          title: 'SupAdmin_Bare-Act/Rule-Repository',
          link: 'SuperAd_Common_Entity/supadmin-bare-act-rule-repository',
        },
        {
          id: ComponentIdList.SupadminStatutoryFormsComponent,
          title: 'SupAdmin_Add-Statutory-Forms-Records',
          link: 'SuperAd_Common_Entity/supadmin-statutory-forms',
        },
         {
          id: ComponentIdList.SupadminViewstatutoryformsComponent,
          title: 'SupAdmin_View-Statutory-Forms-Records',
          link: 'SuperAd_Common_Entity/supadmin-viewstatutoryforms',
        }
        ,{
          id: ComponentIdList.SupadminAddcompliancepenaltyComponent,
          title: 'SupAdmin_Compliance-Penalty-Masters',
          link: 'SuperAd_Common_Entity/supadmin-addcompliancepenalty',
  
        }
        ,{
          id: ComponentIdList.SupadminViewcompliancepenaltyComponent,
          title: 'SupAdmin_View-Compliance-Penalty',
          link: 'SuperAd_Common_Entity/supadmin-viewcompliancepenalty',
  
        }
      ]
  },

  // compliance Controller  Act Universe
{

  path: '',
  component: AppComponent,
  label: 'Act/Regulator Universe (cc)',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [

    {
      id: ComponentIdList.ActRegulatorMasterComponent,
      title: ' Act-Regulatory Master',
      link: 'Actregulation/Actregulator',
    },
    {
      id: ComponentIdList.ViewActRegulatoryComponent,
      title: 'View Act-Regulatory Master',
      link: 'Actregulation/viewActregulator',
    },
    {
      id: ComponentIdList.AddRulesRegulationsProcedureComponent,
      title: 'Add Rules Regulation ',
      link: 'Actregulation/Addrulesregulations',
    },
    {
      id: ComponentIdList.ViewActRuleRegulationComponent,
      title: 'View Act Rules Regulation ',
      link: 'Actregulation/ViewActrulesregulations',
    },
    {
      id: ComponentIdList.RuleRepositoryComponent,
      title: 'Bare Act/Rule-Repository',
      link: 'Actregulation/Bare-Act-Rule-repository',
    },
    {
      id: ComponentIdList.StatutoryFormsRecordsComponent,
      title: 'Add Statutory Forms-Records',
      link: 'Actregulation/statutoryforms',
    }
    , {
      id: ComponentIdList.ViewStatutoryFromsRecordsComponent,
      title: 'View Statutory Forms-Records',
      link: 'Actregulation/viewstatutoryforms',
    }
    ,{
      id: ComponentIdList.CompliancePenaltyMasterComponent,
      title: 'Compliance Penalty Masters',
      link: 'Actregulation/Addcompliancepenalty',

    }
    ,{
      id: ComponentIdList.ViewCompliancePenaltyMasterComponent,
      title: 'View Compliance Penalty Masters',
      link: 'Actregulation/viewcompliancepenalty',

    }
  ]
},
// compliance part 4 Alerts And Reminder
{
  path: '',
  component: AppComponent,
  label: ' Alerts And Reminders Configuration',
  icon: '../../../assets/images/Dashboard/Inventory.svg',
  pages: [
  
    {
      id: ComponentIdList.CreateAlertsRemindersComponent,
      title: 'Create Alert and Reminder',
      link: 'Alertandreminder/createAlert&Reminder',
    }
  ]
  },
      ],
    },

    //User Manual
    {
      label: 'E-Complains User Manual',
      icon: '../../../assets/images/Dashboard/Inventory.svg',
      menuItems: [
    {
      path: 'user-manual-reporting-head',
      component: AppComponent,
      label: 'user manual reporting head',
      icon: '../../../assets/images/Dashboard/Users.svg',

      pages: [
        {
          id: ComponentIdList.MonitoringCompliancesComponent,
          title: 'monitoring compliances',
          link: 'monitoring-compliances',
        },

        {
          id: ComponentIdList.ReportWindowComponent,
          title: 'Report windows',
          link: 'monitoring-compliances/report-window',
        },
        {
          id: ComponentIdList.ContactUsChangeRequestFormComponent,
          title: 'contact us and change request form',
          link: 'monitoring-compliances/contact-us-change-request-form',
        },
      ],
    },

    {
      path: 'user-manual-legal-head',
         component: AppComponent,
         label: 'user manual legal head',
         icon: '../../../assets/images/Dashboard/Users.svg',

         pages: [
           {
             id: ComponentIdList.LegalHeadMonitoringCompliancesComponent,
             title: 'Legal head monitoring compliances',
             link: 'legal-head-monitoring-compliances',
           },

           {
             id: ComponentIdList.GenerationOfEcomplianceCertificateComponent,
             title: 'Generation of e-compliance certificate',
             link: 'legal-head-monitoring-compliances/generation-of-ecompliance-certificate',
           },
          //  {
          //    id: ComponentIdList.ContactUsChangeRequestFormComponent,
          //    title: 'contact us and change request form',
          //    link: 'monitoring-compliances/contact-us-change-request-form',
          //  },
        ],
       },
      ],
    },
  ],
  },
  // commom Admin
  {
    path: 'commonadmin',
    component: AppComponent,
    label: 'grcHAWK',
    icon: '../../../assets/images/a-sidelogo2.png',
    tabs: [
      {
        label: 'Module Admin Management',
        icon: '../../../assets/images/Dashboard/Inventory.svg',
        menuItems: [
          {
            label: "Masters",
            //icon: '../../../assets/images/Dashboard/Inventory.svg',
            pages: [
             { id: ComponentIdList.DepartmentMasterComponent,title: 'Department',link: 'Master/department-master'},
             { id: ComponentIdList.TPAEntityComponent,title: 'TPA-Entity',link: 'Master/TPA-entity-master'},
             { id: ComponentIdList.EntityMasterComponent,title: 'Entity',link: 'Master/entity-master'},
             { id: ComponentIdList.UnitLocationMasterComponent,title: 'Unit Location',link: 'Master/unit-location-master'},
             { id: ComponentIdList.UserLocationMappingComponent,title: 'User Location Mapping',link: 'Master/user-location-mapping'},
             { id: ComponentIdList.AdminConfigComponent,title: 'Upload FileConfig',link: 'Master/admin-config'},
             { id: ComponentIdList.TaskMasterComponent,title: 'App Module',link: 'inspection/TaskMaster'},
             //{ id: ComponentIdList.AddUserRoleComponent,title: 'Add User Role',link: 'inspection/add-user-role'},
             { id: ComponentIdList.ReviewStatusSettingsComponent, title: 'Review Status Master',link: 'SuperAd_Common_Entity/review-status-settings'},
             { id: ComponentIdList.HelpDeskComponent,title: 'Help Desk Master', link: 'GGT_Governance/help-desk',},
            ]
          },
          {
            // path: '',
            // component: InspectionComponent,
            // icon: '../../../assets/images/Dashboard/Inspection.svg',
            label: "Governance Document Attributes",
            pages: [
              // { title: "Nature of Document", link: '' },
              { id: ComponentIdList.InspectionListComponent,title: "Document Type", link: 'inspection/inspection-list' },
              { id: ComponentIdList.QuestionBankComponent,title: "Document Category", link: 'inspection/question-bank' },
              { id: ComponentIdList.AssignedInspectionListComponent,title: "Document Sub Category", link: 'inspection/assigned-inspection-list' },
              { id: ComponentIdList.InspectorInspectionListComponent,title: "Authority Type", link: 'inspection/inspector-inspection-list' },
              { id: ComponentIdList.AuthorityNameComponent,title: "Authority Name", link: 'inspection/authority-name' },
              { id: ComponentIdList.ReviewerInspectionListComponent,title: "Document Confidentiality", link: 'inspection/reviewer-inspection-list' },
              { id: ComponentIdList.DefaultNotifierComponent,title: "Default Notifiers", link: 'inspection/default-notifier' }
            ]
          },
          {
            // id: ComponentIdList.ScoreIndicatorComponent,
            // path: 'Governance-Assessment',
            // component: AppComponent,
            // icon: '../../../assets/images/Dashboard/Users.svg',
            label: "Governance Assessment Attributes",
            pages: [
              { id: ComponentIdList.CheckLevelComponent,title: 'Check Level', link: 'governance-question-bank/check-level' },
              { id: ComponentIdList.DefineTopicComponent,title: 'Define Topic', link: 'governance-question-bank/define-topic' },
              { id: ComponentIdList.DefineSubjectComponent,title: 'Define Subject', link: 'governance-question-bank' },
              { id: ComponentIdList.DefinesubtypeComponent,title: 'Assessment Template Attributes Sub-Type', link: 'Governance-Assessment/define-sub-type' },
              { id: ComponentIdList.DefineTypeComponent,title: 'Assessment Template Attributes Type Master', link: 'Governance-Assessment/define-type' },
              { id: ComponentIdList.KeyImprovementIndicatorsComponent,title: 'Key Improvement Indicators', link: 'Governance-Assessment/key-improvement-indicators' },
              { id: ComponentIdList.CompetencySkillLevelComponent,title: 'Competency Skill Levels', link: 'Governance-Assessment/competency-skill-level' },
              { id: ComponentIdList.ScoreIndicatorComponent,title: 'Score Indicators', link: 'Governance-Assessment' },
            ]
          },
          {
            label: "User Management",
            pages: [
              { id: ComponentIdList.UserListComponent,title: ' User Management',link: 'user',},
              { id: ComponentIdList.ViewtpiuserComponent, title: 'TPA User Management', link: 'schedule-assessment-internal/view-tpa-user',},
             { id: ComponentIdList.AddUserRoleComponent,title: 'Add User Role',link: 'inspection/add-user-role'},

              ]
          },
          {
            label: "Role Management",
            pages: [
              { id: ComponentIdList.RoleListComponent,title: 'Role Management', link: 'role' },
            ]
          },

        ],

       },
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}


// {
//   //path: '',
//  // component: InspectionComponent,
//   //icon: '../../../assets/images/Dashboard/Inspection.svg',
//   label: "Default Notifier",
//   pages: [
//     { id: ComponentIdList.DefaultNotifierComponent,title: "Default Notifier", link: 'inspection/default-notifier'},
//   ]
// },
// {
//   // id: ComponentIdList.MasterComponent,
//   // path: 'NotificationCenter',
//   // component: AppComponent,
//   label: 'Notification Center ',
//  // icon: '../../../assets/images/Dashboard/Inventory.svg',
//   pages: [
//     {
//       id: ComponentIdList.NotificationCenterComponent,
//       title: 'Notification Center',
//       link: 'NotificationCenter/app-notification-center',
//     },

//   ]
// },