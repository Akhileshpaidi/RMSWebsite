import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
const headers = new HttpHeaders();
@Component({
  selector: 'app-data-imported',
  templateUrl: './data-imported.component.html',
  styleUrls: ['./data-imported.component.scss']
})
export class DataImportedComponent {
  test:string="";
 
  constructor(private http: HttpClient){

  }
 
  onClickButton(){
    
    //alert(formData)
    // this.http.get(`${BASE_URL}/DataImport/GetDataImportCommonDBToLocalDB`,{headers} );
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/DataImport/GetDataImportCommonDBToLocalDB`, {headers})
        .subscribe(res => {
         (resolve(res));
         alert("Data imported successfully")
       console.log(JSON.stringify(res))
        }, (err) => {
          reject(err);
        });
  });
 }
 onClickButton1(){
  
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/DataImport/GetFrequencyHolidayDataImportCommonDBToLocalDB`, {headers})
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

