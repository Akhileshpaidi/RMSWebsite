import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone,NgModule, enableProdMode, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import Query from 'devextreme/data/query';
import { color } from 'html2canvas/dist/types/css/types/color';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-one-time-frequency',
  templateUrl: './one-time-frequency.component.html',
  styleUrls: ['./one-time-frequency.component.scss'],
  template: `
  <div class="showtime-preview" [ngStyle]="{'background-color': model.appointmentData.color}">
      <div>
          {{ model.appointmentData.text }}
          {{ model.appointmentData.startDate | date: 'short' }}
          {{ model.appointmentData.endDate | date: 'short' }}
          {{ model.appointmentData.description }}
      </div>
  </div>
`,
styles: [`
  .showtime-preview {
      background-color: transparent !important;
  }
`],
encapsulation: ViewEncapsulation.None
})

export class OneTimeFrequencyComponent {

  @Input() model: any;
  InternalType: boolean = false;
  Page_Type:any;
  VisibleCalender:boolean=true;
  VisibleForm:boolean=false;
  formData:any[]=[];
  dataSource: any;
  
  selectedDepartmentNames: string[] = [];
  SelecteduserName:number[] = [];



Name:any;
Duration:any;
StartDate:any;
EndDate:any;
PersionRequesting:any;



  currentDate: Date = new Date(2021, 3, 27);



  nextbuttonvisible:boolean=false;

  selectedRowKeys: any[] = [];

  ScheduledAssessment1: string = 'option1';
  datapacket:any;
  selfpacket:any;

  ScheduledAssessment: string = 'option1';

  external_one_Ass_form:any;
  Selectedtopic:any;
  Documentcategory:any;
  Doc_CategoryID:any[]=[];
  Documentsubcategory:any;
  selectedentity:any;
  Departmentmaster:any;
  gridDataSource:any;
  PersonRequestingDataSource:any;
  isGridBoxOpened: boolean = false;
  UserDatasource:any;
  UserDatasourceSecondDropdown:any
  
  userdata:any;
  userid:any;
    
 
  Requestdate:any;
  DocumentTypeData:any;
  docTypeID:any;
  SelectedDocType:any;
  DocumentCategoryData:any;
  doc_CategoryID : any;
  SelectedDocCategory: any;
  DocumentSubCategoryData:any;
  EntityName:any;
  EntityID:any;
  Selectedunit:any;
  UnitMaster:any;
  Unit_location_Master_id:any;
  AssessmentForm: FormGroup;
  Selecteduser:any;
  Userinfo1:any;
  selectedOption1:any[]=[];
  unit_location_Master_id:any;
  department_Master_id:any;
  dropdownOptions:any;
  selectedOption:any[]=[];
  selectedDocCat:any[]=[];
  selectedDocSubCat:any[]=[];
  docSubCat:any[]=[];
  selectedOption2:any[]=[];
  usergridColumns: any = ['firstname'];
  departmentColumns:any=['department_Master_name'];
  docCatColumns:any=['doc_CategoryName'];
  docSubCatColumns:any=['doc_SubCategoryName'];
  gridColumns: any = ['assessment_name', 'type_Name', 'subType_Name',
  'Competency Skill Level','ass_template_id','Assessment from Date','Assessment To Date','keywords'];
  isUserBoxOpened:boolean=false;
  ds_assessmenttemp:any;
  gridBoxValue: any[] = [];
  
  reminders: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  TextBox2=false;
    DropdownBox2=true;
   docApprover :any;
   gridBoxValue1: number[] = [];
   isUserBoxOpened1:boolean;
   public selecteddocapproverType: number | undefined;
   Userinfo:any;
   public defaultOption: number | undefined;
   public defaultOption1: number | undefined;
   internal_rep_Ass_form:any;
    public docapprover: any[] = [
      { id: 1, name: 'Select from User List' },
      { id: 2, name: 'Enter Name as Text' }
    ];
  DepartmentData: any;
  ass_template_id: string = '';
  getCurrentDate(): string {
    return new Date().toISOString().substring(0, 10);
  }
  public project4: any[] = [
    { id: 1, name: 'Days' },
    
    { id: 2, name: 'Week' },
    { id: 3, name: 'Month' },
    { id: 4, name: 'Year' }
   
    
  ];
  minDate: Date;
  
