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

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-assess-disabled-temp-list',
  templateUrl: './assess-disabled-temp-list.component.html',
  styleUrls: ['./assess-disabled-temp-list.component.scss']
})
export class AssessDisabledTempListComponent {

  
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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef) {
      const currentDate = new Date();
      this.today = currentDate;
   
      const oneMonthAgoDate = new Date();
      oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
      this.oneMonthAgo = oneMonthAgoDate;
      this.selected="Disabled";
      this.range.get('start')?.setValue(new Date(this.oneMonthAgo));
      this.range.get('end')?.setValue(new Date(this.today));
    }  



 
  ngOnInit(): void {
  
 
   this.DateSearchFilter();
  
console.log("this is my datasource array",this.dataSource1);

    
  }
  sendRequest1(url: string, data: any): Promise<any> {
    const queryString = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
    return fetch(`${url}?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
  
  //Date Filter Button Code
  DateSearchFilter(){

  let adjustDate = (date: Date | null | undefined) => date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;

    let formData = {
      datetype: this.selected,
      today: adjustDate(this.range.value.end),
      oneMonthAgo: adjustDate(this.range.value.start),
     // today: this.range.value.end ? this.range.value.end.toISOString().split('T')[0] : null,
     // oneMonthAgo: this.range.value.start ? this.range.value.start.toISOString().split('T')[0] : null,
  };
   
  this.dataSource1 = new CustomStore({
    key: 'ass_template_id',
    load: () => {
       
        return this.sendRequest1(URL + '/GovControlReportsController/GetAllDisabledAssesTemplates', formData)
            .then(response => {
                console.log("Request successful, response: ", response);
                return response;
            })
            .catch(error => {
                console.error("Request failed, error: ", error);
                throw error;
            });
    }
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

 
  
  
        
    //Exporting Code

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['List Of Assessment Templates Disabled']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ListOfAssessmentTemplatesDisabled.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("List of Assessment Templates Disabled", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ListOfAssessmentTemplatesDisabled.pdf');
      });
    }
  
  else {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['List Of Assessment Templates Disabled']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.csv.writeBuffer().then(function(buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ListOfAssessmentTemplatesDisabled.csv");
      });
    }); 
    e.cancel = true;
  } 
}
}
