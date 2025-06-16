import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { BehaviorSubject, Observable ,of, UnaryFunction} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';

@Injectable({
  providedIn: 'root'
})




export class InspectionservicesService {
  static UserModel(): any {
    throw new Error('Method not implemented.');
  }
  private baseUrl = BASE_URL;

  constructor(private http: HttpClient) { }

   
  getFiles(endpoint: string): Observable<Document[]> {
    return this.http.get<Document[]>(endpoint).pipe(
      catchError(this.handleError<Document[]>('getFiles', []))
    );
  }
  getFile1(endpoint: string, options?: { params?: HttpParams; observe?: 'body' }): Observable<Document[]> {
    return this.http.get<Document[]>(endpoint, { ...options, observe: 'body' }).pipe(
      catchError(this.handleError<Document[]>('getFiles', []))
    );
  }
  getFile(url: string, options: { headers?: HttpHeaders; params?: HttpParams }): Observable<any> {
    return this.http.get(url, options);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    getEquipments(){
      return new Promise((resolve, reject) => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'text/plain');
        this.http.get(this.baseUrl+'/Equipments',{headers})
          .subscribe(res => {
           (resolve(res));
          }, (err) => {
            reject(err);
          });
    });
  }


  
  getEquipmentsDetails(): Observable<any> {
  const url = this.baseUrl + '/Equipments/GeEquipmentDetails';
    return this.http.get(url)

}

sendEmail(emailToAddress: string, subject: string, body: string): Observable<any> {
  const payload = {
    emailToAddress: emailToAddress,
    subject: subject,
    body: body
  };

  const url = this.baseUrl + '/Acknowledgement/Sendmail';

  // Return the observable from the HTTP POST request
  return this.http.post(url, payload);
}


getEquipmentsByMission(data:any): Observable<any> {
  //console.log(data);
  const url = this.baseUrl + '/GetMission/getEquipmentsByMission';
    return this.http.get(url + '?id=' + data);

}

getParamTypes() : Observable<any> {
  const url = this.baseUrl + '/ParameterType/GetParamType';
  return this.http.get(url);
}

insertParamData(numberOfEquipments: any) : Observable<any> {
  // alert(numberOfEquipments);
  const url = this.baseUrl + '/DataRetrieve/AddValues';
  return this.http.get(url + '?EquipmentID=' + numberOfEquipments)
}

GetPacketDetails() : Observable<any> {
  const url = this.baseUrl + '/Packet/GetPacketsDetails';
  return this.http.get(url)
}


}


export interface Document {
  documentRepID: number;
  addDoc_id: number;
  fileCategory: string;
  document_Name: string;
  filePath: string;
  status: string;
  documentrepository_createdDate: string;
}


export class Updatekeyfocus{
  keyfocusareaid :number|undefined
     keyfousname :string|undefined;
     keyfousdescription :string|undefined;
    departmentid:number|undefined
   entityid :number|undefined
   unitlocationid :number|undefined
   bpmaturity:number|undefined
   riskBusinessfunctionid:number|undefined
   businessprocessID :string|undefined;
   createdby: number|undefined
  }
  export class UpdateoverallriskAppetite{
    overallriskappititeid :number|undefined
    RiskAppetitename :string|undefined;
    trolerancecoparison :string|undefined;
      departmentid:number|undefined
     entityid :number|undefined
     unitlocationid :number|undefined
     riskBusinessfunctionid:number|undefined
     acceptanceid:number|undefined
     businessprocessID :string|undefined;
     trigervalue:number|undefined;
     createdby: number|undefined
    }
    export class Updatelossevent{
      losseventtrackerid :number|undefined
      losseventname :string|undefined;
      losseventdescription :string|undefined;
        departmentid:number|undefined
       entityid :number|undefined
       unitlocationid :number|undefined
       riskBusinessfunctionid:number|undefined
       additionalusers:string|undefined
       reportingusers:string|undefined
       endValues:number|undefined
       startValue:number|undefined;
       createdby: number|undefined
      }
export class jurisdictioncategory {
  jurisdiction_category_id:number|undefined;
  jurisdiction_categoryname:string|undefined;
  jurisdiction_category_description:string|undefined;
  createdby:number|undefined;


}
export class typemaster{

  typeID:number|undefined;
  typeName:string|undefined;
  typeDesc:string |undefined
  createdBy:number|undefined;
}
export class keyarea{

  keyareaID:number|undefined;
  keyName:string|undefined;
  keyDesc:string |undefined
  createdBy:number|undefined;
}
export class Updateuseractivity {
  user_workgroup_mapping_id:number|undefined;
  user_workgroup_mapping_name:string|undefined;
  user_workgroup_mapping_desc:string|undefined;
  activityworkgroup_id:number|undefined;
  createdby:number|undefined;
}
export class Updatedepartmentmaping{
  locationdepartmentmappingid:number|undefined
  departmentid:string|undefined
  unitlocationid:string|undefined
  entityid:string|undefined
  createdby:number|undefined
}

export class Updatebusinessmapping{
  riskBusinessfunctionid :number| undefined
  riskbusinessname:string| undefined
  riskbusinessdescription :string| undefined
  departmentid :number| undefined
   entityid:number| undefined
  unitlocationid :string| undefined
  createdby:number| undefined
}
export class  Updateactivityworkgroup{
  activity_Workgroup_id:number|undefined
  name_ActivityWorkgroup:string|undefined
  desc_ActivityWorkgroup:string|undefined
  locationdepartmentmappingid:string|undefined
  roles:number|undefined
  unigueActivityid:string|undefined
  createdby:number|undefined
}

export class JurisdictionLocation {
  jurisdiction_location_id:number|undefined;
  jurisdiction_country_id:string|undefined;
  jurisdiction_state_id:string|undefined;
  jurisdiction_district:string|undefined;
  createdby:number|undefined;
}


export class Categoryoflaw{
  category_of_law_ID:number|undefined;
  law_Categoryname:string|undefined;
  category_of_Law_Description:string|undefined;
  createdby:number|undefined;
}
export class DocCategory {
  doc_CategoryID: number | undefined;
  doc_CategoryName: string | undefined;
  doc_CategoryDescription:string | undefined;
  DocTypeID:number | undefined;
  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;

}
export class DocumentType{
  docTypeID:number | undefined;
  docTypeName:string | undefined;
  docTypeDescription:string | undefined;
  task_id:number | undefined;
  //DocType_Status:string | undefined;
  // Doctype_CreatedDate:Date | undefined;

}
export class Updatecompliancemaping {
  compliance_location_Mapping_id:number|undefined;
  companycomplianceid:string|undefined;
  locationdepartmentmappingid:string|undefined;
  createdby:number|undefined;
  companycompliancemappingid:string|undefined;
}
export class superadminEventfrequency {

  eventfrequencyid: number | undefined;

  eventfrequencyname: string | undefined;

  eventfrequencyDesc: string | undefined;

}
export class superadmincontrol {

  controlid: number | undefined;

  controlname: string | undefined;

  controlDesc: string | undefined;


}

export class superadmincontrolmonitoring {

  controlmonitoringid: number | undefined;

  controlmonitoringname: string | undefined;

  controlmonitoringDesc: string | undefined;


}

export class admincontrolmonitoring {

  controlmonitoringid: number | undefined;

  controlmonitoringname: string | undefined;

  controlmonitoringDesc: string | undefined;
  createdby:number|undefined;

}

export class admincontrol {

  controlid: number | undefined;

  controlname: string | undefined;

  controlDesc: string | undefined;
  createdby:number|undefined;

}
export class adminEventfrequency {

