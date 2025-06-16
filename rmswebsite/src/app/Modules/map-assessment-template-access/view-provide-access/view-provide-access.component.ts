import { Component, NgZone } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDropDownBoxModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

import { lastValueFrom } from 'rxjs';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-view-provide-access',
  templateUrl: './view-provide-access.component.html',
  styleUrls: ['./view-provide-access.component.scss']
})
export class ViewProvideAccessComponent {

 Userinfo:any;
  gridDataSource:any;
  selectedOption:any;
  isUserBoxOpened1:boolean;
  user_location_mapping_id:any;
  EntityName1:any;
  UnitMaster:any;
  unit_location_Master_id: any;
  userid:any;

  usergridColumns: any = ['firstname', 'entity_Master_Name','unit_location_Master_name'];
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
            this.http.get(URL + '/ProvideAccessassessment/Getenitityogassessment/'+this.userid, {headers})
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
        this.http.get(URL + '/ProvideAccessassessment/Getlocationassessment/'+this.EntityID, {headers})
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
        key: 'userloactionmappingID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ProvideAccessassessment/GetassessuserDetailsbyid/'+ this.unit_location_Master_id, {headers})
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
      key: 'assessement_ProvideAccessID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ProvideAccessAssessment/GetAssessmentDetailsbyuser/' + this.user_location_mapping_id,{headers})
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