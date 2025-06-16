import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../Constant/apiConstant';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) {}

  // // getProjectList
  // manufacturerSummary(body: any) {
  //   return this.http.post(`${BASE_URL}/Masters/CRUDManufacturer`, body);
  // }

//   // CRUDProject
  CRUDManufacturer(body: any) {
    return this.http.post(`${BASE_URL}/Masters/CRUDManufacturer`, body);
  }

}
