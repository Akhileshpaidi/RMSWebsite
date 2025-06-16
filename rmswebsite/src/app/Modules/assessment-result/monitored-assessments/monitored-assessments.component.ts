import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { lastValueFrom } from 'rxjs';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import DataSource from 'devextreme/data/data_source';
import { scheduleAssessment } from 'src/app/inspectionservices.service';
import { SessionService } from 'src/app/core/Session/session.service';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-monitored-assessments',
  templateUrl: './monitored-assessments.component.html',
  styleUrls: ['./monitored-assessments.component.scss']
})
export class MonitoredAssessmentsComponent {
  userid:any;
  repeatMinDate: string | undefined;
  docCatName:string="";
  unitLoc:string="";
  entityName:string="";
  departmentNames:string="";
  docSubCat:string="";
  doctypeName:any="";
  visibleStepper:boolean=false;
  isGridBoxOpened: boolean = false;
  gridBoxValue: any[] = [];
  VisibleCalender:boolean=true;
  InternalType:any;
  dataSource: any;
  public defaultOption: number | undefined;
  AssessTemplateList:any;
  AssessmentForm: FormGroup;
  CreatedDate:any;
  PersonRequest:any;
  Doc_CategoryID: any;
  Selectedtopic: any;
  Documentsubcategory: any;
  docTypeID: any;
  Documentcategory:any;
  EntityID: any;
  selectedentity:any ;
  UnitMaster: any;
  unit_location_Master_id: any;
  Selecteduser: any;
  Departmentmaster: any;
  Useridvalue:any;
  // TemplateColumns: any = ['pagetype','firstname', 'uq_ass_schid','startDate','endDate','ass_template_id','schedule_Assessment_id',
  // 'created_date'];
  TemplateColumns: any[] = [
    {
      dataField: 'uq_ass_schid',
      caption: 'Assessment ID'
    },

    {
      dataField: 'pagetype',  //uq_ass_schid
      caption: 'Scheduled Assessment Category'
    },
    {
      dataField: 'firstname',
      caption: 'Assessor Name'
    },
  
   
    {
      dataField: 'startDate',
      caption: 'Start Date',
      dataType:"date",
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
      dataField: 'endDate',
      caption: 'End Date',
      dataType:"date",
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
      dataField: 'assessment_name',
      caption: 'Name of Assessment Template'
    },
    {
      dataField: 'created_date',
      caption: 'Created Date',
      dataType:"date",
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
      dataField:'status',
      caption:'status' 
      
    }

    
  ];
  userdata:any;
  gridDataSource:any[]=[];
  Name: any;
  Duration:any;
StartDate:any;
EndDate:any;
PersionRequesting:any;
ass_template_id:any;
RepeatEndDate:any;
DocumentTypeData:any;
EntityName:any;
selectedOption:any[]=[];
selectedDepartmentNames: string[] = [];
UserDataSource:any[] = [];
UserDatasource:any;
UserDatasourceforExcluded:any;
repetFre:any;
department_Master_id:any;
departmentColumns:any=['department_Master_name'];
selectedOption1:any[]=[];
selectedOption2:any[]=[];
isUserBoxOpened:boolean=false;
isIncludedUserBoxOpened:boolean=false;
usergridColumns: any = ['firstname'];
AssmentName:any;
minDate: Date;
repeatFreq:boolean=false;
isUserBoxOpened1:boolean;
public selecteddocapproverType: number | undefined;
AssessmentBuilderinfo:scheduleAssessment = new scheduleAssessment();

public defaultOption1: number | undefined;
  uq_ass_schid: any;
  frequencyOptions = [
    { value: 'Daily', text: 'Daily' },
    { value: 'Weekly', text: 'Weekly' },
    { value: 'Monthly', text: 'Monthly' },
    { value: 'Yearly', text: 'Yearly' }
  ];
  

