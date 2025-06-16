import { Component, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ReportService } from 'src/app/core/services/report/report.service';
import CustomStore from 'devextreme/data/custom_store';
import {  HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDropDownBoxModule } from 'devextreme-angular';
import { FormBuilder, FormControl, FormGroup,Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { removepermission} from 'src/app/inspectionservices.service';
import { lastValueFrom } from 'rxjs';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-remove-user-access',
  templateUrl: './remove-user-access.component.html',
  styleUrls: ['./remove-user-access.component.scss']
})
export class RemoveUserAccessComponent {

  public tmperiod:any[]=[
    {id:1,name:' Allow User to use the Assessment Template'},
    {id:2,name:'Allow User to make edit in the Assessment Template'},
  ];
  UpdateForm: FormGroup;
  treeBoxValue: string;
  gridDataSource: any;
  EntityName:any;
  EntityID:any;
  Selectedunit:any;
  EntityName1:any;
  userid:any
  UnitMaster:any;
UnitLocationID:any;
Userinfo:any;
Selectedtopic:any;
  //myForm: FormGroup;
  gridBoxValue: any;
  isPanelVisible: boolean = false;
  checkboxForm: FormGroup;
  isGridBoxOpened: boolean;
  isUserBoxOpened:boolean;
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
  usergridColumns: any = ['firstname', 'department_Master_name', 'entity_Master_Name','unit_location_Master_name'];
  selectedDate: Date | undefined;
  AddDocumentinfo:removepermission=new removepermission();
  entity_Master_id: any;
  selectedValue: any;
  User: any;
  UnitLoc: any;
  unit_location_Master_id: any;
  selectedOption:any[]=[];


