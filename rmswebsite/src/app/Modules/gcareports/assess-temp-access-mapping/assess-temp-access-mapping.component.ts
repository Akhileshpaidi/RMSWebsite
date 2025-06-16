import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl,  FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-assess-temp-access-mapping',
  templateUrl: './assess-temp-access-mapping.component.html',
  styleUrls: ['./assess-temp-access-mapping.component.scss']
})
export class AssessTempAccessMappingComponent {

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  dataSource1:any;
  gridDataSource1:any;
  today:any;
  oneMonthAgo:any;
  MainGrid:boolean=true;
  SubGrid:boolean=false;
  userdata: any = [];
  sessionData: any;
    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private session: SessionService,
    private changeDetector: ChangeDetectorRef) {
      const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
   
    const oneMonthAgoDate = new Date();
    oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
    this.oneMonthAgo = oneMonthAgoDate.toISOString().split('T')[0];
      this.range.get('start')?.setValue(new Date(this.oneMonthAgo));
    this.range.get('end')?.setValue(new Date(this.today));
 
  let user1: any = this.session.getUser();
  this.userdata = JSON.parse(user1);
  this.sessionData = this.userdata;  
    console.log("userid", this.userdata.profile.userid);
    let userid= this.userdata.profile.userid
  }



 
  ngOnInit(): void {
  
 
   this.DateSearchFilter();
  
console.log("this is my datasource array",this.dataSource1);

    
  }
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
  
  //Date Filter Button Code
  DateSearchFilter(){
    let userid= this.userdata.profile.userid
    this.dataSource1 = new CustomStore({
      key: 'ass_template_id',
 
      load: () => this.sendRequest1(URL + '/GovControlReportsController/GetAllAssesTemplatesProvideAccess/'+this.today+"/"+this.oneMonthAgo+"/"+userid),
   
     
  });
  // this.filterDataByDateRange(this.today,this.oneMonthAgo);
  

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




  //On Row Selection 


  DateSearchFilterforAssessorsList(id:any,verson_no:any){
    console.log("Fetching assessors for", this.today, this.oneMonthAgo, id,verson_no ,this.sessionData.profile.userid);

    this.gridDataSource1 = new CustomStore({
      key: 'ass_template_id',
 
      load: () => this.sendRequest1(URL + '/GovControlReportsController/GetProvideAccessAssessorsList/'+this.today+"/"+this.oneMonthAgo+"/"+id+"/"+verson_no+"/"+this.sessionData.profile.userid),
    
     
  });
}
  onRowSelectionChanged(e:any):void{
    const selectedRowData = e.selectedRowsData[0];
    console.log("selected values",selectedRowData)
    let assTempId=selectedRowData.ass_template_id;
    console.log("selected TempId",assTempId)
      let verson_no=selectedRowData.verson_no;
     // Assuming single row selection
this.MainGrid=false;
this.SubGrid=true;
this.DateSearchFilterforAssessorsList(assTempId,verson_no);


  }

  exitPage(){
    this.MainGrid=true;
this.SubGrid=false;
this.DateSearchFilter();
  }
 
  
  
        
    //Exporting Code

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['List Of Assessment Templates Access Mapping']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ListOfAssessmentTemplatesAccessMapping.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("List of Assessment Templates Access Mapping", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ListOfAssessmentTemplatesAccessMapping.pdf');
      });
    }
  
  else {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['List Of Assessment Templates Access Mapping']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.csv.writeBuffer().then(function(buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ListOfAssessmentTemplatesAccessMapping.csv");
      });
    }); 
    e.cancel = true;
  } 
}
}