  constructor(private http: HttpClient,private session: SessionService,private ref: ChangeDetectorRef,private formBuilder: FormBuilder,
    private zone: NgZone,
    public dialog: MatDialog){
      const storedData:any = localStorage.getItem('user');
      const parsedData = JSON.parse(storedData);
    
    //UserId
    const Userid = parsedData ? parsedData.profile.userid : null;
    console.log('User id:', Userid);
    this.Useridvalue=Userid;

    this.AssessmentForm = this.formBuilder.group({
      ass_template_id:[''],
      Date_Of_Request:[''], 
      Duration_of_Assessment:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      DocumentType:[''],
      DocumentCategory:[''],
      DocumentSubCategory:[''],
      EntityMaster:[''],
      UnitLoc:[''],
      objective:[''],
      message:[''],
      ShuffleQues:[''],
      ShuffleAns:[''],
      DepMaster:[''],
      MapUserList:[''],
      exemptionUser:[''],
      ExemptedReason:[''],
      tpaenitydescription:[''],
      docTypeName:[''],
      doc_CategoryName:[''],
      doc_SubCategoryName:[''],
      entity_Master_Name:[''],
      unit_location_Master_name:[''],
      defaultkey:[''],
      requester_name:[''],
      department_Master_id:[''],
      assessment_name:[''],
      uq_ass_schid:[''],
      repeatEndDate:[''],
      frequency_period:['Daily'],
      showAdditionalFields:[''],
      value_Frequency:['0']

      

    });


    this.dataSource = new DataSource({

     });
   this.minDate = new Date();
 
   this.isUserBoxOpened1=false;
   this.selecteddocapproverType=1;
   this.defaultOption=1;
   this.defaultOption1=1;

    this.http.get<any[]>(URL + '/userDetails/GetuserDetails', { headers })
    .subscribe(res => {
      this.UserDataSource = res;
  
  
     
    }, (err) => {
  
    });
  

    this.AssessTemplateList={
      paginate: true,
      store: new CustomStore({
          key: 'uq_ass_schid',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/SetAssessment/GetActiveScheduleAssessmentsByUser/'+this.Useridvalue, {headers})
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
            
              });
        });
        },
      }),
    };
    

    this.http.get<any[]>(URL + '/Assessment/GetActiveAssesment', { headers })
    .subscribe(res => {
      this.gridDataSource = res;
  console.log(JSON.stringify( this.gridDataSource))
 
     
    }, (err) => {
    
    });
            // check for status update 
            this.http.post(URL + '/BeginAssessementController/autoUpdateExpiredStatus', {})
            .subscribe((response: any) => {
              console.log('Data Updated Succefully ', response);
              // Handle the response from the server if needed
             // window.alert('Data Updated Successfully');
            
           
            },
            (error: any) => {
             
              window.alert('Error Saving Data');
            });
       
  

  }
  ngOnInit(): void {
    //  this.stepperNav1();
    //  this.stepperNav4();
    //  this.stepperNav2();
    //  this.stepperNav3();
      let user: any = this.session.getUser();
     //  console.log(user)
      this.userdata = JSON.parse(user);//userdata.profile.userid
      console.log("userid",this.userdata.profile.userid)
   localStorage.setItem('USERID',this.userdata.profile.userid);
   localStorage.getItem('USERID');
      this.userid=this.userdata.profile.userid;

     
      let formData1: any;
      formData1={
       
       userid:localStorage.getItem('USERID'),
uq_ass_schid:localStorage.getItem('uq_ass_schid'),
       
      
      };
      console.log(formData1)
      this.http.post(URL + '/BeginAssessementController/UpdateExpiredStatus',formData1)
      .subscribe((response: any) => {
        console.log('Data Updated Succefully ', response);
        // Handle the response from the server if needed
        //window.alert('Assessement Submitted Successfully');
      
     
      },
      (error: any) => {
       
        window.alert('Error Saving Data');
      }); 
    }
  gridBox_displayExpr(usR_ID:any) {
 
    return usR_ID && `${usR_ID.firstname} `;
    }

    gridBox_displayExprforIncluded(usR_ID:any) {
 
      return usR_ID && `${usR_ID.firstname} `;
      }
    gridBox_displayExprAssessment(schedule_Assessment_id: any) {

      return schedule_Assessment_id && `${schedule_Assessment_id.assessment_name} `;
     }

   
     gridBox_displayExprExemptionUser(usR_ID:any) {
  
      return usR_ID && `${usR_ID.firstname} `;
      }
    

      NextButtonClick(){
     
     
        this.InternalType = true;
        this.VisibleCalender=false;
       
    
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


 onAppointmentFormOpening = (data: any) => {

   const that = this;
   const form = data.form;
   let startDate = data.appointmentData.startDate;
   


 
   setTimeout(() => {
     form.option('items', [
       
       
       {
         label: {
           text: 'Assessment Name',
         },
         editorType: 'dxTextBox',
         dataField: 'assessment_name',
 
         editorOptions: {
          readOnly: true,
           valueExpr: 'ass_template_id',
           displayExpr: 'assessment_name',
 
           value:this.AssmentName,
    
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
         editorType: 'dxTextBox',
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
         },
       },
       {
         label: {
           text: 'Person Requesting ',
         },
         dataField: 'requester_name',
         editorType: 'dxTextBox',
      
         editorOptions: {
           readOnly: true,
           valueExpr: 'requstingperson',
           displayExpr: 'requester_name',
       
           
           value:this.PersonRequest,
       
         },
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
        editorType: 'dxSwitch', // Replace dxCheckBox with dxSwitch for a toggle button
        dataField: 'showAdditionalFields',
        editorOptions: {
          onValueChanged: (args: any) => {
            const showAdditionalFields = args.value;
      
            // Find the index of the "Enter value frequency" section in the form items
            const valueFrequencyFieldIndex = form.option('items').findIndex((item: any) => item.dataField === 'value_Frequency');
      
            const selectFrequencyFieldIndex = form.option('items').findIndex((item: any) => item.dataField === 'selectFrequency');
            const repeatEndDateFieldIndex = form.option('items').findIndex((item: any) => item.dataField === 'repeatEndDate');
       
            // Add the "Enter value frequency" section if not already present
            if (valueFrequencyFieldIndex === -1) {
              const valueFrequencyField = {
                label: {
                  text: 'Enter value frequency',
                },
                editorType: 'dxNumberBox',
                dataField: 'value_Frequency',
                visible: true,
                editorOptions: {
                  onValueChanged: (args: any) => {
                    const expectedDuration = parseInt(args.value, 10) || 0;
                    const newEndDate = new Date(startDate.getTime() + expectedDuration * 60 * 1000);
                    localStorage.setItem('value_Frequency', expectedDuration.toString());
                    this.Duration = localStorage.getItem('value_Frequency')!;
                  },
                },
              };
      
              form.option('items', [...form.option('items'), valueFrequencyField]);
            }
      
            // Add the "Select Frequency" section if not already present
            if (selectFrequencyFieldIndex === -1) {
              const selectFrequencyField = {
                label: {
                  text: 'Select Frequency',
                },
                editorType: 'dxSelectBox',
                dataField: 'frequency_period',
                editorOptions: {
                  dataSource: [
                    { value: '60', text: 'Daily' },
                    { value: '28', text: 'Weekly' },
                    { value: '6', text: 'Monthly' },
                    { value: '1', text: 'Yearly' },
                  ],
                  displayExpr: 'text',
                  valueExpr: 'value',
                  onValueChanged: (args: any) => {
                    const selectedFrequencyText = args.component?.option('displayValue'); // Get the selected text
      localStorage.setItem('frequency_period', selectedFrequencyText || ''); // Save the text to local storage
      this.Duration = localStorage.getItem('frequency_period')!;
      console.log('Selected Frequency Text:', selectedFrequencyText);
                  },
                },
              };
      
              form.option('items', [...form.option('items'), selectFrequencyField]);
            }

            

             
              if (showAdditionalFields && repeatEndDateFieldIndex === -1) {
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
                    onValueChanged: (args: any) => {
                      let selectedRepeatEndDate = args.value;
                   
      
                      localStorage.setItem('repeatEndDate', selectedRepeatEndDate.toISOString().slice(0, 10)); // Adjusted for date only
                      this.RepeatEndDate = localStorage.getItem('repeatEndDate')!;
      
                     // Calculate and repeat cycles based on frequency, frequency period, and duration
            const valueFrequency = parseInt(localStorage.getItem('value_Frequency') || '1', 10); // Default to 1 if not set
            const frequencyPeriod = localStorage.getItem('frequency_period') || '1'; // Default to '1' if not set
            const duration = parseInt(localStorage.getItem('Duration_of_Assessment') || '0', 10);
            const currentDate = form.getEditor('endDate').option('value'); // Use endDate as the start date for repeat cycles
            let nextRepeatStartDate = new Date(currentDate);
            let nextRepeatEndDate = new Date(selectedRepeatEndDate);
             let freq=0;
          
            // Calculate and repeat cycles based on frequency, frequency period, and duration
            while (freq < valueFrequency) {
              // Schedule assessment based on the calculated start and end dates
              this.scheduleAssessment(nextRepeatStartDate, nextRepeatEndDate);
              
              // Log scheduled assessment information for debugging
              console.log('Scheduled Assessment:', {
                  startDate: nextRepeatStartDate.toISOString().slice(0, 10),
                  endDate: nextRepeatEndDate.toISOString().slice(0, 10),
              });
          
              // Move to the next cycle start date based on frequency and frequency period
              if (frequencyPeriod === 'Daily') {
                nextRepeatStartDate.setDate(nextRepeatStartDate.getDate() + valueFrequency);
              } else if (frequencyPeriod === 'weekly') {
                  nextRepeatStartDate.setDate(nextRepeatStartDate.getDate() + valueFrequency * 7);
              } else if (frequencyPeriod === 'monthly') {
                  // Separate handling for monthly frequency
                  const currentMonth = nextRepeatStartDate.getMonth();
                  nextRepeatStartDate.setMonth(currentMonth + valueFrequency);
              } else if (frequencyPeriod === 'yearly') {
                  // Separate handling for yearly frequency
                  nextRepeatStartDate.setFullYear(nextRepeatStartDate.getFullYear() + valueFrequency);
              }
          
              // Update the end date for the next repetition
              nextRepeatEndDate = new Date(nextRepeatStartDate);
              nextRepeatEndDate.setDate(nextRepeatEndDate.getDate() + duration);
              freq++;
          }
          
                    },
                  },
                };
              
                form.option('items', [...form.option('items'), repeatEndDateField]);
              }


            
      
          },
        },
      }
      
      



     ]);
 
     this.zone.run(() => {
       this.ref.detectChanges();
     });
   }, 0);
 };
 getCurrentDate(): string {
  return new Date().toISOString().slice(0, 10);
}
getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are 0-based
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;// Format to YYYY-MM-DD for compatibility
}