  weekendFilter = (d: Date | null): boolean => {  
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6; // Disables Sunday (0) and Saturday (6)
  };

  calenderds:any;
  appointmentStyles: { 'background-color': string; } | undefined;
  constructor(private http: HttpClient,

    private ref: ChangeDetectorRef,
    private fb:FormBuilder,
    private session: SessionService,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private router: Router,private rout:ActivatedRoute,public dialog: MatDialog
    ){

      // const currentDate = new Date();
      // const dateString = currentDate.toISOString().slice(0, 10);
      // localStorage.setItem('startDate', dateString);

      this.AssessmentForm = this.formBuilder.group({
      
      
        assessment_name:['',Validators.required],
        requester_name:['',Validators.required],
      
        Duration_of_Assessment:['',Validators.required],
        startDate:['',Validators.required],
        
         endDate:['',Validators.required],
        DocumentType:[null,Validators.required],
        DocumentCategory:[null,Validators.required],
        DocumentSubCategory:[null,Validators.required],
        EntityMaster:[null,Validators.required],
        UnitLoc:[null,Validators.required],
        Objective:[''],
        Message:[''],
        ShuffleQues:[0],
        ShuffleAns:[0],
        DepMaster:[null,Validators.required],
        MapUserList:[null,Validators.required],
        exemptionUser:[''],
        ExemptedReason:[null],
     



      });
    
  
     
    this.minDate = new Date();


    this.isUserBoxOpened1=false;
    this.selecteddocapproverType=1;
    this.defaultOption=0;
    this.defaultOption1=0;
   
  
    this.Userinfo={
      paginate: true,
      store: new CustomStore({
          key: 'usR_ID',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UserMaster/GetActiveUserDetails', {headers})
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
            this.http.get(URL + '/UnitMaster/GetEntityNames/'+this.userid, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

   

    this.Documentcategory={
      paginate: true,
      store: new CustomStore({
          key: 'doc_CategoryID',
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
                reject(err)
               // alert(JSON.stringify(err))
                
               //console.error('HTTP error:', err);
              });
        });
        },
      }),
    };

    //Assessments data

this.gridDataSource={
   
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/Assessment/GetActiveAssesment', {headers})
          .subscribe(res => {
           (resolve(res));
         
          }, (err) => {
            reject(err)
           // alert(JSON.stringify(err))
            
           //console.error('HTTP error:', err);
          });
    });
    },
  }),
};

//getting user permissions data 

this.PersonRequestingDataSource={
   
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/userDetails/GetuserDetails', {headers})
          .subscribe(res => {
           (resolve(res));
         
          }, (err) => {
            reject(err)
           // alert(JSON.stringify(err))
            
           //console.error('HTTP error:', err);
          });
    });
    },
  }),
};
    
   
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

  onSelectionChanged(selectedItems: any[]) {
    this.selectedRowKeys = selectedItems.map(item => item.ID);
  }

  addReminder() {
    if (this.reminders.length < 9) {
      this.reminders.push(0);
    }
  }

  gridBox_displayExprAssessment(item: any) {

    return item.assessment_name;
   }
   subCatDoc(item: any) {

    return item.doc_SubCategoryName;
   }
  

  deleteReminder(index: number) {
    this.reminders.splice(index, 1);
  }
  OnDocApproverChange(event: any) {

    this.docApprover = event.target.value;

    localStorage.setItem('docApprover', this.docApprover);

  }
  docApprover_displayExpr(usR_ID:any) {
  
    this.docApprover=usR_ID.firstname;
    const userId = usR_ID.id;
    localStorage.setItem('docApprover', this.docApprover);

    return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
  }


  ngOnInit() {
  
    let newData ;
    let user: any = this.session.getUser();
                
    this.userdata = JSON.parse(user);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
    localStorage.setItem('USERID',this.userdata.profile.userid);
   localStorage.getItem('USERID');
    this.userid=this.userdata.profile.userid;
   
    this.http.get<any[]>(URL + '/SetAssessment/GetOnetimeFrequency?userid='+localStorage.getItem('USERID'), { headers })
    .subscribe(res => {
      const data = res[0];
      if (res.length > 0 && res[0].schedule_Assessment_id === 0) {
        this.dataSource = new DataSource({});
      //  alert('no data')
      } else {
       // this.pdata = res.map(item => ({
        this.dataSource = res.map(item => ({
        text: item.assessment_name,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        description: item.firstname,
        allDay: false,
        color:item.bgcolor,
       
        }));
        
        console.log('Transformed Data:', this.dataSource); // Debug: Log the transformed data
  this.ref.detectChanges();
      
      }
    }, err => {
      // Handle errors
      console.error(err);
    });
    
   
  
   
}



