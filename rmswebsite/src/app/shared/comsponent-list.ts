export const ComponentIdList = {

  HomeComponent: 102,
  MasterComponent:0,
  DepartmentMasterComponent:2,
  RoleListComponent: 129,
  UserListComponent: 130,
  TPAEntityComponent:3,
  EntityMasterComponent:4,
  UnitLocationMasterComponent:5,
  UserLocationMappingComponent:6,
  AddUserRoleComponent:7,
  AdminConfigComponent:8,
  TaskMasterComponent:9,
  ManagementDashboardComponent:100,
  TaskownerDashboardComponent:101,

  // Governance Control Tasks
  // Publishing Documents (Governance Document Attributes)
  InspectionListComponent:10,
  QuestionBankComponent:11,
  AssignedInspectionListComponent:12,
  InspectorInspectionListComponent:13,
  AuthorityNameComponent:14,
  ReviewerInspectionListComponent:15,

 // Governance Control Tasks
 // Publishing Documents (Publish Governance Document)
  BridgeListComponent: 16,
  BridgeMasterComponent: 17,

  // Governance Control Tasks
  // Publishing Documents (User Access Mapping)
  ReportListComponent:18, //Doc User Provide Access
  RemedyBankComponent:19, // Doc User Edit Access
  RemoveUserAccessComponent:20, //Doc Remove Access
  ViewUserAccessDocumentComponent:21,

  // Governance Control Tasks
  // Document Awareness 
  AckRequestComponent:22,  //Acknowledgement Requested
  DocUserAccessComponent:23,  //Document User Accessibility
  DocRepositoryComponent :24,  //Document Repository


  // Governance Control Tasks
  // Document Depository (Published Document Listing)
  PubDocListComponent:0,
  ViewPubDocComponent:25,
  UpdatePubDocComponent:26,
  DisablePubDocComponent:27,
  ReactivatePubDocComponent:28,

  // Governance Control Tasks
  // Document Depository (Published Document Versioning)
  PubNewVerComponent :29,
  DocRevPeriodStatusComponent:30,


  // Governance Control Assessment
  //Governance Assessment (Set Performance Indicators)

  // Governance Control Assessment
  //Governance Assessment (Assessment Templates > Assessment Template Attributes)
  AssessmentTemplateLibraryComponent:0,
  ScoreIndicatorComponent:31,
  CompetencySkillLevelComponent:32,
  KeyImprovementIndicatorsComponent:33,
  DefineTypeComponent:34,
  DefinesubtypeComponent:35,
  AssessmentReportingComponent:35, // add on 04/04/2024

  // Governance Control Assessment
  // Governance Assessment (Assessment Templates > New Assessment Template)
  AssessmentBuilderComponent:36,
  CustomizedAssessmentComponent:37,

  // Governance Control Assessment
  // Governance Assessment (Assessment Templates > Assessment Template Library)
  ViewAssessmentTemplateComponent:38, 
  UpdateAssessmentTemplateComponent:39,
  DisableAssessmentTemplateComponent:40,
  ReactiveAssessmentTemplateComponent:41,

  // Governance Control Assessment
  //Governance Assessment (Assessment Templates > Map Assessment Template Access)
  MapAssessmentTemplateAccessComponent:0,
  ProvideAccessComponent:42,
  ViewProvideAccessComponent:42,// new view pages  need to added sequence
  EditAccessComponent:43,
  RemoveAccessComponent:44,

  // Governance Control Assessment
  //Governance Assessment (Schedule Assessment >  Internal Assessment)
  ScheduleAssessmentInternalComponent:0,
  RepeatFrequencyComponent:45,
  //OneTimeFrequencyComponent:46, not in use changed and merged in above component 45


  // Governance Control Assessment
  //Governance Assessment (Schedule Assessment >  External Assessment)
  OneTimeFrequencyExternalComponent:0, //not in use
  AddNewUserComponent:47,

  // Governance Control Assessment
  //Governance Assessment (Schedule Assessment >  Self Assessment)
  SelfRepeatFrequencyComponent:48,
  //OneTimeFrequencySelfComponent:49,not in use changed and merged in above component 

  // Governance Control Assessment
  //Governance Assessment (Initiate External Assessment)
  InitiateExternalAssessmentComponent:50,
  CreatetpauserComponent:51,
  UpdatetpiuserComponent:51,// path not set
  ViewtpiuserComponent:51,

      //Dashboard(Governance Documents)
      MyTasksComponent:52,//2,
      MonitoredTasksComponent:52,//2,

      
   //Dashboard(Notification & Helpdesk)
   RaiseQueriesComponent:53,
   TrackStatusComponent:53,
   HelpDeskComponent:53,
   ViewQueryComponent:53,
   ReviewQueryStatusComponent:53,
   ViewReviewQueryStatusComponent:53,


  // Governance Control Assessment
  // Governance Assessment (Begin Assessment Scheduled)
  BeginassessmentscheduleComponent:54,

  // Governance Control Assessment
  // Governance Assessment (Manage Assessments)
  ManageAssessment:0,
  ManagemyassessementComponent:55,
  MonitoredAssessmentsComponent:56, 

  // Governance Control Assessment
  // Mitigation Controls (Assessment Result)
  MitigationControlsComponent:0,  //same Component used in 3 places in dashboard
  MyAssessmentsMitigationComponent:57,
  ScheduledAssessmentsMitigationComponent :58,
  MonitoredAssessmentsMitigationComponent:59, 
  ManagementMonitoredAssessmentComponent:59,

  // Governance Control Assessment
  // Mitigation Controls (Assessment Mitigation)
   //MitigationControlsComponent:101,  
   AcknowledgeMonitoredAssessMitigationComponent:60,
   ManagementinputsComponent:61,
   MyMitigationTasksComponent:62,  

  // Governance Control Assessment
  // Mitigation Controls (Assessment Monitoring)
   //MitigationControlsComponent:101,  
  UpdateMitigationActionComponent:63,
  ViewActionTakenMitigationComponent:64, 

  // Assessment Reporting Pending

 // Governance Control Assessment
 // Governance Question Bank (Question Bank Attributes)
  GovernanceQuestionBankComponent:0,
  DefineSubjectComponent:65,
  DefineTopicComponent:66,
  CheckLevelComponent:67,

  // Governance Control Assessment
 // Governance Question Bank (Question Bank Library)
  BulkUploadQuestionsComponent:68,
  AddQuestionsComponent :69,
  EditQuestionsComponent:70,
  DisableQuestionComponent :71,
  ReactivateQuestionsComponent:72,
  MyQuestionsComponent :73,
  QuestionBankReserveComponent:74,
  ReviewStatusSettingsComponent:75,
  
  DefaultNotifierComponent:76, // governance 

   //GCT Reports
 PublishedDocListComponent :77,//Applicable to risk Content Controller/Content Manager
 DiscardeddraftlistComponent:78,
 DocumentdraftsavedlistComponent:79,
 DocumentversoninglistComponent:80,
 DisableddocumentslistComponent:81,// 77
 PublisheddocreviewstatusComponent:82,
 AckRequestedDocListComponent:83,
 DocAccessStatusListComponent:84,
 DocAccessMappingStatusListComponent:85,
 PubDocRepositoryComponent:86, // task owner
 
 //GCA Reports
 AssessTempListComponent:87,//Applicable to risk assessor/process owner/tpa
 AssessDisabledTempListComponent:88,
 AssessTempAccessMappingComponent:89,
 AckreqassessmentComponent:90,
 ScheduledassessmentstatuslistComponent:91,
 ScheduledasslistwithstatusComponent:92,
 AssesscompletedwithresultComponent:93,
 AssessresulttaskownerComponent:94,
 AssessPerfIndicatorsAnalysisComponent:95,
 MitigationActionPlanComponent:96,
 QuestionBankReserveListingComponent:97,
 MyQuestionBankListingComponent:98,
 DocumentConfidentialityComponent:99,
 CrcMitigationActionPlanComponent: 60,
      //**GGT **/ 
      


// Common Entity Attributes in super admin starts from (201 to 232) if an new component created in super admin add under 233 to 240 only
   SupadminEntitytypeMasterComponent:201,
   SupadminUnitLocationTypeComponent:202,
   SupadminBusinessSectorListComponent:203,
   SupadminIndustryTypeListComponent:204,
   SupadminRegionMasterComponent:205,
   SupadminSubRegionMasterComponent:206,

   // Other Common Masters in super admin
   SupadminFrequencyMasterComponent:207,
   SupadminHolidayMasterComponent:208,

    // Common Compliance Library Attributes in super admin
    SupadminNatureOfLawComponent:209,
    SupadminCategoryOfLawComponent:210,
    SupadminJurisdictionCategoryListComponent:211,
    SupadminJurisdictionLocationComponent:212,
    SupadminComplianceTypeComponent:213,
    SupadminComplianceRecordTypeComponent:214,
    SupadminComplianceGroupComponent:215,
    SupadminRegulatoryAuthorityComponent:216,
    SupadminComplianceRiskClassificationComponent:217,
    SupadminComplianceRiskCriteriaComponent:218,
    SupadminPenaltyCategoryComponent:219,
    SupadminComplianceNotifiedStatusComponent:220,
    
     // Act/ Regulatory Universe in super admin
     SupadminActRegulatorMasterComponent :221,
     SupadminViewActregulatorComponent:222,
     SuperadminEditActregulatoryComponent:222,//Redirect 

     SupadminAddrulesRegulationsComponent:223,
     SupadminViewActrulesRegulationsComponent:224,
     SuperadminEditRuleregulationComponent:224,// Redirect

     SupadminBareActRuleRepositoryComponent:225,
     
     SupadminStatutoryFormsComponent:226,
     SupadminViewstatutoryformsComponent:227,
     SupAdminEditStatutoryfromsComponent:227,// Redirect

     SupadminAddcompliancepenaltyComponent:228,
     SupadminViewcompliancepenaltyComponent:229,
     SupAdminEditCompliancepenaltyComponent:229,//Redirect


    // Other Common Settings in super admin
    SupadminCompliancePeriodComponent:230,

    // Global Compliance Content Library in super admin
      GlobalComplianceContentLibraryComponent:231,
      CreateGlobalComplianceMasterComponent:231,
      ViewGlobalComplianceComponent:232,



    //  Common Entity Attributes in group admin  from (241 to 249) 
          CommonEntityAttributesComponent:0,
          EntitytypemasterComponent:241,
          UnitTypeMasterComponent:242,
          BusinesssectorlistComponent:243,
          IndusteryTypeListComponent:244,
          RegionMasterComponent:245,
          SubRegionMasterComponent:246,
    
    // Other Common Masters in group admin
        FrequencyMasterComponent:247,
        HolidaymasterComponent:248, 

        // ENTITY HIERARCHY LEVEL SETUP 
        EntityhierarchylevelsetupComponent:249,


//  Import ‘Subscribed’ Common Compliance Library Attributes from Part 2 from (250 to )

    // Common Compliance Library Attributes in CC
    CommoncomplianceattributesComponent:0,
    NatureOfLawComponent:250,
    CategoryOfLawComponent:251,
    JurisdictionCategoryListComponent:252,
    jurisdictionlocationlist:253,
    TypeOfComplianceMasterComponent:254,
    ComplianceRecordTypeComponent:255,
    ComplianceGroupComponent:256,
    RegulatoryAuthorityComponent:257,
    ComplianceRiskClassificationComponent:258,
    ComplianceRiskClassificationCriteriaComponent:259,
    PenalityCategoryComponent:260,
    ComplianceNotifiedStatusComponent:261,

  // Act/Regulator Universe Imported
     ActRegulatorMasterComponent:262,
    ViewActRegulatoryComponent:263,
    EditActRegulatoryComponent:263,// Redirect component

    AddRulesRegulationsProcedureComponent:264,
    ViewActRuleRegulationComponent:265,
    EditActRuleRegulationComponent:265,//Redirect 

    RuleRepositoryComponent:266,

    StatutoryFormsRecordsComponent:267,
    ViewStatutoryFromsRecordsComponent:268,
    EditStatutoryFormsRecordComponent:268,//Redirect  

    CompliancePenaltyMasterComponent:269, 
    ViewCompliancePenaltyMasterComponent:270,
    EditCompliancePenaltyComponent:270,//Redirect

    // OTHER COMMON SETTINGS 
    CompliancePeriodComponent :271, //Imported
    AppSpecificConfigurationSettingsComponent:272,

     //Company Complaince  content Library(cc)
      CreateComplainceContentComponent:273, 

       ViewCompanyComplianceComponent:274, 

      // Compliance Department Mapping (cc)
      CreateComplainceDepartmentMappingComponent:275,
      UpdateComplianceDepartmentMappingComponent:276,

      // Compliance Activity Workgroup Creation (cc)
      CreateActivityWorkgroupComponent:277,
      UpdateActivityWorkgroupComponent:278,

      // Compliance User Workgroup Mapping (cc)
      CreateUserWorkgroupMappingComponent:279,
      UpdateUserWorkgroupMappingComponent:280, 

      // Locational Compliance Mapping (CC)
      CreateLocationComplaintMappingComponent:281,
      UpdateLocationComplaintMappingComponent:282,
      ViewCreateLocationCompliantMappingComponent:283,
      
      CreateComplianceUserMappingComponent:284,//2,// need to change this id (temp fix)

      
    DataImportedComponent:285,
    ImportComplianceControllerMasterComponent:286,
      //Alert & Reminder
    CreateAlertsRemindersComponent:287,//new to change id e compliance
      //other common settings in cc
     CreateOtherCommonSettingsComponent:288,
      

     //Compliance Task(FTU) 5Th document
     EComplianceDashboardComponent:301,
     RemediateComplianceTaskComponent:302,
     ReviewComplianceTasksComponent:303,
     ApproveComplianceTasksComponent:304,
     AduitComplianceTasksComponent:305,  // completed 

      // Risk Module Part 1 Master pages starts from 401
      //Risk Matrix Attributes Default Set Up start----
      RisksupadminTypeofriskComponent:401,// Types of Risk Super Admin
      RisksupadminRiskClassificationComponent:402,//Risk Classification Super Admin
      RisksupadminRiskImpactRatingComponent:403,//Risk Impact Rating Super Admin
      RiskLikelihoodOfOccFactorComponent:404,//Like lihood Of Occ Factor
      RiskCategorizationComponent:405,//
      RiskCauseListComponent:406,//
      RiskPriorityComponent:407,//
      PotentialBusinessImpactComponent:408,//
      LossEventThreatCategoryL1Component:409,//
      LossEventThreatCategoryL2Component:410,//
      LossEventThreatCategoryL3Component:411,//
      InherentRiskRatingLevelComponent:412,// 
      RiskIntensityComponent:413,
      RisksuperadmineventfrequencyComponent:414,
      RisksuperadminactivityfrequencyComponent:415,//-----end

     // Control Matrix Attributes Default set up start------
      NatureOfControlPerformanceComponent:416,//
      NatureOfControlOccurrenceComponent:417,//
      ControlLevelComponent:418,//
      FrequencyOfControlAppliedComponent:419,//
      ControlDependenciesComponent:420,//
      RiskControlEffectiveRatingComponent:421,//
      ControlRiskOfAssessmentComponent:422,//
      ResidualRiskRatingComponent:423,//
      ControlMeasureComponent:424,//
      ControlActivityTypeComponent:425,//
      ControlReferenceTypeComponent:426,
      RisksuperadmincontrolcomponentComponent:427,
      RisksuperadmincontrolmonitoringmechanismComponent:428,//-----end

      // Assessment Control Default Settings  start----
      BpMaturityRatingScaleComponent:429,//
      ControlHierarchySettingComponent:430,//
      ControlAssessmentTestAttrComponent:431,//
      InitialAssessmentImpactFactComponent:432,//
      RiskMitigDecisionListComponent:433,//
      AssControlAcceptCriteComponent:434,//
      ContrTestParaReleCatgComponent:435,//
      RiskTreatmentDecisionListComponent:436,//
      RiskTreatmentDecisionMatrixComponent:437,//
      ControlTestDecisionListComponent:438,//-------end

      //: Mitigation Control Default Settings start------
      MitigationActionRequiredComponent:439,//
      ActionPriorityListComponent:440, // ----end
    


      // Risk Module Part 2 Master pages starts from 440
     // Risk Business Function Mapping > Create Risk Business Function Mapping
      RiskBusinessFunctionMappingComponent:501, // start---
      UpdateRiskBusinessFunctionMappingComponent:502,// --- end 
    // RACT-02: Risk Matrix Attributes 
      RiskAdminTypeofRiskComponent:503,// start ---
      RiskAdminRiskClassificationComponent:504,
      RiskAdminRiskImpactRatingComponent:505,
      RiskAdminRiskLikeOfOccuFactorComponent:506,
      RiskAdminRiskCategorizationComponent:507,
      RiskAdminRiskCauseListComponent:508,
      RiskAdminRiskPriorityComponent:509,
      RiskAdminPotenBussinImpactComponent:510,
      RiskAdminLossEvntThrCatgComponent:511,
      RiskAdminLossEvntThrCatg2Component:512,
      RiskAdminLossEvntThrCatg3Component:513,
      RiskAdminRiskAppetiteComponent:514,
      RiskAdminRiskToleranceComponent:515,
      RiskAdminInherentRiskRatingLevelComponent:516,
      RiskAdminRiskIntensityComponent:517, 
      RiskadminactivityfrequencyComponent:518,
      RiskadmineventfrequencyComponent:519,// --- end

     // RACT-03: Control Matrix Attributes 
      RiskAdminNatContPerfComponent:520,// start ---
      RiskAdminNatContOccurComponent:521,
      RiskAdminContLevComponent:522,
      RiskAdminFreqcontAppComponent:523,
      RiskAdminContDependComponent:524,
      RiskAdminRiskCOnteffRatComponent:525,
      RiskAdminContRiskAssComponent:526,
      RiskAdminResiduRiskRatComponent:527,
      RiskAdminContMeasureComponent:528,
      RiskAdminIntercontrcomponComponent:529,
      RiskAdminInterContPrincipleComponent:530,
      RiskAdminContActivityTypeComponent:531,
      RiskAdminContActNatureComponent:532,
      RiskAdminContrActvSubNatureComponent:533,
      RiskAdminContAsserCheckComponent:534,
      RiskAdminContrRefeTypeComponent:535,
      RiskAdminContrAccepBechMarkComponent:536,
      RiskadmincontrolcomponentComponent:537,
      RiskadmincontrolmonitoringmechanismComponent:538,// --- end

     // Process Flow Map – MITIGATION CONTROL SETTINGS 
    // RACT-04A.1: Assessment Control Settings 
      RiskAdminBpMaturRatScaleComponent:539,// start ---
      RiskAdminContrHierSettComponent:540,//
      RiskAdminContrasstestattComponent:541,//
      RiskAdminInitiaAssImpactRatComponent:542,//
      RiskAdminRiskMitDesListComponent:543,//
      RiskAdminAsseContrAcctCriComponent:544,//
      RiskAdminRiskTrDeciListComponent:545,//
      RiskAdminRisktrDeciMatrComponent:546,// --- end

     //RACT-05A.2: Mitigation Control Settings 
      RiskAdminMitActReqComponent:547,// start ---
      RiskAdminActionPrioListComponent:548,// --- end

      //Process Flow Map – MANAGEMENT RISK OBJECTIVES 
      //RACT-06A.3: Management Risk Objectives 
      RiskKeyFocusAresComponent:549,// start ---
      RiskUpdateKeyFocusAreaComponent:550,
      RiskSetOverallRiskAppetiteComponent:551,
      RiskUpdateOverallRiskAppetiteComponent:552,
      RiskLossEventTrackerComponent:553,
      UpdateriskLossEventTrackerComponent:554,// --- end


      //Process Flow Map – ASSESSMENT TEMPLATE ATTRIBUTES 
      //RACT-07B.1.1: Risk Assessment Templates > Risk Assessment Template Attributes 
      RiskAssessmentTempleteTypeComponent:555,// start ---
      RiskAssessmentTempleteSubtypeComponent:556,// --- end

      //RACT-07B.1.2: Risk Assessment Templates > Assessment Template Rules
      RiskCommonAssessmentTemplateRulesComponent:557,
      ViewCommonAssesmentRulesComponent:558,// start --- end

     // RACT-07B.1.3: Risk Assessment Templates > Sampling Standards 
      RiskSamplingStandardsComponent:559,
      RiskEditsamplingstandardsComponent:560,// start ---end

      //RACT-08: Risk Question Bank 
      //RACT-08A: Question Bank > Risk Question Bank Attributes 
      RiskQuestionBankAttributeKeyAreComponent:571,// start ---
      RiskQuestionbankSubKeyAreaComponent:572,// --- end


      // risk part 3 
      RiskBusinessProcessComponent:601,// start ---
      RiskBusinessSubProcessl1Component:602,
      RiskBusinessSubProcessl2Component:603,
      RiskBusinessSubProcessl3Component:604,
      RiskCreateriskDocumentComponent:605,
      RiskStatementComponent:606,
      ViewriskstatementComponent:607,
      RiskDefaultNotifiersComponent:608,
      reactivateriskstatement:609,
      CreatecontrolstatementComponent:610,
      ViewRiskRegisterComponent:611,
      CreateControlDocumentComponent:612,
      EditControlStatementComponent:613,
      ViewControlStatementComponent:614,
      ViewRiskMatrixComponent:615,
      ViewControlMatrixComponent:616,
      ReactivateriskstatementComponent:617,

      //E-Compliance 98
      SectorMasterComponent:0, //
      SubSectorMasterComponent:0, //
      UnitMasterComponent:0,
      GroupOfCompanyComponent:0,
      GroupTypeComponent:0,
      RiskCategoryComponent:0,
      //user manual reporting head 72
      UserManualReportingHeadComponent:0,
      MonitoringCompliancesComponent:0,
      ReportWindowComponent:0,
      ContactUsChangeRequestFormComponent:0,
        //user manual Legal Head 75
      UserManualLegalHeadComponent:0,
      LegalHeadMonitoringCompliancesComponent:0,
      GenerationOfEcomplianceCertificateComponent:0,
      //GCA Components start here //
      CreateNewQuestionsComponent:0,
      EComplianceMasterComponent:0,
      DocumentReviewStatusComponent:0,
      ProjectListComponent: 0, // need to change this id (temp fix)
      ManufacturerListComponent: 0, // need to change this id (temp fix)
      ProductListComponent: 0 ,
      //**not in use **/ 
      AssessmentResultComponent:0,
      MyAssessmentComponent:0, 
      ScheduledAssessmentsComponent:0, //same in 2 places 

      NotificationCenterComponent:77,
};