updateEndDate(): void {
  let adjustDate = (date: Date | null | undefined) =>
    date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;
  
  const duration = this.AssessmentForm.get('Duration_of_Assessment')?.value;
  const startDate = this.AssessmentForm.get('startDate')?.value ? new Date(this.AssessmentForm.get('startDate')?.value) : null;

  
  if (startDate) {
    const newEndDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    this.AssessmentForm.get('endDate')?.setValue(adjustDate(newEndDate));
  }
}

onStartDateChange(event: any): void {
  const startDate = event.value;
  if (startDate) {
    this.AssessmentForm.get('startDate')?.setValue(this.formatLocalDate(new Date(startDate)));
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

 scheduleAssessment(startDate: Date, endDate: Date) {
  // Implement the logic to schedule assessments based on the provided start and end dates
  // For example, you can store the scheduled assessments or update your calendar data
  console.log('Scheduled Assessment:', {
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
  });
}

 onGridBoxOptionChanged(e: any) {
  if (e.name === 'value') {
      this.gridBoxValue = e.value;
      this.visibleStepper=true;
      this.isGridBoxOpened = false;
      
      let uq_ass_schid = e.value;
      this.includedUsers(uq_ass_schid);
     
      localStorage.setItem('uq_ass_schid', uq_ass_schid);
      
      this.http.get(URL + '/SetAssessment/GetActiveScheduleAssessmentsById/' + uq_ass_schid, { headers })
          .subscribe(async (response: any) => {
            // alert(JSON.stringify(response));
              if (Array.isArray(response) && response.length > 0) {
                  const Assessment = response[0];
                  
                  this.AssessmentForm.controls['docTypeName'].setValue(Assessment.docTypeID);
                  this.CreatedDate = Assessment.created_date;
                  this.PersonRequest = Assessment.requester_name;
                  this.AssmentName = Assessment.assessment_name;
                  this.doctypeName = Assessment.docTypeName; 
                  this.docCatName = Assessment.doc_CategoryName;  // Ensure exact property name
                  this.docSubCat = Assessment.doc_SubCategoryName;
                  this.entityName=Assessment.entity_Master_Name;
                  this.unitLoc=Assessment.unit_location_Master_name;
                  
                  this.department_Master_id =Assessment.department_Master_id;
                  this.excludedUsers(uq_ass_schid);
                  this.departmentNames=Assessment.department_Master_name;
               
                //  this.AssessmentForm.controls['uq_ass_schid'].setValue(Assessment.uq_ass_schid);
                  this.AssessmentForm.controls['requester_name'].setValue(Assessment.requester_name);
                  this.AssessmentForm.controls['objective'].setValue(Assessment.objective);
                  this.AssessmentForm.controls['message'].setValue(Assessment.message);
                  this.AssessmentForm.controls['assessment_name'].setValue(Assessment.assessment_name);
                  
                  this.AssessmentForm.controls['ShuffleQues'].setValue(Assessment.shuffle_Questions);
                  this.AssessmentForm.controls['ShuffleAns'].setValue(Assessment.shuffle_Answers);
                  //alert(JSON.stringify(this.AssessmentForm))
this.AssessmentForm.controls['startDate'].setValue(this.formatLocalDate(new Date(Assessment.startDate)));
this.AssessmentForm.controls['endDate'].setValue(this.formatLocalDate(new Date(Assessment.endDate)));

                  this.AssessmentForm.controls['Duration_of_Assessment'].setValue(Assessment.duration_of_Assessment);
                  this.AssessmentForm.controls['Date_Of_Request'].setValue(Assessment.date_Of_Request);
                  
                
                if(Assessment.pagetype==='internal Repeat frequency'){
                  this.repeatFreq=true;
                  this.AssessmentForm.controls['repeatEndDate'].setValue(Assessment.repeatEndDate);
                  this.AssessmentForm.controls['frequency_period'].setValue(Assessment.frequency_period);
                  this.AssessmentForm.controls['value_Frequency'].setValue(Assessment.value_Frequency);
                }
                else{
                  this.repeatFreq=false;
                  this.AssessmentForm.controls['repeatEndDate'].setValue(null);
                  this.AssessmentForm.controls['frequency_period'].setValue("Daily");
                  this.AssessmentForm.controls['value_Frequency'].setValue(0);
                }

              
                  this.getusers();
                




                  console.log("this is form data:",JSON.stringify(Assessment));
                  this.ref.detectChanges(); // Consider removing this line
              } else {
                  // Handle empty or no response case
              }
          },
          (error: any) => {
              // Handle error
          });
  }
}


    get options(): FormArray {
      return this.AssessTemplateList.get('options') as FormArray;
    }
    saveScheAssessment() {
 
     let Date_Of_Request=localStorage.getItem('Date_Of_Request');
     let Duration_of_Assessment= localStorage.getItem('Duration_of_Assessment');
     let startDate=localStorage.getItem('startDate');
     let endDate=localStorage.getItem('endDate');
    
     let formattereqDate:any
     let formattedStartDate:any;
     let formattedEndDate:any;
    
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
     
      if(this.repeatFreq===true){
        if(this.AssessmentForm.value.value_Frequency!=0 && this.AssessmentForm.value.repeatEndDate!=null){
          let value_Freq=this.AssessmentForm.value.value_Frequency.toString();
          let repEndDate=this.AssessmentForm.value.repeatEndDate;
         

      this.AssessmentBuilderinfo.value_Frequency =value_Freq;
      this.AssessmentBuilderinfo.repeatEndDate=repEndDate;
      this.AssessmentBuilderinfo.frequency_period = this.AssessmentForm.value.frequency_period;
      this.AssessmentBuilderinfo.Duration_of_Assessment = this.AssessmentForm.value.Duration_of_Assessment?.toString();
      // This may need conversion if stored as string
      
        this.AssessmentBuilderinfo.uq_ass_schid = this.AssessmentForm.value.uq_ass_schid;
        this.AssessmentBuilderinfo.Date_Of_Request =formattereqDate;
        this.AssessmentBuilderinfo.message = this.AssessmentForm.value.message;
        this.AssessmentBuilderinfo.objective = this.AssessmentForm.value.objective;
        this.AssessmentBuilderinfo.startDate =   this.AssessmentForm.value.startDate;
        this.AssessmentBuilderinfo.endDate =   this.AssessmentForm.value.endDate;
        this.AssessmentBuilderinfo.Shuffle_Questions = this.AssessmentForm.value.ShuffleQues;
        this.AssessmentBuilderinfo.Shuffle_Answers = this.AssessmentForm.value.ShuffleAns;
        
        this.AssessmentBuilderinfo.mapped_user = this.AssessmentForm.value.MapUserList.length > 0
        ? this.AssessmentForm.value.MapUserList.map((user: any) => user.usR_ID)
        : [];
    
    console.log("MapUserList form controller data", JSON.stringify(this.AssessmentForm.value.MapUserList));
    
    this.AssessmentBuilderinfo.Exemption_user = this.AssessmentForm.value.exemptionUser.length > 0
        ? this.AssessmentForm.value.exemptionUser.map((user: any) => user.usR_ID)
        : [];
    
    console.log("ExemptionUser form controller data", JSON.stringify(this.AssessmentForm.value.exemptionUser));
    
        //console.log(this.AssessmentBuilderinfo);

      
      
        // Handle form submission or API call here
    
        this.http.post(URL + '/SetAssessment/updateMonitoredAssessment/'+ this.gridBoxValue ,this.AssessmentBuilderinfo,{ headers })
       
        .subscribe((response: any) => {
        
          console.log('Data Save Succefully ', response);
          // Handle the response from the server if needed
         
          const message = "Monitored Assessment Updated Successfully.";
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message},
           
          });
          setTimeout(()=>{
            window.location.reload();
          },3000)
        
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
        const message = "Frequency Value and Repeat ende Date is Required.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message },
        });
      }
    }
    else{
     

      this.AssessmentBuilderinfo.Duration_of_Assessment = this.AssessmentForm.value.Duration_of_Assessment?.toString();
      // This may need conversion if stored as string
      
        this.AssessmentBuilderinfo.uq_ass_schid = this.AssessmentForm.value.uq_ass_schid;
        this.AssessmentBuilderinfo.Date_Of_Request =formattereqDate;
        this.AssessmentBuilderinfo.message = this.AssessmentForm.value.message;
        this.AssessmentBuilderinfo.objective = this.AssessmentForm.value.objective;
        this.AssessmentBuilderinfo.startDate =   this.AssessmentForm.value.startDate;
        this.AssessmentBuilderinfo.endDate =   this.AssessmentForm.value.endDate;
        this.AssessmentBuilderinfo.Shuffle_Questions = this.AssessmentForm.value.ShuffleQues;
        this.AssessmentBuilderinfo.Shuffle_Answers = this.AssessmentForm.value.ShuffleAns;
        
        this.AssessmentBuilderinfo.mapped_user = this.AssessmentForm.value.MapUserList.length > 0
        ? this.AssessmentForm.value.MapUserList.map((user: any) => user.usR_ID)
        : [];
    
    console.log("MapUserList form controller data", JSON.stringify(this.AssessmentForm.value.MapUserList));
    
    this.AssessmentBuilderinfo.Exemption_user = this.AssessmentForm.value.exemptionUser.length > 0
        ? this.AssessmentForm.value.exemptionUser.map((user: any) => user.usR_ID)
        : [];
    
    console.log("ExemptionUser form controller data", JSON.stringify(this.AssessmentForm.value.exemptionUser));
    
        //console.log(this.AssessmentBuilderinfo);

      
      
        // Handle form submission or API call here
    
        this.http.post(URL + '/SetAssessment/updateMonitoredAssessment/'+ this.gridBoxValue ,this.AssessmentBuilderinfo,{ headers })
       
        .subscribe((response: any) => {
        
          console.log('Data Save Succefully ', response);
          // Handle the response from the server if needed
         
          const message = "Monitored Assessment Updated Successfully.";
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message},
           
          });
          setTimeout(()=>{
            window.location.reload();
          },3000)
          
        
        },
        (error: any) => {
         
         
          const message = "Error Saving Data.";
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message},
           
          });
        });
      
    }
    
  }
      else{

// Map form controls to custom names for displaying in the error message
const customNames:any = {
 
  Duration_of_Assessment: 'Duration of Assessment',
  startDate: 'Start Date',
  endDate: 'End Date',

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


     
       
      //  const message = "invalid form.";
      //  const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      //    width: '550px',
      //    data: { message: message},
        
      //  });
       }
    }

    makeAsyncDataSource1(http:HttpClient,Doctypid:any) {
  
      return new CustomStore({
        loadMode: 'raw',
        key: 'docTypeID',
        load() {
          return lastValueFrom(http.get(URL+'/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+Doctypid, { headers }));
        },
      });
    }
  
    makeAsyncEntityDataSource1(http:HttpClient,Entyid:any) {
    
      return new CustomStore({
        loadMode: 'raw',
        key: 'entity_Master_id',
        load() {
          return lastValueFrom(http.get(URL+'/UnitLocationMaster/GetUnitLocationDetails/'+Entyid, { headers }));
        },
      });
    }

    makeAsyncDocCategorySource1(http:HttpClient,DocCatid:any) {
  
      return new CustomStore({
        loadMode: 'raw',
        key: 'Doc_CategoryID',
        load() {
          return lastValueFrom(http.get(URL+'/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+DocCatid, { headers }));
        },
      });
    }

  //   onDepartmentSelectionChange(event:any): void {
  //     const department_Master_id = event.value;
  //   this.selectedDepartmentNames = [];
  //   const selectedDepartments: number[] = [];
  //   this.UserDatasource={};
  //   for (const DepartmentId of department_Master_id) {
     
  //       selectedDepartments.push(DepartmentId);

  //   }
    
  //   this.department_Master_id = selectedDepartments;
  //  KC
    
  //   }

  includedUsers(uniqId:any){
    this.http.get<any[]>(URL+"/DepartmentMaster/GetUserDetailsByuniqId/"+uniqId).subscribe((res:any[])=>{
//alert(JSON.stringify(res));
this.UserDatasource=res;
    })
  }

  excludedUsers(uniqId: any) {
    if (!this.department_Master_id || this.department_Master_id.length === 0) {
        console.error('No department_Master_id values provided');
        return;
    }

    const queryParams = this.department_Master_id
      .map((id: any) => `USR_ID=${encodeURIComponent(id)}`)
      .join('&');
      
    const url = `${URL}/DepartmentMaster/GetExcludedUserDetailsById?${queryParams}&uniqId=${encodeURIComponent(uniqId)}`;

    console.log('Constructed URL:', url); // Log URL to ensure correct formatting

    this.http.get<any[]>(url, { headers })
      .subscribe(
        (res: any[]) => {
        
          this.UserDatasourceforExcluded = res;
        },
        (err) => {
          console.error('Error fetching data:', err);
        }
      );
}



    getusers():void{
      if (this.department_Master_id.length === 0) {
    
        return;
      }
      
      const queryParams = this.department_Master_id.map((id: any) => `USR_ID=${id}`).join('&');
    //alert(queryParams);
      this.http.get<any[]>(`${URL}/DepartmentMaster/GetUserDetailsById?${queryParams}`, { headers })
      .subscribe((res: any[]) => {
        console.log('Topic Data API Response:', res);
        // this.UserDatasource=res;
        //alert(JSON.stringify(res));
    
      }, (err) => {
        console.error('Error fetching data:', err);
      });
    }


    //Getting included Users Dropdown

    formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`; // always YYYY-MM-DD in local time
}


}
