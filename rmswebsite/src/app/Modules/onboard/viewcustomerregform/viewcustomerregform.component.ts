import { Component, ViewChild } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-viewcustomerregform',
  templateUrl: './viewcustomerregform.component.html',
  styleUrls: ['./viewcustomerregform.component.scss']
})
export class ViewcustomerregformComponent {
  @ViewChild('stepper') stepper!: MatStepper; 
  customerregform:any;
  dataSource: any;
  visibledg:boolean=false;
  moduleds:any;
  Entityds:any;
  UnitMasterds:any;
  EntityID:any;
  Selectedunit:any;
orgname:any;
CustomerRegID:any;
moduleselected:any[]=[];
limited:boolean=false;
modules:any;
     minDate: Date;
seqid:any;
gridColumns=[ 
  {
  dataField: 'task_name',
  caption: 'Module'
      },
     ]
  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
    
   
  )
  {
    this.minDate = new Date();  
    this.dataSource = this.makeAsyncDataSource3(this.http);
    this.Entityds={
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
  }
  ngOnInit(): void {
    this.dataSource = this.makeAsyncDataSource3(this.http);
    this.moduleds = this.makeAsyncDataSourcemodules(this.http);
    this.customerregform = this.fb.group({
      modules:'',
      noofusers:'',Entity:'',Unit_location:'',accountno:'',bankname:'',branchname:'',ifsccode:'',
      collection_Date:[null],bankaccountno:'',Subscriptiontype:'',from_Date:[null],to_Date:[null],
      firstName:'',lastName:'',mobileNumber:'',emailID:'',organizationName:'',gstRegisteredmain:'',
      gstNumber:'',gsT_Org_name:'',gsT_Address:'',supply_Country:'',supply_State:'',billing_org_name:'',
      billing_gst_number:'',billing_Address:'',billing_country:'',billing_state:'',grp_Admin_firstname:'',
      grp_Admin_lastname:'',grp_Admin_Mobilenumber:'',grp_Admin_EmailID:'',
    });
  }

  makeAsyncDataSource3(http:HttpClient) {
    //this.griddatajson1
    return new CustomStore({
      loadMode: 'raw',
     key: 'customerRegID',
      load() {
        return lastValueFrom(http.get(`${URL}`+'/CustomerRegController/GetCustomerReg',{headers: headers}));
      },
    });
  }
  makeAsyncDataSourcemodules(http:HttpClient) {
    //this.griddatajson1
    return new CustomStore({
      loadMode: 'raw',
     key: 'task_id',
      load() {
        return lastValueFrom(http.get(`${URL}`+'/CustomerRegController/GetModules', { headers }));
      },
    });
  }
  getUnitLocation(event: any) {
    console.log("selected Entity_Master_id : ", event.value);
    this.EntityID = event.value;
     this.Selectedunit=null;  
    this.UnitMasterds={
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
   selecttype(event: any){
    if(event.value=="Limited")
      this.limited=true;
    else
    this.limited=false;
   }

   getmodules(event:any){
this.modules=event.value
   }
  okClicked2(e:any){
    
    this.visibledg=true;
this.orgname=e.organizationName;
    setTimeout(() => {
      this.stepper.next(); 
    }, 0); 
   // this.stepper.next();
    //alert(e.customerRegID);
this.CustomerRegID=e.customerRegID
this.http.get(URL + '/CustomerRegController/GetCustomerRegByID?CustomerRegID='+e.customerRegID, {headers})
.subscribe((response: any) => {
//alert(JSON.stringify(response))
  if (Array.isArray(response) && response.length > 0) 
  {
    
    let Getcounts:any = response[0] as any; // Access the first element of the array
    
    console.log(JSON.stringify(Getcounts));
    

this.customerregform.controls['firstName'].setValue(response[0].firstName);
this.customerregform.controls['lastName'].setValue(response[0].lastName);

this.customerregform.controls['mobileNumber'].setValue(response[0].mobileNumber);

this.customerregform.controls['emailID'].setValue(response[0].emailID);

this.customerregform.controls['organizationName'].setValue(response[0].organizationName);
this.customerregform.controls['gstRegisteredmain'].setValue(response[0].gstRegisteredmain);
this.customerregform.controls['gstNumber'].setValue(response[0].gstNumber);

this.customerregform.controls['gsT_Org_name'].setValue(response[0].gsT_Org_name);

this.customerregform.controls['gsT_Address'].setValue(response[0].gsT_Address);
this.customerregform.controls['supply_Country'].setValue(response[0].supplycountryName);

this.customerregform.controls['supply_State'].setValue(response[0].supplyStateName);

this.customerregform.controls['billing_org_name'].setValue(response[0].billing_org_name);

this.customerregform.controls['billing_gst_number'].setValue(response[0].billing_gst_number);
this.customerregform.controls['billing_Address'].setValue(response[0].billing_Address);
this.customerregform.controls['billing_country'].setValue(response[0].billingcountryName);
this.customerregform.controls['billing_state'].setValue(response[0].billingStateName);
this.customerregform.controls['grp_Admin_firstname'].setValue(response[0].grp_Admin_firstname);
this.customerregform.controls['grp_Admin_lastname'].setValue(response[0].grp_Admin_lastname);

this.customerregform.controls['grp_Admin_Mobilenumber'].setValue(response[0].grp_Admin_Mobilenumber);

this.customerregform.controls['grp_Admin_EmailID'].setValue(response[0].grp_Admin_EmailID);






   
// alert(Getcounts.no_of_Users_Assigned)
    
// alert(JSON.stringify(Getcounts))

 

  }

  
});

  }
  getuniqueid() {
    let seqid: any;
    this.http.get(URL + '/CustomerRegController/Getuniquesequence', { headers })
      .subscribe((res: any) => {  
        console.log(JSON.stringify(res))
        if (Array.isArray(res) && res.length > 0) {
         
        const firstRecord = res[0];  // Access the first object in the array
       seqid = firstRecord.unique_Sub_ID;  
        
        console.log('Sequence ID:', seqid);
        }
        else{
          seqid='0000';
        }
    // Step 1: Extract first 3 letters of the organization name
    const orgPrefix = this.orgname.substring(0, 3).toUpperCase();
  
    // Step 2: Get the last 2 digits of the current year
    const year = new Date().getFullYear().toString().slice(-2);
  
    // Step 3: Generate a random 4-digit number
   // const randomNumber = Math.floor(1000 + Math.random() * 9000);  // Random number between 1000 and 9999
//alert(seqid)

   const lastSequence = parseInt(seqid.slice(-4));
   const newSequence = (lastSequence + 1).toString().padStart(4, '0');  // Increment and pad with leading zeros
// Step 4: Combine the parts to create the unique Account ID
    const accountID = `${orgPrefix}${year}${newSequence}`;
  
    //alert( accountID);

    let formdata:any;
    let amtcollectionDate:any;
    let fromdate:any;
    let todate:any;
   
    if (this.customerregform.get('collection_Date').value !== null) {
      amtcollectionDate = new Date(this.customerregform.get('collection_Date').value).toISOString().slice(0, 19).replace('T', ' ');
     console.log(this.customerregform.get('collection_Date').value);
   } else if(this.customerregform.get('collection_Date').value=="") {
    amtcollectionDate="";
     console.log('CollectionDate is null');
     //alert("Please Select Effective Start Date");
   }
   if (this.customerregform.get('from_Date').value !== null) {
    fromdate = new Date(this.customerregform.get('from_Date').value).toISOString().slice(0, 19).replace('T', ' ');
   console.log(this.customerregform.get('from_Date').value);
 } else if(this.customerregform.get('from_Date').value=="") {
  fromdate="NA";
   console.log('FromDate is null');
   //alert("Please Select Effective Start Date");
 }
 if (this.customerregform.get('to_Date').value !== null) {
  todate = new Date(this.customerregform.get('to_Date').value).toISOString().slice(0, 19).replace('T', ' ');
 console.log(this.customerregform.get('to_Date').value);
} else if(this.customerregform.get('to_Date').value=="") {
  todate="NA";
 console.log('To Date is null');
 //alert("Please Select Effective Start Date");
}
    formdata={
      CustomerRegID:parseInt(this.CustomerRegID),
      //task_id:parseInt(this.customerregform.value.modules),
      task_ids:this.customerregform.get('modules').value!=""?(this.customerregform.get('modules').value).join(','):"NA",
      No_of_Users:parseInt(this.customerregform.value.noofusers),
      No_of_Companys:parseInt(this.customerregform.value.Entity),
      No_of_Locations:parseInt(this.customerregform.value.Unit_location),
      BankName:this.customerregform.value.bankname,
      IFSC_Code:this.customerregform.value.ifsccode,
      BankAccountNo:this.customerregform.value.bankaccountno,
      Amt_Collection_Date:amtcollectionDate,
      Unique_Sub_ID:accountID,
      Subscriptiontype:this.customerregform.value.Subscriptiontype,
      FromDate:fromdate,
      ToDate:todate,
         };
 
    console.log(JSON.stringify(formdata))
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(formdata)),
    };
    const frmdata=new FormData();
    frmdata.append('encryptedRequest',JSON.stringify(encryptedPayload));
    this.http.post(URL + '/CustomerRegController/insertSubscribtiondetails',frmdata,{headers})
    .subscribe((response: any) => {
      console.log('Data Save Succefully ', response);
    window.alert('Data Saved Successfully');
      this.reloadComponent();
    },
    (error: any) => {
     
      window.alert('Error Saving Data');
    });

  }, error => {
    console.error('Error fetching unique sequence:', error);
  });

  }
  reloadComponent() {
    //throw new Error('Method not implemented.');
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
