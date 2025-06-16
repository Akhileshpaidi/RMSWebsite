

import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CompetencyCheckLevelModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-check-level',
  templateUrl: './check-level.component.html',
  styleUrls: ['./check-level.component.scss']
})
export class CheckLevelComponent {

  Position:Array<{id:number,Value:string}>=[];
  dataSource: any;
  // DocumentTypeData:any;
  CompetencyCheckLevelinfo:CompetencyCheckLevelModel=new CompetencyCheckLevelModel();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'check_level_id',
        load: () => this.sendRequest(URL + '/CompetencyCheckLevel/GetCompetencyCheckLevelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/CompetencyCheckLevel/InsertCompetencyCheckLevelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/CompetencyCheckLevel/UpdateCompetencyCheckLevelDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/CompetencyCheckLevel/DeleteCompetencyCheckLevelDetails', 'DELETE', {
             key
         })
    });



    this.Position=[
      {id:1,Value:'1'},
      {id:2,Value:'2'},
      {id:3,Value:'3'},
      {id:4,Value:'4'},
      {id:5,Value:'5'}
    ];

 
  
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
            this.http.put(url,this.CompetencyCheckLevelinfo,{headers})
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
            this.http.post(url,this.CompetencyCheckLevelinfo,{headers})
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

 this.CompetencyCheckLevelinfo.check_level_id=0;
 
 this.params(data);
}

updateParameters(data:any={}){
this.CompetencyCheckLevelinfo.check_level_id=data.key;
 this.params(data);
}

params(data:any={}){
//  this.CompetencyCheckLevelinfo.Position=data.values.Value;
  this.CompetencyCheckLevelinfo.Skill_Level_Name=data.values.skill_Level_Name;
 
  this.CompetencyCheckLevelinfo.Check_level_Description=data.values.check_level_Description;
  
  this.CompetencyCheckLevelinfo.Check_Level_Weightage=data.values.check_Level_Weightage;
  
}
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet");
    worksheet.addRow(['Competency Skill Levels']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "CompetencyCheckLevel.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Competency Skill Levels',80,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('CompetencyCheckLevel.pdf');
    });
  }
}
validateNonNegative(params: any): boolean {
  return params.value >= 0;
  
}
}