  constructor(private httpClient: HttpClient, private ref: ChangeDetectorRef,private http: HttpClient, private session:SessionService,
    private fb: FormBuilder, private zone: NgZone,private router: Router,
    private formBuilder: FormBuilder) {
   
    this.treeBoxValue = '1_1';
    
    this.isGridBoxOpened = false;
    this.isUserBoxOpened=false;

    this.checkboxForm = this.formBuilder.group({
      isChecked: false
    });
    // this.myForm = this.formBuilder.group({
    //   selectBoxValue: [null, Validators.required] // 'selectBoxValue' should match the ngModel or formControlName you use in your template
    // });
    this.UpdateForm = this.formBuilder.group({
     // entityname: ['', Validators.required],
    //  unitmastername:['', Validators.required],
      usrname:['', Validators.required],
      
    })

  
    // this.gridDataSource={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'doc_User_Access_mapping_id',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/removeAccessdocument/GetremoveAccessdocumentDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };
    // this.Userinfo={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'usR_ID',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/UserMaster/GetuserMasterDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };
    const user: any = this.session.getUser();
    const userdata = JSON.parse(user);
    this.userid = userdata.profile.userid; 

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
            this.http.get(URL + '/removeAccessdocument/GetremoveAccessdocumentDetailsbyid/' + this.unit_location_Master_id, {headers})
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

 

  gridBox_displayExpr(addDoc_id:any) {
    return addDoc_id && `${addDoc_id.title_Doc},${addDoc_id.natureOf_Doc_Name},${addDoc_id.authorityTypeName},${addDoc_id.keywords_tags}`;
  }

  gridBox_displayEpxr1(usR_ID:any){
    return usR_ID && `${usR_ID.firstname}`;
  }
  onGridBoxOptionChanged(event:any) {


    const Id=event.value;

    this.Userinfo = {
      paginate: true,
      store: new CustomStore({
        key: 'user_location_mapping_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/removeAccessdocument/getUserdeatilsbyID/' + Id, { headers })
              .subscribe(res => {
                (resolve(res));
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };








    this.isGridBoxOpened = false;
    // console.log("selected Type id: ", event.value);
    const data:any=event.value;
  
     this.selectedValue=event.value; 
    // this.retrieveFiles( this.selectedValue);

    const requestUrl = `${URL}/editAccessdocument/GeteditAccessdocumentDetailsbyid/${data}`;

    this.http.get(requestUrl).subscribe(
      (data: any) => {
        //console.log('Response Data:', data);
       //alert(JSON.stringify(data));

       if (Array.isArray(data) && data.length > 0) { 

         const PubList = data[0];
         
         let UserId=PubList.user_location_mapping_id;

         const docuseracessmappingid = PubList.doc_User_Access_mapping_id;
      this.User= this.makeAsyncDataSource10(this.http,docuseracessmappingid);
      this.User.load().then((data:any)=>{
        this.zone.run(() => {
          this.UpdateForm.controls['usrname'].setValue(PubList.usR_ID);
          this.ref.detectChanges();
        });
      });
    
    //   let UnitLocId=PubList.unit_location_Master_id;
    //   this. User= this.makeAsyncDataSource2(this.http,UnitLocId);       
    //   this.User.load().then((data: any) => {    
    //     this.zone.run(() => {
    //     this.UpdateForm.controls['usrname'].setValue(PubList.usR_ID);
    //     this.ref.detectChanges();
    //   });
    //  });

    //   let typeid=PubList.entity_Master_id;
    //   this.UnitLoc = this.makeAsyncDataSource6(this.http,typeid);       
    //   this.UnitLoc.load().then((data: any) => {    
    //     this.zone.run(() => {
    //     this.UpdateForm.controls['unitmastername'].setValue(PubList.unit_location_Master_id);
    //     this.ref.detectChanges();
    //   });
    //  });

     
    //   this.UpdateForm.controls['entityname'].setValue(PubList.entity_Master_id);
    //   this.selectOption1({ value: PubList.entity_Master_id });
    } else {
      // Data is either not an array or it's empty
      // Handle this case as needed
    }
    

    (error: any) => {
      console.error('Error in HTTP request:', error);
    }

  })
  
  }
  // makeAsyncDataSource6(http: HttpClient, entity_Master_id: any){
  //   return new CustomStore({
  //     loadMode: 'raw',
  //     key: 'unit_location_Master_id',
  //     load: () => {
  //       const url = `${URL}/UnitLocationMaster/GetUnitLocationDetails/${entity_Master_id}`;
  //       return lastValueFrom(http.get(url, { headers }));
  //     },
  //   });
  //  }
    
  //  makeAsyncDataSource(http:HttpClient,entity_Master_id:any) {
  //     return new CustomStore({
  //       loadMode: 'raw',
  //       key: 'entity_Master_id',
  //       load: () => {
  //       const url = `${URL}/UnitMaster/GetEntityNames`;
  //         return lastValueFrom(http.get(url, { headers }));
  //       },
  //     });
  // }
  // makeAsyncDataSource2(http: HttpClient, unit_location_Master_id: any) {
  
  //   return new CustomStore({
  //     loadMode: 'raw',
  //     key: 'usR_ID',
  //     load() {
  //       const url = `${URL}/userlocationmapping/GetuserlocationmappingDetails/${unit_location_Master_id}`;
  //       return lastValueFrom(http.get(url, { headers }));
  //     },
  //   });
  // }
  makeAsyncDataSource10(http: HttpClient, doc_User_Access_mapping_id: any){
    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_User_Access_mapping_id',
      load: () => {
        const url = `${URL}/removeAccessdocument/getUserdeatilsbyID/${doc_User_Access_mapping_id}`;
        return lastValueFrom(http.get(url, { headers }));
      },
    });
   }
  onCheckboxChange() {
    const isChecked = this.checkboxForm.get('isChecked')!.value;
    console.log('Checkbox checked:', isChecked);
  }
  onClick(){
    
  }
  Cancel(){
    this.reloadComponent();

//    this.router.navigate(['/report/remove-user-access']);
  }
 
   

SubmitUpdateForm(data:any={})
{
  
  this.updateFormParameters(this.selectedValue);
  
  if (!this.UpdateForm.value.usrname || this.UpdateForm.value.usrname =="" ) {
    alert('Invalid Field: Select  User To Remove Permissions.');
    return; // Stop further execution
  }

  const userId: number = parseInt(this.UpdateForm.value.usrname, 10);

  const updateData = {
    doctaskuseracknowledmentstatusmodels:this.AddDocumentinfo,
    userlocationmappingid: userId,
    docPermId: this.UpdateForm.value.documentperm
  };
 // alert(JSON.stringify(updateData));
 // console.log(JSON.stringify(updateData.userId))
  this.http.put(URL+'/RemoveAccessdocument/UpdateRemoveAccessdocument',updateData,{headers}).subscribe((data:any)=>{
    alert ("Removed Access  Successfully");
    this.reloadComponent();
  },
  (error: any) => {
    console.error('', error);
  }
);
 this.selectedValue=null;
}
reloadComponent() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
updateFormParameters(AddDocId:any){

  let docid: number = parseInt(AddDocId);
  this.AddDocumentinfo.Doc_User_Access_mapping_id=docid;


  //this.AddDocumentinfo.Entity_Master_id=this.UpdateForm.value.entityname;   
  //this.AddDocumentinfo.Unit_location_Master_id=this.UpdateForm.value.unitmastername;
 // this.AddDocumentinfo.USR_ID=this.UpdateForm.value.usrname;
  console.log(JSON.stringify(this.AddDocumentinfo))
} 
}
