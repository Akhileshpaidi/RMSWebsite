
import { ChangeDetectorRef, NgZone} from '@angular/core';
import { Component, OnInit ,enableProdMode} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DocumentType} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { loadMessages } from 'devextreme/localization';
import { DxDataGridComponent } from 'devextreme-angular';
import { ViewChild } from '@angular/core';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  if (!/localhost/.test(document.location.host)) {
    enableProdMode();
  }
  
@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.scss'],
})
export class InspectionListComponent implements OnInit {



  @ViewChild(DxDataGridComponent, { static: false }) gridInstance!: DxDataGridComponent;
  maxLength = 100;

  value: string | undefined;

  // @ViewChild(DxDataGridComponent, { static: false })
  // dataGrid!: DxDataGridComponent;

  height =  90;
  
    dataSource: any;
    TaskData:any;
    DocumentTypeinfo:DocumentType=new DocumentType();
    ngOnInit(): void {
      loadMessages({
          "en": {
             // "dxDataGrid-editingDeleteRow": "Delete",
             // "dxDataGrid-editingAddRow": "Add Document Type"
          }
        });
    }
    constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
      this.dataSource = new CustomStore({
          key: 'docTypeID',
          load: () => this.sendRequest(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails'),
          
          insert: (values) => this.sendRequest(URL + '/DocTypeMaster/InsertDocTypeMasterModelDetails', 'POST', {
              // values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/DocTypeMaster/UpdateDocTypeMasterModelDetails', 'PUT', {
               key,
              //  values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/DocTypeMaster/DeleteDocTypeMasterModelDetails', 'DELETE', {
               key
           })
      });



      

      // loadMessages({
      //   "en": {
      //       "dxDataGrid-editingDeleteRow": "Delete",
      //       "dxDataGrid-editingAddRow": "Add Document Type"
      //   }
      // });
  
  
    this.TaskData={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/TaskMaster/GetTaskMasterDetails', {headers})
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
      //alert('onchange');
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
          case 'PUT':
          
             this.updateParameters(data);
             //alert(JSON.stringify(this.DocumentTypeinfo))
             return new Promise((resolve, reject) => {
              this.http.put(url,this.DocumentTypeinfo,{headers})
                .subscribe(res => {
                 (resolve(res));
  
                }, (err) => {
                  reject(err.error);
                });
              });
              break;
          case 'POST':
       
             this.insertParameters(data);
             return new Promise((resolve, reject) => {
              this.http.post(url,this.DocumentTypeinfo,{headers})
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err.error);
                  //reject(err);
                });
              });
              break;
          case 'DELETE':
            return new Promise((resolve, reject) => {
              this.http.delete(url+'?id='+data.key)
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
              });
              break;
      }
  
  
  
  }
  
  insertParameters(data:any={}){
  
   this.DocumentTypeinfo.docTypeID=0;
   this.params(data);
  }
  
  updateParameters(data:any={}){
  this.DocumentTypeinfo.docTypeID=data.key;
   this.params(data);
  }
  
  params(data:any={}){
    this.DocumentTypeinfo.task_id=data.values.task_id;
    this.DocumentTypeinfo.docTypeName=data.values.docTypeName;
    this.DocumentTypeinfo.docTypeDescription = data.values.docTypeDescription;

   //alert(JSON.stringify(this.DocumentTypeinfo));

   this.ref.detectChanges();
   
  }

  onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
    this.ref.detectChanges();
  }  
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Document Types']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DocumentType.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Document Type',88,10);// name indicate header and values for Adujstment
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('DocumentType.pdf');
      });
    }
  }
  }


