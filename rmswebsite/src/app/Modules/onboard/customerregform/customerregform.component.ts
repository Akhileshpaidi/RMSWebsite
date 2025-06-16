import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { DxFormModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import CustomStore from 'devextreme/data/custom_store';
import { EncryptionService } from 'src/app/core/encryption.service';


import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-customerregform',
  templateUrl: './customerregform.component.html',
  styleUrls: ['./customerregform.component.scss']
})

export class CustomerregformComponent implements OnInit{
  customerregform:FormGroup;
  country: any;
  selectedcountry: any;
  state: any;
  CountryId: any;
  countryds:any;
  stateds:any=[];
  @ViewChild('mainFileInput') mainFileInput!: ElementRef;
  FileTypes: string = '';
  next=false;
  next1=true;
  next12=false;
  next11=true;
  allvisible=true;
  gstyes=false;
  bill_stateds:any;
  bill_countryds:any;
  gstcertificate:any;
  forminvalidfields: any;
erroMessage: any;

  constructor(private http: HttpClient,
    private ref: ChangeDetectorRef,
    private fb:FormBuilder,
    private router:Router,
   private session: SessionService,
   private encrypt: EncryptionService,
   public dialog: MatDialog,
  

    ){
      this.customerregform=this.fb.group({
        first_name:['',Validators.required],
        last_name:['',Validators.required],
        mobileno:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
        emailid:['',[Validators.required,Validators.email]],
        entity_org_name:['',Validators.required],
        gst_registered:['',Validators.required],
        entity_gst_number:[this.gstyes?Validators.required : ''],
        entity_gst_org_name:[this.gstyes?Validators.required :''],
        entity_gst_Address:[this.gstyes?Validators.required : ''],
        supply_country:['',Validators.required],
        supply_state:['',Validators.required],

        billing_org_name:['',Validators.required],
        billing_gst_number:['',Validators.required],
        billing_Address:['',Validators.required],
        billing_state:['',Validators.required],
        billing_country:['',Validators.required],
        sameentitydetails:'',
        sameuserdetails:'',
        grp_admin_first_name:['',Validators.required],
        grp_admin_last_name:['',Validators.required],
        grp_admin_mobileno:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
        grp_admin_emailid:['',[Validators.required,Validators.email]],
      });

     
      
     
    }
    // setGSTFieldValidators() {
    //   const gstRegisteredControl = this.customerregform.get('gst_registered');
    //   const entityGSTNumberControl = this.customerregform.get('entity_gst_number');
    //   const entityGSTOrgNameControl = this.customerregform.get('entity_gst_org_name');
    //   const entityGSTAddressControl = this.customerregform.get('entity_gst_Address');
    
    //   if (gstRegisteredControl && entityGSTNumberControl && entityGSTOrgNameControl && entityGSTAddressControl) {
    //     gstRegisteredControl.valueChanges.subscribe((value) => {
    //       if (value === '0') { // GST is registered
    //         entityGSTNumberControl.setValidators([Validators.required]);
    //         entityGSTOrgNameControl.setValidators([Validators.required]);
    //         entityGSTAddressControl.setValidators([Validators.required]);
    //       } else { // GST is not registered
    //         entityGSTNumberControl.clearValidators();
    //         entityGSTOrgNameControl.clearValidators();
    //         entityGSTAddressControl.clearValidators();
    //       }
    
    //       entityGSTNumberControl.updateValueAndValidity();
    //       entityGSTOrgNameControl.updateValueAndValidity();
    //       entityGSTAddressControl.updateValueAndValidity();
    //     });
    
    //     // Initialize the validators based on the initial value
    //     const initialValue = gstRegisteredControl.value;
    //     if (initialValue === '0') {
    //       entityGSTNumberControl.setValidators([Validators.required]);
    //       entityGSTOrgNameControl.setValidators([Validators.required]);
    //       entityGSTAddressControl.setValidators([Validators.required]);
    //     } else {
    //       entityGSTNumberControl.clearValidators();
    //       entityGSTOrgNameControl.clearValidators();
    //       entityGSTAddressControl.clearValidators();
    //     }
    
    //     entityGSTNumberControl.updateValueAndValidity();
    //     entityGSTOrgNameControl.updateValueAndValidity();
    //     entityGSTAddressControl.updateValueAndValidity();
    //   }
    // }
    