  eventfrequencyid: number | undefined;

  eventfrequencyname: string | undefined;

  eventfrequencyDesc: string | undefined;
  createdby:number|undefined;

}
 export class activityfrequency {
  activityid:number|undefined;
  activityname:string|undefined;
  activitydesc:string|undefined;
  
  activityvalue:number|undefined;
  createdby:number|undefined;

  
 }
 export class superactivityfrequency {
  activityid:number|undefined;
  activityname:string|undefined;
  activitydesc:string|undefined;
  
  activityvalue:number|undefined;


  
 }
export class Law_Type{
  law_type_id:number|undefined;
  type_of_law:string|undefined;
  law_description:string|undefined;
  createdby:number|undefined;
  law_status:string|undefined;

}
export class ComplianceRecordType{
  compliance_record_type_id:number|undefined;
  compliance_record_name:string|undefined;
  compliance_record_description:string|undefined;
  compliance_createdby:number|undefined;
  compliance_record_status:string|undefined;
}

export class  ComplianceGroup{
  compliance_group_id:number|undefined;
  compliance_group_name:string|undefined;
  compliance_group_description:string|undefined;
  createdby:number|undefined;
  compliance_group_status:string|undefined;
}

export class  RegulatoryAuthority{
  regulatory_authority_id:number|undefined;
  regulatory_authority_name:string|undefined;
  regulatory_authority_description:string|undefined;
  createdby:number|undefined;
  regulatory_authority_status:string|undefined;
}

export class  ComplianceRiskClassification{
  compliance_risk_classification_id:number|undefined;
  compliance_risk_classification_name:string|undefined;
  compliance_risk_classification_description:string|undefined;
  createdby:number|undefined;
  compliance_risk_classification_status:string|undefined;
}

export class  ComplianceRiskClassificationCriteria{
  compliance_risk_criteria_id:number|undefined;
  compliance_risk_criteria_name:string|undefined;
  compliance_risk_criteria_description:string|undefined;
  createdby:number|undefined;
  compliance_risk_criteria_status:string|undefined;
}

export class  PenaltyCategory{
  penalty_category_id:number|undefined;
  penalty_category_name:string|undefined;
  penalty_category_description:string|undefined;
  createdby:number|undefined;
  penalty_category_status:string|undefined;
}
export class  TypeOfCompliance{
  compliance_type_id:number|undefined;
  compliance_type_name:string|undefined;
  compliance_type_description:string|undefined;
  createdby:number|undefined;
  compliance_type_status:string|undefined;
}

export class  ComplianceNotifiedStatus{
  compliance_notified_id:number|undefined;
  compliance_notified_name:string|undefined;
  compliance_notified_description:string|undefined;
  createdby:number|undefined;
  compliance_notified_status:string|undefined;
}

export class  CompliancePeriod{
  compliance_period_id:number|undefined;
  compliance_period_start:string|undefined;
  compliance_period_end:string|undefined;
  start_compliance_year_format:string|undefined;
  end_compliance_year_format:string|undefined;
  compliance_period_description:string|undefined;
  createdby:number|undefined;
  compliance_period_status:string|undefined;
  check_box:boolean|undefined;
}

export class hoildasymaster{
  holidayid:number|undefined;
  holidayname:string|undefined;
  recurence:string|undefined;
  holidaytimeperiod:string|undefined;
  hoildaytimeinterval:string|undefined;
  holidaydescription:string|undefined;
  createdby:number|undefined;
}

export class frequencymaster{
  frequencyid: number|undefined;
  recurenceid:string|undefined;
  frequencyperiod:string|undefined;
  frequencyDescription:string|undefined;
  nooffrequencyintervals: number|undefined;
 timeperiod :string|undefined
  timeinterval:string|undefined;
  createdby:number|undefined
}
export class businesssector{
  businesssectorid: number| undefined;
businesssectorname : string | undefined;
businesssectordescriptio : string | undefined;
createddate : Date| undefined;
createdBy:number| undefined;
status : string| undefined;
}
export class regions{

  regionsid:number|undefined;
  name:string|undefined;
  Discription:string |undefined
  created_at:Date|undefined;
  updated_at:Date|undefined;
  // flag:number|undefined;
  // wikiDataId:string|undefined;
  regiontablenamel:string|undefined;

}

export class industrytype{
  industrytypeid :number| undefined;
industrytypename : string| undefined; 
industrytypedescription :string | undefined;
createddate : Date|undefined;
createdBy:number| undefined;
status:string|undefined;
businesssectorid: number|undefined;
}
export class TpaEntity{
  tpaenityid:number|undefined;
  tpaenityname:string|undefined;
  tpadescription:string|undefined;
  tpaaddress:string|undefined;
}
export class DocSubCategory {
  doc_SubCategoryID: number | undefined;
  doc_SubCategoryName: string | undefined;
  doc_SubCategoryDescription:string | undefined;
  docTypeID:number | undefined;
  doc_CategoryID:number | undefined;
  Doc_Status:string | undefined;
  // Doc_createdDate:Date | undefined;

} 
export class DefaultNotifiers {
  defaultNotifiersID:number | undefined;
  doc_SubCategoryID: number | undefined;
  docTypeID:number | undefined;
  doc_CategoryID:number | undefined;
  emailid:string | undefined;
  additional_emailid_notifiers:string | undefined;
  Status:string | undefined;
  CreatedDate:Date | undefined;

}
export class AuthorityType {
  authorityTypeID: number | undefined;
  authorityTypeName: string | undefined;
  authorityTypeDescription:string | undefined;
  //authoritytype_status:string | undefined;
  //Authoritytype_createdDate:Date | undefined;
}
export class UserModel {
  USR_ID:number|undefined
 mobilenumber : string|undefined
 firstname : string|undefined
lastname : string|undefined
USR_LOGIN : string|undefined 
USR_PASSWORD: string|undefined
EmailId:string|undefined
ROLE_ID:number|undefined
 Department_Master_id :number|undefined
 Unit_location_Master_id:number|undefined
 Entity_Master_id :number|undefined
}
export class userlocationmapping{
  user_location_mapping_id:number|undefined
  Unit_location_Master_id:string|undefined
  Entity_Master_id :string|undefined
  ROLE_ID: number[] | undefined;
  USR_ID:string|undefined
  user_location_mapping_start_Date:Date|undefined
  user_location_mapping_End_Date:Date|undefined
  user_location_mapping_createddate:Date|undefined
}

export class AuthorityName {
  authoritynameID: number | undefined;
  authorityName: string | undefined;
  authorityNameDescription:string | undefined;
  authorityTypeID:number | undefined;
  //authority_Status:string | undefined;
  //authority_CreatedDate: string | undefined;

}

export class NatureOfDocument {
  NatureOf_Doc_id: number | undefined;
  NatureOf_Doc_Name: string | undefined;
  NatureOf_Doc_Desc:string | undefined;
  //natureof_Status:string | undefined;
 // natureof_createdDate:string | undefined;
  

}

export class ScoreIndicatorModel
{
   

   Score_id :number | undefined
   Score_Name :string | undefined
   scoreminrange:number|undefined
   scoremaxrange:number|undefined
   Score_Range :string | undefined
   Score_Desc :string | undefined
          // score_status :string
          // score_createdDate :string

}
export class CompetencySkillModel
{
   

  Competency_id :number | undefined
  Competency_Name :string | undefined
  Competency_Desc :string | undefined
  Competency_Weightage :string | undefined
 // Position :string | undefined
          // score_createdDate :string

}



export class CompetencyCheckLevelModel
{
   

