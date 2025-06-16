import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { NgZone} from '@angular/core';
import { Updatepermission} from 'src/app/inspectionservices.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ReportService } from 'src/app/core/services/report/report.service';
import CustomStore from 'devextreme/data/custom_store';
import { FormControl, Validators } from '@angular/forms';

import { ChangeDetectorRef,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDropDownBoxModule } from 'devextreme-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import {  FormGroup, FormBuilder} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { A } from '@angular/cdk/keycodes';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-remedy-bank',
  templateUrl: './remedy-bank.component.html',
  styleUrls: ['./remedy-bank.component.scss'],
})
export class RemedyBankComponent implements OnInit {
  selectedOption12:any[]=[];
  UnitLoc:any;
  addDoc_id:any;
  PubList:any;
  isPanelVisible1:boolean=false;
  isPanelVisible2:boolean=false;
  isPanelVisible6:boolean=false;
  selectedOption:any;
  dropdownOptions:any;
  treeBoxValue: string;
  gridDataSource: any;
  gridDataSource1: any;
  EntityName:any;
  minDate = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
  EntityName1:any;
  EntityID:any;
  UnitMaster:any;
UnitLocationID:any;
UserPermissions:any;
User:any;
userid:any;
Userinfo:any;
Userinfo1:any;
Selectedtopic:any;
selectionType: string = 'single';
Selectedunit:any;
selectedRowKeys: any[] = [];
  gridBoxValue: number[] = [3];
  isPanelVisible: boolean = false;
  checkboxForm: FormGroup;
  isFormVisible: boolean = false;
  selectedOption1:any[]=[];
  isGridBoxOpened: boolean;
  isGridBoxOpened1:boolean ;
  isUserBoxOpened:boolean;
  ispermissionBoxOpened2:boolean;
  doc_User_Access_mapping_id:any;
  UpdateForm :FormGroup;
  //gridColumns: any = ['addDoc_id','title_Doc','document_Id','docTypeName','doc_CategoryName','doc_SubCategoryName','nature_Confidentiality','natureOf_Doc_Name','authorityTypeName','keywords_tags','versionControlNo'];
  gridColumns: any[] = [
    { dataField: 'document_Id', caption: 'Document ID', width: 150 },
    { dataField: 'versionControlNo', caption: 'Version Control No', width: 150 },
    { dataField: 'addDoc_id', caption: 'Add Doc ID', width: 100  , visible: false, allowHiding: false},
    { dataField: 'title_Doc', caption: 'Title Doc', width: 100 },
    { dataField: 'docTypeName', caption: 'Document Type Name', width: 180 },
    { dataField: 'doc_CategoryName', caption: 'Document Category Name', width: 200 },
    { dataField: 'doc_SubCategoryName', caption: 'Document SubCategory Name', width: 250 },
    { dataField: 'nature_Confidentiality', caption: 'Nature of Confidentiality', width: 200 ,visible: false, allowHiding: false},
    { dataField: 'natureOf_Doc_Name', caption: 'Document Classifcation', width: 200 },
    { dataField: 'authorityTypeName', caption: 'Authority Type Name', width: 180 },
    { dataField: 'keywords_tags', caption: 'Keywords Tags', width: 150 },
  
    { dataField: 'entity_Master_Name' ,caption:'Entity Name', width: 150 },
    { dataField: 'unit_location_Master_name' ,caption:'Unit Name', width: 150 }
];
// { dataFeild: 'unit_location_Master_name', caption:'unit_location', width: 150 }
  usergridColumns: any = ['firstname', 'department_Master_name', 'entity_Master_Name','unit_location_Master_name'];
  usergridColumns1:any = ['firstname', 'department_Master_name', 'entity_Master_Name','unit_location_Master_name'];
  AddDocumentinfo:Updatepermission=new Updatepermission();
  selectedDate: Date | undefined;

