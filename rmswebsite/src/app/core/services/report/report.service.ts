import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  // Project drop down
  projectMeta(body: any) {
    return this.http.post(`${BASE_URL}/Masters/ProjectSummary`, body);
  }

  // Bridge drop down
  bridgeMeta(body: any) {
    return this.http.post(`${BASE_URL}/Masters/BridgeFromProjectid`, body);
  }

  // summary of inspection
  inspectionSummary(body: any) {
    return this.http.post(`${BASE_URL}/Report/InspectionSummary`, body);
  }

  // summary of report
  reportSummary(body: any) {
    return this.http.post(`${BASE_URL}/Report/ReportSummary`, body);
  }

  // CRUD report
  CRUDreport(body: any) {
    return this.http.post(`${BASE_URL}/Report/CRUDInspectionReport`, body);
  }
  // CRUD remedy
  CRUDRemedy(body: any) {
    return this.http.post(`${BASE_URL}/Masters/CRUDRemedy`, body);
  }

  // getPhotographs remedy
  getPhotographs(body: any) {
    return this.http.post(`${BASE_URL}/Inspection/DocbyInspection`, body);
  }

  // getBOQ
  getBOQ(body: any) {
    return this.http.post(`${BASE_URL}/Report/BOQForBridgebyinspectionid`, body);
  }
}