  check_level_id :number | undefined
  Skill_Level_Name :string | undefined
  Check_Level_Weightage :string | undefined
  Check_level_Description :string | undefined
 // Position :string | undefined
          // score_createdDate :string

}



export class TaskModel
{
   

  task_id :number | undefined
  task_name :string | undefined
  task_desc :string | undefined
  
          // score_status :string
          // score_createdDate :string

}
 export class DepartmentModel{
  
  Department_Master_id :number | undefined
  Department_Master_name:string| undefined
  Department_Master_Desc:string |undefined
 }
 export class RoleModel{
  
  ROLE_ID:number | undefined
  ROLE_NAME :string| undefined
  ROLE_DESC :string |undefined
 }
export class Type {
  type_id: number | undefined;
  type_Name: string | undefined;
  type_DESC:string | undefined;
  
  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;

}

 export class entitytype{

  entitytypeid:number|undefined;
  entitytypename:string|undefined;
  entitytypeDesc:string|undefined;
  createdBy:string|undefined;
}
export class  subregions {
  subregionsid:number|undefined
  region_id:number|undefined;
  name:string|undefined;
  Discription:string|undefined;
  created_at:Date|undefined;
  updated_at:Date|undefined;
  subregiontablename:string|undefined
  //createdBy:number|undefined;

}
export class regionmaster{

  regionMasterID:number|undefined;
  regionName:string|undefined;
  regionDesc:string |undefined
  createdBy:number|undefined;
}

export class SubType {
  subType_id: number | undefined;
  subType_Name: string | undefined;
  subType_DESC:string | undefined;
  type_id: number| undefined;
  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;

}
export class subject {
  subject_id: number | undefined;
  subject_Name: string | undefined;
  subject_Desc:string | undefined;

  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;

}
export class topic {
  topic_id: number | undefined;
  topic_Name: string | undefined;
  topic_Desc:string | undefined;
  subject_id:number | undefined;

  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;

}

export class KeyImprovementIndictor {
  key_Impr_Indicator_id: number | undefined;
  Score_id:number|undefined
  competency_id:number|undefined
  key_Impr_Indicator_Name: string | undefined;
  key_Impr_Indicator_DESC:string | undefined;
  

  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;

}

export class AddDocument {
  AddDoc_id: number | undefined;
  Title_Doc: string | undefined;
  Sub_title_doc:string | undefined;
  Obj_Doc: string | undefined;
  Select_Opt:string | undefined;
  Doc_Confidentiality: string | undefined;
  Doc_internal_num:number | undefined;
  Doc_Inter_ver_num: number | undefined;
  Doc_Phy_Valut_Loc:string | undefined;
  Doc_Approver: string | undefined;
  Date_Doc_Approver:string | undefined;
  Date_Doc_Revision: string | undefined;
  Pub_Auth_Type:string | undefined;
  Keywords_tags: string | undefined;
  freq_period:number | undefined;
  pub_doc: string | undefined;
  publisher_comments:string | undefined;
  DocTypeID: number | undefined;
  Doc_CategoryID:number | undefined;
  Doc_SubCategoryID: number | undefined;
  NatureOf_Doc_id:number | undefined;
  AuthoritynameID: number | undefined;
  Draft_Status:string | undefined;
  addDoc_Status: string | undefined;
  addDoc_createdDate:string | undefined;
 
 
   Document_Id :number | undefined;
 
  Document_Name : string | undefined;
 
   Publisher_name :string | undefined;
   publisher_Date_Range :string |undefined;
   Eff_Date:string|undefined;
        //public DateOnly Publisher_Date_Range { get; set; }
 
 
        //public DateOnly Document_Eff_Date { get; set; }
 
   Nature_Confidentiality :string | undefined;
 
         Review_Status :string | undefined;
 
 
         authorityTypeID :number |undefined;
 
         authorityTypeName:string|undefined;
         Doc_referenceNo: string |undefined;
         revision_summary:string|undefined;
 
  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;
 
}

export class UpdateAddDocument {
  AddDoc_id: number | undefined;
  Title_Doc: string | undefined;
  Sub_title_doc:string | undefined;
  Obj_Doc: string | undefined;
  Select_Opt:string | undefined;
  Doc_Confidentiality: string | undefined;
  OtpMethod: string | undefined;
  Eff_Date:Date | undefined;
  Initial_creation_doc_date: Date | undefined;
  Doc_internal_num:string | undefined;
  Doc_Inter_ver_num: string | undefined;
  Doc_Phy_Valut_Loc:string | undefined;
  Doc_process_Owner: string | undefined;
  Doc_Approver: string | undefined;
  Date_Doc_Approver:Date | undefined;
  Date_Doc_Revision: Date | undefined;
  Pub_Auth_Type:string | undefined;
  Keywords_tags: string | undefined;
  freq_period:number | undefined;
  pub_doc:string | undefined;
  publisher_comments:string | undefined;
  indicative_reading_time: number | undefined;
  Time_period:string | undefined;
  DocTypeID: number | undefined;
  Doc_CategoryID:number | undefined;
  Doc_SubCategoryID: number | undefined;
  NatureOf_Doc_id:number | undefined;
  AuthoritynameID :number | undefined;
  Draft_Status : string | undefined;
  addDoc_Status :string | undefined;
  addDoc_createdDate :Date |undefined;
  Document_Id:string |undefined
  Document_Name :string | undefined;
  Publisher_name :string | undefined;
  Publisher_Date_Range :Date |undefined;
  Document_Eff_Date:Date|undefined;
  Nature_Confidentiality:string |undefined;
  Review_Status:string|undefined;
  FilePath: string | undefined;
  freq_period_type:string | undefined;
  review_start_Date: Date | undefined;
  AuthorityTypeID:number | undefined;
  AuthorityTypeName: string | undefined;
  DisableReason:string | undefined;
  VersionControlNo: string | undefined;
  USR_ID:number | undefined;
  Doc_referenceNo: number | undefined;
  Revision_summary:string | undefined;
  status_permission:string | undefined;
  Review_Frequency_Status:number | undefined;
  Doc_Linking_Status:number | undefined;
  ChangedBy:number | undefined;
}

export class UpdateRiskRegister {
  RiskRegisterMasterID: number | undefined;
  Entity_Master_id: number | undefined;
  Unit_location_Master_id:number | undefined;
  department_Master_id: number | undefined;
  riskBusinessfunctionid:number | undefined;
  BusinessProcessL1ID:number | undefined;
  BusinessProcessL2ID: number | undefined;
  BusinessProcessL3ID: number | undefined;
  BusinessSubProcessObjective:string | undefined;
  NameofRiskDocumentRegister: string | undefined;
  ObjectiveofRiskDocument:string | undefined;
  RiskRootCause: string | undefined;
  risk_Admin_typeOfRisk_id:number | undefined;
  risk_admin_classification_id: number | undefined;
  risk_admin_risk_categorization_id: number | undefined;
  risk_admin_causeList_id:number | undefined;
  AMLComplianceRisk: string | undefined;
  ModelRisk:string | undefined;
  ConductRisk: string | undefined;
  ITCyberSecurity:string | undefined;
  ThirdPartyOutsourcing:string | undefined;
  FraudRisk:string | undefined;
  LegalRisk: string | undefined;
  OperationalRisk:string | undefined;
  ReputationalRisk: string | undefined;
  FinancialRiskReporting:string | undefined;
  RiskCostImpact: string | undefined;
  risk_admin_riskImpactRating_id:number | undefined;

