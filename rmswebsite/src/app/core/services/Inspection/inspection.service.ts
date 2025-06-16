import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  constructor(private http: HttpClient) {}
  errorSubject = new Subject<any>(); // any can be replaced by the error resp JSON Type

  // Quetion Bank
  CRUDQuestion(body: any) {
    return this.http.post(`${BASE_URL}/Question/CRUDQuestion`, body);
  }

  // Question Summary Table
  QuestionSummary(body: any) {
    return this.http.post(`${BASE_URL}/Question/QuestionSummary`, body);
  }

  //CRUDTypeOfQuestion
  CRUDTypeOfQuestion(body: any) {
    return this.http.post(`${BASE_URL}/Question/CRUDTypeOfQuestion`, body);
  }
  
    // Remedy Summary Table
    RemedySummary(body: any) {
      return this.http.post(`${BASE_URL}/Remedy/RemedySummary`, body);
    }
  
    //CRUDTypeOfRemedy
    CRUDTypeOfRemedy(body: any) {
      return this.http.post(`${BASE_URL}/Remedy/CRUDTypeOfRemedy`, body);
    }
  // CRUD Inspection
  CRUDInspection(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/CRUDInspection`, body);
  }

  // Inspection List
  inspectionList(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/InspectionSummary`, body);
  }

  // Inspector List
  inspectorList(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/InspectorList`, body);
  }

  // Reviewer List
  reviewerList(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/ReviewerList`, body);
  }

  // BridgeSummary
  bridgeList(body: any) {
    return this.http.post(`${BASE_URL}/Bridge/BridgeSummary`, body);
  }

  // CRUDAssignInspection
  CRUDAssignInspection(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/CRUDAssignInspection`, body);
  }

  // AssignInspectionSummary
  AssignInspectionSummary(body: any) {
    return this.http.post(
      `${BASE_URL}/Inspection/AssignInspectionSummary`,
      body
    );
  }

  // InspectorInspectionSummary
  InspectorInspectionSummary(body: any) {
    return this.http.post(`${BASE_URL}/Inspector/InspectionSummary`, body);
  }

  // getInspectionById
  getInspectionById(body: any) {
    return this.http.post(`${BASE_URL}/Inspector/InspectionById`, body);
  }

  // submitInspection
  submitInspection(body: any) {
    return this.http.post(`${BASE_URL}/Inspector/SaveInspection`, body);
  }

  // Self Inspection
  selfInspection(body: any) {
    return this.http.post(`${BASE_URL}/Inspector/InspectionById`, body);
  }

  // get Add-on Bridge meta data
  addOnBridgeMetaData(body: any) {
    return this.http.post(`${BASE_URL}/Masters/AddOnBridgeMasters`, body);
  }

  SectionFromInspection(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/SectionFromInspection`, body);
  }

  QuestionFromSection(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/QuestionFromSection`, body);
  }
  
  RemedyFromSection(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/RemedyFromSection`, body);
  }
  // createAddOnBridge
  createAddOnBridge(body: any) {
    return this.http.post(`${BASE_URL}/Bridge/AddOnBridge`, body);
  }

  bridgeSummary(body: any) {
    return this.http.post(`${BASE_URL}/Bridge/BridgeSummary`, body);
  }
  CRUDBridge(body: any) {
    return this.http.post(`${BASE_URL}/Bridge/CRUDBridge`, body);
  }

  ReviewerInspectionSummary(body: any) {
    return this.http.post(`${BASE_URL}/Reviewer/InspectionSummary`, body);
  }

  imageUpload(body: any) {
    return this.http.post(`${BASE_URL}/DOC/UploadDoc`, body, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  getAllProjects(body: any) {
    return this.http.post(`${BASE_URL}/Masters/ProjectSummary`, body);
  }

  getBridgesFromProjectId(body: any) {
    return this.http.post(`${BASE_URL}/Masters/BridgeFromProjectid`, body);
  }

  getBOQUnitRate(body: any) {
    return this.http.post(`${BASE_URL}/BOQ/boqunitprice`, body);
  }

  getBOQReport(body: any) {
    return this.http.post(`${BASE_URL}/BOQ/boqreport`, body);
  }

  // const request = new HttpRequest('POST', `${this.serverUrl}`, formData, {
  //   reportProgress: true,
  //   responseType: 'json'
  // });
  
}