onAppointmentAdding = (event: any) => {
  
this.NextButtonClick();
}

onAppointmentUpdating = (event: any) => {
  this.NextButtonClick();
}

getScheduleAssessmentId(dataSource:any, schedule_Assessment_id:any) {
  const result = Query(dataSource)
      .filter(['schedule_Assessment_id', '=', schedule_Assessment_id])
      .toArray()[0];
  return result ? result.schedule_Assessment_id : 'Not Found';
}

NextButtonClick(){
    
  if (this.Duration == null || this.PersionRequesting == null ){
  


   const message = "Please Select Schedule date before Select Document Categories.";
   const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
     width: '550px',
     data: { message: message},
    
   });
   this.InternalType = false;
   this.VisibleCalender=true;



  }else{
 
     this.InternalType = true;
     this.VisibleCalender=false;
  } 
 
 }
 
 formSubmitted = false;
  saveScheAssessment() {

  if (this.AssessmentForm.valid) {
    // Create formData object
    //const Exemptionuserdata: number[] = this.AssessmentForm.value.exemptionUser?.map((user: any) => user.usR_ID) || [];
    const MapUserId: number[] = this.AssessmentForm.value.MapUserList?.map((user: any) => user.usR_ID) || [];
    const SubCatDoc: number[] = this.AssessmentForm.value.DocumentSubCategory?.map((data: any) => data.doc_SubCategoryID) || [];
   
    const formData = {     
      ass_template_id:this.AssessmentForm.value.assessment_name.toString(),
      userid:this.AssessmentForm.value.requester_name.toString(),
      Duration_of_Assessment:this.AssessmentForm.value.Duration_of_Assessment.toString(),
      startDate:this.AssessmentForm.value.startDate,
      endDate:this.AssessmentForm.value.endDate,
      DocTypeID: this.AssessmentForm.value.DocumentType,     
      Doc_CategoryID: this.AssessmentForm.value.DocumentCategory,
      Doc_SubCategoryID: SubCatDoc,
      Entity_Master_id: this.AssessmentForm.value.EntityMaster,
      Unit_location_Master_id: this.AssessmentForm.value.UnitLoc,
      Shuffle_Answers: this.AssessmentForm.value.ShuffleAns,
      Department_Master_id: this.AssessmentForm.value.DepMaster,  
      Shuffle_Questions: this.AssessmentForm.value.ShuffleQues,
      objective: this.AssessmentForm.value.Objective,
      message: this.AssessmentForm.value.Message,   
      Exemption_user:this.selectedOption2,
      Exemption_user_reason:this.AssessmentForm.value.ExemptedReason,
      mapped_user:MapUserId,
      login_userid:localStorage.getItem('USERID')
    };
  
      console.log(formData);  
   
    // alert(JSON.stringify(formData));
     // Handle form submission or API call here

     this.http.post(URL + '/SetAssessment/insertOnetimeFrequency',formData)
    
     .subscribe((response: any) => {
     
       console.log('Data Save Succefully ', response);
       // Handle the response from the server if needed
      
   
       
        const message = "Internal one time frequency Data Saved Successfully.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
   
       this.AssessmentForm.reset();
       this.VisibleCalender=true;
        this.VisibleForm=false;


     },
     (error: any) => {
      
      
       const message = "Error Saving Data.";
       const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
         width: '550px',
         data: { message: message},
        
       });
     });
   
   }
   else{

    const customNames:any = {
      assessment_name:'Assessment',
      requester_name:'Person Requesting Assessment',
      Duration_of_Assessment: 'Duration of Assessment',
      startDate: 'Start Date',
      endDate: 'End Date',
      DocumentType:'Document Type',
      DocumentCategory:'Document Category(s)',
      DocumentSubCategory:'Document Sub Category(s)',
      EntityMaster:'Entity Name',
      UnitLoc:'Unit Location Name',
      DepMaster:'Business Function(s)',
      MapUserList:'User(s)'

    };
    
    // Find invalid controls and create the error message
    const invalidControls = Object.keys(this.AssessmentForm.controls)
      .filter(controlName => this.AssessmentForm.controls[controlName].invalid)
      .map(controlName => customNames[controlName] || controlName);
    
    const message = invalidControls.length
      ? `The following fields are invalid: ${invalidControls.join(', ')}.`
      : "Invalid form.";
    
    // Display the dialog with the invalid fields listed
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message },
    });
    
    }
   
 }

  onGridBoxOptionChanged1(e: { name: string; }) {
    if (e.name === 'value') {
      this.isUserBoxOpened1 = false;
      this.ref.detectChanges();
    }
  }


  
  gridBox_displayExpr(usR_ID: any ) {

    return usR_ID && `${usR_ID.firstname} `;
    }

    gridBox_displayExprExemptionUser(usR_ID:any) {
  
      return usR_ID && `${usR_ID.firstname} `;
      }
  
