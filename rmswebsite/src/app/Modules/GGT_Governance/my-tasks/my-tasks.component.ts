import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { ValueType, Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DatePipe } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { CommonModule } from '@angular/common';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent {
  EntityID: any;
  selectedentity:any;
  UnitMaster:any; 
  EntityName:any;
  AuthorityTypeID: any;
  AuthorityName:any;
  AuthorityTypeData:any;
  AuthorityNameData:any;
  docTypeID:any;
  Documentcategory: any;
  Selectedtopic:any;
  DocumentTypeData:any
  Doc_CategoryID:any;
  Documentsubcategory:any;
  NatureOfDocument:any;
  form: any;
  gridDataSource:any;
  pendingcount:any;
  DocumentCount:any;
  immediateActionCount:any;
  expiredCount:any;
  expiringSoonCount:any;
  notDueCount:any;
  constructor(private http: HttpClient,

  ) 
  {
    this.http.get<any[]>(URL + '/MyTasks/GetexpiredCount', { headers })
    .subscribe({
      next: (res) => {
      
       let result:any=res;
      this.expiredCount=result.expiredCount;
                  },
      error: (err) => {
        console.error('Error fetching :', err);

      }
    });
    this.http.get<any[]>(URL + '/MyTasks/GetExpiringCount', { headers })
    .subscribe({
      next: (res) => {
      
       let result:any=res;
      this.expiringSoonCount=result.expiringSoonCount;
                  },
      error: (err) => {
        console.error('Error fetching :', err);

      }
    });
    this.http.get<any[]>(URL + '/MyTasks/GetNotDueCount', { headers })
    .subscribe({
      next: (res) => {
      
       let result:any=res;
      this.notDueCount=result.notDueCount;
        
      },
      error: (err) => {
        console.error('Error fetching :', err);

      }
    });
    this.http.get<any[]>(URL + '/MyTasks/GetimmediateActionCount', { headers })
    .subscribe({
      next: (res) => {
      
       let result:any=res;
      this.immediateActionCount=result.immediateActionCount;
      //alert(JSON.stringify(this.immediateActionCount))
      
      },
      error: (err) => {
        console.error('Error fetching :', err);
      }
    });

    this.http.get<any[]>(URL + '/MyTasks/GetDocumentCount', { headers })
    .subscribe({
      next: (res) => {
       
       let result:any=res;
      this.DocumentCount=result;

      
      },
      error: (err) => {
        console.error('Error fetching :', err);
      }
    });

    this.http.get<any[]>(URL + '/MyTasks/GetPendingCount', { headers })
    .subscribe({
      next: (res) => {
       
       let result:any=res;
      this.pendingcount=result;

      
      },
      error: (err) => {
        console.error('Error fetching :', err);
      }
    });
   

    this.DocumentTypeData={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails', {headers})
              .subscribe(res => {
               (resolve(res));
     
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
     this.NatureOfDocument={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/NatureOfDocument/GetNatureOfDocumentDetails', {headers})
              .subscribe(res => {
               (resolve(res));
     
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
     
    this.EntityName={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UnitMaster/GetEntityNames', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
    this.AuthorityTypeData={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/AuthorityName/GetAuthorityNameDetails', {headers})
              .subscribe(res => {
               (resolve(res));
     
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
    
     this.AuthorityNameData={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/AuthorityName/GetAuthorityNameDetails', {headers})
              .subscribe(res => {
               (resolve(res));
     
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
     this.gridDataSource={
      paginate: true,
      store: new CustomStore({
          key: 'addDoc_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/MyTasks/GetMyTasksDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

  }
  // getStatusColor(status: string): string {
  //   switch (status) {
  //     case 'Take Immediate Action':
  //       return 'red';
  //     case 'Expired':
  //       return 'orange';
  //     case 'Expiring Soon':
  //       return 'yellow';
  //     case 'Not Due':
  //       return 'green';
  //     default:
  //       return 'white'; // default color or any other color
  //   }
  // }
  
  getUnitLocation(event: any) {
    console.log("selected Type id: ", event.value);
    this.EntityID = event.value;
    this.selectedentity=null;  
    this.UnitMaster={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails/'+this.EntityID, {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      
    };
   }
   getAuthorityNamebyId(id:any){
 
    console.log('Selected AuthorityTypeID:', id.value);
   
    this.AuthorityTypeID=id;
   
    if (this.AuthorityTypeID) { 
      this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.AuthorityTypeID).subscribe((data: any) => {
        this.AuthorityName = data;
      });
    } else {
      //alert('docTypeID is null or undefined'); // Add some error handling
    }
   }
   getDocTypes(event: any) {
    console.log("selected Type id: ", event.value);
    this.docTypeID = event.value;
     this.Selectedtopic=null;  
    this.Documentcategory={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+this.docTypeID, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
   }
   getsubDocTypes(event: any) {
    console.log("selected Type id: ", event.value);
    this.Doc_CategoryID = event.value;
     this.Selectedtopic=null;  
    this.Documentsubcategory={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.Doc_CategoryID, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
   }
   getNatureOfDocument(){
    this.http.get(URL+'/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data:any)=>{
      this.NatureOfDocument=data;
      
    })
   
   }
   handleSelectionChanges(event: any) {
    const selectedRows = event.selectedRowsData;
   if (selectedRows.length > 0) {
     const selectedAddDocIds = selectedRows.map((row: any) => row.addDoc_id);
     // Set the array of IDs directly to the form control
     this.form.get('addDoc_id')?.setValue(selectedAddDocIds);
   } else {
     this.form.get('addDoc_id')?.setValue(null);
   }
   }
   
}
