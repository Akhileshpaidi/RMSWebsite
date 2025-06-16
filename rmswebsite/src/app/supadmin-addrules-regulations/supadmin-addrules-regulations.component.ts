import { Component, ElementRef, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel} from 'src/app/inspectionservices.service';


import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
//import { ExitNav } from 'src/app/assessment-service.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-addrules-regulations',
  templateUrl: './supadmin-addrules-regulations.component.html',
  styleUrls: ['./supadmin-addrules-regulations.component.scss']
})
export class SupadminAddrulesRegulationsComponent {
  yourform: FormGroup;
  addrules: any;
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
  erroMessage:any;
  @ViewChild('fileAttachInput') fileAttachInput!: ElementRef;
  fileAttach: File[]  = [];
  weblink:string[] =[];
  isfileAttachUploaded = false;
  maxFiles: number = 1; // default value
maxSize: number = 5 ; 
allowedFileTypes: string = '';
FileTypes: string = '';
States:any;
stateId:any;
CountryId: any;
selectedcountry:any;
userdata:any;

  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private fb: FormBuilder,
    private role: RoleService,
    public dialog: MatDialog,
    private zone: NgZone,
    private ref: ChangeDetectorRef,
    //private service:ExitNav,
  ) {
    this.yourform = this.fb.group({
  
    });}

    ngOnInit(): void {

      let user: any = this.session.getUser();
   
           this.userdata = JSON.parse(user);
        
           console.log("userid", this.userdata.profile.userid);
      

    this.addrules=this.fb.group({

      act_rule_name:['',Validators.required],
      actregulatoryid:['',Validators.required],
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
      Weblink: [''],
      file_attachment: [''],
      references: this.fb.array([])
     
   
    });

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
      // this.district={
      //   paginate: true,
      //   store: new CustomStore({
      //       key: 'Value',
      //       loadMode: 'raw',
      //       load:()=>{return new Promise((resolve, reject) => {
      //         this.http.get(URL + '/District/GetDistrictDetails', {headers})
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
  

  onMainFileSelected(event: any,referenceIndex: number) {
    const file: File = event.target.files[0]; // Assuming you only want one file for the mainFile
    if (file) {
      if (file.size > this.maxSize * 1024 * 1024) {
      //  this.mainErrorMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
        return;
      }
      // Check for allowed file types here if necessary
      this.fileAttach.push(file);
      const referenceFormGroup = this.references.controls[referenceIndex] as FormGroup;
      referenceFormGroup.get('file_attachment')?.setValue(file.name);
      console.log('Form Value:', referenceFormGroup.value);
     // this.mainErrorMessage = ''; 
     // this.isMainFileUploaded = true; // Reset any previous errors
    }
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

 
   showInvalidFieldsAlert() {
    let invalidFields = '';

    if (this.addrules.controls['act_rule_name'].invalid) {
      invalidFields += '- act_rule_name\n';
    }
    if (this.addrules.controls['actregulatoryid'].invalid) {
      invalidFields += '- act Name\n';
    }

    if (this.addrules.controls['category_of_law_ID'].invalid) {
      invalidFields += '- category_of_law\n';
    }

    if (this.addrules.controls['law_type_id'].invalid) {
      invalidFields += '- law_type\n';
    }

    if (this.addrules.controls['regulatory_authority_id'].invalid) {
      invalidFields += '- regulatory_authority\n';
    }

    if (this.addrules.controls['jurisdiction_category_id'].invalid) {
      invalidFields += '- jurisdiction_category\n';
    }

    // if (this.addrules.controls['country'].invalid) {
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

  onSubmit() {
    if (this.addrules.invalid) {
      this.showInvalidFieldsAlert();
      return;
      
    }
    if (this.addrules.valid) {
      const userId = this.userdata.profile.userid;
      const formData: FormData = new FormData();
      formData.append('act_rule_name', this.addrules.value.act_rule_name);
      formData.append('actregulatoryid', this.addrules.value.actregulatoryid);
      formData.append('act_rule_appl_des', this.addrules.value.act_rule_appl_des);
      formData.append('category_of_law_ID', this.addrules.value.category_of_law_ID);
      formData.append('law_type_id', this.addrules.value.law_type_id);
      formData.append('regulatory_authority_id', this.addrules.value.regulatory_authority_id);
      formData.append('jurisdiction_category_id', this.addrules.value.jurisdiction_category_id);
      formData.append('id', this.addrules.value.country);
      // if(this.addrules.value.id){
      // formData.append('id', this.addrules.value.country);
      // }
      if (this.addrules.value.state) {
        formData.append('State_id', this.addrules.value.state);
      }
  
      // Only append jurisdiction_location_id if it has a value
      if (this.addrules.value.jurisdiction_location_id) {
        formData.append('jurisdiction_location_id', this.addrules.value.jurisdiction_location_id);
      }
     // formData.append('State_id', this.addrules.value.state);
//formData.append('jurisdiction_location_id', this.addrules.value.jurisdiction_location_id);
      formData.append('type_bussiness', this.addrules.value.type_bussiness);
      formData.append('bussiness_operations', this.addrules.value.bussiness_operations);
      formData.append('no_of_employees', this.addrules.value.no_of_employees);
      formData.append('bussiness_investment', this.addrules.value.bussiness_investment);
      formData.append('bussiness_turnover', this.addrules.value.bussiness_turnover);
      formData.append('working_conditions', this.addrules.value.working_conditions);
      formData.append('bussiness_registration', this.addrules.value.bussiness_registration);
      formData.append('other_factor', this.addrules.value.other_factor);
      formData.append('userid',userId)
//alert(JSON.stringify(formData))
         // Handling file attachments
     if (this.fileAttach.length > 0) {
      this.fileAttach.forEach((file, index) => {
        formData.append(`fileAttach[${index}]`, file);
      });
    }

    // Handling weblink values
    const weblinkValues: string[] = [];
    const referencesArray = this.addrules.get('references').value;
    console.log(referencesArray);
    for (let i = 0; i < referencesArray.length; i++) {
      const referenceType = referencesArray[i].referenceType;
      if (referenceType === 'weblink') {
        const weblinkValue = referencesArray[i].referencetypeValue;
        console.log(weblinkValue)
        if (weblinkValue) {
          weblinkValues.push(weblinkValue);
        }
      }
    }

    // Appending weblink values to formData
    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    } 

    // Check if both fileAttach and references are provided
    // if (this.fileAttach.length === 0 && weblinkValues.length === 0) {
    //   this.erroMessage = "Please upload either a File Attach or a weblink Document file before submitting.";
    //   console.error('No main file selected');
    //   this.dialog.open(DaidailogeComponent, {
    //     width: '400px',
    //     data: { message: this.erroMessage }
    //   });
    //   return;
    // }
      console.log(formData);
  //    alert(1)
      this.http.post(URL + '/SupAdmin_ActRegulatory/InsertRuleActRegulatory', formData)
        .subscribe((response: any) => {
          this.erroMessage ="Rule and Act Regulatory created Successfully";
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          });
          // Handle response
        }, (error: HttpErrorResponse) => {
          console.error('Error status code:', error.status);
          console.error('Error details:', error.error);
        });
    }
  }
  

    onReferenceTypeChange(defaultValue:string,j:number): void {
      const selectedValue = defaultValue;
      //alert(selectedValue)
      const referenceType = this.addrules.get('referenceType').value;
      const additionalReferences = this.addrules.get('additionalReferences') as FormArray;
      additionalReferences.clear();
      if (additionalReferences.length < 4) {
        if (selectedValue === 'weblink') {
          additionalReferences.push(this.createReferenceControl('weblink'));
        
        } else if (selectedValue === 'file') {
          additionalReferences.push(this.createReferenceControl('file'));
        }
      } else {
        alert('Maximum limit reached for additional references');
      }
    }
  
    addReferenceField(): void {
 
      if(this.references.length<5){
       const referenceGroup = this.fb.group({
         referenceType: [''],
         referencetypeValue: [''],
         file_attachment: ['']
       });
       this.references.push(referenceGroup);
     }
       else{
         alert("Only 5 Add References need to be Add")
       }
       
    //this.parentRows.push({referenceType:''});
    
     }
     removeReferenceField(index:number){
       this.references.removeAt(index);
     }
    
     createReferenceControl(type: string): FormGroup {
       if (type === 'weblink') {
           return this.fb.group({
               type: [type],
               value: ['']
           });
       } else if (type === 'file') {
           return this.fb.group({
               type: [type],
               value: [''], // For storing the file name (if needed)
               fileValue: [''] // For storing the actual file (if needed)
           });
       }
   
       // Default case when type is neither 'weblink' nor 'file'
       return this.fb.group({
           type: [''],
           value: ['']
       });
   }
   get references(): FormArray {
    return this.addrules.get('references') as FormArray;
  }
  newreferences():FormGroup{
  

    return this.fb.group({
      //key:this.references().length,
      referenceType: [''],
      Weblink:[''],
      file_attachment:''
    })
     
    }
   
    onFileSelected(event: any, index: number): void {
      const fileInput = event.target;
      const additionalReferencesArray = this.addrules.get('additionalReferences') as FormArray;
      
      if (fileInput.files && fileInput.files.length > 0) {
        const referenceValueControl = additionalReferencesArray.at(index).get('fileValue');
        if (referenceValueControl) {
          referenceValueControl.setValue(fileInput.files[0].name);
          // You can also store the file itself for further processing if needed
          // referenceValueControl.setValue(fileInput.files[0]);
        }
      } else {
        // Handle case when no file is selected
      }
    }

    // getFilteredStates(event: any){
    //   let id:number;
    //   id=event.value;
    //   console.log(event.value)
    //   this.state={
    //     paginate: true,
    //     store: new CustomStore({
    //         key: 'Value',
    //         loadMode: 'raw',
    //         load:()=>{return new Promise((resolve, reject) => {
    //           this.http.get(URL + '/StateModels/GetStateDetails/'+id, {headers})
    //             .subscribe(res => {
    //              (resolve(res));
      
    //             }, (err) => {
    //               reject(err);
    //             });
    //       });
    //       },
    //     }),
    //   };
  
  
    // }
  
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
            this.http.get(URL + '/JurisdictionLocationModel/superDistrictDetails/'+this.stateId, {headers})
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
