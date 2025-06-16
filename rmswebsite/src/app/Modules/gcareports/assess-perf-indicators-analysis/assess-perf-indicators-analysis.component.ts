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
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { lastValueFrom } from 'rxjs';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-assess-perf-indicators-analysis',
  templateUrl: './assess-perf-indicators-analysis.component.html',
  styleUrls: ['./assess-perf-indicators-analysis.component.scss']
})
export class AssessPerfIndicatorsAnalysisComponent {





  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  dataSource:any;
  dataSource1:any;
  dataSource2:any;
  today:any;
  oneMonthAgo:any;
  selected:any;
  MainGrid:boolean=true;
  SubGrid:boolean=false;
  selectedToggle: number=1;
  showMappedUsersGrid = false; 
  showExemptedUsersGrid = false; 
  subjecttopicgridData:any;
  compotencygridData:any;
  tempid:any;
  QstnsGrid=false;
  qstnsubjecttopicgridData:any;
  gridDataSource6:any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef) {
      const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
   
    const oneMonthAgoDate = new Date();
    oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
    this.oneMonthAgo = oneMonthAgoDate.toISOString().split('T')[0];
    this.selected="Acknowledgemet";
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

DateSearchFilter() {
  
  let adjustDate = (date: Date | null | undefined) => date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;

    let formData = {
        datetype: this.selected,
        today: adjustDate(this.range.value.end),
        oneMonthAgo: adjustDate(this.range.value.start),
        //today: this.range.value.end ? this.range.value.end.toISOString().split('T')[0] : null,
       // oneMonthAgo: this.range.value.start ? this.range.value.start.toISOString().split('T')[0] : null,
    };
   

    console.log("Form data prepared: ", formData);

    this.dataSource1 = new CustomStore({
        key: 'uq_ass_schid',
        load: () => {
           
            return this.sendRequest1(URL + '/GovControlReportsController/GetCompletedAssessWithResultBySI', formData)
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
}



onRowSelectionChanged(e:any):void{
  const selectedRowData = e.selectedRowsData[0];
  console.log("selected values",selectedRowData)
  let uq_ass_schid=selectedRowData.uq_ass_schid;
  console.log("selected TempId",uq_ass_schid)
  this.tempid=selectedRowData.ass_template_id;
  let verson_no = selectedRowData.verson_no
   // Assuming single row selection
this.MainGrid=false;
this.SubGrid=true;
this.onToggleChange(this.selectedToggle);
this.DateSearchFilterforAssessorsList(this.tempid, uq_ass_schid,verson_no);


}

DateSearchFilterforAssessorsList(tempid: any, uq_ass_schid: any,verson_no:any){
  let formData = {
    tempid:tempid,
    uq_ass_schid: uq_ass_schid,
    verson_no:verson_no,
};


console.log("Form data prepared: ", formData);
let d1:any
this.http.get(URL + '/GovControlReportsController/GetSubjectTopicResultBySI/'+formData.tempid + '/' + formData.uq_ass_schid +'/'+formData.verson_no  , {headers})

    .subscribe((response: any) => {
     d1=response;
 //    alert(JSON.stringify(response))
console.log(JSON.stringify(response))

     this.compotencygridData = new PivotGridDataSource({
       store: response,
       fields: [
        {
          dataField: "firstname",
          area: "row"
      },
      {
dataField:"scoreIndicatorName",
area:"column"
      },
      // {
      //   dataField:"subject_Name",
      //   area:"column"
      // },
      // {
      //   dataField:"topic_Name",
      //   area:"column"
      // },
      {
        dataField: "no_of_Questions",
        area: "data",
        dataType: "number",
        caption:"No.of.Qstns",
        summaryType: 'sum',
      //  groupName:"Easy"
    },
    {
      dataField: "no_of_answered_qstns",
      area: "data",
      dataType: "number",
      caption:"No.of.Answered.Qstns",
      summaryType: 'sum',
 
  },
//   {
//     dataField: "scoreIndicator",
//     area: "data",

//     caption:"scoreindictor",
//     summaryType: 'sum',
  
// },
    ],

     });
    });

    let ds:any
    this.http.get(URL + '/GovControlReportsController/GetSubjectTopicResultByKI/'+formData.tempid + '/' + formData.uq_ass_schid +'/'+formData.verson_no , {headers})
  
        .subscribe((response: any) => {
         ds=response;
         console.log(JSON.stringify(response))
         this.subjecttopicgridData = new PivotGridDataSource({
           store: response,
           fields:[
           //   {
           //     dataField: "usR_ID",
           //     area: "row",
               
           // },
           {
            dataField: "key_Impr_Indicator_Name",
            area: "row",
          
        },
             {
             dataField: "firstname",
             area: "column"
         },
        //  {
        //    dataField:"subject_Name",
        //    area:"column"
        //  },
        //  {
        //    dataField:"topic_Name",
        //    area:"column"
        //  },
         {
           dataField: "no_of_Questions",
           area: "data",
           dataType: "number",
           caption:"No.of.Qstns",
           summaryType: 'sum',
         //  groupName:"Easy"
       },
       {
         dataField: "no_of_answered_qstns",
         area: "data",
         dataType: "number",
         caption:"No.of.Answered.Qstns",
         summaryType: 'sum',
    
     },
//      {
// dataField: "correctAnswers",
// area: "data",
// dataType: "number",
// caption:"No.of.Answered.Correctly",
// summaryType: 'sum',
// //  groupName:"Easy"
// },
// {
// dataField: "accuracyPercentage",
// area: "data",
// dataType: "number",
// caption:"Overall Accuracy%",
// summaryType: 'avg', 
// //  groupName:"Easy"
// },

  //    {
  //      dataField: "scoreIndicator",
  //      area: "data",
  
  //      caption:"scoreindictor",
  //      summaryType: 'sum',
     
  //  },
  //  {
  //        dataField: "scoreIndicatorName",
  //        area: "data",
       
  //    },
   
     
           ]
         });
        });


      //   let dq:any
      //   this.http.get(URL + '/GovControlReportsController/GetQuestionsBySubjects/'+formData.tempid + '/' + formData.uq_ass_schid  , {headers})
      
      //       .subscribe((response: any) => {
      //        dq=response;
      //        console.log(JSON.stringify(response))
      //        this.qstnsubjecttopicgridData = new PivotGridDataSource({
      //          store: response,
      //          fields:[
      //          //   {
      //          //     dataField: "usR_ID",
      //          //     area: "row",
                   
      //          // },
               
      //            {
      //            dataField: "firstname",
      //            area: "row"
      //        },
      //        {
      //          dataField:"subject_Name",
      //          area:"column"
      //        },
      //       //  {
      //       //      dataField:"topic_Name",
      //       //      area:"column"
      //       //    },
            
      //      //  {
      //     //      dataField: "no_of_Questions",
      //     //      area: "data",
      //     //      dataType: "number",
      //     //      caption:"No.of.Qstns",
      //     //      summaryType: 'sum',
      //     //    //  groupName:"Easy"
      //     //  },
      //      {
      //        dataField: "no_of_answered_qstns",
      //        area: "data",
          
      //        caption:"No.of.Answered.Qstns",
             
        
      //    },
      //     {
      //          dataField:"skill_Level_Name",
      //          area:"data"
      //        },
      // //    {
      // //      dataField: "scoreIndicator",
      // //      area: "data",
      
      // //      caption:"scoreindictor",
      // //      summaryType: 'sum',
         
      // //  },
      
         
      //          ]
      //        });
      //       });

      this.gridDataSource6 = this.makeAsyncDataSource6(this.http,formData.tempid,formData.uq_ass_schid);

}
makeAsyncDataSource6(http:HttpClient,ass_tempid:any,uniqueid:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
 //  key: 'userAss_Ans_DetailsID',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetQuestionsUsersList?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid, { headers }));
    },
  });
}


exitPage(){
  this.MainGrid=true;
this.SubGrid=false;
this.DateSearchFilter();
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

  onToggleChange(event: number) {
   
    this.selectedToggle=event;
    if (this.selectedToggle == 1) {
      this.showMappedUsersGrid = true;
      this.showExemptedUsersGrid = false;
      this.QstnsGrid=false;

    } else if (this.selectedToggle==2) {
      this.showMappedUsersGrid = false;
      this.showExemptedUsersGrid = true;
      this.QstnsGrid=false;
    }
    else if (this.selectedToggle==3) {
      this.showMappedUsersGrid = false;
      this.showExemptedUsersGrid = true;
      this.QstnsGrid=true;
    }
  }
  
  
        
    //Exporting Code

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['List of Assessment Performance Indicator Analysis']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List of Assessment Performance Indicator Analysis.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("List of Assessment Performance Indicator Analysis", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('List of Assessment Performance Indicator Analysis.pdf');
      });
    }
  
  else {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['List of Assessment Performance Indicator Analysis']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.csv.writeBuffer().then(function(buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List of Assessment Performance Indicator Analysis.csv");
      });
    }); 
    e.cancel = true;
  } 
}

   exportGrid1(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['List of Assessment Performance Question Wise Analysis']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List of Assessment Performance Question Wise Analysis.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("List of Assessment Performance Question Wise Analysis", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('List of Assessment Performance Question Wise Analysis.pdf');
      });
    }
  
  else {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['List of Assessment Performance Question Wise Analysis']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.csv.writeBuffer().then(function(buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List of Assessment Performance Question Wise Analysis.csv");
      });
    }); 
    e.cancel = true;
  } 
}


}
