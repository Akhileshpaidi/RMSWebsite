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
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.scss']
})
export class TrackStatusComponent {
  dataSource: any;
  isViewPopupVisible = false;
  selectedRow: any = {};
  dataGridColumns:any[]=[];
  @ViewChild(DxPopupComponent, { static: false }) popup!: DxPopupComponent;
  userid:any;
    // DocumentTypeData:any;
    DepartmentModelinfo:DepartmentModel=new DepartmentModel();
  newDepartmentName: any;
    ngOnInit(): void {
    }
    constructor(private http: HttpClient,private InspectionservicesService:InspectionservicesService,private session: SessionService,
      private cdr: ChangeDetectorRef,private router: Router) {
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
        //alert(JSON.stringify(this.userid))
      this.dataSource=new CustomStore({
        key: 'trackingNo',
             load: () => this.sendRequest(URL + '/UserMaster/GetRaiseQueryDetailsbyid/'+this.userid),
      });
      //api/UserMaster/GetRaiseQueryDetails
      // this.dataSource = new CustomStore({
      //     key: 'department_Master_id',
      //     load: () => this.sendRequest(URL + '/DepartmentMaster/GetDepartmentMasterDetails'),
          
      //     insert: (values) => this.sendRequest(URL + '/DepartmentMaster/InsertDepartmentMasterDetails', 'POST', {
      //         //values: JSON.stringify(values)
      //         values
      //     }),
      //     update: (key, values) => this.sendRequest(URL + '/DepartmentMaster/UpdateDepartmentMasterDetails', 'PUT', {
      //          key,
      //          //values: JSON.stringify(values)
      //         values
      //      }),
      //      remove: (key) => this.sendRequest(URL + '/DepartmentMaster/DepartmentMasterDetails', 'DELETE', {
      //          key
      //      })
      // });


    
      
    }

         onChangeParams() {
        //alert('onchange');
      }
      setMissionValue(rowData: any, value: any): void {
        // alert(value)
        rowData.docTypeID = value
        }


        sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
         
      
          switch(method) {
              case 'GET':
                  return new Promise((resolve, reject) => {
                    this.http.get(url, {headers})
                      .subscribe(res => {
                       (resolve(res));
                       console.log(JSON.stringify(res))
                      }, (err) => {
                        reject(err.error);
                      });
                });
                  break;
              case 'PUT':
                    
                 this.updateParameters(data);
                // this.addDepartment(data);
                 return new Promise((resolve, reject) => {
                  this.http.put(url,this.DepartmentModelinfo,{headers})
                    .subscribe(res => {
                     (resolve(res));
      
                    }, (err) => {
                      reject(err.error);
                    });
                  });
                  break;
              case 'POST':
             
              this.insertParameters(data);
              // this.addDepartment(data);
                  return new Promise((resolve, reject) => {
                    this.http.post(url,this.DepartmentModelinfo,{headers})
                      .subscribe(res => {
                       (resolve(res));
                      }, (err) => {
                        //  alert(JSON.stringify(err.error))
                        //  console.log(err)
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
                          reject(err.error);
                        });
                      });
                      break;
          }
      
      
      
      }
      
      insertParameters(data:any={}){
      
       this.DepartmentModelinfo.Department_Master_id=0;
       this.params(data);
      }
      
      updateParameters(data:any={}){
      this.DepartmentModelinfo.Department_Master_id=data.key;
       this.params(data);
      }
      
      params(data:any={}){
        
      // this.DepartmentModelinfo.Department_Master_id=data.values.department_Master_id;

        this.DepartmentModelinfo.Department_Master_name =data.values.department_Master_name;
       
        this.DepartmentModelinfo.Department_Master_Desc =data.values.department_Master_Desc;
        
      }
      exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet"); 
          worksheet.addRow(['ViewQuery/IssueDetails List']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ViewQuery/IssueDetails.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("ViewQuery/IssueDetails List", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('ViewQuery/IssueDetails.pdf');
          });
        }
      }

      onViewClick1(e: any,event:Event) {
        alert("dsgfg")
        event.stopPropagation(); 
         this.selectedRow = e.row.data; // Get the clicked row's data
         localStorage.setItem('selectedQuery', JSON.stringify(this.selectedRow));
         this.router.navigate(['dashboard/GGT_Governance/view-query']);
        // this.isViewPopupVisible = true; // Show popup
        // console.log('Popup visibility:', this.isViewPopupVisible);
        // const trackingId = e.row.data.trackingId; // Get Tracking ID from row data
        // this.router.navigate(['/view-query', trackingId,this.selectedRow]); // Navigate to the new page
      }
      onViewClick2(e: any) {
        console.log("Row clicked:", e.data);
        this.selectedRow = e.data; // Get the clicked row's data
        localStorage.setItem('selectedQuery', JSON.stringify(this.selectedRow));
        this.router.navigate(['dashboard/GGT_Governance/view-query']);
      }
      onViewClick(e: any) {
        console.log("Button Clicked! Event Data:", e);
      
        if (!e || !e.row || !e.row.data) {
          console.error("Row data not found!", e);
          return;
        }
      
        this.selectedRow = e.row.data;
        console.log("Selected Row Data:", this.selectedRow);
      
        localStorage.setItem('selectedQuery', JSON.stringify(this.selectedRow));
      
        this.router.navigate(['/dashboard/GGT_Governance/view-query']).then(success => {
          if (success) {
            console.log("Navigation successful!");
          } else {
            console.error("Navigation failed.");
          }
        }).catch(err => {
          console.error("Navigation error:", err);
        });
      }
      
      createUser() {
        //this.router.navigate(['dashboard/user/create-user']);
        //this.router.navigate(['dashboard/GGT_Governance/view-query']);
      }

}