  risk_admin_likeoccfact_id:number | undefined;
  InherentRiskRating :number | undefined;
  activityid : number | undefined;
  RiskPriority :number | undefined;
  Slidervalue :number |undefined;
  RiskIntensity:number |undefined
  risk_admin_LETC_L1_id :number | undefined;
  CategoryL1Description :string |undefined;
  risk_admin_letc_l2_id:number|undefined;
  CategoryL2Description:string |undefined;
  risk_admin_LETC_l3_id:number|undefined;
  CategoryL3Description: string | undefined;
  risk_admin_potenBussImpactid :number | undefined;
  PotentialImpactDescription:string | undefined;
  SuggestivePriventive: string | undefined;

   RiskOwnership:number | undefined;
   ProcessOwner: number | undefined;
   BusinessFunctionHead:number | undefined;
  ReviewfrequencyCheck: number | undefined;
  RepeatReviewFrequency:string | undefined;
  EnterValueforrepeat: number | undefined;
  Selectfrequencyperiod:string | undefined;
  StartDateNextReview:Date | undefined;
  businessprocessID:number | undefined;
  NoOfRiskStatements:number | undefined;
  docTypeID:number|undefined;
  doc_CategoryID:number |undefined;
  doc_SubCategoryID:number |undefined;
  DocumentEffectiveDate:Date |undefined;
  DocumentConfidentiality:string |undefined;
  OtpMethod :string | undefined;
  natureOf_Doc_id :number | undefined;
  InternalReferenceNo : string |undefined;
  PhysicalVaultLocation: string | undefined;
  risk_admin_RiskAppetiteId:number |undefined;
  AppetiteStatement :string |undefined;
  PublishingRemarks:string |undefined;
  Keywords :string | undefined;
  UniqueRiskID :string |undefined;
  RiskStatementID:number |undefined;
  UniqueDocumentID:string|undefined;
  InherentRatingColor:string |undefined;
  RiskPirorityColor:string |undefined;
  RiskIntensityColor:string |undefined;
  DocumentApprover:number |undefined;
  BusinessProcessHead: number |undefined;
 
  activityvalue:number |undefined;
  RiskDefinition:string |undefined;
}
export class Updatestatements
{
  RiskStatementID:number |undefined;
  RiskStatementName:string |undefined;
  RiskDescription:string |undefined;
  
}
 
export class ProvideAccess {
  addDoc_id:number|undefined;

  document_Id: number | undefined;

  document_name: string | undefined;

  natureOf_Doc_id: number | undefined;

  natureOf_Doc_Name: string | undefined;

  DocTypeID: number | undefined;

  docTypeName: string | undefined;

  Doc_CategoryID: number | undefined;

  doc_CategoryName: string | undefined;

  
  Doc_SubCategoryID: number | undefined;

  doc_SubCategoryName: string | undefined;

  AuthorityTypeID: number | undefined;

  authorityTypeName: string | undefined;

  AuthoritynameID: number | undefined;

  authorityName: string | undefined;

  Title_Doc: string | undefined;
  Sub_title_doc: string | undefined;
  Obj_Doc: string | undefined;
  
  doc_Confidentiality: string | undefined;

  Eff_Date: string | undefined;
  Initial_creation_doc_date: string | undefined;
  Doc_internal_num: string | undefined;
  
  Doc_Inter_ver_num: string | undefined;

  Doc_Phy_Valut_Loc: string | undefined;
  Doc_process_Owner: string | undefined;
  Doc_Approver: string | undefined;
  
  Date_Doc_Approver: string | undefined;

  Date_Doc_Revision: string | undefined;
  Keywords_tags: string | undefined;
  
  freq_period: string | undefined;
  pub_doc: string | undefined;
  publisher_comments: string | undefined;
  
  indicative_reading_time: string | undefined;

  Time_period: string | undefined;
  Doc_Confidentiality: string | undefined;

  Revision_summary: { id: number; value: string }[] = [];
  Doc_referenceNo: { id: number; value: string }[] = [];

  mainFile: File | undefined; 

  supportFiles :File | undefined;
    //doccategory_status:string | undefined;

  // doccategory_createdDate:Date | undefined;

 

}

export class EntityMaster {

  Entity_Master_id: number | undefined;

  Entity_Master_Name: string | undefined;

  Entity_Master_Desc: string | undefined;

    //doccategory_status:string | undefined;

  // doccategory_createdDate:Date | undefined;

 

}

export class UnitMaster {

  Unit_location_Master_id: number| undefined;

  Unit_location_Master_name: string | undefined;

  Unit_location_Master_Desc: string | undefined;

  Entity_Master_id: number | undefined;

    //Unit_location_Master_Status:string | undefined;

  // Unit_location_Master_createdDate:Date | undefined;

 

}


 
export class PublishedDocument {
  AddDoc_id: number | undefined;
  Title_Doc: string | undefined;
  Sub_title_doc:string | undefined;
  Obj_Doc: string | undefined;
  Select_Opt:string | undefined;
  Doc_Confidentiality: string | undefined;
  Doc_internal_num:number | undefined;
  Doc_Inter_ver_num: number | undefined;
  Doc_Phy_Valut_Loc:string | undefined;
  Doc_Approver: string | undefined;
  Date_Doc_Approver:string | undefined;
  Date_Doc_Revision: string | undefined;
  Pub_Auth_Type:string | undefined;
  Keywords_tags: string | undefined;
  freq_period:number | undefined;
  pub_doc: string | undefined;
  publisher_comments:string | undefined;
  DocTypeID: number | undefined;
  Doc_CategoryID:number | undefined;
  Doc_SubCategoryID: number | undefined;
  NatureOf_Doc_id:number | undefined;
  AuthoritynameID: number | undefined;
  Draft_Status:string | undefined;
  addDoc_Status: string | undefined;
  addDoc_createdDate:string | undefined;
 
 
   Document_Id :number | undefined;
 
  Document_Name : string | undefined;
 
   Publisher_name :string | undefined;
   publisher_Date_Range :string |undefined;
 
        //public DateOnly Publisher_Date_Range { get; set; }
 
 
        //public DateOnly Document_Eff_Date { get; set; }
 
   Nature_Confidentiality :string | undefined;
 
         Review_Status :string | undefined;
 
 
         authorityTypeID :number |undefined;
 
         authorityTypeName:string|undefined;
         DisableReason:string|undefined
 
  //doccategory_status:string | undefined;
  // doccategory_createdDate:Date | undefined;
 
}
 


export class DirectUpload {

  admin_config_id: number| undefined;
  filecategory:string|undefined;
  noOfDocuploaded: number | undefined;
  allowedFileTypes:string|undefined;
  sizelimit: string | undefined;
  admin_config_status: number | undefined;
  //admin_config_status: number | undefined;

    //Unit_location_Master_Status:string | undefined;

  // Unit_location_Master_createdDate:Date | undefined;

 

}


export class SaveDocumentDetails {

  DocumentRepID: number| undefined;

  DocumentFileName: string | undefined;

  documentFileLocation: string | undefined;

  Status: string | undefined;

    Version:string | undefined;

   Document_Id:number | undefined;

   Document_Name: string | undefined;

   FilePath: string | undefined;

   AddDoc_id:number | undefined;
   //documentrepository_createdDate :Date |undefined;

}
export class UserRightsPermission{
  Doc_User_Access_mapping_id:number|undefined;
  Entity_Master_id:number| undefined;
  Unit_location_Master_id:number|undefined;
  // ack_status:string|undefined;
  // duedate:Date|undefined;
  // timeline:number|undefined;
  AddDoc_id:number|undefined;
  // trakstatus:string|undefined;
  // everyday:number|undefined;
  // noofdays:number|undefined;
  // timeperiod:string|undefined;
  // reqtimeperiod:string|undefined;
  // optionalreminder:string|undefined;
  // validitydocument:string|undefined;
  // startDate:string|undefined;
  // endDate:string|undefined;
  createdBy:number|undefined;
}
export class RepositoryFiles {

