import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

import { BASE_URL } from 'src/app/core/Constant/apiConstant';
const headers = new HttpHeaders();
@Component({
  selector: 'app-import-compliance-controller-master',
  templateUrl: './import-compliance-controller-master.component.html',
  styleUrls: ['./import-compliance-controller-master.component.scss']
})
export class ImportComplianceControllerMasterComponent {
  test:string="";
 
  constructor(private http: HttpClient){

  }
 
  onClickButton(){
     // this.http.get(`${BASE_URL}/DataImport/GetDataImportCommonDBToLocalDB`,{headers} );
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/DataImport/GetComplianceDataImportCommonDBToLocalDB`, {headers})
        .subscribe(res => {
               (resolve(res));
              // alert(resolve(res))
        alert("Data imported successfully")
       console.log(JSON.stringify(res))
        }, (err) => {
          reject(err);
          
        });
  });
 }
 onClickButton2(){
  return new Promise((resolve, reject) => {
    this.http.post(`${BASE_URL}/DataImportForAct/GetActDataImportCommonDBToLocalDB`, {headers})
      .subscribe(res => {
       (resolve(res));
      // alert(resolve(res))
       alert("Data imported successfully")
     console.log(JSON.stringify(res))
      }, (err) => {
        reject(err);
   });
});
}
onClickButton1(){
    return new Promise((resolve, reject) => {
    this.http.post(`${BASE_URL}/DataImport/GetOtherCommonDataImportCommonDBToLocalDB`, {headers})
      .subscribe(res => {
       (resolve(res));
       alert("Data imported successfully")
     console.log(JSON.stringify(res))
      }, (err) => {
        reject(err);
      });
});
}
}
