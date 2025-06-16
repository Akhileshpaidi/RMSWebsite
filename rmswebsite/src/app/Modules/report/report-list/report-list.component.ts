import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../user/user-list/user-list.component';
import userData from '../../../Common/dummy-data/user.json';
import roleData from '../../../Common/dummy-data/role.json';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ReportService } from 'src/app/core/services/report/report.service';
import { Validators } from '@angular/forms';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule, DxFormModule, DxSelectBoxModule } from 'devextreme-angular';
import themes from 'devextreme/ui/themes';

import { Service, Sale } from './app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import CustomStore from 'devextreme/data/custom_store';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import {  UserRightsPermission} from 'src/app/inspectionservices.service';



import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  
  DxTreeViewComponent,
} from 'devextreme-angular';



// if (!/localhost/.test(document.location.host)) {
//   enableProdMode();
// }

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  providers: [Service],
  preserveWhitespaces: true,
})
export class ReportListComponent implements OnInit{
  data: any[] = [
    { CompanyName: 'Allow User to use the Assessment Template'},
    { CompanyName: 'Allow User to make edit in the Assessment Template'},
    // { ID: 1, CompanyName: 'Allow User to use the Assessment Template'},
    // { ID: 2, CompanyName: 'Allow User to make edit in the Assessment Template'},
    // Add more data items as needed
  ];
  isUserBoxOpened:boolean;
  isgridopen:boolean=false;
  isPanelVisible: boolean = false;
  isPanelVisible1:boolean=false;
  isPanelVisible2:boolean=false;
  isPanelVisible6:boolean=false;
  isGridBoxOpened: boolean;
  EntityName:any;
  UnitMaster:any;
   selectedRows :any;
   selectedItems:any;
  EntityID:any;
  UnitLocationID:any;
  Userinfo:any;
  Selectedunit:any;
  Selecteduser:any;
  Userinfo1:any;
  selectedOption:any[]=[];
  selectedOption1:any[]=[];
  gridBoxselect:any;
  gridselecteditems:any;
  selectedPermission:any;
  dropdownOptions:any;
  selectionType: string = 'single';
  Select_Opt: string = '';
  publish_type:string='';
  
