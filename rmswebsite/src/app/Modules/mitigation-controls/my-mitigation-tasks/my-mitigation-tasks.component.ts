
import { lastValueFrom } from 'rxjs';
import Chart from 'chart.js/auto';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import ArrayStore from 'devextreme/data/array_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';              
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

import { MatStepper } from '@angular/material/stepper';
import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpHeaders } from '@angular/common/http';
const URL = BASE_URL;
import { HttpClient, HttpParams } from '@angular/common/http';
const headers = new HttpHeaders();
import {SuggestionsModel} from 'src/app/inspectionservices.service';

headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-my-mitigation-tasks',
  templateUrl: './my-mitigation-tasks.component.html',
  styleUrls: ['./my-mitigation-tasks.component.scss']
})
export class MyMitigationTasksComponent {
 
  selectedFile!: File;

isPopupVisible: boolean = false;

suggestions_id:any;

@ViewChild('mainFileInput') mainFileInput!: ElementRef;
mainFile: File | null = null;
visibleGrid:boolean=false;
erroMessage: any; 
pO_remarks: string = '';
resizingModes = ['nextColumn', 'widget'];
maxFiles: number = 1; 
maxSize: number = 5 ; 
loadingConfig: boolean = true;
maxDocuments: number = 1;  
  maxSizeInMB: number = 5;
  isMainFileUploaded = false;
  allowedFileTypes: string = '';
  FileTypes: string = '';

columnResizingMode = this.resizingModes[0];
@ViewChild('stepper')
stepper!: MatStepper;
TotalSuggestionsGrid:boolean=true;
Acknowledgedlistview:boolean=false;
AddingMoreSuggestionsOption:boolean=false;
VisibleExpiredDate:boolean=false;
AdditionalAction:boolean=false;
AcknowledgeStepper:boolean=true;
SuggestionStepper:boolean=false;
ChooseOptionsformoresuggestions:any;
MitigationActionOption:any;
MitigationActionAcknowledge:any;
RequiredManSuggestions:any;
ResponibleUsersdata:any;
taskForm: FormGroup;

SuggestionVisible:boolean=false;
AddButtonVisible:boolean=true;
selectedToggleValue: string = 'red';
Suggestionsdata:any;
AcknowledgedList:any;
SelectedActionsForAcknowlwdge:any;
UserIdValue:any;
Responsers:any;
selectedchange:boolean=false;
  gridDataSource:any;
gridBoxValue: number[] = [];
 isGridBoxOpened: boolean = false;
 
        gridColumns=[ 
          {
            dataField: 'uq_ass_schid',
            caption: 'Assessment ID'
                },    
               {
                dataField: 'assessment_name',
                caption: 'Assessment Name'
                    },  
                    {
                      dataField:'trackerID',
                      caption:'TrackerID'

                    } ,
                     {
                            dataField: 'type_Name',
                            caption: 'Assessment Type'
                                },{
                                  dataField: 'subType_Name',
                                  caption: 'Assessment SubType'
                                      },{
                                        dataField: 'verson_no',
                                        caption: 'Version-No'
                                            },
                     {
                  dataField: 'competency_Name',
                  caption: 'Competency Skill Level'
                      },{
                        dataField: 'endDate',
                      caption: 'Assessment End Date',
                     
                        calculateCellValue: function(data:any) {
                          if (data.created_date) {
                            const date = new Date(data.created_date);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = date.toLocaleString('default', { month: 'short' });
                            const year = date.getFullYear();
                            return `${day}-${month}-${year}`;
                          }
                          return null;
                        }
                      } 
             ]
              
        griddatajson: any;
        Trackerid:any;

        //Grid Variables
        selectedItemKeys: any[] = [];
        dataSource:any;
        SuggestionsInfo:SuggestionsModel=new SuggestionsModel();
        selectedResponsibility:any;
        responsableuser:any;
        Responsiblerdata:any;
        responsiblersdataarray:any;
        mitigations_id:any;
        ass_template_id:any;
      