  selectedValue: any;
  selectedValue1: any;
  entity_Master_id: any;
  unitmastername: any;
  unit_location_Master_id: any;
  usR_ID: any;
  doc_perm_rights_id: any;

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
  



  ngOnInit(): void {

    this.UpdateForm.get('duedate')?.valueChanges.subscribe((value: any) => {
      console.log('Due Date:', value);
      if (value instanceof Date) {
        const formattedDate = this.formatDate(value);
        this.UpdateForm.get('duedate')?.setValue(formattedDate, { emitEvent: false });
        this.UpdateForm.get('ack_status')?.setValue(true);
      }
    });

    this.UpdateForm.get('startDate')?.valueChanges.subscribe((value: any) => {
      console.log('startDate:', value);
      if (value instanceof Date) {
        const formattedDate = this.formatDate(value);
        this.UpdateForm.get('startDate')?.setValue(formattedDate, { emitEvent: false });
        this.UpdateForm.get('validitydocument')?.setValue(true);
      }
    });

    this.UpdateForm.get('endDate')?.valueChanges.subscribe((value: any) => {
      console.log('endDate:', value);
      if (value instanceof Date) {
        const formattedDate = this.formatDate(value);
        this.UpdateForm.get('endDate')?.setValue(formattedDate, { emitEvent: false });
        this.UpdateForm.get('validitydocument')?.setValue(true);
      }
    });
 
    this.UpdateForm.valueChanges.subscribe((val: any) => console.log("Form1 values:", val));
    const user: any = this.session.getUser();
    const userdata = JSON.parse(user);
    this.userid = userdata.profile.userid; 
  }
  constructor( private ref: ChangeDetectorRef,private http: HttpClient,public dialog: MatDialog,private session: SessionService,
    private fb: FormBuilder, private zone: NgZone,private router: Router,
    private formBuilder: FormBuilder) {
    //UpdateForm: FormGroup;
    this.treeBoxValue = '1_1';
    this.isGridBoxOpened1=false;
    this.isGridBoxOpened = false;
    this.isUserBoxOpened=false;
     this.ispermissionBoxOpened2=false;


    this.checkboxForm = this.formBuilder.group({
      isChecked: false
    });

    this.UpdateForm = this.formBuilder.group({
     // entityname: ['', Validators.required],
      //unitmastername:['', Validators.required],
      usrname:['', Validators.required],
      documentperm: [[], Validators.required],
      ack_status:[false],
      duedate:[],
      isChecked: [false],  // Acknowledgement checkbox
      optionalreminder:[false],  // Optional Reminder checkbox
      trakstatus: [false],  // User Track Reminder checkbox
      noofdays:[],
      timeperiod:[],
     everyday:[],
      reqtimeperiod:[],
      validitydocument:[false],
      startDate:[this.minDate],
      endDate:[]
    })

   
    this.selectOption2();
    this.selectOption3();
// for test
    this.Userinfo = {
      paginate: true,
      store: new CustomStore({
        key: 'user_location_mapping_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/editAccessdocument/getUserdeatils', { headers })
              .subscribe(res => {
                (resolve(res));
                let data=res;
                // if (Array.isArray(data) && data.length > 0) {
                //    for(let i=0;i<)
                // }
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
    // this.gridDataSource={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'doc_User_Access_mapping_id',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/editAccessdocument/GeteditAccessdocumentDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));

    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };
    this.gridDataSource1={
      paginate: true,
      store: new CustomStore({
          key: 'user_location_mapping_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/editAccessdocument/getUserdeatils', {headers})
              .subscribe(res => {
               (resolve(res));

              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
    this.EntityName1={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/ProvideAccessdocument/Getenitityogdocument/'+this.userid, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
    
    this.UpdateForm.get('duedate')?.valueChanges.subscribe((value: any) => {
      console.log('Due Date:', value);
      if (value instanceof Date) {
        const formattedDate = this.formatDate(value);
        this.UpdateForm.get('duedate')?.setValue(formattedDate, { emitEvent: false });
      }
    });
    this.UpdateForm.get('startDate')?.valueChanges.subscribe((value: any) => {
      console.log('Due Date:', value);
      if (value instanceof Date) {
        const formattedDate = this.formatDate(value);
        this.UpdateForm.get('startDate')?.setValue(formattedDate, { emitEvent: false });
      }
    });
    this.UpdateForm.get('endDate')?.valueChanges.subscribe((value: any) => {
      console.log('Due Date:', value);
      if (value instanceof Date) {
        const formattedDate = this.formatDate(value);
        this.UpdateForm.get('endDate')?.setValue(formattedDate, { emitEvent: false });
      }
    });
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
   getgriddata(selectedUnit: any) {
    console.log("Selected unit_location_Master_id : ", selectedUnit.value);
    this.unit_location_Master_id = selectedUnit.value;
    this.gridDataSource={
      paginate: true,
      store: new CustomStore({
          key: 'doc_User_Access_mapping_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/editAccessdocument/GeteditAccessdocumentDetails/' + this.unit_location_Master_id, {headers})
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
  selectOption() {
    throw new Error('Method not implemented.');
  }
  

  onCheckboxChange(event:any) {
    const value = event.checked;  // Use event.checked to get the checkbox state
    const updateForm = this.UpdateForm;
  
    if (updateForm) {
      const ackStatusControl = updateForm.get('ack_status');
  
      if (ackStatusControl) {
        if (value) {
          // If checkbox is checked, set ack_status to true
          ackStatusControl.setValue(true);
        } else {
          // If checkbox is unchecked, set ack_status to false
          ackStatusControl.setValue(false);
        }
      }
    }

    // console.log('ack_status:', event.target.checked);
    // this.isPanelVisible = event.target.checked;
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


  gridBox_displayExpr1(addDoc_id: any) {
    return addDoc_id && `${addDoc_id.title_Doc},${addDoc_id.natureOf_Doc_Name},${addDoc_id.authorityTypeName},${addDoc_id.keywords_tags}`;
  }

  gridBox_displayExpr2(usR_ID: any) {
    return usR_ID && `${usR_ID.firstname}`;
  }


  gridBox_displayEpxr(usR_ID:any){
    return usR_ID && `${usR_ID.firstname}`;
  }
  onGridBoxOptionChanged(event:any ) {
      this.isGridBoxOpened = false;
     const data:any=event.value;

      this.selectedValue=event.value;
      //alert(event.value)

     const requestUrl = `${URL}/editAccessdocument/GeteditAccessdocumentDetailsbyid/${data}`;

     this.http.get(requestUrl).subscribe(
       (data: any) => {
         console.log('Response Data:', data);
       //alert(JSON.stringify(data));



        if (Array.isArray(data) && data.length > 0) {

          const PubList = data[0];
         console.log(PubList)
          console.log('Timeline in PubList:', PubList.timeline);
          console.log('Duedate in PubList:', PubList.duedate);
          console.log('Doc_User_Access_mapping_id',PubList.doc_User_Access_mapping_id)

       let UserId=PubList.user_location_mapping_id;
      this.doc_User_Access_mapping_id = PubList.doc_User_Access_mapping_id;


    this.dropdownOptions= this.makeAsyncDataSource1(this.http,UserId,this.doc_User_Access_mapping_id);

  this.dropdownOptions.load().then((data: any) => {
    this.zone.run(() => {

//alert(UserId)
     const requestUrl = `${URL}/UserRightsPermission/GetUserRightsPermission/${UserId}/${this.doc_User_Access_mapping_id}`;

    let data1:any;
     this.http.get(requestUrl).subscribe(
       (data: any) => {

         data1=data;
        //alert(JSON.stringify(data1));
         if (Array.isArray(data1) && data1.length > 0) {

          const PubList = data1[0];


         const selectedIDs = PubList.doc_perm_rights_id.split(',').map(Number).filter((num: any) => !isNaN(num));
         this.UpdateForm.controls['documentperm'].setValue(selectedIDs);
         this.ref.detectChanges();
         this.selectedOption12 = selectedIDs;
         }
       });

       


  });
  });
      const docuseracessmappingid = PubList.doc_User_Access_mapping_id;
   
      this.Userinfo = this.makeAsyncDataSource10(this.http, PubList.doc_User_Access_mapping_id);

      this.Userinfo.load().then((data:any) => {
        console.log('Userinfo data:', data);
      }).catch((error:any) => {
        console.error('Failed to load Userinfo data:', error);
      });
      
      this.UpdateForm.controls['usrname'].setValue(PubList.user_location_mapping_id);

      this.ref.detectChanges();
   this.selectOption = PubList.user_location_mapping_id;


  //  if(PubList.validitydocument == 'true'){
  //   this.isPanelVisible6 = true;
  //   this.UpdateForm.controls['validitydocument'].setValue(true);
  //   this.UpdateForm.controls['startDate'].setValue(PubList.startDate);
  //   this.UpdateForm.controls['endDate'].setValue(PubList.endDate);
  //  }else{
  //   this.UpdateForm.controls['validitydocument'].setValue(false);
  //   this.isPanelVisible6 = false;
  //   this.UpdateForm.controls['startDate'].setValue(PubList.startDate);
  //   (this.UpdateForm.get('endDate') as FormControl).setValue(null);
  //  }
    
        // if(PubList.ack_status == 'true'){
        //   this.isPanelVisible=true;
        //   this.UpdateForm.controls['ack_status'].setValue(true);
        //   let effdate = PubList.duedate;
        //   let formattedeffDate: any = this.getFormattedDate(effdate);
        //   console.log('Formatted Date:', formattedeffDate);
        //   (this.UpdateForm.get('duedate') as FormControl).setValue(formattedeffDate);
          
        // } else {
        //   this.UpdateForm.controls['ack_status'].setValue(false);
        //   this.isPanelVisible = false;
        //   (this.UpdateForm.get('duedate') as FormControl).setValue(null);
        // }


        // if(PubList.optionalreminder == 'true'){
        //   this.isPanelVisible1=true;
        //   this.UpdateForm.controls['optionalreminder'].setValue(true);
  
        //  this.UpdateForm.controls['noofdays'].setValue(PubList.noofdays);
        //    this.UpdateForm.controls['timeperiod'].setValue(PubList.timeperiod);
       
        //   }else{
        //     this.UpdateForm.controls['optionalreminder'].setValue(false);
        //     this.isPanelVisible1 = false;
        //     this.UpdateForm.controls['noofdays'].setValue(null);
        //     this.UpdateForm.controls['timeperiod'].setValue(null);
        //   }
 
    // if(PubList.trakstatus == 'true'){
    //   this.isPanelVisible2=true;
    //   this.UpdateForm.controls['trakstatus'].setValue(true);
    //  this.UpdateForm.controls['reqtimeperiod'].setValue(PubList.reqtimeperiod);
    //  this.UpdateForm.controls['everyday'].setValue(PubList.everyday);
    //  }else{
    //   this.UpdateForm.controls['trakstatus'].setValue(false);
    //   this.isPanelVisible2 = false;
    //   this.UpdateForm.controls['reqtimeperiod'].setValue(null);
    //   this.UpdateForm.controls['everyday'].setValue(null);
    //  }

  
      } else 
      {  
      }
      (error: any) => {
        console.error('Error in HTTP request:', error);
      }

    })

    this.isFormVisible = !!this.selectedValue;

   }
   
   getFormattedDate(dateString: string): string {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
      const year = parseInt(dateParts[2], 10);
  
      const date = new Date(year, month, day);
  
      if (!isNaN(date.getTime())) {
        // Date is valid, format it as desired
        return this.formatDate(date);
      }
    }
  
    // Handle invalid date
    console.error('Invalid date:', dateString);
    return ''; // or return some default value
  }
  
  
  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

makeAsyncDataSource10(http: HttpClient, doc_User_Access_mapping_id: any){
  return new CustomStore({
    loadMode: 'raw',
    key: 'user_location_mapping_id',
    load: () => {
      const url = `${URL}/editAccessdocument/getUserdeatilsbyID/${doc_User_Access_mapping_id}`;
      return lastValueFrom(http.get(url, { headers }));
    },
  });
 }

  //  makeAsyncDataSource6(http: HttpClient, entity_Master_id: any){
  //   return new CustomStore({
  //     loadMode: 'raw',
  //     key: 'unit_location_Master_id',
  //     load: () => {
  //       const url = `${URL}/UnitLocationMaster/GetUnitLocationDetails/${entity_Master_id}`;
  //       return lastValueFrom(http.get(url, { headers }));
  //     },
  //   });
  //  }


  // makeAsyncDataSource3(http:HttpClient,usR_ID:any) {

  //   return new CustomStore({
  //     loadMode: 'raw',
  //     key: 'doc_perm_rights_id',
  //     load() {

  //       const url = `${URL}/UserRightsPermission/GetUserRightsPermission/${usR_ID}`;
  //       return lastValueFrom(http.get(url, { headers }));
  //     },
  //   });
  // }

  makeAsyncDataSource1(http: HttpClient, usR_ID: any,doc_User_Access_mapping_id:any) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_perm_rights_id', // Assign the key to each item
      load: () => {
        const url = `${URL}/UserRightsPermission/GetUserRightsPermissionDetails`;
        return lastValueFrom(http.get(url, { headers }));
      },
    });
  }


  changeTimePeriod(event:any)  {

    console.log('Selected Time period',event.value);



   }
   changereqTimePeriod(event:any)  {

    console.log('Selected Time period',event.value);



   }
  getUserData(event: any) {

  console.log("selected Type id: ", event.value);
   // this.selectedValue = event.value;
   const data:any=event.value;
//  this.unit_location_Master_id = data;

  }
    selectOption2(){
      this.http.get(URL+'/UnitMaster/GetEntityNames').subscribe((data:any)=>{
        this.EntityName=data;

      })
   }
   selectOption3(){
   

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


getdat(event: any) {
  this.isUserBoxOpened=false;
  console.log("selected Type id: ", event.value);
  this.selectedOption = event.value;

  this.usR_ID = this.selectedOption;

//alert(this.usR_ID)
//alert(this.doc_User_Access_mapping_id)
console.log ('doc_User_Access_mapping_id',this.doc_User_Access_mapping_id)
const requestUrl = `${URL}/UserRightsPermission/GetUserRightsPermission/${this.usR_ID}/${this.doc_User_Access_mapping_id}`;

let data1:any;
 this.http.get(requestUrl).subscribe(
   (data: any) => {

     data1=data;
    //alert(JSON.stringify(data1));
     if (Array.isArray(data1) && data1.length > 0) {

      const PubList = data1[0];


     const selectedIDs = PubList.doc_perm_rights_id.split(',').map(Number).filter((num: any) => !isNaN(num));
     this.UpdateForm.controls['documentperm'].setValue(selectedIDs);
     this.ref.detectChanges();
     this.selectedOption12 = selectedIDs;

   //  alert(PubList.validitydocument)
     if(PubList.validitydocument == 'true'){
      this.isPanelVisible6 = true;
      this.UpdateForm.controls['validitydocument'].setValue(true);
      this.UpdateForm.controls['startDate'].setValue(PubList.startDate);
      this.UpdateForm.controls['endDate'].setValue(PubList.endDate);
     }else{
      this.UpdateForm.controls['validitydocument'].setValue(false);
      this.isPanelVisible6 = false;
      this.UpdateForm.controls['startDate'].setValue(PubList.startDate);
      (this.UpdateForm.get('endDate') as FormControl).setValue(null);
     }
   //  alert(PubList.ack_status)
   //  alert(PubList.duedate)
     if(PubList.provideack_status == 'true'){
      this.isPanelVisible=true;
      this.UpdateForm.controls['ack_status'].setValue(true);
      this.UpdateForm.controls['duedate'].setValue(PubList.duedate);
      // let effdate = PubList.duedate;
      // let formattedeffDate: any = this.getFormattedDate(effdate);
      // console.log('Formatted Date:', formattedeffDate);
      // (this.UpdateForm.get('duedate') as FormControl).setValue(formattedeffDate);
      
    } else {
      this.UpdateForm.controls['ack_status'].setValue(false);
      this.isPanelVisible = false;
      (this.UpdateForm.get('duedate') as FormControl).setValue(null);
    }

   // alert(PubList.optionalreminder)
    if(PubList.optionalreminder == 'true'){
      this.isPanelVisible1=true;
      this.UpdateForm.controls['optionalreminder'].setValue(true);

     this.UpdateForm.controls['noofdays'].setValue(PubList.noofdays);
       this.UpdateForm.controls['timeperiod'].setValue(PubList.timeperiod);
   
      }else{
        this.UpdateForm.controls['optionalreminder'].setValue(false);
        this.isPanelVisible1 = false;
        this.UpdateForm.controls['noofdays'].setValue(null);
        this.UpdateForm.controls['timeperiod'].setValue(null);
      }

if(PubList.trakstatus == 'true'){
  this.isPanelVisible2=true;
  this.UpdateForm.controls['trakstatus'].setValue(true);
 this.UpdateForm.controls['reqtimeperiod'].setValue(PubList.reqtimeperiod);
 this.UpdateForm.controls['everyday'].setValue(PubList.everyday);
 }else{
  this.UpdateForm.controls['trakstatus'].setValue(false);
  this.isPanelVisible2 = false;
  this.UpdateForm.controls['reqtimeperiod'].setValue(null);
  this.UpdateForm.controls['everyday'].setValue(null);
 }

}
   });


}
SubmitUpdateForm(data: any = {}) {
  this.http.get<any[]>(URL + '/editAccessdocument/GeteditAccessdocumentDetailsbyid/' + this.selectedValue).subscribe(
    (response: any[]) => {
      console.log('API Response:', response); 
      if (response && response.length > 0 && response[0] && response[0].hasOwnProperty('addDoc_id')) {
        const AddDoc_id = response[0].addDoc_id; // Use lowercase 'addDoc_id'
        console.log('AddDoc_id:', AddDoc_id);

        // Call updateFormParameters with AddDoc_id
        this.updateFormParameters(this.selectedValue, AddDoc_id);

        if (!this.UpdateForm.value.documentperm) {
          alert('Invalid Field: Select Document Permissions.');
          return; // Stop further execution
        }
        if (!this.UpdateForm.value.usrname|| this.UpdateForm.value.usrname=="") {
          alert('Invalid Field: Select User.');
          return; // Stop further execution
        }

      const userId: number = parseInt(this.UpdateForm.value.usrname, 10);
      const updateData = {
        doctaskuseracknowledmentstatusmodels: this.AddDocumentinfo,
        userlocationmappingid: userId,
        DocPermId: this.UpdateForm.value.documentperm,
        permissionupdatedby :   this.userid
      };

      console.log('Update Data:', updateData);
//alert(JSON.stringify(updateData))
      this.http.put(URL + '/editAccessdocument/UpdateEeditAccessdocument', updateData, { headers }).subscribe(
        (data: any) => {
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: 'Data Updated successfully' },
        });
         // alert("Updated Data Successfully");
          this.reloadComponent();
        },
        (error: any) => {
          console.error('Error occurred during update:', error);
        }
      );
    } else {
      console.error('AddDoc_id not found or response is empty');
      console.log('Response structure:', response);
    }
  
    },
    (error: any) => {
      console.error('Error occurred during API request:', error);
    }
  );
}



reloadComponent() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
updateFormParameters(doc_User_Access_mapping_id: any, AddDoc_id: number) {
  let docid: number = parseInt(doc_User_Access_mapping_id);
   this.AddDocumentinfo.Doc_User_Access_mapping_id=docid;
  this.AddDocumentinfo.AddDoc_id = AddDoc_id;
  this.AddDocumentinfo.ack_status = this.UpdateForm.get('ack_status')?.value;
//alert(this.AddDocumentinfo.ack_status)

  const duedateValue = this.UpdateForm.value.duedate;
  const duedate = new Date(duedateValue);

  this.AddDocumentinfo.duedate = (!isNaN(duedate.getTime()) && this.AddDocumentinfo.ack_status !== "false") ? duedate.toISOString() : undefined;

  const noofdaysValue = this.UpdateForm.value.noofdays;
  this.AddDocumentinfo.noofdays = (typeof noofdaysValue === 'number' && !isNaN(noofdaysValue)) ? noofdaysValue : 0;

  this.AddDocumentinfo.trakstatus = this.UpdateForm.get('trakstatus')?.value?.toString() || null;
  this.AddDocumentinfo.optionalreminder = this.UpdateForm.get('optionalreminder')?.value?.toString() || null;
  this.AddDocumentinfo.timeperiod = this.UpdateForm.get('timeperiod')?.value?.toString() || null;
  this.AddDocumentinfo.reqtimeperiod = this.UpdateForm.get('reqtimeperiod')?.value?.toString() || null;
  this.AddDocumentinfo.everyday = this.UpdateForm.value.everyday || 0;
  this.AddDocumentinfo.ack_status = this.UpdateForm.get('ack_status')?.value?.toString() || null;

  this.AddDocumentinfo.validitydocument = this.UpdateForm.get('validitydocument')?.value?.toString()||null;
 // alert( this.AddDocumentinfo.validitydocument)
  const startDateValue = this.UpdateForm.value.startDate;
  const startDate = new Date(startDateValue);

//  this.AddDocumentinfo.startDate = (!isNaN(startDate.getTime()) &&( this.AddDocumentinfo.validitydocument !== "false"||this.AddDocumentinfo.validitydocument == "false")) ? startDate.toISOString() : undefined;
  //this.AddDocumentinfo.startDate= this.UpdateForm.value.startDate;
//alert(this.AddDocumentinfo.startDate)
  const endDateValue = this.UpdateForm.value.endDate;
  const endDate = new Date(endDateValue);
  //this.AddDocumentinfo.endDate=this.UpdateForm.value.endDate;

this.AddDocumentinfo.endDate = (!isNaN(endDate.getTime()) && this.AddDocumentinfo.validitydocument !== "false") ? endDate.toISOString() : undefined ;
//alert(this.AddDocumentinfo.endDate)
// this.AddDocumentinfo.endDate = 
//     (this.AddDocumentinfo.validitydocument === "false") 
//     ? null 
//     : (!isNaN(endDate.getTime()) ? endDate.toString() : null);
  
    console.log(JSON.stringify(this.AddDocumentinfo));
}

// updateFormParameters(doc_User_Access_mapping_id:any,AddDoc_id:number){

//   let docid: number = parseInt(doc_User_Access_mapping_id);
//   this.AddDocumentinfo.Doc_User_Access_mapping_id=docid;
//   this.AddDocumentinfo.AddDoc_id = AddDoc_id;

//  // this.AddDocumentinfo.trakstatus = this.UpdateForm.get('trakstatus')?.value.toString();
//  // this.AddDocumentinfo.ack_status = this.UpdateForm.get('ack_status')?.value.toString(); // Use boolean value directly
//  // this.AddDocumentinfo.optionalreminder = this.UpdateForm.get('optionalreminder')?.value.toString();
//   // if (this.AddDocumentinfo.duedate) {
//     //this.AddDocumentinfo.duedate = this.formatDate(this.UpdateForm.value.duedate);
//   // } else {
//   //   this.AddDocumentinfo.duedate == null;
//   // }
// //  if (this.AddDocumentinfo.noofdays) {
//    // this.AddDocumentinfo.noofdays =  parseInt(this.UpdateForm.value.noofdays) ;
//   //  } else {
//   //    this.AddDocumentinfo.noofdays == null;
//   //  }
//   this.AddDocumentinfo.ack_status = this.UpdateForm.get('ack_status')?.value.toString();
//   const duedateValue = this.UpdateForm.value.duedate;
//   const duedate = new Date(duedateValue);
  
//   if (!isNaN(duedate.getTime()) && this.AddDocumentinfo.ack_status !== "false") {
//     this.AddDocumentinfo.duedate = duedate.toISOString(); // Set duedate if valid
//   } else {
//     this.AddDocumentinfo.duedate == null; // Set duedate to null otherwise
//   }

//   // Ensure noofdays is set correctly if it exists in the form data
//   const noofdaysValue = this.UpdateForm.value.noofdays;
//   if (noofdaysValue !== undefined && noofdaysValue !== null && typeof noofdaysValue === 'number' && !isNaN(noofdaysValue)) {
//     this.AddDocumentinfo.noofdays = noofdaysValue;
//   } else {
    
//     this.AddDocumentinfo.noofdays = 0; // For example, set it to 0
//   }

//   // Set other form fields
//   this.AddDocumentinfo.trakstatus = this.UpdateForm.get('trakstatus')?.value.toString();

//   this.AddDocumentinfo.optionalreminder = this.UpdateForm.get('optionalreminder')?.value.toString();
//   // this.AddDocumentinfo.timeperiod = this.UpdateForm.value.timeperiod;
//   // this.AddDocumentinfo.reqtimeperiod = this.UpdateForm.value.reqtimeperiod;
//   // this.AddDocumentinfo.everyday = this.UpdateForm.value.everyday;
//   if (this.UpdateForm.get('timeperiod')) {
//     this.AddDocumentinfo.timeperiod = this.UpdateForm.value.timeperiod;
//   } else {
//     this.AddDocumentinfo.timeperiod == null; 
//   }
//   if (this.UpdateForm.get('reqtimeperiod')) {
//     this.AddDocumentinfo.reqtimeperiod = this.UpdateForm.value.reqtimeperiod;
//   } else {
//     this.AddDocumentinfo.reqtimeperiod == null;
//   }
//   if (this.UpdateForm.get('everyday')) {
//     this.AddDocumentinfo.everyday = this.UpdateForm.value.everyday;
//   } else {
  
//     this.AddDocumentinfo.everyday = 0;
//   }




//   console.log(JSON.stringify(this.AddDocumentinfo));
// }

  setSelectionType(type: 'SelectDocument' | 'Selectuser') {
    this.selectionType = type;
  }
  onSelectionChanged(selectedItems: any[]) {
    this.selectedRowKeys = selectedItems.map(item => item.ID);

  }
  updateFormattedDate(controlName: string, value: Date | undefined) {
    if (value instanceof Date) {
      const formattedDate = this.formatDate(value);
      this.UpdateForm.get(controlName)?.setValue(formattedDate, { emitEvent: false });
    }
  }
  selectInspection1(selectedValues: any[]) {
    this.selectedOption = selectedValues;
  }
  formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }

  onGridBoxOptionChanged1(event:any ) {}

  Cancel(){
    this.reloadComponent();
  }
}