import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ViewChild,AfterViewInit  } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import DataSource from 'devextreme/data/data_source';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { SessionService } from 'src/app/core/Session/session.service';
 import { exportDataGrid } from 'devextreme/excel_exporter';
 import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
 import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';



import Query from 'devextreme/data/query';

import { Pipe, PipeTransform } from '@angular/core';

 


@Pipe({ name: 'apply' })
export class ApplyPipe<TArgs, TReturn> implements PipeTransform {
  transform(func: ((...args: TArgs[]) => TReturn), ...args: TArgs[]): TReturn { return func(...args); }
}
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-initiate-external-assessment',
  templateUrl: './initiate-external-assessment.component.html',
  styleUrls: ['./initiate-external-assessment.component.scss'],

})
export class InitiateExternalAssessmentComponent {
  AssessTemplateList:any;
  InternalType: boolean = false;
  repeatFreq:boolean=false;
  selectedUserNames:any;
  usersNames:any;
  message:any;
  isContainerVisible:boolean=false;
  TempGridColumns:any;
  stepperRef:boolean=false;
  repeatMinDate: string | undefined;
       AssessmentForm: FormGroup;
       PersonRequestingDataSource:any;
      VisibleCalender:boolean=true;
      visibleForm:boolean=false;
      RepeatEndDate:any;
      selectedDocCat:any[]=[];
      selectedDocSubCat:any[]=[];
       dataSource: any;
       unit_location_Master_id:any;
       Selecteduser:any;
       selectedDepartmentNames: string[] = [];
       UserDatasource:any;
       UserDatasourceSecondDropdown:any
       department_Master_id:any;
       userid:any;
       ass_template_id: string = '';
       resourcesDataSourcenew: any[]=[];
       currentDate: Date = new Date(2021, 5, 2, 11, 30);
       form: FormGroup | undefined;
       isUserBoxOpened:boolean=false;
       AddButtonVisible:boolean=true;
       isUserBoxOpened1:boolean;
       selectedRowData:any;
       selectedOption: any;
       Name:any;
     Duration:any;
     StartDate:any;
     EndDate:any;
     PersionRequesting:any;
    selecteAssessment:any;
    defaultKey:any;
    SelectedQuestion: any[] = [];
 TemplateColumnsNew: any = ['assessor_name','requester_name', 'defaultkey',
  {
    dataField: 'created_date',
    caption: 'Created Date',
    alignment: "right",
    width: 180,
    dataType: "date",
    format: {
      type: "custom",
      formatter: function(date:any) {
        if (date) {
          const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
          const month = date.toLocaleString('default', { month: 'short' }); // Short month
          const year = date.getFullYear();
          return `${day} ${month} ${year}`; // Format: "12 Dec 2024"
        }
        return "";
      }
    },
    filterValue: null,
    customizeText: function(cellInfo:any) {
      // Ensures consistent display in filter dropdown
      if (cellInfo.value) {
        const date = new Date(cellInfo.value);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }
      return "";
    }
  }


];
     
     
       ScheduledAssessment1: string = 'option1';
 
       ScheduledAssessment: string = 'option1';
       UserDataSource:any[] = [];
       Requestdate:any;
       DocumentTypeData:any;
       docTypeID:any;
       Selectedtopic:any;
       Documentcategory:any;
       Doc_CategoryID:any;
       selectedentity:any;
       Documentsubcategory:any;
       UnitMaster:any;
       unitLocId:any;
       EntityID:any;
       DocumentsubcategoryData:any;
       EntityName:any;
       Departmentmaster:any;
       gridDataSource:any;
       isGridBoxOpened: boolean = false;
       nextbuttonvisible:boolean=false;
       Duration_of_Assessment:any;
       userdata:any;
       selectedOption1:any[]=[];
       selectedOption2:any[]=[];
      
       usergridColumns: any = ['firstname'];
       departmentColumns:any=['department_Master_name']
       gridColumns: any = ['assessment_name', 'type_Name', 'subType_Name',
       'Competency Skill Level','ass_template_id','Assessment from Date','Assessment To Date','keywords'];
       
       ds_assessmenttemp:any;
       gridBoxValue: any[] = [];
       docCatColumns:any=['doc_CategoryName'];
       docSubCatColumns:any=['doc_SubCategoryName'];
       reminders: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
       TextBox2=false;
         DropdownBox2=true;
        docApprover :any;
        gridBoxValue1: number[] = [];
        
