import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-one-time-frequency-self',
  templateUrl: './one-time-frequency-self.component.html',
  styleUrls: ['./one-time-frequency-self.component.scss'],
  
})
export class OneTimeFrequencySelfComponent {

 
  SelfType: boolean = false;
  VisibleCalender:boolean=true;
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
  Doc_CategoryID:any;
  Documentsubcategory:any;
  selectedentity:any;
  Departmentmaster:any;
  gridDataSource:any[]=[];
 
  isGridBoxOpened: boolean = false;
  UserDataSource:any[] = [];
  UserDatasource:any;
  UserDatasourceSecondDropdown:any
  
    
 
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
  selectedOption2:any[]=[];
  usergridColumns: any = ['firstname'];
  departmentColumns:any=['department_Master_name'];
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

  
  constructor(private http: HttpClient,
  
    private ref: ChangeDetectorRef,
    private fb:FormBuilder,

    private formBuilder: FormBuilder,
    private zone: NgZone,
    private router: Router,private rout:ActivatedRoute,public dialog: MatDialog
    ){

      
 
       

      this.AssessmentForm = this.formBuilder.group({
        ass_template_id:[''],
        Date_Of_Request:[''],

        Duration_of_Assessment:[''],
        startDate:[''],
        
        endDate:[''],
        DocumentType:[null,Validators.required],
        DocumentCategory:[null,Validators.required],
        DocumentSubCategory:[null,Validators.required],
        EntityMaster:[null,Validators.required],
        UnitLoc:[null,Validators.required],
        Objective:[''],
        Message:[''],
        ShuffleQues:[''],
        ShuffleAns:[''],
        DepMaster:[null,Validators.required],
        MapUserList:[null,Validators.required],
        exemptionUser:[''],
        ExemptedReason:[null,Validators.required],



      });

      this.dataSource = new DataSource({
        //store: service.getData(),
      });
    this.minDate = new Date();


    this.isUserBoxOpened1=false;
    this.selecteddocapproverType=1;
    this.defaultOption=1;
    this.defaultOption1=1;
   
  
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

   

    this.Documentcategory={
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

  this.http.get<any[]>(URL + '/Assessment/GetActiveAssesment', { headers })
  .subscribe(res => {
    this.gridDataSource = res;
console.log(JSON.stringify( this.gridDataSource))
    // Initialize the form after data is fetched
   
  }, (err) => {
    // Handle errors
  });

  

  this.http.get<any[]>(URL + '/userDetails/GetuserDetails', { headers })
  .subscribe(res => {
    this.UserDataSource = res;

    // Initialize the form after data is fetched
   
  }, (err) => {
    // Handle errors
  });


  
 
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
  


  deleteReminder(index: number) {
    this.reminders.splice(index, 1);
  }
  OnDocApproverChange(event: any) {
    // Your logic here
    // For example, updating the processOwner variable
    this.docApprover = event.target.value;
    //console.log(this.processOwner)
    localStorage.setItem('docApprover', this.docApprover);
  // console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
  }
  docApprover_displayExpr(usR_ID:any) {
  
    this.docApprover=usR_ID.firstname;
    const userId = usR_ID.id;
    localStorage.setItem('docApprover', this.docApprover);
     // console.log("docApprover_displayExpr",JSON.stringify(localStorage.getItem('docApprover')))
    //localStorage.setItem('username_${userId}',this.username)
    return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
  }


  ngOnInit() {
   
    
  }

  onAppointmentFormOpening = (data: any) => {
    this.nextbuttonvisible = true;
    this.datapacket = data.form;
    const that = this;
    const form = data.form;
    let startDate = data.appointmentData.startDate;
    
    // Logging appointment data for debugging
    console.log(data.appointmentData);
  
    setTimeout(() => {
      form.option('items', [
  
  
         
       
      
   {
          label: {
            text: 'Assessment Name',
          },
          editorType: 'dxSelectBox',
          dataField: 'ass_template_id',
          dataSource: this.gridDataSource,
          editorOptions: {
            searchEnabled:"true",
            valueExpr: 'ass_template_id',
            displayExpr: 'assessment_name',
            items: this.gridDataSource,
            onValueChanged: (args: any) => {
              let ass_template_id = args.value;
              let assessment_name = args.component?.option('displayValue');
  
              localStorage.setItem('ass_template_id', ass_template_id);
              localStorage.setItem('assName', assessment_name || '');
              this.Name = localStorage.getItem('assName')!;
            },
          },
        },
        {
          label: {
            text: 'Date of Request',
          },
          name: 'director',
          editorType: 'dxTextBox',
          dataField: 'Date_Of_Request',
          editorOptions: {
            readOnly: true,
            value: new Date().toISOString(),
            onValueChanged: (args: any) => {
              let Date_Of_Request = args.value;
              localStorage.setItem('Date_Of_Request', new Date().toISOString());
            },
          },
        },
        {
          label: {
            text: 'Duration of Assessment (in days)',
          },
          editorType: 'dxNumberBox',
          dataField: 'Duration_of_Assessment',
          editorOptions: {
            onValueChanged: (args: any) => {
              const expectedDurationInDays = parseInt(args.value, 10) || 0;
        
              // Assuming 'startDate' is the name of the field storing the start date
              const startDate = form.getEditor('startDate').option('value');
        
              if (startDate) {
                const newEndDate = new Date(startDate.getTime() + expectedDurationInDays * 24 * 60 * 60 * 1000);
                form.updateData('endDate', newEndDate);
        
                // Update the localStorage and the 'EndDate' variable if needed
                localStorage.setItem('endDate', newEndDate.toISOString().slice(0, 10));
                this.EndDate = localStorage.getItem('endDate')!;
              }
        
              localStorage.setItem('Duration_of_Assessment', expectedDurationInDays.toString());
              this.Duration = localStorage.getItem('Duration_of_Assessment')!;
            },
            validationRules: [{
              type: 'required',
              message: 'Duration of Assessment is required',
          }],
          },
          isRequired: true,
        },
        
        {
          label: {
            text: 'Person Requesting ',
          },
          dataField: 'usR_ID',
          editorType: 'dxSelectBox',
          dataSource: this.UserDataSource,
          editorOptions: {
            searchEnabled:"true",
            valueExpr: 'usR_ID',
            displayExpr: 'firstname',
            items: this.UserDataSource,
            onValueChanged: (args: any) => {
              let usR_ID = args.value;
              let firstname = args.component?.option('displayValue');
              localStorage.setItem('usR_ID', usR_ID);
              localStorage.setItem('PerReqName', firstname || '');
              this.PersionRequesting = localStorage.getItem('PerReqName')!;
            },
             // Set the field as mandatory
      validationRules: [{
        type: 'required',
        message: 'Person requesting Assessment is required',
    }],
},
isRequired: true,
        },
       
        {
          label: {
            text: 'Start Date',
          },
          dataField: 'startDate',
          editorType: 'dxDateBox',
          editorOptions: {
            width: '100%',
            type: 'date',
            displayFormat: 'dd-MM-yyyy',
            onValueChanged: (args: any) => {
              const selectedStartDate = args.value;
        
              // Restriction 1: The date cannot be before today
              const today = new Date();
              today.setHours(0, 0, 0, 0);
        
              if (selectedStartDate && selectedStartDate < today) {
                // Set the start date to today
                args.component.option('value', today);
                return;
              }
        
              // Restriction 2: Select the next working date if the chosen date is a weekend
              const dayOfWeek = selectedStartDate.getDay();
              if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
                const nextWorkingDate = new Date(selectedStartDate);
                nextWorkingDate.setDate(selectedStartDate.getDate() + (dayOfWeek === 0 ? 1 : 2));
                
                // Set the start date to the next working date
                args.component.option('value', nextWorkingDate);
                return;
              }
        
              // Update other logic if necessary
              const formattedStartDate = selectedStartDate.toISOString().slice(0, 10);
              localStorage.setItem('startDate', formattedStartDate);
              this.StartDate = localStorage.getItem('startDate')!;
        
              const expectedDuration = parseInt(form.getEditor('Duration_of_Assessment').option('value'), 10) || 0;
              const newEndDate = new Date(selectedStartDate.getTime() + expectedDuration * 24 * 60 * 60 * 1000);
              form.updateData('endDate', newEndDate);
            },
          },
        },
        {
          name: 'endDate',
          dataField: 'endDate',
          editorType: 'dxDateBox',
          editorOptions: {
            readOnly: true,
            width: '100%',
            type: 'date', // Set type to 'date' to exclude time
            displayFormat: 'dd-MM-yyyy', // Set the desired date format
            onValueChanged: (args: any) => {
              let selectedEndDate = args.value;
        
              while (selectedEndDate && (selectedEndDate.getDay() === 0 || selectedEndDate.getDay() === 6)) {
                selectedEndDate.setDate(selectedEndDate.getDate() + 1);
              }
        
              form.updateData('endDate', selectedEndDate);
              localStorage.setItem('endDate', selectedEndDate.toISOString().slice(0, 10)); // Adjusted for date only
              this.EndDate = localStorage.getItem('endDate')!;
            },
          },
        }
      ]);
  
      this.zone.run(() => {
        this.ref.detectChanges();
      });
    }, 0);
  };
  



NextButtonClick(){
     
  if (this.Duration == null || this.PersionRequesting == null ){
  


   const message = "Please Select Schedule date before Select Document Categories.";
   const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
     width: '550px',
     data: { message: message},
    
   });
   this.SelfType = false;
   this.VisibleCalender=true;



  }else{
 
     this.SelfType = true;
     this.VisibleCalender=false;
  } 
 
 }
 formSubmitted = false;
  saveScheAssessment() {
    this.formSubmitted = true;
 
  let ass_template_id= localStorage.getItem('ass_template_id');
  let usR_ID=localStorage.getItem('usR_ID');
  let Date_Of_Request=localStorage.getItem('Date_Of_Request');
  let Duration_of_Assessment= localStorage.getItem('Duration_of_Assessment');
  let startDate=localStorage.getItem('startDate');
  let endDate=localStorage.getItem('endDate');
  let formattedStartDate:any;
  let formattedEndDate:any;
  let formattereqDate:any
  if (startDate !== null) {
     formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
    console.log(formattedStartDate);
  } else {
    console.log('startDate is null');
  }

  
  if (endDate !== null) {
    formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');
    console.log(formattedEndDate);
  } else {
    console.log('startDate is null');
  }
 
  if (Date_Of_Request !== null) {
    formattereqDate = new Date(Date_Of_Request).toISOString().slice(0, 19).replace('T', ' ');
   console.log(formattereqDate);
 } else {
   console.log('startDate is null');
 }
  
  
  if (this.AssessmentForm.valid) {
    // Create formData object
    //const Exemptionuserdata: number[] = this.AssessmentForm.value.exemptionUser?.map((user: any) => user.usR_ID) || [];
    const MapUserId: number[] = this.AssessmentForm.value.MapUserList?.map((user: any) => user.usR_ID) || [];

    const formData = {
      
      ass_template_id:ass_template_id,
      userid:usR_ID,
     
      Date_Of_Request:formattereqDate,
      Duration_of_Assessment:Duration_of_Assessment,
      startDate:formattedStartDate,
      endDate:formattedEndDate,
      DocTypeID: this.AssessmentForm.value.DocumentType,
     
      Doc_CategoryID: this.AssessmentForm.value.DocumentCategory,
      Doc_SubCategoryID: this.AssessmentForm.value.DocumentSubCategory,
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

    };
   // alert(JSON.stringify(formData))
      console.log(formData);
   
     // Handle form submission or API call here

     this.http.post(URL + '/SetAssessment/insertSelfOnetimeFrequency',formData)
    
     .subscribe((response: any) => {
     
       console.log('Data Save Succefully ', response);
       // Handle the response from the server if needed
      
       const message = "self one time frequency Data Saved Successfully.";
       const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
         width: '550px',
         data: { message: message},
        
       });
      this.AssessmentForm.reset();
      
      //location.reload();
      this.VisibleCalender=true;
this.SelfType=false;

     },
     (error: any) => {
      
      
       const message = "Error Saving Data.";
       const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
         width: '550px',
         data: { message: message},
        
       });
     });
    location.reload();
   }
   else{
   
    
    const message = "invalid form.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
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

  this.http.get<any[]>(`${URL}/DepartmentMaster/GetUserDetailsById?${queryParams}`, { headers })
  .subscribe((res: any[]) => {
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
   console.log("Selected User IDs:", UsrIds);
   // Simulate an asynchronous operation (replace this with your actual async logic)
   setTimeout(() => {
    let datasouce = this.UserDatasource;

    // Filtering in-memory array
    datasouce = datasouce.filter((user: any) => {
      return !UsrIds.includes(user.usR_ID);
    });

    // Now, datasouce contains only the not selected users
    this.UserDatasourceSecondDropdown = datasouce;

    console.log("not selected usrs ", this.UserDatasourceSecondDropdown);

    // Run the change detection inside Angular's zone
    this.zone.run(() => {
      this.ref.detectChanges();
    });
  }, 0);

}
onUserSelectionChange(event: any): void {
  // Assuming event.value contains the selected user IDs from the first dropdown
  this.SelecteduserName = [];
  const selectedUserIds: any[] = event.value;
  this.selectedOption1=event.value;
  const selectedUserNames: number[] = [];
 // this.UserDatasource={};
  for (const userId of selectedUserIds) {
    selectedUserNames.push(userId);
  if (selectedUserIds && selectedUserIds.length > 0) {
    this.getNotSelectedUsers(selectedUserIds);
  } else {
    // Handle the case when no users are selected in the first dropdown
    //this.UserDatasourceSecondDropdown = [];
  }
}
}



   getsubDocTypes(event: any) {
    console.log("selected Type id: ", event.value);
    this.Doc_CategoryID = event.value;
     this.Selectedtopic=null;  
    this.Documentsubcategory={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.Doc_CategoryID, {headers})
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

   getDocTypes(event: any) {
    console.log("selected Type id: ", event.value);
    this.docTypeID = event.value;
     this.Selectedtopic=null;  
    this.Documentcategory={
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
  getsubCategory(event: any) {
    console.log("selected Type id: ", event.value);
    this.doc_CategoryID = event.value;
     this.SelectedDocCategory=null;  
    this.DocumentSubCategoryData={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.doc_CategoryID, {headers})
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
   selectdocApprover(event: any){
  
    console.log('Selected:', event.value);
    console.log('Selected document Approver:', event.value);
        // Clear localStorage and component state when switching modes
        localStorage.removeItem('docApprover');
        this.docApprover = null;
        this.gridBoxValue1=[];
    if (event.value === 1) {
  
      // this.General = true;
  
      // this.confidential=false;
  
      this.TextBox2=false;
      this.DropdownBox2=true;
     
     console.log("listviewchange",JSON.stringify(localStorage.getItem('docApprover')))
    }
  
    else {
  
      this.TextBox2=true;
      this.DropdownBox2=false;
  
      // this.General = false;
  
      // this.confidential=true;
      console.log("textviewchange",JSON.stringify(localStorage.getItem('docApprover')))
    }
  
  }
  SelectFrequencyPeriod(event: any){
  
    console.log('Selected:', event.value);
  
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


}