    setGSTFieldValidators() {
      const gstRegisteredControl = this.customerregform.get('gst_registered');
      const entityGSTNumberControl = this.customerregform.get('entity_gst_number');
      const entityGSTOrgNameControl = this.customerregform.get('entity_gst_org_name');
      const entityGSTAddressControl = this.customerregform.get('entity_gst_Address');
    
      // // Subscribe to value changes for gst_registered control
      // gstRegisteredControl?.valueChanges.subscribe((value) => {
      //   if (value === '0') {  // GST registered
      //     entityGSTNumberControl?.setValidators([Validators.required]);
      //     entityGSTOrgNameControl?.setValidators([Validators.required]);
      //     entityGSTAddressControl?.setValidators([Validators.required]);
      //   } else {  // GST not registered, clear validators
      //     entityGSTNumberControl?.clearValidators();
      //     entityGSTOrgNameControl?.clearValidators();
      //     entityGSTAddressControl?.clearValidators();
      //   }
    
      //   // Update the validity of the controls after setting/clearing validators
      //   entityGSTNumberControl?.updateValueAndValidity();
      //   entityGSTOrgNameControl?.updateValueAndValidity();
      //   entityGSTAddressControl?.updateValueAndValidity();
      // });
    
      // // Initialize the validators based on the current value of gst_registered
      // if (gstRegisteredControl?.value === '0') {
      //   entityGSTNumberControl?.setValidators([Validators.required]);
      //   entityGSTOrgNameControl?.setValidators([Validators.required]);
      //   entityGSTAddressControl?.setValidators([Validators.required]);
      // } else {
      //   entityGSTNumberControl?.clearValidators();
      //   entityGSTOrgNameControl?.clearValidators();
      //   entityGSTAddressControl?.clearValidators();
      // }
    
      // // Update validity for controls after initialization
      // entityGSTNumberControl?.updateValueAndValidity();
      // entityGSTOrgNameControl?.updateValueAndValidity();
      // entityGSTAddressControl?.updateValueAndValidity();
      if (this.gstyes) {
        (this.customerregform.get('entity_gst_number') as FormControl).setValidators([Validators.required]);
        (this.customerregform.get('entity_gst_org_name') as FormControl).setValidators([Validators.required]);
        (this.customerregform.get('entity_gst_Address') as FormControl).setValidators([Validators.required]);
        

      } else {
        (this.customerregform.get('entity_gst_number') as FormControl).clearValidators();
        (this.customerregform.get('entity_gst_org_name') as FormControl).clearValidators();
        (this.customerregform.get('entity_gst_Address') as FormControl).clearValidators();
       
      }
  
      (this.customerregform.get('entity_gst_number') as FormControl).updateValueAndValidity();
      (this.customerregform.get('entity_gst_org_name') as FormControl).updateValueAndValidity();
      (this.customerregform.get('entity_gst_Address') as FormControl).updateValueAndValidity();



    }
    
