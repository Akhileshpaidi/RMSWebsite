import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {  subject} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-define-subject',
  templateUrl: './define-subject.component.html',
  styleUrls: ['./define-subject.component.scss']
})
export class DefineSubjectComponent {

  dataSource: any;
  // DocumentTypeData:any;
  Subjectinfo:subject=new subject();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'subject_id',
        load: () => this.sendRequest(URL + '/Subject/GetSubjectDetails'),
        
        insert: (values) => this.sendRequest(URL + '/Subject/InsertSubjectDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/Subject/UpdateSubjectDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/Subject/DeleteSubjectDetails', 'DELETE', {
             key
         })
    });
 
  
}
  
  onChangeParams() {
    alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
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
           return new Promise((resolve, reject) => {
            this.http.put(url,this.Subjectinfo,{headers})
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
            this.http.post(url,this.Subjectinfo,{headers})
              .subscribe(res => {
               (resolve(res));
              }, (err) => {
                reject(err.error);
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

 this.Subjectinfo.subject_id=0;
 this.params(data);
}

updateParameters(data:any={}){
this.Subjectinfo.subject_id=data.key;
 this.params(data);
}

params(data:any={}){
 
  this.Subjectinfo.subject_Name=data.values.subject_Name;
  this.Subjectinfo.subject_Desc=data.values.subject_Desc;
  
}
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['Subjects List']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Subjectslist.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Subjects List',85,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Subjectslist.pdf');
    });
  }
}


}
