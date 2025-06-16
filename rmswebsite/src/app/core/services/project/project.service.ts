import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../core/Constant/apiConstant';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  // getProjectList
  projectSummary(body: any) {
    return this.http.post(`${BASE_URL}/Masters/ProjectSummaryWithStatus`, body);
  }

  // CRUDProject
  CRUDProject(body: any) {
    return this.http.post(`${BASE_URL}/Masters/CRUDProject`, body);
  }

}