  DocumentRepID:number|undefined;

  AddDoc_id: number | undefined;

  FileCategory: string | undefined;

  Document_Name: number | undefined;

  FilePath: string | undefined;



}
export class Updatepermission{

  Doc_User_Access_mapping_id:number|undefined;
  // Entity_Master_id:number|undefined;
  // Unit_location_Master_id:number|undefined;
   user_location_mapping_id:number|undefined;
  USR_ID:number|undefined;
  doc_perm_rights_id:number|undefined;
  ack_status:string|undefined;
  optionalreminder:string|undefined;
  trakstatus:string|undefined;
  AddDoc_id:number|undefined;
  duedate:string|undefined;
  noofdays:number|undefined;
  everyday:number|undefined;
  timeperiod:string|undefined;
  reqtimeperiod:string|undefined;
  validitydocument:string|undefined;
  startDate:string|undefined;
  endDate:string|undefined;

}
export class removepermission{
  Doc_User_Access_mapping_id:number|undefined;
  Entity_Master_id:number|undefined;
  Unit_location_Master_id:number|undefined;
  USR_ID:number|undefined;
  doc_perm_rights_id:number|undefined;
}

export class AssessmentBuilder{
  Assessment_generation_details_ID:number|undefined;
  Competency_id:number|undefined;
  show_explaination:number|undefined;
  show_hint:number|undefined;
  Type_id:number|undefined;
  SubType_id:number|undefined;
  assessment_name:string|undefined;
  assessment_description:string|undefined;
  keywords:string|undefined
  total_questions:number|undefined;
  total_estimated_time:number|undefined
}

export class scheduleAssessment{

  Schedule_Assessment_id:number|undefined;
  Date_Of_Request :Date|undefined;
  value_Frequency:string|undefined;
  frequency_period:string|undefined;
  Duration_of_Assessment:string|undefined;
  userid:string|undefined;
  DocTypeID:number|undefined;
  Doc_CategoryID:number|undefined;
  Doc_SubCategoryID:number|undefined;
  Entity_Master_id:number|undefined;
  Unit_location_Master_id:number|undefined;
  created_date:Date|undefined;
  ass_template_id:number|undefined;
  Shuffle_Questions:number|undefined;
  Shuffle_Answers:number|undefined;
  startDate:Date|undefined;
  endDate:Date|undefined;
  objective:string|undefined;
  message:string|undefined;
  status:string|undefined;
  firstname:string|undefined;
  mapped_user:number[] |undefined;
  Exemption_user:number[] |undefined;
  uq_ass_schid:number|undefined;
  repeatEndDate:Date | undefined;
}