        DropdownValue:any;
        public selecteddocapproverType: number | undefined;
        Userinfo1:any;
        Userinfo:any;
        public defaultOption: number | undefined;
        public defaultOption1: number | undefined;
        internal_rep_Ass_form:any;
         public docapprover: any[] = [
           { id: 1, name: 'Select from User List' },
           { id: 2, name: 'Enter Name as Text' }
         ];
       getCurrentDate(): string {
         return new Date().toISOString().substring(0, 10);
       }
       frequencyOptions = [
         { value: 'Daily', text: 'Daily' },
         { value: 'Weekly', text: 'Weekly' },
         { value: 'Monthly', text: 'Monthly' },
         { value: 'Yearly', text: 'Yearly' }
       ];
       public project4: any[] = [
         { id: 1, name: 'Days' },
         
         { id: 2, name: 'Week' },
         { id: 3, name: 'Month' },
         { id: 4, name: 'Year' }
        
         
       ];
       minDate: Date;
       UserModel:any;
      
       
       weekendFilter = (d: Date | null): boolean => {
         const day = (d || new Date()).getDay();
         return day !== 0 && day !== 6; // Disables Sunday (0) and Saturday (6)
       };
       TemplateColumns: any[] = [
        
         {
           dataField: 'assessment_name',
           caption: 'Assessment Name'
         },
         {
           dataField: 'ass_template_id',
           caption: 'Assessment Template Id'
         },
         {
           dataField: 'firstname',
           caption: 'Assessor Name'
         },]
         options = ['Before Due Date', 'After Start Date']; 
 
         get RemarksList(): FormArray {
           return this.AssessmentForm.get('RemarksList') as FormArray;
         }