  selectedTimePeriod= new FormControl('');
  selectedFile: File | null = null;
  gridDataSource1:any;
  saveDocinfo :UserRightsPermission = new UserRightsPermission();
 usergridColumns: any[] = [
  { dataField:'user_location_mapping_id'},
  { dataField: 'firstname', caption: 'Username' },
  { dataField: 'department_Master_name', caption: 'Department' },
  { dataField: 'entity_Master_Name', caption: 'Entity Name' },
  { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
  {dataField:'roleNames',caption:'Roles'}
];
  usergridColumns1:any=['publish_Name'];
  selectedRowKeys: any[] = [];
  //selectedOption: string[]=[];
  gridBoxValue: any[] = [2];
  //checkboxForm: FormGroup;
  public module = 'Inventory Management';
  public access = 'Write';
  checked: any;
  sessionData: any;
  displayedColumns = [
    'srno',
    'reportname',
    'username',
    'date',
    'time',
    'view',
    'edit',
    'remove',
  ];
  public tmperiod:any[]=[
    {id:1,name:'mins'},
    {id:2,name:'hrs'},
    {id:3,name:'days'}
  ];

  public requiredtmperiod:any[]=[
    {id:1,name:'mins'},
    {id:2,name:'hrs'},
    {id:3,name:'days'}
  ];
  // dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  erroMessage: any;
  bridge: any;
  project: any;
  inspection: any;
  selectedDate: Date | undefined;
  AddDoc_ID:any;
  // sales: Sale[];
  userid:any;
  allMode: string;
  gridDataSource :any;
  Unit_location_Master_id:any;
 // Select_Opt:any;
  DirectUpload: any[] = []; 
  createDocumnet: any[] = []; 
  checkBoxesMode: string;
  form: any;
  addDoc_id:any;
  dataSource:any;
  minDate = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
  unit_location_Master_id:any;
  
ngOnInit(): void {

  this.form.get('duedate').valueChanges.subscribe((value:any) => {
    this.updateFormattedDate('duedate', value);
  });
  this.form.get('endDate').valueChanges.subscribe((value:any) => {
    this.updateFormattedDate('endDate', value);
  });
  
  this.form.valueChanges.subscribe((val: any) => console.log("Form values:", val));

  const user: any = this.session.getUser();
  const userdata = JSON.parse(user);
  this.userid = userdata.profile.userid;
 
}


  constructor(service: Service,private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private report: ReportService,
    private encrypt: EncryptionService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
  ) 

  {
    
    this.form =  this.formBuilder.group ({
       addDoc_id: ['',Validators.required],
       user_location_mapping_id: ['',Validators.required],
         doc_perm_rights_id: ['',Validators.required],
          Entity_Master_id: ['', Validators.required],
         Unit_location_Master_id: ['', Validators.required],
        ack_status:[''],
         duedate:[''],
         //timeline:[''],
         trakstatus:[''],
         optionalreminder:[''],
         noofdays:[''],
         timeperiod:[''],
         reqtimeperiod:[''],
         everyday:[''],
         validitydocument:[''],
         startDate:[this.minDate],
         endDate:['']
        })

    this.isGridBoxOpened = false;
    this.isUserBoxOpened=false;
   // this.selectProject();
    // this.sales = service.getSales();
    this.allMode = 'allPages';
    this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
  
//'/Adddocument/getentity/' + this.sessionData.profile.userid -- add document
///ProvideAccessdocument/Getenitityogdocument/'+this.userid
    this.EntityName={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Adddocument/getentity/' + this.userid , {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

    // this.gridDataSource={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'addDoc_id',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/ProvideAccessdocument/GetProvideAccessDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };

     this.dropdownOptions={
      paginate :true,
      store:new CustomStore({
        key :'doc_perm_rights_id',
        loadMode:'raw',
        load:()=>{return new Promise((resolve,reject)=>{
          this.http.get(URL + '/UserRightsPermission/GetUserRightsPermissionDetails', {headers})
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
              case 'POST':
            this.insertParameters(data);
            return new Promise((resolve, reject) => {
            // alert(JSON.stringify(this.saveDocinfo))
             this.http.post(url,this.saveDocinfo,{headers})
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

  //this.KeyImprinfo.key_Impr_Indicator_id=0;
  this.params(data);
 }
params(data:any={}){
 
 // this.saveDocinfo.AddDoc_id=data.values.addDoc_id;
 this.saveDocinfo.Entity_Master_id=data.values.entity_Master_id;
 this.saveDocinfo.Unit_location_Master_id=data.values.unit_location_Master_id;
 //this.saveDocinfo.ack_status=data.values.ack_status;
// this.saveDocinfo.trakstatus=data.values.trakstatus
 //this.saveDocinfo.duedate=data.values.duedate;
 this.saveDocinfo.AddDoc_id=data.values.addDoc_id;
//  this.saveDocinfo.timeline=data.values.timeline;
//  this.saveDocinfo.noofdays=data.values.noofdays;
//  this.saveDocinfo.timeperiod="mins";
//  this.saveDocinfo.reqtimeperiod=data.values.reqtimeperiod;
//  this.saveDocinfo.everyday=data.values.everyday;
//  this.saveDocinfo.optionalreminder=data.values.optionalreminder;
//  this.saveDocinfo.validitydocument =data.values.validitydocument;
//  this.saveDocinfo.startDate = data.values.startDate;
//  this.saveDocinfo.endDate = data.values.endDate;
this.saveDocinfo.createdBy = this.userid ;
}                

  gridBox_displayExpr(usR_ID:any) {
  //   return usR_ID && `${usR_ID.firstname} <${usR_ID.lastname}
  //   <${usR_ID.unit_location_Master_id}>
  // <${usR_ID.rolE_ID}> `;
  return usR_ID && `${usR_ID.firstname} `;
  }
  gridBox_displayExpr1(doc_perm_rights_id:any) {
    return doc_perm_rights_id && `${doc_perm_rights_id.publish_Name} `;
  }



  getUnitLocation(event: any) {
    console.log("selected Entity_Master_id : ", event.value);
    this.EntityID = event.value;
     this.Selectedunit=null;  
    this.UnitMaster={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ProvideAccessdocument/Getlocationdocument/'+this.EntityID, {headers})
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
  
  


   getUserData(unit_location_Master_id: any) {
   
    // this.Userinfo1={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'user_location_mapping_id',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get<any>(URL+'/UserLocationMapping/GetuserDetailsbyUser/'+ this.unit_location_Master_id, { headers })
    //         .subscribe(res => {
    //           (resolve(res));
    //       }, (err) => {
    //         reject(err);
    //       });



          
    //     });
    //     },
    //   }),
    // };


   }
   getgriddata(selectedUnit: any) {
    console.log("Selected unit_location_Master_id : ", selectedUnit.value);
    this.unit_location_Master_id = selectedUnit.value;
  
    this.gridDataSource = {
      paginate: true,
      store: new CustomStore({
        key: 'addDoc_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/ProvideAccessdocument/GetProvideAccessDetailsbyunitlocation/' + this.unit_location_Master_id, { headers })
              .subscribe(
                (res) => {
                  resolve(res); // Resolve with the fetched data
                },
                (err) => {
                  reject(err);
                }
              );
          });
        },
      }),
    };
      this.Userinfo1={
      paginate: true,
      store: new CustomStore({
          key: 'user_location_mapping_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get<any>(URL+'/UserLocationMapping/GetuserDetailsbyUser/'+ this.unit_location_Master_id, { headers })
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
  

  get filteredData() {
    return this.data;
  }
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    // this.dataSource.filter = filter;
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  editReport(element: any) {
    console.log('elemnt:', element);
    this.router.navigate(['dashboard/report/update-report'], {
      state: { data: element },
    });
  }

  
  changeTimePeriod(event:any)  {

    console.log('Selected Time period',event.value);
 
    
 
   }
   changereqTimePeriod(event:any)  {

    console.log('Selected Time period',event.value);
 
    
 
   }
 
  viewReport(element: any) {
    console.log('elemnt:', element);
    this.router.navigate(['dashboard/report/view-report'], {
      state: { data: element },
    });
  }

  onCheckboxChange(event:any) {
    // const ack_status = this.checkboxForm.get('ack_status')!.value;
    // console.log('Checkbox checked:', ack_status);

    console.log('Checkbox for Request for Acknowledgement changed:', event.target.checked);
  this.isPanelVisible = event.target.checked;
  }
  onCheckboxChange1(event:any) {
    console.log('Optional Reminder:', event.target.checked);
  this.isPanelVisible1 = event.target.checked;
  }
  onCheckboxChange2(event:any) {
    console.log('Optional Reminder:', event.target.checked);
  this.isPanelVisible2 = event.target.checked;
  }
  onCheckboxChange6(event:any) {
    console.log('validity Reminder:', event.target.checked);
  this.isPanelVisible6 = event.target.checked;
  }
  gerReportList(element: any) {
    const id = element.inspectionid;
    console.log('inspectionassignid', id);

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionassignid: id,
    };
    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.report.reportSummary(encryptedPayload).subscribe((response: any) => {
      // console.log(response, 'response');

      if (response.ResponseCode === '0') {
        let ReportList = this.encrypt.decryptionAES(response.ResponseData);

        let data = JSON.parse(ReportList);
        console.log(data, 'ReportList');
        // this.dataSource = data.Reportsummary;
        // this.dataSource = new MatTableDataSource(data.reportlist);
        // this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource, 'ReportList');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  changeStatus(value: any, element: any) {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'C',
      id: element.id,
      status: value.checked ? '0' : '1',
    };

    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.report.CRUDreport(encryptedPayload).subscribe((response: any) => {
      // console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.reloadComponent();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.reloadComponent();
      }
    });
  }

  removeReport(element: any) {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'D',
      id: element.reportid,
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.report.CRUDreport(encryptedPayload).subscribe((response: any) => {
      // console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        // window.location.reload();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  // openDialog(element: any) {
  //   console.log('elemnt', element);
  //   const dialogRef = this.dialog.open(ToasterComponent, {
  //     width: '550px',
  //     data: {
  //       title: 'rrrrDelete Item?',
  //       message: 'Are you sure you want to delete this item?',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     // console.log(result, 'The dialog was closed');

  //     if (result == true) {
  //       this.removeReport(element);
  //       // this.reloadComponent();
  //     } else {
  //       // console.error('Somthing went wrong');
  //     }
  //   });
  // }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  searchTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectBridge(element: any) {
    console.log(element);
    let id = element.value;
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      projectid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.report.bridgeMeta(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let bridgeList = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(bridgeList);
        this.bridge = data.bridgelist;
        console.log('bridgeList', this.bridge);
      } else {
        console.error(response);
      }
    });
  }

  selectProject() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.report.projectMeta(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let projectList = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(projectList);
        this.project = data.project;
        console.log('projectList', this.project);
      } else {
        console.error(response);
      }
    });
  }

  selectInspection(element: any) {
    let id = element.value;

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      bridgeid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.report
      .inspectionSummary(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let inspectionList = this.encrypt.decryptionAES(
            response.ResponseData
          );
          let data = JSON.parse(inspectionList);
          this.inspection = data.inspectionlist;
          console.log('inspectionList', this.inspection);
        } else {
          console.error(response);
        }
      });
  }

  selectOption1(event: any) {
    // handle the selection change here
    console.log( event.value);
    
  }

  onGridBoxOptionChanged(e: { name: string; }) {
    if (e.name === 'value') {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }


  // filterGrid(filterType: string) {
  //   if (filterType === 'Direct Upload') {
     
  //     this.Select_Opt = filterType;
  //     console.log(this.Select_Opt)

  //     this.gridDataSource = new CustomStore({
  //       key: 'addDoc_id', 
  //       load: () => this.sendRequest(URL + '/ProvideAccess/GetProvideAccessDetails/'+ this.Select_Opt ),
  //   });
      

  //   this.publish_type = filterType;
  //     this.dropdownOptions=new CustomStore({
  //       loadMode: 'raw',
  //       key: 'doc_perm_rights_id',
  //       load: () => this.sendRequest(URL + '/UserRightsPermission/GetUserRightsPermissionDetails/'+ this.publish_type ),
  //     });

  //   } else if (filterType === 'Create Document') {
     
  //     this.Select_Opt = filterType;
  //     console.log(this.Select_Opt)
  //     this.gridDataSource = new CustomStore({
  //       key: 'addDoc_id', 
  //       load: () => this.sendRequest(URL + '/ProvideAccess/GetProvideAccessDetails/'+ this.Select_Opt ),
  //   });

  //   this.publish_type = filterType;
  //     this.dropdownOptions=new CustomStore({
  //       loadMode: 'raw',
  //       key: 'doc_perm_rights_id',
  //       load: () => this.sendRequest(URL + '/UserRightsPermission/GetUserRightsPermissionDetails/'+ this.publish_type ),
  //     });
  //   }
  
  // }
  selectInspection1(selectedValues: any[]) {
    this.selectedOption = selectedValues;
  }
  // setSelectionType(type: 'single' | 'multiple') {
  //   this.selectionType = type;
 
  //   if(this.selectionType=='single'){
  //     this.gridDataSource1= new CustomStore({
  //       key: 'addDoc_id',
  //       load: () => this.sendRequest(URL + '/ProvideAccess/GetProvideAccessDetails')
  //     });


  //     //  this.selectionType ='single';
  //     //  this.gridDataSource1= new CustomStore({
  //     //   key: 'doc_perm_rights_id',
  //     //   load :()=> this.sendRequest(URL + '/UserRights/GetUserRights/'+this.Select_Opt+this.AddDoc_id)
  //     //  });

  //   }
  // }
  onGridSelectionChanged(event: any) {
    console.log("Selected Rows:", event.selectedRowKeys);
 
    if (event.selectedRowKeys && event.selectedRowKeys.length > 0) {
      // Get the selected row indices
      const selectedRowIndices = event.selectedRowKeys;
// Debug: Log selected row indices
  console.log("Selected Row Indices:", selectedRowIndices);
 
      // Use the row indices to access the corresponding data from the original data source
      const selectedTypeOfDocuments = selectedRowIndices.map((rowIndex: number) => {
        const rowData = this.gridDataSource1[rowIndex]; // Access the data using the row index
        console.log('Row Data:', rowData);
        return rowData.select_Opt;
    });
  // Debug: Log selectedTypeOfDocuments
  console.log('Selected Type Of Documents:', selectedTypeOfDocuments);
      const selectedTypeOfDocumentsString = selectedTypeOfDocuments.join(',');
      this.publish_type = selectedTypeOfDocumentsString;
 
      console.log("select_Opt:", JSON.stringify(this.publish_type));
 
      // Now, you can make the API call with the updated this.publish_type
      this.dropdownOptions = new CustomStore({
        key: 'doc_perm_rights_id',
        load: () => this.sendRequest(URL + '/UserRightsPermission/GetUserRightsPermissionDetails/' + this.publish_type),
      });
 
      // Update the dropdown data source
      this.dropdownOptions.load();
    }
  }  
  handleSelectionChanges(event: any) {
    try {
      console.log('Event:', event);
   
      const selectedRows = event.selectedRowsData;
      if (selectedRows.length > 0) {
        const selectedAddDocIDs = selectedRows
        .filter((item: { AddDoc_ID: any }) => item.AddDoc_ID !== undefined)
        .map((item: { AddDoc_ID: any }) => item.AddDoc_ID);
  
        // Set the array of IDs directly to the form control
        this.form.get('addDoc_id')?.setValue(selectedAddDocIDs);
      } else {
        this.form.get('addDoc_id')?.setValue(null);
      }
      
      console.log('Selected Rows:', selectedRows);

      // Extract AddDoc_IDs and filter out undefined values
      const selectedAddDocIDs = selectedRows
      .filter((item: any) => item.addDoc_id !== undefined)
      .map((item: any) => item.addDoc_id);
      // Log the extracted AddDoc_IDs
      console.log('addDoc_id values:', selectedAddDocIDs);

      // Set the array of IDs directly to the form control
      if (selectedAddDocIDs.length > 0) {
        this.form.get('addDoc_id')?.setValue(selectedAddDocIDs);
      } else {
        this.form.get('addDoc_id')?.setValue(null);
      }
      let selectedAddDocIDs1:number[] = Array.isArray(selectedAddDocIDs) ? selectedAddDocIDs.map(Number) : [Number(selectedAddDocIDs)];

 //alert(JSON.stringify(selectedAddDocIDs1))
      // Make an API call to fetch USR_IDs based on selected AddDoc_IDs
      if (selectedAddDocIDs.length > 0) {
  this.getUserData(selectedAddDocIDs1.join(',').toString());

     
      } else {
        console.log('No addDoc_id values to fetch users.');
    }
  } catch (error) {
    console.error('Error in handleSelectionChanges:', error);
  }
  }
  

  onSubmit() {
    if (this.form.valid ) {
        const formData: FormData = new FormData();
        const datavalues=this.form.value;
        //alert( JSON.stringify(datavalues))

        // Append the file to formData, if there's a selected file
        // if (this.selectedFile) {
        //     formData.append('File', this.selectedFile, this.selectedFile.name);
        // }
        // const addDocIdValue = this.form.get('addDoc_id')?.value;
        // console.log('addDoc_id value:', addDocIdValue);
        // formData.append('addDoc_id', addDocIdValue);

        

                  // Append non-array values to formData directly
                  Object.keys(this.form.controls).forEach(key => {
                    const controlValue = this.form.get(key).value;
                    if (!Array.isArray(controlValue)) {
                      formData.append(key, controlValue);
                    }
                  });
                  const addDocIdValue = this.form.get('addDoc_id').value;

                 addDocIdValue.forEach((id:any,index:any)=> formData.append(`Doc_id[${index}]`,id));

                  // if (Array.isArray(addDocIdValue)) {
                  //   // If it's an array (multiple selections), append each value separately
                  //   addDocIdValue.forEach((value: any, index: any) => {
                  //     formData.append(`addDoc_id[${index}]`, value);
                  //   });
                  // } else {
                  //   // If it's a single value, append it directly
                  //   formData.append('addDoc_id', addDocIdValue);
                  // }
                 
    // Handle array values separately ack
    const ackStatusValue = this.form.get('ack_status').value;
        formData.append('ack_status', ackStatusValue);
        const duedateack = this.form.get('duedate').value;
        formData.append('duedate',duedateack);

      // validity 
         const  validitydoc = this.form.get('validitydocument').value;
        formData.append('validitydocument', validitydoc);
        const startdate = this.form.get('startDate').value;
        formData.append('startDate', startdate);
        const enddate = this.form.get('endDate').value;
        formData.append('endDate', enddate);
     //optional reminder
     const optionalreminder = this.form.get('optionalreminder').value;
     formData.append('optionalreminder',optionalreminder);
     const noofdays = this.form.get('noofdays').value;
     formData.append('noofdays',noofdays);
     const timeperiod = this.form.get('timeperiod').value;
     formData.append('timeperiod',timeperiod);


          //track statuc 
          const track = this.form.get('trakstatus').value;
          formData.append('trakstatus',track);
          const everyday = this.form.get('everyday').value;
          formData.append('everyday',everyday);
          const timereq = this.form.get('reqtimeperiod').value;
          formData.append('reqtimeperiod',timereq);
    
    const usrIds = this.form.get('user_location_mapping_id').value;
    usrIds.forEach((id:any, index:any) => formData.append(`user_location_mapping_id[${index}]`, id));

    const docPermRightsIds = this.form.get('doc_perm_rights_id').value;
    docPermRightsIds.forEach((id:any, index:any) => formData.append(`doc_perm_rights_id[${index}]`, id));

 
    const user: any = this.session.getUser();
    const userdata = JSON.parse(user);
    const createdBy = userdata.profile.userid;
    formData.append('createdBy', createdBy);
    
    console.log(JSON.stringify(createdBy))

      //   alert(JSON.stringify(datavalues))
         console.log(JSON.stringify(datavalues))
        this.http.post(URL + '/ProvideAccessdocument/InsertProvideAccessdocumentDetails', formData)
        .subscribe(
          (response: any) => {
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: 'Data saved successfully' },
              });
              this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: 'Mail Send  successfully' },
            });
              console.log('Data saved successfully:', response);
              this.reloadComponent();
          },
          (error: any) => {
              console.error('Error saving data:', error);
          }
      );
    } else {
    
      let invalidFields = Object.keys(this.form.controls)
      .filter(key => this.form.get(key).invalid)
      .map(key => {
        switch (key) {
          case 'Entity_Master_id':
            return 'Entity Master ';
          case 'addDoc_id':
            if (this.form.get('addDoc_id').invalid) {
              return 'Add Document ID';
            }
            return null;
          // ... other cases for other field names
          default:
            return key; // Return the key itself if no user-friendly name is needed
        }
 
      });
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: 'Validation errors occurred. Please check your inputs.' },
    });
      return; 
    }
  }


  updateFormattedDate(controlName: string, value: Date) {
    if (value) {
      const formattedDate = this.formatDate(value);
      this.form.get(controlName).setValue(formattedDate, { emitEvent: false });
    }
  }
  
  formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }
}
