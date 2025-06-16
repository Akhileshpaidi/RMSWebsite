import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Import other necessary modules...
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-view-common-assesment-rules',
  templateUrl: './view-common-assesment-rules.component.html',
  styleUrls: ['./view-common-assesment-rules.component.scss']
})
export class ViewCommonAssesmentRulesComponent {
  dataSource1:any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.dataSource1 = new CustomStore({
      key: 'assessmenttemplateid',
    
      load: () => this.sendRequest1(URL + '/RiskAssessmentTemplate/GetRiskAssessmentTemplate'),
    
  
  });}
  sendRequest1(url: string, method: string = 'GET', data1: any = {}): any {

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
          case 'DELETE':
           // alert(data1.key)
            return new Promise((resolve, reject) => {
              this.http.delete(url+'?id='+data1.key)
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
              });
              
        }}
        exportGrid(e:any) {
          if (e.format === 'xlsx') {
            const workbook = new Workbook(); 
            const worksheet = workbook.addWorksheet("Main sheet"); 
            worksheet.addRow(['Risk Common Assesment Template Rules']);
            worksheet.addRow([]);
            exportDataGrid({ 
              worksheet: worksheet, 
              component: e.component,
            }).then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer) { 
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "RiskCommonAssesmentTemplateRules.xlsx"); 
              }); 
            }); 
            e.cancel = true;
          } 
          else if (e.format === 'pdf') {
            const doc = new jsPDF();
            doc.text("Risk Common Assesment Template Rules", 80,10); // Adjust the position as needed
            doc.setFontSize(12);
            exportDataGridToPdf({
              jsPDFDocument: doc,
              component: e.component,
            }).then(() => {
              doc.save('RiskCommonAssesmentTemplateRules.pdf');
            });
          }
        }
}