interface ProfileData {
  authid: string;
  city: string;
  company: string;
  country: string;
  defaultrole: number;
  defaultrolename: string;
  employeeid: string;
  firstname: string;
  lastloginsuccess: string;
  lastname: string;
  state: string;
  useremialid: string;
  userid: number;
}
interface RolesList {
  componentid: number;
  componentname: string;
  status: number;
  statusbitvalue: boolean;
}

interface Roles {
  roleid: number;
  rolename: string;
  component: RolesList[];
}

interface UserRoleData {
  roles: Roles[];
}

interface UserData {
  profile: ProfileData;
  role: UserRoleData;
}

const localData1 = JSON.parse(localStorage.getItem('user') || '{}') as UserData;
let localData: RolesList[] = [];
localData1?.role?.roles.forEach((e) => {
  localData = localData.concat(...e.component);
});
// localData = Array.from(
//   new Set(
//     localData?.map((e) =>
//       localData.filter(
//         (f) => e.componentid === f.componentid && f.status !== e.status
//       ).length > 0
//         ? { ...e, status: 0 }
//         : e
//     )
//   )
// );

export const getAccess = (id: any) =>
  localData.some((e) => e.componentid === id && e.status === 0);
export const getSubAccess = (route: any) => {
  return (
    route.pages.filter((e: any) =>
      localData.some((ld) => ld.componentid === e.id && ld.status === 0)
    ).length > 0
  );
};
export const getSubMenuAccess=(route: any)=> {
  return (
    route.menuItems.pages.filter((e: any) =>
      localData.some((ld) => ld.componentid === e.id && ld.status === 0)
    ).length > 0
  );
};