export class SuggestionsModel {
  suggestions_id: number | undefined;
  mitigations_id: number | undefined;
  suggestions: string | undefined;
  status: string | undefined;
  created_date: Date | undefined;
  suggested_by: number | undefined;
  acknowledge_by: number | undefined;
  remarks: string | undefined;
  action_required: number | undefined;
  notify_management: number | undefined;
  input_date: Date | undefined;
  assign_responsibility: number | undefined;
  tentative_timeline: Date | undefined;
  suggested_documents: string | undefined;
  action_priority: number | undefined;
  comments: string | undefined;
  acknowledge: number | undefined;
 
}
// Risk Matrix Attributes Masters
export class TypeOfRisk{
  typeOfRiskID:number|undefined;
  typeOfRiskName:string|undefined;
  typeOfRiskDescription:string|undefined;
  //TypeOfRiskcreatedby:Date|undefined
 }
 export class RiskClassification{
  riskClassificationID:number|undefined;
  typeOfRiskID:number|undefined;
  riskClassificationName:string|undefined;
  riskClassificationDescription:string|undefined;
  //TypeOfRiskcreatedby:Date|undefined
 }


 export class RiskCategorization{
  risk_categorization_id:number|undefined;
  risk_categorization_name:string|undefined;
  risk_categorization_desc:string|undefined;
  
 }


 export class RiskCauseList{
  Risk_cause_list_id:number|undefined;
  Risk_cause_list_name:string|undefined;
  Risk_cause_list_desc:string|undefined;
  
 }
 export class potential_business_impact{
  potential_business_impact_id:number|undefined;
  potential_business_impact_name:string|undefined;
  potential_business_impact_des:string|undefined;
  potential_business_impact_show_des:string|undefined;
  
 }
 
 export class loss_event_threat_category{
  Loss_Event_Threat_Category_id:number|undefined;
  Loss_Event_Threat_Category_Name:string|undefined;
  Loss_Event_Threat_Category_desc:string|undefined;
  Loss_Event_Threat_Category_show_desc:string|undefined;
  
 }
 
 export class losseventthreacategory_l2{
  lossEventThreaCategory_L2_id:number|undefined;
  Loss_Event_Threat_Category_id:number|undefined;
  lossEventThreaCategory_L2_Name:string|undefined;
  lossEventThreaCategory_L2_Des:string|undefined;
  lossEventThreaCategory_L2_show_des:string|undefined;
  
 }

 export class losseventthreacategory_l3{
  lossEventThreaCategory_L3_id:number|undefined;
  Loss_Event_Threat_Category_id:number|undefined;
  lossEventThreaCategory_L2_id:number|undefined;
  lossEventThreaCategory_L3_Name:string|undefined;
  lossEventThreaCategory_L3_Des:string|undefined;
  lossEventThreaCategory_L3_show_des:string|undefined;
  
 }

 export class RiskLikelihood{
  risk_likelihood_occ_factor_id:number|undefined;
  risk_likelihood_occ_factor_name:string|undefined;
  risk_likelihood_occ_factor_desc:string|undefined;
  risk_likelihood_occ_factor_value:number|undefined;
  colour_reference:number |undefined;
 
  
 }

 export class RiskNatureOfControlPerformance{
  natureOf_control_perf_id:number|undefined;
  risk_natureOf_control_perf_name:string|undefined;
  risk_natureOf_control_perf_desc:string|undefined;
  risk_natureOf_control_perf_rating:FLOAT | undefined;
  
 }

 export class RiskControlLevel{
  risk_Control_level_id:number|undefined;
  risk_Control_level_name:string|undefined;
  risk_Control_level_desc:string|undefined;
  
 }


 export class RiskControlDependency{
  risk_control_dependencies_id:number|undefined;
  risk_control_dependencies_name:string|undefined;
  risk_control_dependencies_desc:string|undefined;
  
 }

 export class risk_natureof_cont_occu{
  risk_natureof_cont_occu_id:number|undefined;
  risk_natureof_cont_occu_name:string|undefined;
  risk_natureof_cont_occu_desc:string|undefined;
  risk_natureof_cont_occu_rating:number|undefined;
  
 }

 export class risk_frqof_contr_appl{
  risk_frqof_contr_appl_id:number|undefined;
  risk_frqof_contr_appl_name:string|undefined;
  risk_frqof_contr_appl_desc:string|undefined;
  risk_frqof_contr_appl_rating:number|undefined;
  
 }

 export class risk_admin_letc_l1{
  risk_admin_LETC_L1_id:number|undefined;
  risk_admin_LETC_L1_Name:string|undefined;
  risk_admin_LETC_L1_Desc:string|undefined;
  risk_admin_LETC_L1_show_desc:string|undefined;
  createdby:number|undefined
 }

 export class risk_admin_letc_l2{
  risk_admin_letc_l2_id:number|undefined;
  risk_admin_letc_l2_name:string|undefined;
  risk_admin_letc_l2_desc:string|undefined;
  risk_admin_letc_l2_show_desc:string|undefined;
  risk_admin_LETC_L1_id:number|undefined;
  createdby:number|undefined
 }

 export class risk_admin_letc_l3{
  risk_admin_LETC_l3_id:number|undefined;
  risk_admin_LETC_l3_name:string|undefined;
  risk_admin_LETC_l3_desc:string|undefined;
  risk_admin_LETC_l3_show_desc:string|undefined;
  risk_admin_LETC_L1_id:number|undefined;
  risk_admin_letc_l2_id:number|undefined;
  createdby:number|undefined
 }

 export class risk_admin_naturecontrperf{
  risk_admin_NatureContrPerfid:number|undefined;
  risk_admin_NatureContrPerfname:string|undefined;
  risk_admin_NatureContrPerfdesc:string|undefined;
  risk_natureOf_control_perf_rating:string|undefined;
  createdby:number|undefined
 }

 
 export class risk_admin_frqcontrapplid{
  risk_admin_frqcontrapplidid:number|undefined;
  risk_admin_frqcontrapplidname:string|undefined;
  risk_admin_frqcontrappliddesc:string|undefined;
  risk_frqof_contr_appl_rating:string|undefined;
  createdby:number|undefined
 }

 
 export class risk_admin_contrdepen{
  risk_admin_contrDepenid:number|undefined;
  risk_admin_contrDepenname:string|undefined;
  risk_admin_contrDependesc:string|undefined;
  createdby:number|undefined
 }

 
 export class risk_admin_contrlevel{
  risk_admin_contrLevelid:number|undefined;
  risk_admin_contrLevelName:string|undefined;
  risk_admin_contrLeveldesc:string|undefined;
  createdby:number|undefined
 }

 
 export class risk_admin_natucontroccur{
  risk_admin_natucontroccurid:number|undefined;
  risk_admin_natucontroccurName:string|undefined;
  risk_admin_natucontroccurDesc:string|undefined;
  risk_natureof_cont_occu_rating:string|undefined;
  createdby:number|undefined
 }

 //Risk part3
 export class BusinessProcess{
  businessprocessID:number|undefined;
  entityid:number|undefined;
  departmentid:number|undefined;
  riskBusinessfunctionid:number|undefined;
  unitlocationid:string|undefined;
  businessProcessName:string|undefined;
  businessProcessDescription:string|undefined;
  //TypeOfRiskcreatedby:Date|undefined
 }
 export class BusinessSubProcessL1{
  businessProcessL1ID:number|undefined;
  entityid:number|undefined;
  departmentid:number|undefined;
  riskBusinessfunctionid:number|undefined;
  unitlocationid:string|undefined;
  businessprocessID:number|undefined;
  businessSubProcessL1Name:string|undefined;
  businessSubProcessL1Description:string|undefined;
  subProcessObjestive:string|undefined;
 }
 export class BusinessSubProcessL2{
  businessProcessL2ID:number|undefined;
  businessProcessL1ID:number|undefined;
  businessprocessID:number|undefined;
  entityid:number|undefined;
  departmentid:number|undefined;
  riskBusinessfunctionid:number|undefined;
  unitlocationid:string|undefined;
  businessSubProcessL2Name:string|undefined;
  businessSubProcessL2Description:string|undefined;
  subProcessObjestiveL2:string|undefined;
 }
 export class BusinessSubProcessL3{
  businessProcessL3ID:number|undefined;
  businessProcessL2ID:number|undefined;
  businessProcessL1ID:number|undefined;
  businessprocessID:number|undefined;
  entityid:number|undefined;
  departmentid:number|undefined;
  riskBusinessfunctionid:number|undefined;
  unitlocationid:string|undefined;
  businessSubProcessL3Name:string|undefined;
  businessSubProcessL3Description:string|undefined;
  subProcessObjestiveL3:string|undefined;
 }

 export class control_measure{
  control_measure_id:number|undefined;
  control_measure_name:string|undefined;
  control_measure_description:string|undefined;
 
  
 }
 export class control_activity_type{
  control_activity_type_id:number|undefined;
  control_activity_type_name:string|undefined;
  control_activity_type_description:string|undefined;
 
  
 }
 export class control_reference_type{
  control_reference_type_id:number|undefined;
  control_reference_type_name:string|undefined;
  control_reference_type_desc:string|undefined;
  input_type:string|undefined;
  
 } 

 export class mitigation_action{
  mitigation_action_id:number|undefined;
  mitigation_action_name:string|undefined;
  mitigation_action_desc:string|undefined;
 
  
 } 

 export class action_priority_list{
  action_priority_list_id:number|undefined;
  action_priority_list_name:string|undefined;
  action_priority_list_desc:string|undefined;
 
  
 } 

 export class control_risk_of_assessment{
  control_risk_of_assessment_id:number|undefined;
  control_risk_of_assessment_name:string|undefined;
  control_risk_of_assessment_desc:string|undefined;
  control_risk_of_assessment_range_min:number | undefined;
  control_risk_of_assessment_range_max:number | undefined;
  color_code:string | undefined;
  array:number[][] | undefined;
 }


 export class RiskInherentRatingLevel{
  Risk_inherent_rating_level_id:number|undefined;
  Risk_inherent_rating_level_name:string|undefined;
  Risk_inherent_rating_level_desc:string|undefined;
  Risk_inherent_rating_level_min:number|undefined;
  Risk_inherent_rating_level_max:number|undefined;
  colour_reference:string|undefined;
  array:number[][] | undefined;
  
 }

 export class risk_intensity{
  risk_intensity_id:number|undefined;
  risk_intensity_name:string|undefined;
  risk_intensity_desc:string|undefined;
  risk_intensity_level_range_min:number | undefined;
  risk_intensity_level_range_max:number|undefined;
  colour_reference:string|undefined;
  array:number[][] | undefined;
 }

 export class riskcontroleffectivenessrating{
  risk_contr_eff_rating_id:number | undefined;
  risk_contr_eff_rating_name:string | undefined;
  risk_contr_eff_rating_rating:number | undefined;

  risk_contr_eff_rating_desc:string | undefined;
  risk_contr_eff_rating_color:string | undefined;
  

 }

 export class riskinitialassessmentimpactfactor{
  risk_ini_ass_imp_id:number|undefined;
  risk_ini_ass_imp_name:string|undefined;
  risk_ini_ass_imp_desc:string|undefined;
 }

 export class riskmitigationdecision{
  Risk_mitigation_decision_id:number|undefined;
  Risk_mitigation_decision_name:string|undefined;
  Risk_mitigation_decision_desc:string|undefined;
 }

 export class bpmaturityratingscaleindicators{
  BPMaturityRatingScaleIndicators_id:number | undefined;
  BPMaturityRatingScaleIndicators_name:string | undefined;
  BPMaturityRatingScaleIndicators_rating_min:number | undefined;
  BPMaturityRatingScaleIndicators_rating_max:number | undefined;
  BPMaturityRatingScaleIndicators_desc:string | undefined;
  
  array:number[][] | undefined;
 }

 export class contTestContrReelevance{
  cont_test_cont_relevance_id:number |undefined;
  cont_test_cont_relevance_name : string|undefined;
  cont_test_cont_relevance_desc : string |undefined;
}