    gstchange(event:any){
      let gstevent=event.value;
      if(gstevent==0){
      this.gstyes=true;
      this.setGSTFieldValidators();
      }
    else
    this.gstyes=false;


    }
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.gstcertificate=file;
    }
    ngOnInit(): void {
      
      this.http.get<any[]>(URL + '/Country/GetCountries', { headers })
      .subscribe({
        next: (res) => {
          this.countryds= res; // Assign the response to roles
          console.log('Countries API Response:', res);
        },
        error: (err) => {
          console.error('Error fetching modules:', err);
        }
      });
  
      this.http.get<any[]>(URL + '/Country/GetCountries', { headers })
      .subscribe({
        next: (res) => {
          this.bill_countryds= res; // Assign the response to roles
          console.log('Countries API Response:', res);
        },
        error: (err) => {
          console.error('Error fetching modules:', err);
        }
      });
      
      this.setGSTFieldValidators();
          
    }
    sameentity(event:any){
      let sameentitycheck=event.target.checked
      if(sameentitycheck==true){
        this.customerregform.controls['billing_org_name'].setValue(this.customerregform.value.entity_gst_org_name);
        this.customerregform.controls['billing_gst_number'].setValue(this.customerregform.value.entity_gst_number);
        this.customerregform.controls['billing_Address'].setValue(this.customerregform.value.entity_gst_Address);
        this.customerregform.controls['billing_country'].setValue(this.customerregform.value.supply_country);

        this.customerregform.controls['billing_state'].setValue(this.customerregform.value.supply_state);
this.getbillstate({'value':this.customerregform.value.supply_country});
       
      }
    }
    sameuser(event:any){
      let sameusercheck=event.target.checked;
      if(sameusercheck==true){
        this.customerregform.controls['grp_admin_first_name'].setValue(this.customerregform.value.first_name);
        this.customerregform.controls['grp_admin_last_name'].setValue(this.customerregform.value.last_name);
        this.customerregform.controls['grp_admin_mobileno'].setValue(this.customerregform.value.mobileno);
        this.customerregform.controls['grp_admin_emailid'].setValue(this.customerregform.value.emailid);

      }
    }
    Next() {
 
        // alert((this.customerregform.value.billing_org_name));
        // alert((this.customerregform.value.billing_Address));


        // console.log(this.customerregform.value);
        this.next=true;
     this.next1=false;
     this.next11=false;
     this.next12=true;
     this.allvisible=true;
    }
    Submit(){
    // 
    this.forminvalidfields = [];
if(this.customerregform.invalid){
  let invalidFields = Object.keys(this.customerregform.controls)
  invalidFields=invalidFields.filter((item:string)=>item.trim()!="");
this.forminvalidfields=invalidFields;
}
// // Loop through each control in the form
// let invalidFields = Object.keys(this.customerregform.controls).filter((field: string) => {
//   const control = this.customerregform.get(field);
//   return control && control.invalid && control.touched; // Check if the control is invalid and touched
// });

// this.forminvalidfields = invalidFields;

if (this.forminvalidfields.length > 0) {
  this.erroMessage = `Please provide valid information for the following fields: ${this.forminvalidfields.join(', ')}`;

  // Open the dialog with the error message
  this.dialog.open(DaidailogeComponent, {
    width: '900px',
    data: { message: this.erroMessage }
  });
} 

    else{

      let formdata:any;
      formdata={
        FirstName:this.customerregform.value.first_name,
        LastName:this.customerregform.value.last_name,
        MobileNumber:this.customerregform.value.mobileno,
        EmailID:this.customerregform.value.emailid,
        OrganizationName:this.customerregform.value.entity_org_name,
        GSTRegistered:this.customerregform.value.gst_registered,
        GSTNumber:this.customerregform.value.entity_gst_number,
        GST_Org_name:this.customerregform.value.entity_gst_org_name,
        GST_Address:this.customerregform.value.entity_gst_Address,
        Supply_Country:this.customerregform.value.supply_country,
        Supply_State:this.customerregform.value.supply_state,
       // GST_Certificate:this.gstcertificate,//---
        Same_as_Registered_Entity:this.customerregform.value.sameentitydetails!=""?Boolean(this.customerregform.value.sameentitydetails):false,
        billing_org_name:this.customerregform.value.billing_org_name,
        billing_gst_number:this.customerregform.value.billing_gst_number,
        billing_Address:this.customerregform.value.billing_Address,
        billing_country:this.customerregform.value.billing_country,
        billing_state:this.customerregform.value.billing_state,
        Same_as_Registered_User:this.customerregform.value.sameuserdetails!=""?Boolean(this.customerregform.value.sameuserdetails):false,
        Grp_Admin_firstname:this.customerregform.value.grp_admin_first_name,
        Grp_Admin_lastname:this.customerregform.value.grp_admin_last_name,
        Grp_Admin_Mobilenumber:this.customerregform.value.grp_admin_mobileno,
        Grp_Admin_EmailID:this.customerregform.value.grp_admin_emailid,

       };
   
      console.log(JSON.stringify(formdata))
    

    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(formdata)),
    };
    console.log('encryptedPayload', encryptedPayload);

    const frmdata=new FormData();
    frmdata.append('encryptedRequest',JSON.stringify(encryptedPayload));
   // alert(JSON.stringify)
    if(this.gstcertificate instanceof File){
     // alert(this.gstcertificate.name)
      frmdata.append('file',this.gstcertificate,this.gstcertificate.name);

    }
    this.http.post(URL + '/CustomerRegController/insertCustomerReg', frmdata, { headers })
    .subscribe(
      (response: any) => {
        if (response !== "Error: TypeName with the same name already exists.") {
          console.log('Data Saved Successfully:', response);
          window.alert('Data Saved Successfully');
          this.reloadComponent();
        } else {
          window.alert(response);  // Display the response directly
        }
      },
      (error: any) => {
        console.error('Error saving data:', error);
        if (error.error && typeof error.error === 'string') {
          window.alert(error.error);  // Show the error message returned by the server
        } else {
          window.alert('Error Saving Data. Please check the console for details.');
        }
      }
    );
  
  
  }
    }
  reloadComponent() {
   // throw new Error('Method not implemented.');
   const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
    getstate(event:any){
      console.log("selected Type id: ", event.value);
         // alert(event.value)
         this.http.get<any[]>(URL + '/StateModels/GetStateDetails/'+ event.value, { headers })
         .subscribe({
           next: (res) => {
             this.stateds= res; // Assign the response to roles
             console.log('States API Response:', res);
           },
           error: (err) => {
             console.error('Error fetching states:', err);
           }
         });
          // this.CountryId = event.value;
          // this.selectedcountry=null;
       
          // this.stateds={
          //   paginate: true,
          //   store: new CustomStore({
          //       key: 'id',
          //       loadMode: 'raw',
          //       load:()=>{return new Promise((resolve, reject) => {
          //         this.http.get(URL + '/StateModels/GetStateDetails/'+ this.CountryId, {headers})
          //           .subscribe(res => {
          //            (resolve(res));
        
          //           }, (err) => {
          //             reject(err);
          //           });
          //     });
          //     },
          //   }),
      
          // };
          // alert(2)
    }
    getbillstate(event:any){
      console.log("selected Type id: ", event.value);
      this.http.get<any[]>(URL + '/StateModels/GetStateDetails/'+ event.value, { headers })
      .subscribe({
        next: (res) => {
          this.bill_stateds= res; // Assign the response to roles
          console.log('States API Response:', res);
        },
        error: (err) => {
          console.error('Error fetching states:', err);
        }
      });
         
         
    }
  
}
