  
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DocSubCategory} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-assign-inspection',
  templateUrl: './assign-inspection.component.html',
  styleUrls: ['./assign-inspection.component.scss'],
})
export class AssignInspectionComponent implements OnInit {

  dataSource: any;
  DocumentTypeData:any;
  DocumentCategoryData:any;
  DocumentSubCategoryinfo:DocSubCategory=new DocSubCategory();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'doc_SubCategoryID',
        load: () => this.sendRequest(URL + '/DocSubCategory/GetDocSubCategoryModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/DocSubCategory/InsertDocSubCategoryModelDetails', 'POST', {
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
  



  this.DocumentTypeData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

  this.DocumentCategoryData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
  
  
}
  
  onChangeParams() {
    alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
   
  
  //     this.masterservice.getEquipmentsByMission(value).subscribe((params) => {
  //      alert(params.equipmentID);
  //       rowData.equipmentID = params.equipmentID;
  //  });
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
            this.http.post(url,this.DocumentSubCategoryinfo,{headers})
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

 this.DocumentSubCategoryinfo.doc_SubCategoryID=0;
 this.params(data);
}

// updateParameters(data:any={}){
// this.equipmentinfo.EquipmentID=data.key;
//  this.params(data);
// }

params(data:any={}){
  this.DocumentSubCategoryinfo.doc_CategoryID=data.values.docTypeID;
  this.DocumentSubCategoryinfo.docTypeID=data.values.docTypeID;
 
  this.DocumentSubCategoryinfo.doc_SubCategoryName=data.values.doc_SubCategoryName;
 
  this.DocumentSubCategoryinfo.doc_SubCategoryDescription=data.values.doc_SubCategoryDescription;
  
}
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('DataGrid.pdf');
    });
  }
}
}