export class asseControlAccpCrit{
  risk_Asses_contr_accep_crit_id:number |undefined;
  risk_Asses_contr_accep_crit_name : string|undefined;
  risk_Asses_contr_accep_crit_desc : string |undefined;
  risk_Asses_contr_accep_crit_min_range :number |undefined;
  risk_Asses_contr_accep_crit_max_range :number |undefined;
  array:number[][] | undefined;
}

export class riskImpactRating{
  ImpactRatingID:number|undefined;
  RiskImpactRatingName :string |undefined;
  RiskImpactRatingDescription:string |undefined;
  RiskImpactRatingScale:number |undefined;
  colour_reference :string |undefined;
}
export class riskPriority{
  risk_priority_id:number | undefined;
  risk_priority_name:string | undefined;
  rating_level_min:number | undefined;
  rating_level_max:number | undefined;
  risk_priority_description:string | undefined;
  color_code:string | undefined;
  array:number[][] | undefined;
}

export class controlAssessTestAtrr{
  ControlAssessTestAttributes_id :number|undefined;
  ControlAssessTestAttributes_name :string |undefined;
 
  ControlAssessTestAttributes_desc :string|undefined;
 }

 export class residual_risk_rating{
  residual_risk_rating_id:number | undefined;
  residual_risk_rating_name:string | undefined;
  residual_risk_rating_min_rating:number | undefined;
  residual_risk_rating_max_rating:number | undefined;
  residual_risk_rating_desc:string | undefined;
  color_code:string | undefined;
  array:number[][] | undefined;
}

export class RiskAdminModel{
  Risk_Admin_typeOfRisk_id :number|undefined;
   Risk_Admin_typeOfRisk_name: string |undefined;
   Risk_Admin_typeOfRisk_desc :string |undefined;
   createdby:number |undefined;
}

export class risk_admin_classification{
  risk_admin_classification_id :number|undefined;
  risk_admin_classification_name: string |undefined;
  risk_admin_classification_desc :string |undefined;
  Risk_Admin_typeOfRisk_id:number|undefined;
  createdby:number |undefined;
}

export class RiskStatementModel {
  riskStatementID: number | undefined;
  riskStatementName: string | undefined;
  riskDescription:string | undefined;
  createdDate:string|undefined;
  createdBy: number | undefined;
  createdOn:string|undefined;
  disableReason: string|undefined;
  
}
export class risk_admin_riskimpactrating{
  risk_admin_riskImpactRating_id :number|undefined;
  risk_admin_riskImpactRating_name: string |undefined;
  risk_admin_riskImpactRating_desc :string |undefined;
  risk_admin_riskImpactRating_value :number |undefined;
  color_reference:string|undefined;
  createdby:number|undefined;
  

}

export class risk_admin_likeoccfact{
  risk_admin_likeoccfact_id :number|undefined;
  risk_admin_likeoccfact_name: string |undefined;
  risk_admin_likeoccfact_desc :string |undefined;
  risk_admin_likeoccfact_value :number |undefined;
  color_reference:string|undefined;
  createdby:number|undefined;
 

}
export class risk_admin_risk_categorization{
  risk_admin_risk_categorization_id :number|undefined;
  risk_admin_risk_categorizationName: string |undefined;
  risk_admin_risk_categorizationDesc :string |undefined;
  createdby:number|undefined;
}

export class risk_admin_causelist{
  risk_admin_causeList_id :number|undefined;
  risk_admin_causeListName: string |undefined;
  risk_admin_causeListDesc :string |undefined;
  createdby:number|undefined;
}

export class risk_admin_riskpriority{
  risk_admin_riskPriorityId:number | undefined;
  risk_admin_riskPriorityName:string | undefined;
  rating_level_min:number | undefined;
  rating_level_max:number | undefined;
  risk_priority_description:string | undefined;
  color_code:string | undefined;
  createdby:number|undefined;
  array:number[][] | undefined;
}
export class risk_admin_potenbussimpact{
  risk_admin_potenBussImpactid:number|undefined;
  risk_admin_potenBussImpactname:string |undefined;
  risk_admin_potenBussImpactdesc:string|undefined;
  showDescription:string |undefined;
  createdby:number|undefined;
}

export class risk_admin_riskappetite{
  risk_admin_RiskAppetiteId:number | undefined;
  risk_admin_RiskAppetiteName:string | undefined;
  risk_level_range_min:number | undefined;
  risk_level_range_max:number | undefined;
  risk_admin_RiskAppetiteDesc:string | undefined;
  colour_reference:string | undefined;
  createdby:number|undefined;
  array:number[][] | undefined;
}

export class risk_admin_risktolerance{
  risk_admin_riskToleranceid:number | undefined;
  risk_admin_riskToleranceName:string | undefined;
  risk_level_range_min:number | undefined;
  risk_level_range_max:number | undefined;
  risk_admin_riskToleranceDesc:string | undefined;
  colour_reference:string | undefined;
  createdby:number|undefined;
  array:number[][] | undefined;
}

export class risk_admin_inherriskratinglevl{
  risk_admin_inherRiskRatingLevlid:number | undefined;
  risk_admin_inherRiskRatingLevlname:string | undefined;
  risk_level_range_min:number | undefined;
  risk_level_range_max:number | undefined;
  risk_admin_inherRiskRatingLevlDesc:string | undefined;
  colour_reference:string | undefined;
  createdby:number|undefined;
  array:number[][] | undefined;
}

export class risk_admin_riskintensity{ 
  risk_admin_riskIntensityid:number | undefined;
  risk_admin_riskIntensityname:string | undefined;
  risk_level_range_min:number | undefined;
  risk_level_range_max:number | undefined;
  risk_admin_riskIntensitydesc:string | undefined;
  createdby:number|undefined;
  colour_reference:string | undefined;
  array:number[][] | undefined;
}

export class RiskTreatmentDecisionList{
  Risk_treatmentDecisionList_id:number | undefined;
  Risk_treatmentDecisionList_Name:string | undefined;
  Risk_treatmentDecisionList_Des:string | undefined;

}
export class risk_treatmetdecisionmatrix{
  Risk_TreatmetDecisionMatrix_id:number | undefined;
  InherentRiskRatingLevel:number | undefined;
  Risk_TreatmetDecisionMatrix_des:string | undefined;
  RiskTreatmentDecision:number | undefined;
}
export class risk_controltestdecisionlist{
  Risk_controlTestDecisionList_id:number | undefined;
  ControlTestingParametersName:number | undefined;
  ControlTestDecisionName:string | undefined;
  ControlTesDecisionDescription:string | undefined;
  ControlTestDecisionRatingScore:number | undefined;
  colorReference:string | undefined;

}
export class DocumentConfidential{
  documentConfidentialityID:number | undefined;
  confidentialityName:string | undefined;
  description:string | undefined;
  waterMark:string| undefined;
  //task_id:number | undefined;
 }


export class risk_admin_bpmatratscaleindicator{
  risk_admin_bpmatratscaleindicatorid:number | undefined;
  risk_admin_bpmatratscaleindicatorname:string | undefined;
  BPMaturityRatingScaleIndicators_rating_min:number | undefined;
  BPMaturityRatingScaleIndicators_rating_max:number | undefined;
  risk_admin_bpmatratscaleindicatordesc:string | undefined;
  createdby:number|undefined; 
  array:number[][] | undefined;
 }

 export class risk_admin_contrasstestatt{
  risk_admin_contrAssTestAttid :number|undefined;
  risk_admin_contrAssTestAttname :string |undefined;
  createdby:number|undefined;
  risk_admin_contrAssTestAttdesc :string|undefined;
 }
 export class risk_admin_iniassimpfact{
  risk_admin_Iniassimpfactid:number|undefined;
  risk_admin_Iniassimpfactname:string|undefined;
  risk_admin_Iniassimpfactdesc:string|undefined;
  createdby:number|undefined;
 }

 export class risk_admin_mitdecilist{
  risk_admin_MitdeciListid:number|undefined;
  risk_admin_MitdeciListname:string|undefined;
  risk_admin_MitdeciListdesc:string|undefined;
  createdby:number|undefined;
 }
 export class risk_admin_asscontracptcrit{
  risk_admin_asscontracptCritid:number |undefined;
  risk_admin_asscontracptCritname : string|undefined;
  risk_admin_asscontracptCritdesc : string |undefined;
  risk_Asses_contr_accep_crit_min_range :number |undefined;
  risk_Asses_contr_accep_crit_max_range :number |undefined;
  array:number[][] | undefined;
  createdby:number|undefined;
}