getdepartment(event:any){
   this.unit_location_Master_id = event.value;
   this.Selecteduser=null;
   this.Departmentmaster={
    paginate: true,
    store: new CustomStore({
        key: 'department_Master_id',
        
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetailsById/'+this.unit_location_Master_id,{headers})
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


onDepartmentSelectionChange(event:any): void {
  const department_Master_id = event.value;
this.selectedDepartmentNames = [];
const selectedDepartments: number[] = [];
this.UserDatasource={};
for (const DepartmentId of department_Master_id) {
 
    selectedDepartments.push(DepartmentId);


  
}

this.department_Master_id = selectedDepartments;
this.getusers();

}




getusers():void{
  if (this.department_Master_id.length === 0) {

    return;
  }
  
  const queryParams = this.department_Master_id.map((id: any) => `USR_ID=${id}`).join('&');
  const Entity_Master_id= this.AssessmentForm.value.EntityMaster;
  const Unit_location_Master_id= this.AssessmentForm.value.UnitLoc;
  
  this.http.get<any[]>(
    `${URL}/DepartmentMaster/GetUserDetailsByentityUntitDepartmentsIds?${queryParams}&Entity_Master_id=${Entity_Master_id}&Unit_location_Master_id=${Unit_location_Master_id}`,{ headers }).subscribe((res: any[]) => {
    console.log('Topic Data API Response:', res);
    this.UserDatasource=res;
    //alert(JSON.stringify(res));

  }, (err) => {
    console.error('Error fetching data:', err);
  });
}


getNotSelectedUsers(selectedUserIds: any[]): void {
  // Fetch users who are not selected in the first dropdown

 // Extract usR_ID values from the objects in selectedUserIds
   const UsrIds = selectedUserIds.map(user => user.usR_ID);
 
const dataSource = this.UserDatasource.filter((user: { usR_ID: any; }) => !UsrIds.includes(user.usR_ID));

   console.log("Selected User IDs:", UsrIds);
 
   // Simulate an asynchronous operation (replace this with your actual async logic)
  
 


    // let datasouce = this.UserDatasource;

    // // Filtering in-memory array
    // datasouce = datasouce.filter((user: any) => {
    //   return !UsrIds.includes(user.usR_ID);
    // });

    // Now, datasouce contains only the not selected users
    this.UserDatasourceSecondDropdown = dataSource;

    console.log("not selected usrs ", this.UserDatasourceSecondDropdown);

    // Run the change detection inside Angular's zone
    // this.zone.run(() => {
    //   this.ref.detectChanges();
    // });
  

}
onUserSelectionChange(event: any): void {
  // Assuming event.value contains the selected user IDs from the first dropdown
  //this.SelecteduserName = [];
  const selectedUserIds: any[] = event.value;
 // this.selectedOption1=event.value;
 // const selectedUserNames: number[] = [];

 // for (const userId of selectedUserIds) {
  //  selectedUserNames.push(userId);
  if (selectedUserIds && selectedUserIds.length > 0) {
    this.getNotSelectedUsers(selectedUserIds);
  } else {
    // Handle the case when no users are selected in the first dropdown
    this.UserDatasourceSecondDropdown = [];
  }
//}
}



   getsubDocTypes(event: any) {
   
    this.Doc_CategoryID = event.value;
    console.log("selected doc Cat id: ", this.Doc_CategoryID);
  
  this.getSubCatDoc();
   
  }
  
getSubCatDoc():void{
  
  
  const queryParams = this.Doc_CategoryID.map((id: any) => `Doc_CategoryID=${id}`).join('&');

  this.http.get<any[]>(`${URL}/DocSubCategory/GetDocSubCategoryModelDetailsbyId?${queryParams}`, { headers })
  .subscribe((res: any[]) => {
    console.log('Topic Data API Response:', res);
    this.Documentsubcategory=res;
   // alert("sub Category"+JSON.stringify(res));

  }, (err) => {
    console.error('Error fetching data:', err);
  });
}

   getDocTypes(event: any) {
    console.log("selected Type id: ", event.value);
    this.docTypeID = event.value;
     this.Selectedtopic=null;  
    this.Documentcategory={
      paginate: true,
      store: new CustomStore({
          key: 'doc_CategoryID',
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
getDocCategory(event: any) {
    console.log("selected Type id: ", event.value);
    this.docTypeID = event.value;
     this.SelectedDocType=null;  
     
    this.DocumentCategoryData={
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
  // getsubCategory(event: any) {
  //   console.log("selected Type id: ", event.value);
  //   this.doc_CategoryID = event.value;
  //    this.SelectedDocCategory=null;  
  //   this.DocumentSubCategoryData={
  //     paginate: true,
  //     store: new CustomStore({
  //         key: 'Value',
  //         loadMode: 'raw',
  //         load:()=>{return new Promise((resolve, reject) => {
  //           this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.doc_CategoryID, {headers})
  //             .subscribe(res => {
  //              (resolve(res));
    
  //             }, (err) => {
  //               reject(err);
  //             });
  //       });
  //       },
  //     }),
  //   };
  //  }
   selectdocApprover(event: any){
  
    console.log('Selected:', event.value);
    console.log('Selected document Approver:', event.value);
        // Clear localStorage and component state when switching modes
        localStorage.removeItem('docApprover');
        this.docApprover = null;
        this.gridBoxValue1=[];
    if (event.value === 1) {

  
      this.TextBox2=false;
      this.DropdownBox2=true;
     
     console.log("listviewchange",JSON.stringify(localStorage.getItem('docApprover')))
    }
  
    else {
  
      this.TextBox2=true;
      this.DropdownBox2=false;
  

      console.log("textviewchange",JSON.stringify(localStorage.getItem('docApprover')))
    }
  
  }
  SelectFrequencyPeriod(event: any){
  
    console.log('Selected:', event.value);
  
    
  
    
  
  }
  subDocTypesChanged(e:any){
this.selectedDocSubCat=e.value;
    console.log("sub Doc types Selected Values",e);
  
  }


  selectedlisttoremove(e: any) {
    if (!e || !e.value) {
      return; // Return early if e or e.value is undefined
  }

  // Extract 'usR_ID' from each selected item and store it in an array
  const selectedIds = e.value.map((item: any) => item?.usR_ID).filter((id: any) => id); // Filter out undefined or falsy values

  // If selectedIds is an empty array, handle it accordingly
  if (selectedIds.length === 0) {
      return;
  }

  // Perform any necessary operations with selectedIds
 

 this.selectedOption2=selectedIds;
  // Trigger change detection manually
  this.ref.detectChanges();

   
}




//New Methods 


getTodayDate(): string {
  const today = new Date();
  return today.toISOString().slice(0, 10); // Format to YYYY-MM-DD for compatibility
}
updateEndDate(): void {
  const duration = this.AssessmentForm.get('Duration_of_Assessment')?.value;
  const startDate = this.AssessmentForm.get('startDate')?.value ? new Date(this.AssessmentForm.get('startDate')?.value) : null;

 
  if (startDate) {
    const newEndDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    this.AssessmentForm.get('endDate')?.setValue(newEndDate.toISOString().slice(0, 10));
  }
}

onStartDateChange(event: any): void {
  const startDate = event.value;
  if (startDate) {
    this.AssessmentForm.get('startDate')?.setValue(new Date(startDate).toISOString().slice(0, 10));
    this.updateEndDate();
  }
}

onScheduling(){
  this.VisibleCalender=false;
  this.VisibleForm=true;
}



}