export const roleComponentIdList = [
  // Governance Control Tasks
//   {
//     id: 2,
//     name: 'Department Master',
//     description: 'Allow user to perform Department Master.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 3,
//     name: ' TPA Entity Master',
//     description: 'Allow user to perform  TPA Entity Master.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 4,
//     name: ' Entity Master',
//     description: 'Allow user to perform  Entity Master.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 5,
//     name: 'Unit Location Master',
//     description: 'Allow user to perform Unit Location Master.',
//     status:'InActive',
//     mandatory:''
//   },
//   // {
//   //   id: 6,
//   //   name: 'User Location Mapping' ,
//   //   description: 'Allow user to perform User Location Mapping.',
//   //   status:'InActive',
//   //   mandatory:'',
//   //   Visible:false 
//   // },
//   {
//     id: 7,
//     name: 'Add User Role',
//     description: 'Allow user to perform Add User Role.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 8,
//     name: 'Admin Configuration',
//     description: 'Allow user to perform Admin Configuration.',
//     status:'InActive',
//     mandatory:''
//   },

//   {
//     id: 9,
//     name: 'Task master ',
//     description: 'Allow user to Access Task master on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 10,//InspectionListComponent
//     name: 'Document Type ',
//     description: 'Allow user to Access Document Type on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 11,//QuestionBankComponent
//     name: 'Document Category ',
//     description: 'Allow user to Access Document Category on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 12,//AssignedInspectionListComponent
//     name: 'Document Sub Category ',
//     description: 'Allow user to Access Document Sub Category on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 13,
//     name: 'Authority Type ',//InspectorInspectionListComponent
//     description: 'Allow user to Access Authority Type on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 14,
//     name: 'Authority Name ',//AuthorityNameComponent
//     description: 'Allow user to Access Authority Name on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 15,
//     name: 'Nature of Document ',//ReviewerInspectionListComponent
//     description: 'Allow user to Access Nature of Document on Governance Document Attributes',
//     status:'InActive',
//     mandatory:''
//   },
//   { 
//     id: 16,
//     name: ' Add Document',//BridgeListComponent
//     description: 'Allow  user to Add Document In Publish Governance.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 17,
//     name: 'Saved Drafts',//BridgeMasterComponent
//     description: 'Allow  user to Access Saved Drafts In Publish Governance.',
//     status:'InActive',
//     mandatory:''
//   },
//   { 
//     id: 18,
//     name: 'Provide Access ',//ReportListComponent
//     description: 'Allow  user to Provide Access In User Access Mapping.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 19,
//     name: 'Edit Access ',//RemedyBankComponent
//     description: 'Allow  user to Edit Access In User Access Mapping.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 20,
//     name: 'Remove Access',//RemoveUserAccessComponent
//     description: 'Allow  user to Remove Access In User Access Mapping.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 21,
//     name: 'View Access',//ViewUserAccessDocumentComponent
//     description: 'Allow  user to View Access In User Access Mapping.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//    id: 22,
//    name: 'Acknowledgement Requested ',
//    description: 'Allow user to Access Acknowledgement Requested on Document Awareness',
//    status:'InActive',
//    mandatory:''
//  },
//  {
//    id: 23,
//    name: ' Document User Accessibility ',
//    description: 'Allow user to Access Document User Accessibility on Document Awareness',
//    status:'InActive',
//    mandatory:''
//  },
//  {
//    id: 24,
//    name: 'Document Repository ',
//    description: 'Allow user to Access Document Repository on Document Awareness',
//    status:'InActive',
//    mandatory:''
//  },
//   {
//     id: 25,
//     name: 'View Published Document ',//
//     description: 'Allow  user to Provide View on Published Document Listing.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 26,
//     name: 'Update Published Document ',
//     description: 'Allow  user to Update Published Document on Published Document Listing.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 27,
//     name: 'Disable Published Document',
//     description: 'Allow  user to Disable Published Document on Published Document Listing.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 28,
//     name: 'Reactive Published Document ',
//     description: 'Allow user to Reactive Published Document on Published Document Listing',
//     status:'InActive',
//     mandatory:''
//   }, 
//   {
//     id: 29,
//     name: 'Version Change ',
//     description: 'Allow user to Access Version Change on Published Document Versioning',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 30,
//     name: 'Document Review Period Status ',
//     description: 'Allow user to Document Review Period Status on Published Document Versioning',
//     status:'InActive',
//     mandatory:''
//   }, 
// //  Governance Control Assessment (Governance Assessment)
// { 
//   id: 31,
//   name: 'Score Indicators',
//   description: 'Allow user to perform Add, Edit and View Score Indicator.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 32,
//   name: 'Competency Skill Levels',
//   description: 'Allow user to perform Add, Edit and View Competency Skill Level.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 33,
//   name: 'Key Improvement Indicators',
//   description: 'Allow user to perform Add, Edit and View Key Improvement Indicators.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 34,
//   name: 'Assessment Template Attributes Type Master',
//   description: 'Allow user to perform Add, Edit and View Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 35,
//   name: 'Assessment Template Attributes Sub-Type ',
//   description: 'Allow user to perform Add, Edit and View Assessment Sub-Type',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 36,
//   name: 'Assessment Builder',
//   description: 'Allow user to perform Assessment Builder in New Assessment Template',
//   //BUILD Assessment Template with Set of Questions (based on selection criteria), 
//   //ADD/ REMOVE Question(s)
//   //ADD Evaluation Criteria/ Assessment Permissions [Evaluation Criteria, Assessment Permissions,Assessment Template NOMENCLATURE]
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 37,
//   name: 'Customized Assessment',
//   description: 'Allow user to perform Customized Assessment in New Assessment Template',
//   //CUSTOMIZED Assessment Template with Set of Questions (based on add new question or selection criteria)
//   //ADD Evaluation Criteria/ Assessment Permissions:Evaluation Criteria(Assessment Permissions)
//   //Assessment Template NOMENCLATURE
//   status:'InActive',
//   mandatory:''
// },
// // {
// //   id: 32,
// //   name: 'Assessment Template Library(New Assessment Template)',
// //   description: 'Allow user to Access New Assessment Template',
// //   status:'InActive',
// //   mandatory:''
// // },
// {
//   id: 38,
//   name: 'View Assessment Template',
//   description: 'Allow user to perform View Assessment Template in Assessment Template Library',
//   //SEARCH & SELECT Assessment Template,VIEW Nomenclature details,VIEW List of Questions,View Evaluation Criteria,View Assessment Permissions
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 39,
//   name: 'Update Assessment Template',
//   description: 'Allow user to Access to Update Assessment Template in Assessment Template Library',
//   //Update Assessment Template, SEARCH & SELECT Assessment Template, UPDATE Nomenclature details, UPDATE List of Questions, UPDATE Evaluation Criteria, UPDATE Assessment Permissions
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 40,
//   name: 'Disable Assessment Template',
//   description: 'Allow user to perform Disable Assessment Template in Assessment Template Library',
//   //Disable Assessment Template, SEARCH & SELECT Assessment Template, DISABLE Assessment Template, REACTIVATE ‘Inactive’ Assessment Template, SEARCH & SELECT Assessment Template, 
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 41,
//   name: 'Re-activate Assessment Template ',
//   description: 'Allow user to perform Re-activate Assessment Template in Assessment Template Library',
//   //Disable Assessment Template, SEARCH & SELECT Assessment Template, DISABLE Assessment Template, REACTIVATE ‘Inactive’ Assessment Template, SEARCH & SELECT Assessment Template, 
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 42,
//   name: ' Provide Access',
//   description: 'Allow user to perform Provide Access in Map Assessment Template Access.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 43,
//   name: ' Edit Access',
//   description: 'Allow user to perform  Update Access in Map Assessment Template Access.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 44,
//   name: ' Remove Access',
//   description: 'Allow user to perform  Remove Access in Map Assessment Template Access.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 45,
//   name: 'Internal Repeat Frequency ',
//   description: 'Allow  user to perform Internal Repeat Frequency in Schedule Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 46,
//   name: 'Internal One-time Frequency',
//   description: 'Allow  user to perform Internal One-time Frequency in Schedule Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 47,
//   name: 'External One-time Frequency',
//   description: 'Allow  user to perform External One-time Frequency in Schedule Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 48,
//   name: 'Self Repeat Frequency ',
//   description: 'Allow  user to perform Self Repeat Frequency in Schedule Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 49,
//   name: 'Self One-time Frequency',
//   description: 'Allow  user to perform Self Repeat Frequency in Schedule Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 50,
//   name: 'Initiate External Assessment',
//   description: 'Allow  user to perform Initiate External Assessment.',
//   status:'InActive',
//   mandatory:''
// },
// { 
//   id: 51,
//   name: 'Add New TPA User',
//   description: 'Allow user to perform Add New TPA User',
//   status:'InActive',
//   mandatory:''
// }, 
// {
//   id: 52,
//   name: 'Update TPA User',
//   description: 'Allow user to perform Update TPA User',
//   status:'InActive',
//   mandatory:''
// }, 
// {
//   id: 53,
//   name: 'View TPA User',
//   description: 'Allow user to perform View TPA User',
//   status:'InActive',
//   mandatory:''
// }, 
// {
//   id: 54,
//   name: 'Begin Assessment Scheduled ',
//   description: 'Allow user to perform Begin Assessment Scheduled',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 55,
//   name: 'My Assessments',
//   description: 'Allow user to perform My Assessments in Manage Assessment',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 56,
//   name: 'Monitored Assessments',
//   description: 'Allow user to perform Monitored Assessments in Manage Assessment',
//   status:'InActive',
//   mandatory:''
// },
// { 
//   id: 57,
//   name: 'My Assessments',
//   description: 'Allow  user to  perform  My Assessments in Assessment Results.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 58,
//   name: 'Scheduled Assessment',
//   description: 'Allow  user to  perform  Scheduled Assessment in Assessment Results.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 59,
//   name: 'Monitored Assessment',
//   description: 'Allow  user to  perform  Monitored Assessment in Assessment Results.',
//   status:'InActive',
//   mandatory:''
// },
// { 
//   id: 60,
//   name: 'Acknowledge Mitigation Tasks',
//   description: 'Allow  user to  perform  Acknowledge Mitigation Tasks in Assessment Mitigation.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 61,
//   name: 'Management Inputs',
//   description: 'Allow  user to  perform  Management Inputs Tasks in Assessment Mitigation.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 62,
//   name: ' My Mitigation Tasks',
//   description: 'Allow  user to  perform  My Mitigation Tasks in Assessment Mitigation.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 63,
//   name: 'Update Mitigation Action',
//   description: 'Allow  user to  perform  Update Mitigation Action in Assessment Monitoring.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 64,
//   name: 'View Action Taken',
//   description: 'Allow  user to  perform  View Action Taken in Assessment Monitoring.',
//   status:'InActive',
//   mandatory:''
// },
 
// {
//   id: 65,
//   name: 'Define Subject',
//   description: 'Allow  user to perform Define Subject in Question Bank Attributes.',
//   status:'InActive',
//   mandatory:''
//   },
//   {
//    id: 66,
//    name: 'Define Topic',
//    description: 'Allow  user to perform Define Topic in Question Bank Attributes.',
//    status:'InActive',
//    mandatory:''
//   },
//   {
//    id: 67,
//    name: 'Check Level',
//    description: 'Allow  user to perform Check Level in Question Bank Attributes.',
//    status:'InActive',
//    mandatory:''
//   },
//   {
//     id: 68,
//     name: 'Bulk Upload Questions',
//     description: 'Allow  user to  perform Bulk Upload Questions in Question Bank Library.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 69,
//     name: 'Add Questions',
//     description: 'Allow  user to  perform  Add Questions in Question Bank Library.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 70,
//     name: ' Edit Questions',
//     description: 'Allow  user to  perform Edit Questions in Question Bank Library.',
//     status:'InActive',
//     mandatory:''
//   },
//   {
//     id: 71,
//     name: 'Disable Questions',
//     description: 'Allow  user to  perform Disable Question in Questions Bank Library.',
//     status:'InActive',
//     mandatory:''
//   },
   
//   {
//     id: 72,
//     name: 'Reactivate Questions',
//     description: 'Allow  user to perform Reactivate Questions in Question Bank Library.',
//     status:'InActive',
//     mandatory:''
//     },
//     {
//      id: 73,
//      name: ' My Questions',
//      description: 'Allow  user to perform Access My Questions in Question Bank Library.',
//      status:'InActive',
//      mandatory:''
//     },
//     {
//      id: 74,
//      name: 'Question Bank Reserve',
//      description: 'Allow  user to perform Question Bank Reserve in Question Bank Library.',
//      status:'InActive',
//      mandatory:''
//     },
//     {
//   id: 75,
//   name: 'Nature Of Law',
//   description: 'Allow  user to perform Nature Of Law / Law Type.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 76,
//   name: 'Compliance Type Master',
//   description: 'Allow  user to perform Compliance Type Master.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 77,
//   name: 'Category Of Law',
//   description: 'Allow user to perform Category Of Law.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 78,
//   name: 'Jurisdiction Category List',
//   description: 'Allow user to perform Jurisdiction Category List.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 79,
//   name: 'jurisdiction location list',
//   description: 'Allow user to perform jurisdiction location list.',
//   status:'InActive',
//   mandatory:''
// },

// {
//   id: 80,
//   name: 'Compliance Record Type',
//   description: 'Allow  user to  perform Compliance Record Type.',
//   status:'InActive',
//   mandatory:''
// },
 
// {
//   id: 81,
//   name: 'Compliance Group',
//   description: 'Allow  user to  perform Compliance Group.',
//   status:'InActive',
//   mandatory:''
// },

// {
//   id: 82,
//   name: 'Regulatory Authority',
//   description: 'Allow  user to perform Regulatory Authority.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 83,
//   name: 'Compliance Risk Classification',
//   description: 'Allow  user to perform Compliance Risk Classification.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 84,
//   name: 'Penality Category',
//   description: 'Allow  user to perform Penality Category.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 85,
//   name: 'Compliance Notified Status',
//   description: 'Allow  user to perform Compliance Notified Status.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 86,
//   name: 'Compliance Risk Classification Criteria',
//   description: 'Allow  user to perform Compliance Risk Classification Criteria.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 87,
//   name: 'Compliance Period',
//   description: 'Allow  user to perform Compliance Period.',
//   status:'InActive',
//   mandatory:''
// },
//   {
//   id: 88,
//   name: 'Entity Type Master',
//   description: 'Allow  user to perform Entity Type Master in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 89,
//   name: 'Region Master',
//   description: 'Allow  user to perform Region Master in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 90,
//   name: 'Sub Region Master',
//   description: 'Allow  user to perform Sub Region Master in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 91,
//   name: 'Unit Type Master',
//   description: 'Allow  user to perform Unit Type Master in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 92,
//   name: 'Business Sector List',
//   description: 'Allow user to perform Business Sector List in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 93,
//   name: 'Industery Type List',
//   description: 'Allow user to perform Industery Type List in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 94,
//   name: 'Frequency Master',
//   description: 'Allow user to perform Frequency Master in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 95,
//   name: 'Super Admin Holiday Master',
//   description: 'Allow user to perform Super Admin Holiday Master in Common Entity Attributes.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 96,
//   name: 'Create Complaince Content',
//   description: 'Allow  user to perform Create Complaince Content in Company Complaince  content Library.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 97,
//   name: 'Create Global Compliance Master',
//   description: 'Allow  user to perform Create Global Compliance Master in Global Compliance Content Library.',
//   status:'InActive',
//   mandatory:''
// },
//   {   
//   id: 98,
//   name: 'Sector Master ',
//   description: 'Allow  user to perform Sector Master.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 99,
//   name: 'Sub-Sector Master ',
//   description: 'Allow  user to perform Sub-Sector Master.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 100,
//   name: 'Unit Type Master',
//   description: 'Allow  user to perform Unit Type Master in E-Compliance.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 101,
//   name: 'Group Of Company ',
//   description: 'Allow user to perform Group Of Company',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 102,
//   name: ' Group Type ',
//   description: 'Allow user to perform Group Type',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 103,
//   name: 'Risk Category ',
//   description: 'Allow  user to perform Risk Category.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 104,
//   name: 'ECompliance Dashboard',
//   description: 'Allow  user to perform ECompliance Dashboard in Compliance Task(FT).',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 105,
//   name: 'Remediate Compliance Task',
//   description: 'Allow  user to perform Remediate Compliance Task in Compliance Task(FT).',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 106,
//   name: 'Review Compliance Task',
//   description: 'Allow user to perform Review Compliance Task in Compliance Task(FT)',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 107,
//   name: 'Approve Compliance Task',
//   description: 'Allow  user to perform Approve Compliance Task in Compliance Task(FT).',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 108,
//   name: 'Aduit Compliance Task',
//   description: 'Allow  user to perform Aduit Compliance Task in Compliance Task(FT).',
//   status:'InActive',
//   mandatory:''
// },
// // {
// //   id: 103,
// //   name: 'Contact Us Change Request Form',
// //   description: 'Allow  user to perform Contact Us Change Request Form in User Manual Reporting Head.',
// //   status:'InActive',
// //   mandatory:''
// // },
// // {
// //   id: 104,
// //   name: 'Legal Head Monitoring Compliances',
// //   description: 'Allow  user to perform Legal Head Monitoring Compliances in User Manual Legal Head Component.',
// //   status:'InActive',
// //   mandatory:''
// // },
// // {
// //   id: 105,
// //   name: 'Generation Of Ecompliance Certificate ',
// //   description: 'Allow  user to perform Generation Of Ecompliance Certificate in User Manual Legal Head Component',
// //   status:'InActive',
// //   mandatory:''
// // },
// // {
// //   id: 106,
// //   name: 'External Assessment One-time Frequency ',
// //   description: 'Allow  user to perform External One-time Frequency  in Schedule Assessment.',
// //   status:'InActive',
// //   mandatory:''
// // },
// // {
// //   id: 107,
// //   name: 'Self-Assessment Repeat Frequency ',
// //   description: 'Allow  user to perform Self-Assessment Repeat Frequency in Schedule Assessment.',
// //   status:'InActive',
// //   mandatory:''
// // },
// // {
// //   id: 108,
// //   name: 'Self-Assessment One-time Frequency',
// //   description: 'Allow  user to perform Self-Assessment One-time Frequency in Schedule Assessment.',
// //   status:'InActive',
// //   mandatory:''
// // },
// {
//   id: 109,
//   name: 'Create Complaince Department Mapping',
//   description: 'Allow  user to  perform Create Complaince Department Mapping in Complaince Department Mapping(cc).',
//   status:'InActive',
//   mandatory:''
// },

// // Governance Question Bank

// {
// id: 110,
// name: 'Create Activity Work Group',
// description: 'Allow  user to Provide Access Create Activity Work Group in Activity Workgroup Creation (cc).',
// status:'InActive',
// mandatory:''
// },


  
// {
// id: 111,
// name: 'Create User Work group Mapping',
// description: 'Allow  user to Create User Work group Mapping in User Workgroup Mapping(cc).',
// status:'InActive',
// mandatory:''
// },
// {
// id: 112,
// name: 'Act Regulator Master',
// description: 'Allow user to Perform Act Regulator Master in Act/Regulator Universe.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 113,
// name: 'Add Rules Regulations Procedure',
// description: 'Allow user to Perform Add Rules Regulations Procedure Act/Regulator Universe.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 114,
// name: 'Statutory Forms Records',
// description: 'Allow user to Perform Statutory Forms Records Act/Regulator Universe.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 115,
// name: 'Compliance Penalty Master',
// description: 'Allow user to Perform Compliance Penalty Master Act/Regulator Universe.',
// status:'InActive',
// mandatory:''
// },
// {
//   id: 116,
//   name: 'Monitoring Compliances ',
//   description: 'Allow  user to perform Monitoring Compliances in User Manual Reporting Head.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 117,
//   name: 'Report Window ',
//   description: 'Allow  user to perform Report Window in User Manual Reporting Head.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 118,
//   name: 'Contact Us Change Request Form',
//   description: 'Allow  user to perform Contact Us Change Request Form in User Manual Reporting Head.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 119,
//   name: 'Legal Head Monitoring Compliances',
//   description: 'Allow  user to perform Legal Head Monitoring Compliances in User Manual Legal Head Component.',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 120,
//   name: 'Generation Of Ecompliance Certificate ',
//   description: 'Allow  user to perform Generation Of Ecompliance Certificate in User Manual Legal Head Component',
//   status:'InActive',
//   mandatory:''
// },
// {
//   id: 121,
//   name: 'Entity Type Master',
//   description: 'Allow  user to  perform Entity Type Master in Compliance SuperAdmin.',
//   status:'InActive',
//   mandatory:''
// },
// {
// id: 122,
// name: 'Unit Location Type',
// description: 'Allow  user to Perform Unit Location Type in Compliance SuperAdmin.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 123,
// name: 'Business Sector List',
// description: 'Allow  user to Perform Business Sector List in Compliance SuperAdmin.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 124,
// name: 'Industry Type List',
// description: 'Allow user to Perform Industry Type List in Compliance SuperAdmin.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 125,
// name: 'Region Master',
// description: 'Allow user to Perform Region Master in Compliance SuperAdmin.',
// status:'InActive',
// mandatory:''
// },
// {
// id: 126,
// name: 'SubRegion Maste',
// description: 'Allow user to Perform SubRegion Maste in Compliance SuperAdmin.',
// status:'InActive',
// mandatory:''
// },
// {
//   id: 127,
//   name: 'Frequency Master',
//   description: 'Allow user to perform Frequency Master in Compliance SuperAdmin.',
//   status:'InActive',
//   mandatory:''
// }, 
// {
//   id: 128,
//   name: 'Holiday Master',
//   description: 'Allow user to perform Holiday Master in Compliance SuperAdmin.',
//   status:'InActive',
//   mandatory:''
// }, 
// {
//   id: 129,
//   name: 'Holiday Master',
//   description: 'Allow user to perform Holiday Master in Compliance SuperAdmin.',
//   status:'InActive',
//   mandatory:''
// }, 
 
];
