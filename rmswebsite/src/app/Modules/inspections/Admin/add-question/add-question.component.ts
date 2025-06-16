import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DocCategory} from 'src/app/inspectionservices.service';
import { CustomStore } from 'devextreme-aspnet-data-nojquery';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
 
  dataSource: any;
  DocumentCategoryinfo:DocCategory=new DocCategory();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'doc_CategoryID',
        load: () => this.sendRequest(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetails/{docTypeID}'),
        
        insert: (values) => this.sendRequest(URL + '/DocCategoryMaster/InsertDocCategoryMasterModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        // update: (key, values) => this.sendRequest(URL + '/Equipments/UpdateEquipment', 'PUT', {
        //      key,
        //     //  values: JSON.stringify(values)
        //     values
        //  }),
        //  remove: (key) => this.sendRequest(URL + '/Equipments/DeleteEquipment', 'DELETE', {
        //      key
        //  })
    });
  }


  sendRequest(url: string, method: string = 'GET', data: any = {}): any {

    let result;

    switch(method) {
        case 'GET':
            return new Promise((resolve, reject) => {
              this.http.get(url, {headers})
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
          });
            break;
        // case 'PUT':
        //    this.updateParameters(data);
        //    return new Promise((resolve, reject) => {
        //     this.http.put(url,this.equipmentinfo,{headers})
        //       .subscribe(res => {
        //        (resolve(res));

        //       }, (err) => {
        //         reject(err);
        //       });
        //     });
        //     break;
        case 'POST':
           this.insertParameters(data);
           return new Promise((resolve, reject) => {
            this.http.post(url,this.DocumentCategoryinfo,{headers})
              .subscribe(res => {
               (resolve(res));
              }, (err) => {
                reject(err);
              });
            });
            break;
        // case 'DELETE':
        //   return new Promise((resolve, reject) => {
        //     this.http.delete(url+'?id='+data.key)
        //       .subscribe(res => {
        //        (resolve(res));
        //       }, (err) => {
        //         reject(err);
        //       });
        //     });
        //     break;
    }

}

insertParameters(data:any={}){

 this.DocumentCategoryinfo.doc_CategoryID=0;
 this.params(data);
}

// updateParameters(data:any={}){
// this.equipmentinfo.EquipmentID=data.key;
//  this.params(data);
// }

params(data:any={}){
  this.DocumentCategoryinfo.doc_CategoryName=data.values.doc_CategoryName;
 
  this.DocumentCategoryinfo.doc_CategoryDescription=data.values.doc_CategoryDescription;
  
}
}
