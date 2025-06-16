import { Component,ChangeDetectorRef ,ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DepartmentModel,InspectionservicesService} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DxToastModule, DxToastComponent } from 'devextreme-angular';
import { DxPopupComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-review-query-status',
  templateUrl: './review-query-status.component.html',
  styleUrls: ['./review-query-status.component.scss']
})
export class ReviewQueryStatusComponent {
 dataSource: any;
 openQueries:any;
 closedQueries:any;
  isViewPopupVisible = false;
  selectedRow: any = {};
  userid:any;
  dataGridColumns:any[]=[];
  @ViewChild(DxPopupComponent, { static: false }) popup!: DxPopupComponent;
 
    // DocumentTypeData:any;
    DepartmentModelinfo:DepartmentModel=new DepartmentModel();
  newDepartmentName: any;
    ngOnInit(): void {
    }
    constructor(private http: HttpClient,private InspectionservicesService:InspectionservicesService,
      private cdr: ChangeDetectorRef,private router: Router, private session: SessionService,) {
         this.userid=this.session.getUserId();
         this.dataGridColumns = [
          { dataField: "trackingNo", caption: "Tracking ID" },
  { dataField: "subjectTitle", caption: "Subject Title" },
  { dataField: "queryImportance", caption: "Importance" },
  { dataField: "task_name", caption: "Module" },
  { dataField: "menu_item", caption: "Main Menu" },
  { dataField: "name", caption: "Component" },
  { dataField: "status", caption: "Status" },
  { dataField: "raisedPersonName", caption: "Raised By" },
  { dataField: "createdDate", caption: "Raised On" },
  { dataField: "reportingPersonName", caption: "Resolved By" },
  { dataField: "resolutionQueryDate", caption: "Resolved On" },
          {
            caption: "Action",
            type: "buttons",
            fixed: true, 
            fixedPosition: 'right' ,
            buttons: [
              {
                text: "View",
                onClick: (e: any) => this.onViewClick(e),
              }
            ]
          }
        ];
         const params = new HttpParams()
         .set('userid',this.userid);
         this.http.get(BASE_URL + '/UserMaster/GetReviewQueryDetails/',{headers,params}).subscribe(
          (data) => {
            this.dataSource = data;
            // Split data into two separate arrays
            this.openQueries = this.dataSource.filter((item: any) => item.status === "Open");
            this.closedQueries = this.dataSource.filter((item: any) => item.status === "Closed");
          },
          (err) => {
            console.error('Error fetching roles:', err);
          }
        );
      
    }

      exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet"); 
          worksheet.addRow(['ReviewQuery/IssueDetails List']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ReviewQuery/IssueDetails.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("ReviewQuery/IssueDetails List", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('ReviewQuery/IssueDetails.pdf');
          });
        }
      }

      onViewClick1(e: any) {
        alert("dsgfg")
         this.selectedRow = e.row.data; // Get the clicked row's data
         localStorage.setItem('selectedReviewQuery', JSON.stringify(this.selectedRow));
         this.router.navigate(['GGT_Governance/view-review-query']);
        // this.isViewPopupVisible = true; // Show popup
        // console.log('Popup visibility:', this.isViewPopupVisible);
        // const trackingId = e.row.data.trackingId; // Get Tracking ID from row data
        // this.router.navigate(['/view-query', trackingId,this.selectedRow]); // Navigate to the new page
      }
      onViewClick2(e: any) {
        console.log("Row clicked:", e.data);
        this.selectedRow = e.data; // Get the clicked row's data
        localStorage.setItem('selectedReviewQuery', JSON.stringify(this.selectedRow));
        this.router.navigate(['dashboard/GGT_Governance/view-review-query']);
      }
      onViewClick(e: any) {
        console.log("Button Clicked! Event Data:", e);
      
        if (!e || !e.row || !e.row.data) {
          console.error("Row data not found!", e);
          return;
        }
      
        this.selectedRow = e.row.data;
        console.log("Selected Row Data:", this.selectedRow);
      
        localStorage.setItem('selectedReviewQuery', JSON.stringify(this.selectedRow));
      
        this.router.navigate(['/dashboard/GGT_Governance/view-review-query']).then(success => {
          if (success) {
            console.log("Navigation successful!");
          } else {
            console.error("Navigation failed.");
          }
        }).catch(err => {
          console.error("Navigation error:", err);
        });
      }
      
      

}