export class riskConEffRatingModel{
  risk_admin_RiskContrEffeRating_id:number | undefined;
  risk_admin_RiskContrEffeRatingName:string | undefined;
  risk_admin_RiskContrEffeRatingRating:number | undefined;

  risk_admin_RiskContrEffeRatingDesc:string | undefined;
  risk_admin_RiskContrEffeColor:string | undefined;
  createdby:number|undefined

 }

 
 export class risk_admin_control_risk_of_assessment{
  control_risk_of_assessment_id:number|undefined;
  control_risk_of_assessment_name:string|undefined;
  control_risk_of_assessment_desc:string|undefined;
  control_risk_of_assessment_range_min:number | undefined;
  control_risk_of_assessment_range_max:number | undefined;
  color_code:string | undefined;
  createdby:number|undefined;
  array:number[][] | undefined;
 }

 export class risk_admin_residual_risk_rating{
  residual_risk_rating_id:number | undefined;
  residual_risk_rating_name:string | undefined;
  residual_risk_rating_min_rating:number | undefined;
  residual_risk_rating_max_rating:number | undefined;
  residual_risk_rating_desc:string | undefined;
  color_code:string | undefined;
  array:number[][] | undefined;
  createdby:number|undefined;
}

export class risk_admin_control_measure{
  control_measure_id:number|undefined;
  control_measure_name:string|undefined;
  control_measure_description:string|undefined;
  createdby:number|undefined;

  
 }

 
export class risk_admin_risktredecilist{
  risk_admin_risktredecilistid:number | undefined;
  risk_admin_risktredecilistname:string | undefined;
  risk_admin_risktredecilistdesc:string | undefined;
  createdby:number|undefined;

}
export class risk_admin_risktrdecimatrix{
  risk_admin_risktrdecimatrixid:number | undefined;
  risk_admin_inherRiskRatingLevlid:number | undefined;
  risk_admin_risktrdecimatrixdesc:string | undefined;
  RiskTreatmentDecision:number | undefined;
  createdby:number|undefined;
}

export class risk_admin_mitactireq{
  risk_admin_MitActiReqid:number|undefined;
  risk_admin_MitActiReqname:string|undefined;
  risk_admin_MitActiReqdesc:string|undefined;
  createdby:number|undefined;
 
  
 } 

 export class risk_admin_actiprilist{
  risk_admin_actiPriListid:number|undefined;
  risk_admin_actiPriListname:string|undefined;
  risk_admin_actiPriListdesc:string|undefined;
  createdby:number|undefined;
  
 } 
 
 export class risk_admin_inter_contr_comp{
  risk_admin_inter_contr_comp_id:number | undefined;
  risk_admin_inter_contr_comp_name:string | undefined;
  risk_admin_inter_contr_comp_desc:string | undefined;
  selected_control_measure:number | undefined;
  createdby:number|undefined;
 }
 
 export class risk_admin_inter_contr_principles{
  risk_admin_inter_contr_Principles_id:number | undefined;
  risk_admin_inter_contr_Principles_name:string | undefined;
  risk_admin_inter_contr_Principles_desc:string | undefined;
  control_measure_id:number | undefined;
  risk_admin_inter_contr_comp_id:number | undefined;
  createdby:number|undefined;

 }

 export class risk_admin_controlactivitytype{
  risk_admin_ControlActivityType_id:number | undefined;
  risk_admin_ControlActivityType_name:string | undefined;
  risk_admin_ControlActivityType_desc:string | undefined;
  createdby:number|undefined;

 }

 export class risk_admin_control_activity_nature{
  risk_admin_control_activity_Nature_id:number | undefined;
  risk_admin_control_activity_Nature_name:string | undefined;
  risk_admin_control_activity_Nature_desc:string | undefined;
  risk_admin_ControlActivityType_id:number | undefined;
  short_code_for_activity_nature:string | undefined;
  createdby:number|undefined;

 }
 export class risk_admin_control_activity_sub_nature{
  risk_admin_Control_Activity_Sub_Nature_id:number | undefined;
  risk_admin_Control_Activity_Sub_Nature_name:string | undefined;
  risk_admin_Control_Activity_Sub_Nature_desc:string | undefined;
  risk_admin_ControlActivityType_id:number | undefined;
  risk_admin_control_activity_Nature_id:number | undefined;
  createdby:number|undefined;
 }

 export class risk_db_control_assertion_check{
  risk_db_Control_Assertion_Check_id:number | undefined;
  risk_db_Control_Assertion_Check_name:string | undefined;
  risk_db_Control_Assertion_Check_desc:string | undefined;
  risk_admin_ControlActivityType_id:number | undefined;
  createdby:number|undefined;

 }

 
 export class risk_admin_control_reference_type{
  risk_admin_Control_Reference_Type_id:number | undefined;
  risk_admin_Control_Reference_Type_name:string | undefined;
  risk_admin_Control_Reference_Type_desc:string | undefined;
  selected_input_type:string | undefined;
  createdby:number|undefined;

 }

 

 export class risk_admin_con_accept_benchmark{
  risk_admin_con_accept_benchmark_id:number|undefined;
  risk_admin_con_accept_benchmark_name:string|undefined;
  risk_admin_con_accept_benchmark_desc:string|undefined;
  risk_admin_con_accept_benchmark_min_level:number | undefined;
  risk_admin_con_accept_benchmark_max_level:number | undefined;
  risk_admin_con_accept_benchmark_color_code:string | undefined;
  createdby:number|undefined;
  array:number[][] | undefined;
 }
 export class Risk_Default_Notifiers{
  riskDefaultNotifiersID:number | undefined;
  entity_Master_id:number | undefined;
  unit_location_Master_id:number | undefined;
  department_Master_id:number | undefined;
  emailid:string | undefined;
  additional_emailid_notifiers:string | undefined;
  status:string | undefined;
  createdDate:Date | undefined;
 }
 export class questionBankUpdate {
  no_of_times_used: number[];

  constructor() {
    this.no_of_times_used = []; // Initialize the array
  }
}


export class AssessmentBuilderNew{
  Assessment_generation_details_ID:number|undefined;
  Competency_id:number|undefined;
  show_explaination:number|undefined;
  show_hint:number|undefined;
  Type_id:number|undefined;
  SubType_id:number|undefined;
  assessment_name:string|undefined;
  assessment_description:string|undefined;
  keywords:string|undefined;
  total_questions:number|undefined;
  total_estimated_time:number|undefined;
  OldQuestionsIds:number[] | undefined;
  user_id:number|undefined;
  ass_template_id:string | undefined;
}

export class HeplDesktModel {
  helpdeskID: number | undefined;
  task_id: number | undefined;
  ROLE_ID: number | undefined;
  FileName: string | undefined;
  FilePath: string | undefined;
  CreatedDate:string|undefined;
  Status:string|undefined;

  
}