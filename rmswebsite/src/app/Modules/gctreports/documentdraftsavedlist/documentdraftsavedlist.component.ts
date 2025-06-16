import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular/ui/data-grid';
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
import { SessionService } from 'src/app/core/Session/session.service';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-documentdraftsavedlist',
  templateUrl: './documentdraftsavedlist.component.html',
  styleUrls: ['./documentdraftsavedlist.component.scss']
})
export class DocumentdraftsavedlistComponent {

  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  dataSource1:any;
  today:any;
  oneMonthAgo:any;
  selected:any;
 userid:any;
   constructor(private session: SessionService,
    private http: HttpClient,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef) {
      const user: any = this.session.getUser();
      const userdata = JSON.parse(user);
      this.userid = userdata.profile.userid;
const userid  = this.userid

      this.dataSource1 = new CustomStore({
        key: 'addDoc_id',
        load: () => this.sendRequest(`${URL}/GovControlReportsController/GetDrftsSaved/${userid}/` ),
        
         
        
    });
    
  }



 
  ngOnInit(): void {
  
 
   
   
console.log("this is my datasource array",this.dataSource1);

    
  }
 
  sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
    let result;

    switch(method) {
        case 'GET':
            return new Promise((resolve, reject) => {
              this.http.get(url, {headers})
                .subscribe(res => {
                 (resolve(res));
                // console.log(JSON.stringify(res))
                }, (err) => {
                  reject(err);
                });
          });
        
       
    }



}



  
  // filterDataByDateRange(fromDate: string, toDate: string) {
  //   if (fromDate && toDate) {
  //     const startDate = new Date(fromDate);
  //     const endDate = new Date(toDate);
  //     this.dataSource1.load({
  //       filter: ["addDoc_createdDate", ">=", startDate],
  //       sort: "addDoc_createdDate",
  //       select: ["addDoc_createdDate"], 
  //       requireTotalCount: true 
  //     }).then((data: any) => {   
  //       const filteredData = data.filter((item: any) => {
  //         const itemDate = new Date(item.addDoc_createdDate);
  //         return itemDate >= startDate && itemDate <= endDate;
  //       });
  //       this.dataGrid.instance.option('dataSource', filteredData);
  //     }).catch((error: any) => {
  //       console.error('Error filtering data:', error);
  //     });
  //   }
  // }

 
  
  
        
    //Exporting Code

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['List of Documents Draft Saved']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List of Documents Draft Saved.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("List of Documents Draft Saved", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('List of Documents Draft Saved.pdf');
      });
    }
  
  else {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['List of Documents Draft Saved']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.csv.writeBuffer().then(function(buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List of Documents Draft Saved.csv");
      });
    }); 
    e.cancel = true;
  } 
}
  
}