         //View Data Columns
gridColumnsNew: any[] = [
  {
    dataField:'entity_Master_Name',
    caption: 'Entity Name',
    visible: false,
  },
  {
    dataField: 'unit_location_Master_name',
    caption: 'Unit Location',
    visible: false,
  },
  {
    dataField: 'uq_ass_schid',
    caption: 'Assessment ID'
  },
  {
    dataField: 'assessment_name',
    caption: 'Assessment Name'
  },
  {
    dataField:'type_Name',
    caption: 'Assessment Type',
     visible: false,
  },
  {
    dataField: 'subType_Name',
    caption: 'Assessment Sub-Type',
     visible: false,
  },
  {
    dataField: 'competency_Name',
    caption: 'Competency Category',
     visible: false,
  },{
    dataField:'firstname',
    caption:'Assessor Name'
  },
  {
    dataField:'assessmentStatus',
    caption:'Assessment Status'
  },
  {
    dataField:'frequency_period',
    caption:'Scheduled Frequency'
  },
  {
    dataField:'startDate',
    caption: 'Assessment Start Date',
    alignment: "right",
    
    dataType: "date",
format:'dd-MMM-yyyy'
  },
  {
    dataField:'endDate',
    caption: 'Assessment End Date',
    alignment: "right",
 
    dataType: "date",
    format:'dd-MMM-yyyy'
  }
  ,
  {
    dataField:'date_Of_Request',
    caption: 'Assessment Request Date',
    alignment: "right",
   
    dataType: "date",
    format: 'dd-MMM-yyyy'
  },
  {
    caption: 'Actions',
    cellTemplate: 'viewButtonTemplate'
  }
  
  
  
  
];

containerColumnsNew: any[] = [
  {
    dataField: 'entity_Master_Name',
    caption: 'Entity Name'
  },
  {
    dataField: 'unit_location_Master_name',
    caption: 'Unit Location'
  },
  {
    dataField: 'assessment_name',
    caption: 'Assessment Name'
  },
  {
    dataField: 'type_Name',
    caption: 'Assessment Type'
  },
  {
    dataField: 'subType_Name',
    caption: 'Assessment Sub-Type'
  },
  {
    dataField: 'competency_Name',
    caption: 'Competency Category'
  },{
    dataField:'firstname',
    caption:'Assessor Name'
  },
  {
    dataField:'assessmentStatus',
    caption:'Assessment Status'
  },
  {
    dataField:'frequency_period',
    caption:'Scheduled Frequency'
  },
  {
    dataField: 'startDate',
    caption: 'Assessment Start Date',
    alignment: "right",
    width: 180,
    dataType: "date",
    format: {
      type: "custom",
      formatter: function(date:any) {
        if (date) {
          const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
          const month = date.toLocaleString('default', { month: 'short' }); // Short month
          const year = date.getFullYear();
          return `${day} ${month} ${year}`; // Format: "12 Dec 2024"
        }
        return "";
      }
    },
    filterValue: null,
    customizeText: function(cellInfo:any) {
      // Ensures consistent display in filter dropdown
      if (cellInfo.value) {
        const date = new Date(cellInfo.value);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }
      return "";
    }
  },
  {
    dataField: 'endDate',
    caption: 'Assessment End Date',
    alignment: "right",
    width: 180,
    dataType: "date",
    format: {
      type: "custom",
      formatter: function(date:any) {
        if (date) {
          const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
          const month = date.toLocaleString('default', { month: 'short' }); // Short month
          const year = date.getFullYear();
          return `${day} ${month} ${year}`; // Format: "12 Dec 2024"
        }
        return "";
      }
    },
    filterValue: null,
    customizeText: function(cellInfo:any) {
      // Ensures consistent display in filter dropdown
      if (cellInfo.value) {
        const date = new Date(cellInfo.value);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }
      return "";
    }
  }
  ,
  {
    dataField: 'date_Of_Request',
    caption: 'Assessment Request Date',
    alignment: "right",
    width: 180,
    dataType: "date",
    format: {
      type: "custom",
      formatter: function(date:any) {
        if (date) {
          const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
          const month = date.toLocaleString('default', { month: 'short' }); // Short month
          const year = date.getFullYear();
          return `${day} ${month} ${year}`; // Format: "12 Dec 2024"
        }
        return "";
      }
    },
    filterValue: null,
    customizeText: function(cellInfo:any) {
      // Ensures consistent display in filter dropdown
      if (cellInfo.value) {
        const date = new Date(cellInfo.value);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }
      return "";
    }
  }
  
  
  
  
];
isRowSelected(): boolean {
  return this.SelectedQuestion.length > 0;
}
       constructor(private http: HttpClient,
   
         private ref: ChangeDetectorRef,
         private fb:FormBuilder,
         private zone: NgZone,
         private formBuilder: FormBuilder,
         public dialog: MatDialog,
         private session: SessionService,
         
         ){
     
     
     
           this.AssessmentForm = this.formBuilder.group({
          
         
             assessment_name:['',Validators.required],
             requester_name:['',Validators.required],
             Duration_of_Assessment:['',Validators.required],
             startDate:[this.getCurrentDate(),Validators.required],  
             endDate:['',Validators.required],
             repeatEndDate:[''],
             frequency_period:['Daily'],
             showAdditionalFields:[''],
             value_Frequency:['0'],
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
             RemarksList:new FormArray([]),
          
     
     
     
           });
     
           this.addSuggestion();
         
           this.minDate = new Date();
        
         this.isUserBoxOpened1=false;
         this.selecteddocapproverType=1;
         this.defaultOption=0;
         this.defaultOption1=0;


         this.AssessTemplateList={
          paginate: true,
          store: new CustomStore({
              key: 'defaultkey',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/SetAssessment/GetActiveSchedulesAssessment', {headers})
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
 
           //Assessments data
 
 this.gridDataSource={
    
   paginate: true,
   store: new CustomStore({
       key: 'ass_template_id',
       loadMode: 'raw',
       load:()=>{return new Promise((resolve, reject) => {
         this.http.get(URL + '/Assessment/GetActiveAssesment/'+this.userid, {headers})
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
                   //  alert(JSON.stringify(err))
                    //console.error('HTTP error:', err);
                   });
             });
             },
           }),
         };
     
         this.DocumentsubcategoryData={
           paginate: true,
           store: new CustomStore({
               key: 'Value',
               loadMode: 'raw',
               load:()=>{return new Promise((resolve, reject) => {
                 this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetails', {headers})
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
        
      
       
    
       
      
       this.internal_rep_Ass_form=this.fb.group({
         date_req:'',
         freq_period:'',
         freq_period_type:'',
         excpected_date:'',
         freq_period1:'',
         end_repeat_date:'',
         DocTypeID:'',
         Doc_CategoryID:'',
         Doc_SubCategoryID:'',
         Entity_Master_id:'',
         Unit_location_Master_id:'',
         doc_perm_rights_id:'',
         USR_ID:'',
         USR_ID1:'',
         AssessementName:'',obj_of_Ass:'',
         msg_of_Ass:'',
         Shuffle_qstns:1,
         Shuffle_anws:1
       })
     
      // this.getUserModel();
       }
     
     
       
       ngOnInit(): void {
        
         this.form = this.fb.group({
           USR_ID: new FormControl(null), // Assuming these are your form controls
           USR_ID1: new FormControl(null)
         });
 
         let newData ;
     let user: any = this.session.getUser();
 
         this.userdata = JSON.parse(user);//userdata.profile.userid
         console.log("userid",this.userdata.profile.userid)
         localStorage.setItem('USERID',this.userdata.profile.userid);
        localStorage.getItem('USERID');
         this.userid=this.userdata.profile.userid;
      
 
 this.gettingSchedulerDataFun();
     
         
 
        
       }
      
      
       
  gettingSchedulerDataFun(){

this.dataSource={
    paginate: true,
    
    store: new CustomStore({
        key: 'schedule_Assessment_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/SetAssessment/GetOnetimeFrequency?userid='+localStorage.getItem('USERID'),{headers})
            .subscribe((res:any) => {
             (resolve(res));    
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
    };



//    this.http.get<any[]>(URL + '/SetAssessment/GetOnetimeFrequency?userid='+localStorage.getItem('USERID'), { headers })
//    .subscribe(res => {
//      const data = res[0];
//      if (res.length > 0 && res[0].schedule_Assessment_id === 0) {
//        this.dataSource = new DataSource({});
//      //  alert('no data')
//      } else {
//       // this.pdata = res.map(item => ({
//        this.dataSource = res.map(item => ({
//          text: item.assessment_name,  // This sets the title to "Assessment Name"
//          startDate: new Date(item.startDate),  // The start date
//          endDate: new Date(item.endDate),  // The end date
//          description: item.firstname, 
      
      
      
//        }
//      )
//      );
       
       
    
//  this.ref.detectChanges();
     
//      }
//    }, err => {
//      // Handle errors
//      console.error(err);
//    });
  }
 
 getScheduleAssessmentId(dataSource:any, schedule_Assessment_id:any) {
   const result = Query(dataSource)
       .filter(['schedule_Assessment_id', '=', schedule_Assessment_id])
       .toArray()[0];
   return result ? result.schedule_Assessment_id : 'Not Found';
 }
     
       gridBox_displayExpr(usR_ID:any) {
    
         return usR_ID && `${usR_ID.firstname} `;
         }
     
         gridBox_displayExprAssessment(item: any) {
         
           return item.assessment_name;
          }
          
     
      
          getdepartment(event:any){
          
           this.Selecteduser=null;
           this.Departmentmaster={
            paginate: true,
            store: new CustomStore({
                key: 'department_Master_id',
                
                loadMode: 'raw',
                load:()=>{return new Promise((resolve, reject) => {
                  this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetailsById/'+event,{headers})
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
         const Entity_Master_id= this.EntityID;
         const Unit_location_Master_id= this.unitLocId;
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
         const selectedUserIds: any[] = event.value;
       
         const selectedUserNames = selectedUserIds.map((user: any) => user.firstname.value).join(', ');
 
         // Update the remarks field in each FormGroup of the FormArray
         this.RemarksList.controls.forEach((remarkGroup: any) => {
           remarkGroup.patchValue({ remarks: selectedUserNames });
         });
         if (selectedUserIds && selectedUserIds.length > 0) {
           this.getNotSelectedUsers(selectedUserIds);
         } else {
          
         }
       }
       
     
          onGridBoxOptionChanged1(e: { name: string; }) {
           if (e.name === 'value') {
             this.isUserBoxOpened1 = false;
  
             this.ref.detectChanges();
           }
         }
     
         onGridBoxSelectionChanged(e: any) {
           // Assuming e.selectedRowsData contains the array of selected user objects
           if (e.selectedRowsData && e.selectedRowsData.length > 0) {
             // Map through each user and get the firstname
             const userNames = e.selectedRowsData.map((user: any) => user.firstname);
         
             // Join the names with a comma
             this.docApprover = userNames.join(', ');
         
         
              // Store in local storage
            localStorage.setItem('docApprover',  this.docApprover);
             // For debugging
             console.log("Selected Doc Approvers:",  this.docApprover);
             console.log("onGridBoxSelectionChanged",JSON.stringify(localStorage.getItem('docApprover')))
         
           } else {
             // Handle the case where no users are selected
             localStorage.removeItem('docApprover');
             this.docApprover = null;
           }
         }
          
     
         getUserData(event: string) {
        
           this.Userinfo1={
             paginate: true,
             store: new CustomStore({
                 key: 'usR_ID',
                 loadMode: 'raw',
                 load:()=>{return new Promise((resolve, reject) => {
                   this.http.get<any>(URL+'/UserIds/GetUsersIds?addDocIDstr=' + event)
                   .subscribe(res => {
                     (resolve(res));
                  
                 }, (err) => {
                   reject(err);
                   alert(err)
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
       onUserSelected(event:any) {
         // Handle the user selection event, and show/hide the second dropdown accordingly
         this.isUserBoxOpened = true; // Set to true to make the second dropdown visible
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
     
       selectdocApprover(event: any){
     
         console.log('Selected:', event.value);
         console.log('Selected document Approver:', event.value);
             // Clear localStorage and component state when switching modes
             localStorage.removeItem('docApprover');
             this.docApprover = null;
             this.gridBoxValue=[];
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
      
       docApprover_displayExpr(usR_ID:any) {
     
         this.docApprover=usR_ID.firstname;
         const userId = usR_ID.id;
         localStorage.setItem('docApprover', this.docApprover);
           console.log("docApprover_displayExpr",JSON.stringify(localStorage.getItem('docApprover')))
       
         return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>`;
       }
     
     
     
       OnDocApproverChange(event: any) {
         // Your logic here
         // For example, updating the processOwner variable
         this.docApprover = event.target.value;
         //console.log(this.processOwner)
         localStorage.setItem('docApprover', this.docApprover);
        console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
       }
       
        
       SelectFrequencyPeriod(event: any){
       
         console.log('Selected:', event.value);
       }
       markWeekEnd = (cellData :any) => {
         function isWeekEnd(date :any) {
           const day = date.getDay();
           return day === 0 || day === 6;
         }
         const classObject:any = {};
         classObject[`employee-${cellData.groups.employeeID}`] = true;
         classObject[`employee-weekend-${cellData.groups.employeeID}`] = isWeekEnd(cellData.startDate);
         return classObject;
       };
     
       markTraining = (cellData :any) => {
         const classObject :any= {
           'day-cell': true,
         };   
         classObject[this.getCurrentTraining(cellData.startDate.getDate(), cellData.groups.usR_ID)] = true;
         return classObject;
       };
        getCurrentTraining(date :any, employeeID:any) {
         const result = (date + employeeID) % 3;
         const currentTraining = `training-background-${result}`;
     
         return currentTraining;
       }
     
     
     
       NextButtonClick(){
      
      if (this.Duration == null || this.PersionRequesting == null ){
      
 
 
       const message = "Please Select Schedule date before Select Document Categories.";
       const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
         width: '550px',
         data: { message: message},
        
       });
       this.InternalType = false;
       //this.VisibleCalender=true;
 
    
 
      }else{
     
         this.InternalType = true;
       //  this.VisibleCalender=false;
      } 
     
     }
     
   
     
   
     onAppointmentFormOpening = (data: any) => {
       this.nextbuttonvisible = true;
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
   
                       // Set the field as mandatory
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
   
                           // Get today's date
                           let today = new Date();
                           today.setHours(0, 0, 0, 0);
   
                           // Restrict selection to dates starting from today
                           if (selectedStartDate && selectedStartDate < today) {
                               // Set the start date to today
                               args.component.option('value', today);
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
               },
               {
                   label: {
                       text: 'Repeat frequency Fields',
                   },
                   editorType: 'dxSwitch',
                   dataField: 'showAdditionalFields',
                   editorOptions: {
                       onValueChanged: (args: any) => {
                           const showAdditionalFields = args.value;
   
                           if (showAdditionalFields) {
                               // Add the "Enter value frequency" section
                               const valueFrequencyFieldIndex = form.option('items').findIndex((item: any) => item.dataField === 'value_Frequency');
                               if (valueFrequencyFieldIndex === -1) {
                                   const valueFrequencyField = {
                                       label: {
                                           text: 'Enter value frequency',
                                       },
                                       editorType: 'dxNumberBox',
                                       dataField: 'value_Frequency',
                                       editorOptions: {
                                           onValueChanged: (innerArgs: any) => {
                                               localStorage.setItem('value_Frequency', innerArgs.value.toString());
                                           },
                                       },
                                   };
                                   form.option('items', [...form.option('items'), valueFrequencyField]);
                               }
   
                               // Add the "Select Frequency" section
                               const selectFrequencyFieldIndex = form.option('items').findIndex((item: any) => item.dataField === 'selectFrequency');
                               if (selectFrequencyFieldIndex === -1) {
                                   const selectFrequencyField = {
                                       label: {
                                           text: 'Select Frequency',
                                       },
                                       editorType: 'dxSelectBox',
                                       dataField: 'frequency_period',
                                       editorOptions: {
                                         searchEnabled:"true",
                                           dataSource: [
                                               { value: 'Daily', text: 'Daily' },
                                               { value: 'Weekly', text: 'Weekly' },
                                               { value: 'Monthly', text: 'Monthly' },
                                               { value: 'Yearly', text: 'Yearly' },
                                           ],
                                           displayExpr: 'text',
                                           valueExpr: 'value',
                                           onValueChanged: (innerArgs: any) => {
                                               localStorage.setItem('frequency_period', innerArgs.value || '');
                                           },
                                       },
                                   };
                                   form.option('items', [...form.option('items'), selectFrequencyField]);
                               }
   
                               // Add the "Repeat End Date" section
                               const repeatEndDateFieldIndex = form.option('items').findIndex((item: any) => item.dataField === 'repeatEndDate');
                               if (repeatEndDateFieldIndex === -1) {
                                   const repeatEndDateField = {
                                       label: {
                                           text: 'Repeat End Date',
                                       },
                                       dataField: 'repeatEndDate',
                                       editorType: 'dxDateBox',
                                       editorOptions: {
                                           width: '100%',
                                           type: 'date',
                                           displayFormat: 'dd-MM-yyyy',
                                           onValueChanged: (innerArgs: any) => {
                                             const selectedRepeatEndDate = innerArgs.value;
                                             const endDate = form.getEditor('endDate').option('value');
                                             if (endDate && selectedRepeatEndDate && selectedRepeatEndDate < endDate) {
                                               // Show validation message for invalid date
                                               form.getEditor('repeatEndDate').option('isValid', false);
                                               form.getEditor('repeatEndDate').option('validationError', 'Please enter a valid Repeat End Date.');
                                           } else {
                                               // Reset validation message
                                               form.getEditor('repeatEndDate').option('isValid', true);
                                               form.getEditor('repeatEndDate').option('validationError', '');
                                           }
                                                
                                             
                                       localStorage.setItem('repeatEndDate', innerArgs.value.toISOString().slice(0, 10));
                                               // You can perform further actions here if needed
                                               
                                           },
                                       },
                                       validationRules: [{
                                         type: 'custom',
                                         validationCallback: (params: any) => {
                                             const selectedRepeatEndDate = params.value;
                                             const endDate = form.getEditor('endDate').option('value');
                                             return !endDate || !selectedRepeatEndDate || selectedRepeatEndDate >= endDate;
                                         },
                                         message: 'Please enter Repeat End Date must be above the end date.',
                                     }],
                                   };
                                   form.option('items', [...form.option('items'), repeatEndDateField]);
                               }
                           } else {
                               // Remove the fields if showAdditionalFields is false
                               form.option('items', form.option('items').filter((item: any) =>
                                   item.dataField !== 'value_Frequency' &&
                                   item.dataField !== 'selectFrequency' &&
                                   item.dataField !== 'repeatEndDate'
                               ));
                           }
                       },
                   },
               },
           ]);
   
           this.zone.run(() => {
               this.ref.detectChanges();
           });
       }, 0);
   };
   
   
       
     scheduleAssessment(startDate: Date, endDate: Date) {
    
       console.log('Scheduled Assessment:', {
           startDate: startDate.toISOString().slice(0, 10),
           endDate: endDate.toISOString().slice(0, 10),
       });
   }
     
     
     gridBox_displayExprExemptionUser(usR_ID:any) {
    
       return usR_ID && `${usR_ID.firstname} `;
       }
       formSubmitted = false;
   
 
 
 
 
     saveScheAssessment() {
  
     
 
      if (this.AssessmentForm.valid) {
  
      
     
 
       const MapUserId: number[] = this.AssessmentForm.value.MapUserList?.map((user: any) => user.usR_ID) || [];
       //const SubCatDoc: number[] = this.AssessmentForm.value.DocumentSubCategory?.map((data: any) => data.doc_SubCategoryID) || [];
 
 
 
       const formData = {
         
        ass_template_id:this.AssessmentForm.value.assessment_name.toString(),
        userid:this.AssessmentForm.value.requester_name.toString(),
        Duration_of_Assessment:this.AssessmentForm.value.Duration_of_Assessment.toString(),
        startDate:this.AssessmentForm.value.startDate,
        endDate:this.AssessmentForm.value.endDate,
        DocTypeID: this.AssessmentForm.value.DocumentType,      
        Doc_CategoryID: this.AssessmentForm.value.DocumentCategory,
        Doc_SubCategoryID: [this.AssessmentForm.value.DocumentSubCategory],
        Entity_Master_id: this.EntityID,
        Unit_location_Master_id: this.unitLocId,
        Shuffle_Answers: this.AssessmentForm.value.ShuffleAns,
        Department_Master_id: this.AssessmentForm.value.DepMaster,
        Shuffle_Questions: this.AssessmentForm.value.ShuffleQues,
        objective: this.AssessmentForm.value.Objective,
        message: this.AssessmentForm.value.Message,
        defaultkey: this.defaultKey.toString(),
         
         Exemption_user:this.selectedOption2,
         Exemption_user_reason:this.AssessmentForm.value.ExemptedReason,
    
         login_userid:localStorage.getItem('USERID'),
         mapped_user:MapUserId,
    
       };
       
      
      
      
        // alert(JSON.stringify(formData));
        // Handle form submission or API call here
      
        this.http.post(URL + '/SetAssessment/insertOnetimeFrequencyForExternal',formData).subscribe((response: any) => {
        
          console.log('Data Save Succefully ', response);
          // Handle the response from the server if needed
         
          const message = "External One Time Frequency Data Saved Successfully.";
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message},
           
          });
          this.stepperRef=false;
         
          this.resetForm();
          this.gettingSchedulerDataFun();
          this.repeatFreq=false;
          this.visibleForm=false;
          this.VisibleCalender=true;
          setTimeout(()=>{ location.reload();},2000)
         
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
 
     selectedlisttoremove(e: any) {
      
       if (!e || !e.value) {
        
         return; // Return early if e or e.value is undefined
     }
 
     // Extract 'usR_ID' from each selected item and store it in an array
     const selectedIds = e.value.map((item: any) => item?.usR_ID).filter((id: any) => id); // Filter out undefined or falsy values
 
     // If selectedIds is an empty array, handle it accordingly
     if (selectedIds.length === 0) {
     //  alert("ok")
         return;
     }
 
     // Perform any necessary operations with selectedIds
    
 
    this.selectedOption2=selectedIds;
   // alert(this.selectedOption2)
     // Trigger change detection manually
     this.ref.detectChanges();
   
      
   }
   subDocTypesChanged(e:any){
     this.selectedDocSubCat=e.value;
         console.log("sub Doc types Selected Values",e);
       
       }
 
       
    getsubDocTypes(event: any) {
    
     this.Doc_CategoryID = event.value;
     console.log("selected doc Cat id: ", this.Doc_CategoryID);
   
   this.getSubCatDoc();
    
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
 
 
 toggleFrequencyFields(event: any): void {
  
   this.repeatFreq = event.value;
 }
 
 
 
 calculateRepeatCycles() {
   const endDate = new Date(this.AssessmentForm.get('endDate')?.value);
   const frequencyValue = this.AssessmentForm.get('value_Frequency')?.value || 1;
   const frequencyPeriod = this.AssessmentForm.get('frequency_period')?.value;
 
   if (endDate && frequencyPeriod) {
     let minDate = new Date(endDate);
     switch (frequencyPeriod) {
       case 'Daily':
         minDate.setDate(minDate.getDate() + frequencyValue);
         break;
       case 'Weekly':
         minDate.setDate(minDate.getDate() + frequencyValue * 7);
         break;
       case 'Monthly':
         minDate.setMonth(minDate.getMonth() + frequencyValue);
         break;
       case 'Yearly':
         minDate.setFullYear(minDate.getFullYear() + frequencyValue);
         break;
     }
     // Set the minimum date for repeatEndDate
     this.repeatMinDate = minDate.toISOString().slice(0, 10);
   }
 }
 resetForm() {
   
   this.AssessmentForm.reset({
    
     frequency_period: 'Daily',
     DepMaster:null,
     value_Frequency: '0', 
     Objective:'',
     Message:'',
     ShuffleQues: 0, 
     ShuffleAns: 0, 
    
   });
 }
 
 
 onScheduling(){
  
   this.visibleForm=true;
   this.VisibleCalender=false;
   this.stepperRef=false;
 }
 
 onAssessmentSelected(event: any): void {
   if (event.selectedRowsData && event.selectedRowsData.length > 0) {
     this.selecteAssessment = event.selectedRowsData[0].ass_template_id; // Update the selected value
     this.isGridBoxOpened = false; // Close the dropdown
   }
 }
 
 AddSuggestions(){
   let suggestionsArray = this.AssessmentForm.get('RemarksList') as FormArray;
   if ( suggestionsArray.length>8) {
     this.AddButtonVisible=false;
   }
    (this.AssessmentForm.get('RemarksList') as FormArray).push(
     new FormControl(null, Validators.required)
   );
   
   
 }
 
 
 removeSuggestion(i: number): void {
   let suggestionsArray = this.AssessmentForm.get('RemarksList') as FormArray;
   if (i > 0 && i < suggestionsArray.length) {
     suggestionsArray.removeAt(i);
    
     this.AddButtonVisible=true;
 
   }
 }
 updateUsers(){
 
  this.usersNames = this.AssessmentForm.value.MapUserList?.map((user: any) => user.firstname) || [];
 
}
 
 addSuggestion() {
   const remarkGroup = this.fb.group({
     noOfDays: [1,], // Number input
    // alertTrigger: [null], // Select box
     defaultNotifier: [""] // Textarea
   });
  
   this.RemarksList.push(remarkGroup);
 }

 onGridBoxOptionChanged(e:any) {
   
    
  if (e.name === 'value') {
    this.DropdownValue=e.value;
//alert(e.value);
    this.isGridBoxOpened = false;
    this.ref.detectChanges();
   let defaultkey=e.value;
   this.defaultKey=e.value.toString();
  
   localStorage.setItem('defaultkey',defaultkey);

   this.http.get(URL + '/SetAssessment/GetActiveSchedulesAssessmentByID/'+defaultkey, {headers})
    .subscribe((response: any) => {
     // alert(JSON.stringify(response))
      if (Array.isArray(response) && response.length > 0) {
        // Data is an array and has at least one element
        const Assessment = response[0]; // Access the first element of the array
        this.getdepartment(Assessment.unit_location_Master_id);
        this.message=Assessment.tpaenitydescription;
        this.AssessmentForm.controls['EntityMaster'].patchValue (Assessment.entity_Master_Name);
        this.AssessmentForm.controls['UnitLoc'].patchValue (Assessment.unit_location_Master_name);
         this.AssessmentForm.controls['requester_name'].patchValue (Assessment.requstingperson);
       this. unitLocId=Assessment.unit_location_Master_id;
       this.EntityID=Assessment.entity_Master_id;
       this.ref.detectChanges();
 this.stepperRef=true;
        
      } else {
    
      }
      
    },
    (error: any) => {
     
  
    });
  

  
   // alert(e.value)
 }
}


gridBox_displayExprNew(item: any) {

  return item.assessor_name;
 }


 
onViewButtonClickNew(rowData: any) {
  // Handle the click event, you can show the container or perform other actions here
  this.selectedRowData = rowData;
  // Select the row if needed
   this.SelectedQuestion = [rowData.question_id];
  
   this.TempGridColumns=this.gridColumnsNew;
   this.gridColumnsNew= this.containerColumnsNew ; 
  this.isContainerVisible = true;
  
  
}

showGridAndHideContainer() {

  this.gridColumnsNew= this.TempGridColumns ; 
  this.ref.detectChanges();
 
  this.isContainerVisible=false;
 
 
}
    exportGrid(e:any) {
      if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        worksheet.addRow(['List Of External Scheduled Assessments']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ListOfExternalScheduledAssessments.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("List of External Scheduled Assessments", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('ListOfExternalScheduledAssessments.pdf');
        });
      }
    
    // else {
    //   const workbook = new Workbook(); 
    //   const worksheet = workbook.addWorksheet("Main sheet"); 
    //   worksheet.addRow(['List Of Scheduled Assessments']);
    //   worksheet.addRow([]);
    //   exportDataGrid({ 
    //     worksheet: worksheet, 
    //     component: e.component,
    //   }).then(function() {
    //     workbook.csv.writeBuffer().then(function(buffer) {
    //       saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ListOfScheduled Assessments.csv");
    //     });
    //   }); 
    //   e.cancel = true;
    // } 
  }    

}
