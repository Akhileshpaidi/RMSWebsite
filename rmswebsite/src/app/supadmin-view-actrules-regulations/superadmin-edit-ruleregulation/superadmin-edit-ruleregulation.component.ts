import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
//import { ExitNav } from 'src/app/assessment-service.service';




const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-superadmin-edit-ruleregulation',
  templateUrl: './superadmin-edit-ruleregulation.component.html',
  styleUrls: ['./superadmin-edit-ruleregulation.component.scss']
})
export class SuperadminEditRuleregulationComponent {
  act_rule_regulatory_id:any;
  UpdateForm:FormGroup;
  maxReferences: number = 5;
  userdata: any;
  files: File[] = []; 
  actname:any;
  categorylaw:any;
  naturelaw:any;
  regulatory:any;
  jurisdiction:any;
  country:any;
  state:any;
  district:any;
  stateid: any;
  selectedentity: any;
  countryid: any;
  stateId:any;
CountryId: any;
selectedcountry:any;
global_rule_id:any;
replacedFiles:any=[];
  erroMessage: any;


  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,public dialog:MatDialog,
    private ref: ChangeDetectorRef,
    private session: SessionService,
     private zone: NgZone,
    private formBuilder: FormBuilder,

){
  this.UpdateForm = this.formBuilder.group({
    actregulatoryid:['',Validators.required] ,
    act_rule_name:['',Validators.required],
    act_rule_appl_des:[''],
    category_of_law_ID:['',Validators.required],
    law_type_id:['',Validators.required],
    regulatory_authority_id:['',Validators.required],
    jurisdiction_category_id:['',Validators.required],
    country:[],
    state:[],
    jurisdiction_location_id:[],
    type_bussiness:['N/A'],
    bussiness_operations:['N/A'],
    no_of_employees:['N/A'],
    bussiness_investment:['N/A'],
    bussiness_turnover:['N/A'],
    working_conditions:['N/A'],
    bussiness_registration:['N/A'],
    other_factor:['N/A'],
    references: this.formBuilder.array([])
  })
}
ngOnInit(): void {
this.route.queryParams.subscribe(queryParams => {
  this.act_rule_regulatory_id = queryParams['act_rule_regulatory_id']; // Make sure this key matches the one in editAct
  console.log(queryParams['act_rule_regulatory_id']);
  //alert(queryParams['actregulatoryid']);
  this.retrieveFiles(this.act_rule_regulatory_id);
});


let user: any = this.session.getUser();
 
this.userdata = JSON.parse(user);

console.log("userid", this.userdata.profile.userid);

this.actname={
  paginate: true,
  store: new CustomStore({
      key: 'actregulatoryid',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SupAdmin_ActRegulatory/GetActregulatory', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
 };
 this.categorylaw={
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SupAdminCatageorylaw/GetCatageorylaws', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
 };
 this.naturelaw={
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SupAdminLawType/GetLawTypeDetails', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
 };
this.regulatory={
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SupAdmin_RegulatoryAuthority/GetRegulatoryAuthorityDetails', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
 };
 
 this.jurisdiction={
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SupAdmin_Jurisdiction/GetJurisdiction', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
 };

  


  this.country={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/Country/GetCountries', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };


  // this.States={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/States/GetStates', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };
}
retrieveFiles(act_rule_regulatory_id: any): void {
  this.http.get(`${BASE_URL}/SupAdmin_ActRegulatory/superadminGetactruleregulationsDetailsnyid/${act_rule_regulatory_id}`)
  .subscribe((data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      //alert(JSON.stringify(data))
      console.log(data)
  
      const pubList = data[0];
    //  alert(JSON.stringify(pubList.rulefiles))
      this.UpdateForm.controls['actregulatoryid'].setValue(pubList.regid);
      this.UpdateForm.controls['act_rule_name'].setValue(pubList.actrulename);
      this.UpdateForm.controls['act_rule_appl_des'].setValue(pubList.actruledesc);
      this.UpdateForm.controls['category_of_law_ID'].setValue(pubList.catid);
      this.UpdateForm.controls['law_type_id'].setValue(pubList.lawid);
      this.UpdateForm.controls['regulatory_authority_id'].setValue(pubList.authid);
      this.UpdateForm.controls['jurisdiction_category_id'].setValue(pubList.judcatid);
      this.UpdateForm.controls['country'].setValue(pubList.cntryid);
      this.UpdateForm.controls['state'].setValue(pubList.sid);
      this.UpdateForm.controls['jurisdiction_location_id'].setValue(pubList.did);
      this.UpdateForm.controls['type_bussiness'].setValue(pubList.businesstype);
      this.UpdateForm.controls['bussiness_operations'].setValue(pubList.operations);
      this.UpdateForm.controls['no_of_employees'].setValue(pubList.noofemployees);
      this.UpdateForm.controls['bussiness_investment'].setValue(pubList.investment);
      this.UpdateForm.controls['bussiness_turnover'].setValue(pubList.turnover);
      this.UpdateForm.controls['working_conditions'].setValue(pubList.workconditions);
      this.UpdateForm.controls['bussiness_registration'].setValue(pubList.registration);
      this.UpdateForm.controls['other_factor'].setValue(pubList.other);
       this.global_rule_id = pubList.global_rule_id;
       
      

    // Populate references form array


    if (Array.isArray(pubList.rulefiles)) {
      pubList.rulefiles.forEach((file: any) => {
        this.addReferenceField(file);
      });
    }
  } else {
    // Handle empty response or other cases
  }
}, error => {
  console.error('Error occurred while retrieving data:', error);
});


}
get references(): FormArray {
  return this.UpdateForm.get('references') as FormArray;
  }
  
  addReferenceField(file?: any): void {
    if (this.references.length < this.maxReferences) {
      const referenceGroup = this.formBuilder.group({
        act_rule_regulatory_file_id: [file ? file.act_rule_regulatory_file_id : null],
        referenceType: [file ? (file.filecategory === 'Weblink' ? 'weblink' : 'file') : ''],
        referencetypeValue: [file && file.filecategory === 'Weblink' ? file.filepath : ''],
        file_attachment: [file && file.filecategory === 'FileAttach' ? file.filename : ''],
      isNew: [!file] 
      });
  
      this.references.push(referenceGroup);
    } else {
      alert('You can add up to 5 references only.');
    }
  }
  
  
  
  removeReferenceField(index: number,act_rule_regulatory_file_id:any): void {
    if(act_rule_regulatory_file_id == 0){
      this.references.removeAt(index);
    }
    if (act_rule_regulatory_file_id !== 0) {
      // If bare_act_id is not 0, make an HTTP POST request to remove the file
      this.http.post(`${BASE_URL}/SupAdmin_ActRegulatory/removesuprulesandregulatory/${act_rule_regulatory_file_id}`, {})
        .subscribe(
          (data: any) => {
            // Handle the response data if needed
            this.references.removeAt(index);
            console.log('File removed successfully:', data);
          },
          (error) => {
            // Handle errors that occur during the HTTP request
            console.error('Error occurred while removing file:', error);
          }
        );
    }  else {
    //  this.references.removeAt(index);
    }
    //this.references.removeAt(index);
    }
  
  
  onReferenceTypeChange(type: string, index: number): void {
  const control = this.references.at(index);
  
  if (type === 'weblink') {
    control.get('referencetypeValue')?.setValidators(Validators.required);
    control.get('filepath')?.clearValidators();
  } else if (type === 'file') {
    control.get('referencetypeValue')?.clearValidators();
    control.get('filepath')?.setValidators(Validators.required);
  }
  
  control.get('referencetypeValue')?.updateValueAndValidity();
  control.get('filepath')?.updateValueAndValidity();
  }
  
  onMainFileSelected(event: Event, index: number): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    this.references.at(index).get('file_attachment')?.setValue(file.name);
    this.files[index] = file; // Store the file object
    if(this.references.at(index).get('act_rule_regulatory_file_id')?.value!=0){
      this.replacedFiles.push(this.references.at(index).get('act_rule_regulatory_file_id')?.value)
    }
  
  }
  }

  onweblink(event:any,index:number){

    this.replacedFiles.push(this.references.at(index).get('act_rule_regulatory_file_id')?.value)
  }
  showInvalidFieldsAlert() {
    let invalidFields = '';

    if (this.UpdateForm.controls['act_rule_name'].invalid) {
      invalidFields += '- act_rule_name\n';
    }
    if (this.UpdateForm.controls['actregulatoryid'].invalid) {
      invalidFields += '- act Name\n';
    }

    if (this.UpdateForm.controls['category_of_law_ID'].invalid) {
      invalidFields += '- category_of_law\n';
    }

    if (this.UpdateForm.controls['law_type_id'].invalid) {
      invalidFields += '- law_type\n';
    }

    if (this.UpdateForm.controls['regulatory_authority_id'].invalid) {
      invalidFields += '- regulatory_authority\n';
    }

    if (this.UpdateForm.controls['jurisdiction_category_id'].invalid) {
      invalidFields += '- jurisdiction_category\n';
    }

    // if (this.UpdateForm.controls['country'].invalid) {
    //   invalidFields += '- country\n';
    // }

    // if (this.addrules.controls['state'].invalid) {
    //   invalidFields += '- state\n';
    // }

    // if (this.addrules.controls['jurisdiction_location_id'].invalid) {
    //   invalidFields += '-jurisdiction_location\n';
    // }

    // if (this.addrules.controls['type_bussiness'].invalid) {
    //   invalidFields += '- bussiness type\n';
    // }

    // if (this.addrules.controls['bussiness_operations'].invalid) {
    //   invalidFields += '-bussiness_operations\n';
    // }
    
    // if (this.addrules.controls['no_of_employees'].invalid) {
    //   invalidFields += '-no_of_employees\n';
    // }
    
    // if (this.addrules.controls['bussiness_investment'].invalid) {
    //   invalidFields += '-bussiness_investment\n';
    // }
    
    // if (this.addrules.controls['bussiness_turnover'].invalid) {
    //   invalidFields += '-bussiness_turnover\n';
    // }
    
    // if (this.addrules.controls['working_conditions'].invalid) {
    //   invalidFields += '-working_conditions\n';
    // }
    
    // if (this.addrules.controls['bussiness_registration'].invalid) {
    //   invalidFields += '-bussiness_registration\n';
    // }
    
  
    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields:\n${invalidFields}`,
        },
      });
    }

   }
  SubmitUpdateForm(): void {

    if (this.UpdateForm.invalid) {
      this.showInvalidFieldsAlert();
      return;

    }
    if (this.UpdateForm.valid) {
      console.log(this.UpdateForm.value);
      //alert(JSON.stringify(this.UpdateForm.value));
  
      const formData = new FormData();
      formData.append('actregulatoryid', this.UpdateForm.value.actregulatoryid);
      formData.append('act_rule_name', this.UpdateForm.value.act_rule_name);
      formData.append('act_rule_appl_des', this.UpdateForm.value.act_rule_appl_des);
      formData.append('category_of_law_ID', this.UpdateForm.value.category_of_law_ID);
      formData.append('law_type_id', this.UpdateForm.value.law_type_id);
      formData.append('regulatory_authority_id', this.UpdateForm.value.regulatory_authority_id);
      formData.append('jurisdiction_category_id', this.UpdateForm.value.jurisdiction_category_id);
      formData.append('id', this.UpdateForm.value.country);
      // if(this.UpdateForm.value.id){
      // formData.append('id', this.UpdateForm.value.country);
      // }
      if (this.UpdateForm.value.state) {
      formData.append('State_id', this.UpdateForm.value.state);
      }
      if (this.UpdateForm.value.jurisdiction_location_id) {
      formData.append('jurisdiction_location_id', this.UpdateForm.value.jurisdiction_location_id);
      }
      formData.append('type_bussiness', this.UpdateForm.value.type_bussiness);
      formData.append('bussiness_operations', this.UpdateForm.value.bussiness_operations);
      formData.append('no_of_employees', this.UpdateForm.value.no_of_employees);
      formData.append('bussiness_investment', this.UpdateForm.value.bussiness_investment);
      formData.append('bussiness_turnover', this.UpdateForm.value.bussiness_turnover);
      formData.append('working_conditions', this.UpdateForm.value.working_conditions);
      formData.append('bussiness_registration', this.UpdateForm.value.bussiness_registration);
      formData.append('other_factor', this.UpdateForm.value.other_factor);
      formData.append('updatedby', this.userdata.profile.userid);
      formData.append('global_rule_id', this.global_rule_id); 
  
      const weblinkValues: string[] = [];
      const referencesArray = this.references as FormArray;
      console.log(referencesArray);
  
      referencesArray.controls.forEach((control, index) => {
        const referenceType = control.get('referenceType')?.value;
        const referencetypeValue = control.get('referencetypeValue')?.value;
  
        if (referenceType === 'weblink' && referencetypeValue) {
          weblinkValues.push(referencetypeValue);
        } else if (referenceType === 'file') {
          const file = this.files[index];
          if (file) {
            formData.append(`fileAttach[${index}]`, file);
          }
        }
      });
  
      if (weblinkValues.length > 0) {
        formData.append('weblink', weblinkValues.join(';'));
      }
  
     // alert('About to submit form data to API. Confirm?');
  
      this.http.post(`${BASE_URL}/SupAdmin_ActRegulatory/superadminUpdateActRuleRegulatory`, formData, {
        params: new HttpParams().set('act_rule_regulatory_id', this.act_rule_regulatory_id)
      })
      .subscribe(response => {
        this.replacedFiles.forEach((act_rule_regulatory_file_id:any)=>{
          this.http.post(`${BASE_URL}/SupAdmin_ActRegulatory/removesuprulesandregulatory/${act_rule_regulatory_file_id}`, {})
          .subscribe(
            (data: any) => {
              console.log('File removed successfully:', data);
            },
            (error) => {
              console.error('Error occurred while removing file:', error);
            }
          );});
        console.log('Response:', response);

        this.erroMessage ="Rule/Regulations updated Successfully";
        const dialogRef = this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: { message: this.erroMessage }
        });
       // alert('Rule/Regulation Updated  successfully!');
        this.router.navigate(['/dashboard/SuperAd_Common_Entity/supadmin-view-actrules-regulations']);
      }, error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      });
    } else {
      alert('Form is invalid. Please check the fields and try again.');
    }
  }
  Cancel(): void {
    // Implement cancel functionality if needed
    this.router.navigate(['/dashboard/SuperAd_Common_Entity/supadmin-view-actrules-regulations']);
  }
  Back(){
    this.router.navigate(['/dashboard/SuperAd_Common_Entity/supadmin-view-actrules-regulations']);
  }
  getdistrict(event:any){
    console.log("selected Type id: ", event.value);
    this.stateId = event.value;
    this.selectedentity=null;
    this.district={
      paginate: true,
      store: new CustomStore({
        key: 'jurisdiction_location_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/JurisdictionLocationModel/GetDistrictDetails/'+this.stateId, {headers})
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
  getstate(event:any) {
    console.log("selected Type id: ", event.value);
    // alert(event.value)
     this.CountryId = event.value;
     this.selectedcountry=null;
     this.state={
       paginate: true,
       store: new CustomStore({
         key: 'id',
         loadMode: 'raw',
         load:()=>{return new Promise((resolve, reject) => {
           this.http.get(URL + '/StateModels/GetStateDetails/'+this.CountryId, {headers})
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

}