         isContainerVisible:boolean=false;
//Task Grid Columns
SelectedTask:any;

selectedRowData:any;
TempGridColumns: any[]=[] ;
gridColumnsforTasks: any[] = [
     { dataField: 'uq_ass_schid',
            caption: 'Assessment ID'
  },
  {
    dataField: 'suggestions',
    caption: 'Mitigation Task'
  },
  {
    dataField: 'suggester_Name',
    caption: 'Assessor'
  },
  {
    dataField: 'status',
    caption: 'Status'
  },
  {
    dataField: 'acknowledger_Name',
    caption: 'Requested by'
  },
  {
    dataField: 'remarks',
    caption: 'Risk Controller Mitigation Remarks'
  },
  {
    dataField: 'tentative_timeline',
    caption: 'Tentative Due Date',
    dataType:'date',
                    format:'dd-MMM-yyyy'
  },
  {
    dataField: 'suggested_documents',
    caption: 'Suggested Documentary Support'
  },
    {
    dataField: 'aassessmentname',
    caption: 'Assessment Name',
    visible: false,
  },  {
    dataField: 'type_Name',
    caption: 'Assessment Type',visible: false,
  },
   {
    dataField: 'subType_Name',
    caption: 'Assessment Sub Type',visible: false,
  },
   {
    dataField: 'competency_Name',
    caption: 'Competency Skill Level',visible: false,
  },
   {
    dataField: 'trackerID',
    caption: 'Mitigation Tracker ID',visible: false,
  },
  {
    dataField: 'management_remarks',
    caption: 'Management Remarks'
  },
  {
    caption: 'Actions',
    cellTemplate: 'SumitButtonTemplate'
  }
 

];
  dataGrid: any;


//popup columns

gridColumnsforUpdate: any[] = [
      {
            dataField: 'uq_ass_schid',
            caption: 'Assessment ID'
                },
  {
    dataField: 'suggestions',
    caption: 'Mitigation Task'
  },
  {
    dataField: 'suggester_Name',
    caption: 'Assessor'
  },
  {
    dataField: 'status',
    caption: 'Status'
  },
  {
    dataField: 'acknowledger_Name',
    caption: 'Requested by'
  },
  {
    dataField: 'remarks',
    caption: 'Risk Controller Mitigation Remarks'
  },
  {
    dataField: 'management_remarks',
    caption: 'Management Remarks'
  },
  {
    dataField: 'tentative_timeline',
    caption: 'Tentative Due Date',
    dataType:'date',
                    format:'dd-MMM-yyyy'
  },
  {
    dataField: 'suggested_documents',
    caption: 'Suggested Documentary Support'
  }

 

];


tempDataSource:any;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  // You can access the selected file and perform actions here
  console.log('Selected file:', file);
}


