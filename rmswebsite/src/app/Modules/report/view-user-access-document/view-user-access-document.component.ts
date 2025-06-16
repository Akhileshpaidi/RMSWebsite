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

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-view-user-access-document',
  templateUrl: './view-user-access-document.component.html',
  styleUrls: ['./view-user-access-document.component.scss']
})
export class ViewUserAccessDocumentComponent {
  Userinfo:any;
  gridDataSource:any;
  selectedOption:any;
  isUserBoxOpened1:boolean;
  user_location_mapping_id:any;
  EntityName1:any;
  UnitMaster:any;
  unit_location_Master_id: any;
  userid:any;

  usergridColumns: any = ['firstname', 'department_Master_name','entity_Master_Name','unit_location_Master_name'];
  EntityID: any;
  Selectedunit: any;
  constructor( private ref: ChangeDetectorRef,private http: HttpClient,
    private fb: FormBuilder, private zone: NgZone,private router: Router, private session:SessionService,
    private formBuilder: FormBuilder) {

    this.isUserBoxOpened1=false;


    // this.Userinfo={
    
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'user_location_mapping_id',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/userlocationmapping/GetuserDetails', {headers})
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
 getgriddatauser(selectedUnit: any){
  console.log("Selected unit_location_Master_id : ", selectedUnit.value);
  this.unit_location_Master_id = selectedUnit.value;
  this.Userinfo={
    
    paginate: true,
    store: new CustomStore({
        key: 'user_location_mapping_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/userlocationmapping/GetuserDetailsbyid/'+ this.unit_location_Master_id, {headers})
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
gridBox_displayEpxr(usR_ID:any){
  return usR_ID && `${usR_ID.firstname}`;
}
getgriddata(selectedUnit: any) {
  this.isUserBoxOpened1=false;
  console.log("Selected user_location_mapping_id : ", selectedUnit.value);
    this.user_location_mapping_id = selectedUnit.value;

  this.gridDataSource={
    paginate: true,
    store: new CustomStore({
      key: 'doc_user_permission_mapping_pkid',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ProvideAccessdocument/GetProvideAccessDetailsbyuser/' + this.user_location_mapping_id,{headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),

}


}

}