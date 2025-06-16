import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');

@Component({
  selector: 'app-viewlistriskstatement',
  templateUrl: './viewlistriskstatement.component.html',
  styleUrls: ['./viewlistriskstatement.component.scss']
})
export class ViewlistriskstatementComponent {
  viewStatement:any;
  constructor(private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private zone: NgZone,
 
  ) 
  {
   
    this.viewStatement = {
      paginate: true,
      store: new CustomStore({
        key: 'riskStatementID',
        loadMode: 'raw',
        load: () => {
      
                  return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskStatement/GetRiskStatement', { headers })
              .subscribe(res => {
           //    this.compliance_details = (res as any[]).length;
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };
  }
  goBack() {
    this.router.navigate(['dashboard/Risk_Library/risk-statement'])
  }
  okClicked2(e:any){
       console.log('Edit Risk with ID:', e); // Debug log
  //alert(actregulatoryid)
  this.router.navigate(['dashboard/Risk_Library/editriskstatement'], {
    queryParams: { riskStatementID: e }
  });
  }
  okClicked(e:any){
   console.log('View Risk with ID:', e); // Debug log
    this.router.navigate(['dashboard/Risk_Library/viewriskstatement'], {
    queryParams: { riskStatementID: e }
  });
  }
  okClicked3(e:any){
    console.log('Delete Risk with ID:', e); // Debug log
     this.router.navigate(['dashboard/Risk_Library/deleteriskstatement'], {
     queryParams: { riskStatementID: e }
   });
   }
  // okClicked3(e: any) {
  //   console.log('Delete Risk with ID:', e); // Debug log
  
  //   const message2 = "Dear User, you have chosen to ‘Deactivate’ this risk statement. Kindly be aware that your action will affect the User accessibility, notification and alerts, and risk and control documents. Your action will also disable the assessment activity to be conducted in future.This action cannot be reversed, but however, you may ‘Re-activate’ the risk statements and add to risk library later, and all your mapping actions will be reset.";
  
  //   const dialogRef = this.dialog.open(DaidailogeComponent, {
  //     width: '550px',
  //     data: { message: message2 },
  //     disableClose: true, // User cannot close the dialog without confirming
  //   });
  
  //   // Subscribe to the dialog's result to know if the user confirmed
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // User confirmed the action
  //       this.router.navigate(['dashboard/CreateRisk_Document/deleteriskstatement'], {
  //         queryParams: { riskStatementID: e }
  //       });
  //     }
  //   });
  // }
  exportGrid1(e:any) {
if (e.format === 'xlsx') {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Main sheet"); 
  worksheet.addRow(['Enity Types Of Assessment']);
  worksheet.addRow([]);
  exportDataGrid({ 
    worksheet: worksheet, 
    component: e.component,
  }).then(function() {
    workbook.xlsx.writeBuffer().then(function(buffer) { 
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "entityTypeAssessment.xlsx"); 
    }); 
  }); 
  e.cancel = true;
} 
else if (e.format === 'pdf') {
  //alert("test")
  const doc = new jsPDF();
  doc.text('entity Types Of Assessment',75,10);
  doc.setFontSize(12);
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: e.component,
  }).then(() => {
    doc.save('entityTypeAssessment.pdf');
  });
}
}
}