isRowSelected(): boolean {
  return this.SelectedTask.length > 0;
}   





  constructor(public dialog: MatDialog,private router: Router,private http: HttpClient,private FB:FormBuilder,
    private ref: ChangeDetectorRef,private cdr: ChangeDetectorRef,  private fb:FormBuilder,
        ) {

          
//UserIdValue
const storedData:any = localStorage.getItem('user');
const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.UserIdValue=Userid;

          
//Grid Methods
this.dataSource = new CustomStore({

key: 'suggestions_id',
load: () => this.sendRequest(URL + '/MitigationController/GetSuggestionsList/'+this.mitigations_id),

insert: (values) => this.sendRequest(URL + '/MitigationController/insertSuggestionsList', 'POST', {
    //values: JSON.stringify(values)
    values
}),
update: (key, values) => this.sendRequest(URL + '/MitigationController/UpdateSuggestionsList', 'PUT', {
     key,
     //values: JSON.stringify(values)
    values
 }),
 remove: (key) => this.sendRequest(URL + '/MitigationController/deleteSuggestionsList', 'DELETE', {
     key
 })
});




this.gridDataSource = this.makeAsyncDataSource(this.http,this.UserIdValue);
this.selectedchange=false;

            this.taskForm=this.fb.group({
              SuggestionId:[''],
              FilePath:[''],
              
              PoRemarks:[''],
             
           
            });




//Creating Form Group Instance




 //Getting Suggestions Data          
  this.Suggestionsdata={
    paginate: true,
    store: new CustomStore({
        key: 'suggestions_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/MitigationController/GetSuggestionsList', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

  //Getting Responsible Users List
  this.ResponibleUsersdata={
   
    paginate: true,
    store: new CustomStore({
      
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/MitigationController/GetResponsersList', {headers})
            .subscribe(
              res => {
             (resolve(res));

            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
 
  this.http.get<any[]>(URL + '/MitigationController/GetResponsersList', {headers}).subscribe(
    (data: any[]) => {
    
    
      this.Responsers = data; // Assign fetched data to this.Responsers
      // Initialize Responsiblerdata after this.Responsers has been populated
      this.Responsiblerdata = new ArrayStore({
        data: this.Responsers,
        key: "usR_ID"
      });
    
    },
    error => {
      console.error('Error fetching responsible users data:', error);
    }
  );
 
  
}


onViewButtonClick(rowData: any) {
  // Handle the click event, you can show the container or perform other actions here
  this.selectedRowData = rowData;
 // alert(JSON.stringify(this.selectedRowData))
  // Select the row if needed
   this.SelectedTask = rowData.suggestions_id;
     
  this.tempDataSource=this.gridColumnsforTasks;
  this.gridColumnsforTasks=this.gridColumnsforUpdate;
  this.gridColumnsforUpdate=this.tempDataSource;
   
   
  this.isContainerVisible = true;
  
  this.isPopupVisible = true;
}

showGridAndHideContainer() {

 
  this.isContainerVisible=false;
 
 
}


makeAsyncDataSource(http:HttpClient,id:number) {
this.griddatajson
return new CustomStore({
  loadMode: 'raw',
  key: 'trackerID',
  load() {
    return lastValueFrom(http.get(`${URL}/MitigationController/GetAssessmentList/`+id, { headers }));
  },
});
}





onGridBoxOptionChanged(e:any) {


if (e.name === 'value') {

  localStorage.setItem('TrackerId',e.value);
  this.isGridBoxOpened = false;
  this.cdr.detectChanges();
this.selectedchange=true;

this.Trackerid=e.value;

 this.getTempId(e.value);
 this.secondgrid(e.value);

 
// alert(localStorage.getItem('ass_template_id'))
localStorage.getItem('ass_template_id');
this.gridDataSource.load({ filter: ['ass_template_id', '=', e.value] }).then((data: any) => {
// Handle the retrieved data
if (Array.isArray(data) && data.length > 0) {
// Access the first object in the array (assuming there's only one)
const firstItem = data[0];
console.log(JSON.stringify(firstItem));

let uq_ass_schid:any=firstItem.uq_ass_schid;
localStorage.setItem('uq_ass_schid',uq_ass_schid);
let Competency_id:any=firstItem.competency_id;
localStorage.setItem('Competency_id',Competency_id);

//this.Ass_ProvideAccess_form.controls['Assessment_id'].setValue (firstItem.assessment_name);

} });
this.http.get(URL + '/ScheduleAssessementReviewController/GetCounts?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})
.subscribe((response: any) => {
//alert(JSON.stringify(response))
if (Array.isArray(response) && response.length > 0) 
{

let Getcounts:any = response[0] as any; // Access the first element of the array

console.log(JSON.stringify(Getcounts));



// alert(Getcounts.no_of_Users_Assigned)

// alert(JSON.stringify(Getcounts))



}


});






this.http.get(URL + '/ScheduleAssessementReviewController/GetTimeBarchatDetails?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})

.subscribe((response: any) => {
let TimeDetails=response;

const userid = TimeDetails.map((item: any) => item.usR_ID);
//const name = TimeDetails.map((item: any) => item.firstname);
const days = TimeDetails.map((item: any) => item.days);


});


}
}
gridBox_displayExpr(item: any) {
// return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
return item.assessment_name;
}


//Acknowledge Suggestion Method
AcknowledgeSuggestion(){



if (this.SelectedActionsForAcknowlwdge.length === 0) {
  // Handle the case where no questions are selected
  return;
}

const payload =this.SelectedActionsForAcknowlwdge;
// alert(payload)



// Make an HTTP POST request to your API
this.http.post(URL+`/MitigationController/AcknowledgedSuggestions/`+this.UserIdValue,payload, { headers })
  .subscribe(response => {
    // Handle the API response as needed
    console.log('API Response:', response);

    const message = "Acknowledged Suggestions Successfully.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
    this.Acknowledgedlistview=true;
    this.TotalSuggestionsGrid=false;
    setTimeout(() => {
      this.AcknowledgedList={
        paginate: true,
        store: new CustomStore({
            key: 'acknowledge_suggestions_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/MitigationController/GetAcknowledgedSuggestionsList', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      
    }, 100);
  
  

   } )


}



onMainFileSelected(event: any) {
  const file: File = event.target.files[0]; 
  this.selectedFile = event.target.files[0]// Assuming you only want one file for the mainFile
  if (file) {
    if (file.size > this.maxSize * 1024 * 1024) {
      this.erroMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
      return;
    }
    // Check for allowed file types here if necessary
    this.mainFile = file; // Set the main file
   
    this.erroMessage = ''; 
    this.isMainFileUploaded = true; // Reset any previous errors
  }
}

sendSuggestionsToAPI(suggestions: any[]) {
  console.log(suggestions);
// Replace 'YOUR_API_ENDPOINT' with the actual endpoint where you want to insert suggestions
const formData: FormData = new FormData();
//console.log(formData);
formData.append("PO_remarks",this.pO_remarks);
if (this.mainFile instanceof File) { // Check if `this.mainFile` is a File object
  //alert(this.mainFile)
  formData.append('mainFile', this.mainFile, this.mainFile.name);
 
} else {
  // // Handle the error scenario
  // this.erroMessage ="Please Upload  Main Document file before submitting.";
  // console.error('No main file selected');
  // //invalidFields.push('Document Process Owner');
  // this.dialog.open(DaidailogeComponent, {
  //   width: '400px',
  //   data: { message: this.erroMessage }
  // });

     // Hide the popup after submitting
     this.isPopupVisible = false;
  

  return; // Exit the function if no main file was selected

  
}


// Make a POST request to the API
this.http.post(URL + '/MitigationController/updateTaskSuggestions/'+this.suggestions_id+"/",{headers})
.subscribe((response: any) => {
  const message = "Suggestions Added Successfully.";
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: message},
     
      });
     
},
    (error) => {
      // Handle the API error if needed
      console.error('API Error:', error);
    }
  );
}





UpdateAction(){
  

  if (this.taskForm && this.taskForm.valid) {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }
    const poRemarksValue = this.taskForm.get('PoRemarks')?.value;
    const file = this.taskForm.get('FilePath')?.value;
    const formData = new FormData();
    formData.append('suggestions_id', this.SelectedTask);
    formData.append('file', this.selectedFile);
    formData.append('PO_remarks', poRemarksValue);
    formData.append('status', 'completed');
    this.http.post(URL + '/MitigationController/updateTaskSuggestions', formData)
      .subscribe((response: any) => {
        const message = "Mitigation Action completed Successfully.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
       
        });
this.goBack();
       
    }, (err) => {
      const message = "Error Saving Data.";
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: message},
       
      });
   
 
 })
 
}
   }






//Grid Functions
onSelectionChanged1(data: any) {
this.selectedItemKeys = data.selectedRowKeys;
}


sendRequest(url: string, method: string = 'GET', data: any = {}): any {

let result;
  
switch(method) {
    case 'GET':
        return new Promise((resolve, reject) => {
          this.http.get(url, {headers})
            .subscribe(res => {
             (resolve(res));
            }, (err) => {
              reject(err);
            });
      });
        break;
    case 'PUT':
       this.updateParameters(data);
       return new Promise((resolve, reject) => {
        this.http.put(url,this.SuggestionsInfo,{headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
        });
        break;
    case 'DELETE':
          return new Promise((resolve, reject) => {
            this.http.delete(url+'?id='+data.key)
            .subscribe(res =>{
              (resolve(res));
            },(err) =>{
              reject(err);
            });
          })
          break;
    case 'POST':
       this.insertParameters(data);
       return new Promise((resolve, reject) => {
        this.http.post(url,this.SuggestionsInfo,{headers})
          .subscribe(res => {
           (resolve(res));
          }, (err) => {
            reject(err);
          });
        });
        break;
  
}



}

insertParameters(data:any={}){

this.SuggestionsInfo.suggestions_id=0;
this.params(data);
}

updateParameters(data:any={}){
this.SuggestionsInfo.suggestions_id=data.key;
this.params(data);
}
deleteParameters(data:any={}){
this.SuggestionsInfo.suggestions_id=data.key;
this.params(data);
}

params(data:any={}){
this.SuggestionsInfo.suggestions=data.values.suggestions;


this.SuggestionsInfo.remarks=data.values.remarks;

this.SuggestionsInfo.action_required=data.values.action_required;

this.SuggestionsInfo.notify_management=data.values.notify_management;
this.SuggestionsInfo.input_date=data.values.input_date;

this.SuggestionsInfo.acknowledge = data.values.acknowledge ? 1 : 0;

this.SuggestionsInfo.acknowledge_by=this.UserIdValue;

this.SuggestionsInfo.assign_responsibility = data.values.assign_responsibility?.usR_ID;

this.SuggestionsInfo.action_priority=data.values.action_priority;
this.SuggestionsInfo.tentative_timeline=data.values.tentative_timeline;

this.SuggestionsInfo.suggested_documents=data.values.suggested_documents;
//alert(JSON.stringify(this.SuggestionsInfo))
}
onAcknowledgeValueChanged(event: any) {

const selectedRow = event.row.data;
selectedRow.acknowledge = event.value ? 1 : 0;
// Convert boolean value to 1 (true) or 0 (false)

}
updateSelectedResponsibility(event: any) {

console.log('Editor prepared:', event);
this.selectedResponsibility=event.value;
}


getTempId(e:any){
const id=e;

this.http.get(URL+'/MitigationController/GetTemplateId/'+id, {headers})

.subscribe((response: any) => {
if (Array.isArray(response) && response.length > 0) {
  // Data is an array and has at least one element
  const PubList = response[0]; // Access the first element of the array
//   alert(JSON.stringify(PubList));
this.mitigations_id=PubList.mitigations_id;
this.ass_template_id=PubList.ass_template_id;
localStorage.setItem('ass_template_id',PubList.ass_template_id);

}
});
}

sendformanagement(){


this.http.post(URL+'/MitigationController/UpdateActionStatus/'+this.mitigations_id,{headers}).subscribe((data:any)=>{
  
  console.log('API Response:', data);

  const message = "Changes Sent to Management Successfully";
  const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
    width: '550px',
    data: { message: message},
   
  });
});

}




ActionSubmit(event:any){
   
      let formData:any;
       formData = {
         
      //  remarks: this.mitigationForm.value.Remarks,
      
        // acknowledge_by:this.UserIdValue,
          
     
        };
    //   alert(JSON.stringify(this.mitigations_id))
  
        this.http.post(URL + '/MitigationController/SubmitMitigationStatus/'+this.mitigations_id,formData,{headers})
        .subscribe((response: any) => {
          const message = "Submit Mitigation Remarks.";
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message},
           
          });
          window.location.reload();
        
         
        }, (err) => {
          const message = "Error Saving Data.";
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message},
           
          });
        
   
     })
      window.location.reload();
       }
  
  secondgrid(e:any){
    const id=e;
    this.visibleGrid=true;
   // alert(id)
    //Grid Methods
this.dataSource = new CustomStore({

  key: 'suggestions_id',
  load: () => this.sendRequest(URL + '/MitigationController/GetAllTaskDatabyUser?id='+id+"&&UserId="+this.UserIdValue),
  
  insert: (values) => this.sendRequest(URL + '/MitigationController/insertSuggestionsList', 'POST', {
      //values: JSON.stringify(values)
      values
  }),
  update: (key, values) => this.sendRequest(URL + '/MitigationController/UpdateSuggestionsList', 'PUT', {
       key,
       //values: JSON.stringify(values)
      values
   }),
   remove: (key) => this.sendRequest(URL + '/MitigationController/deleteSuggestionsList', 'DELETE', {
       key
   })
  });
  
  }



  goBack(){
   
    this.taskForm.reset();
    
  this.tempDataSource=this.gridColumnsforTasks;
  this.gridColumnsforTasks=this.gridColumnsforUpdate;
  this.gridColumnsforUpdate=this.tempDataSource;
   
  this.isContainerVisible = true;
  
  this.isPopupVisible = false;
  this.secondgrid(this.Trackerid);
  }
   exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['List Mitigation Action Plan']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "List Mitigation Action Plan.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("List Mitigation Action Plan", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('List Mitigation Action Plan.pdf');
      });
    }
  

} 
}
