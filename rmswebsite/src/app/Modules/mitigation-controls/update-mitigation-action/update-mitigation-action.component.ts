
//import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { LoadResult } from 'devextreme/common/data/custom-store';
import Chart from 'chart.js/auto';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import ArrayStore from 'devextreme/data/array_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { Router } from '@angular/router';
import { MatStepperModule  } from '@angular/material/stepper';
import {  AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpHeaders } from '@angular/common/http';
const URL = BASE_URL;
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { HttpClient, HttpParams } from '@angular/common/http';
const headers = new HttpHeaders();
import {SuggestionsModel} from 'src/app/inspectionservices.service';

headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-update-mitigation-action',
  templateUrl: './update-mitigation-action.component.html',
  styleUrls: ['./update-mitigation-action.component.scss']
})
export class UpdateMitigationActionComponent {

  @ViewChild('stepper')
  stepper!: MatStepper;
  Status1:boolean=false;
  Status2:boolean=false;
  secondStepper:boolean=false;
  showOptions: boolean = false;
  today: Date = new Date();
  isAddtaskpopupVisible:boolean=false;
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
  mitigationForm:any;
  MitigationForm:any;
  SuggestionVisible:boolean=false;
  AddButtonVisible:boolean=true;
  selectedToggleValue: string = 'red';
  Suggestionsdata:any;
  AcknowledgedList:any;
  SelectedActionsForAcknowlwdge:any;
  UserIdValue:any;
  Responsers:any;
  TrackerId:any;
  gridColumnsforTasks: any[] = [
    {
      dataField: 'suggestions',
      caption: 'Mitigation Task'
    },
    {
      dataField: 'suggester_Name',
      caption: 'Assessor'
    },
    {
      // dataField: 'acknowledge',
      caption: 'Acknowledge',
      cellTemplate:'acknowledgeCheckboxTemplate'
      
    },
    {
      dataField: 'status',
      caption: 'Status'
    },
     
    {
      caption: 'Actions',
      cellTemplate: 'SumitButtonTemplate'
    }
   
  
  ];


  gridColumnsforUpdate: any[] = [
    {
      dataField: 'suggestions',
      caption: 'Mitigation Task'
    },
    {
      dataField: 'suggester_Name',
      caption: 'Assessor'
    },
    
   
   
  
  ];




  AddTask:any[]=[
    {
      dataField: 'suggestions',
      caption: 'Mitigation Task'
    }
  ]



  SelectedTask:any;
  taskForm:FormGroup;
  selectedRowData:any;
  isContainerVisible:boolean=false;
  isPopupVisible:boolean=false;
  isRowSelected(): boolean {
    return this.SelectedTask.length > 0;
  }  










       AcknowledgedColumns=[ 
        {
        dataField: 'suggestions',
        caption: 'Suggestions'
            },   
             
           ]
      

       competencySkillLevelColumns=[ 
        {
        dataField: 'title_Doc',
        caption: 'Competency Check Level'
            },   {
              dataField: 'sub_title_doc',
              caption: 'Total Questions'
                  },  {
                    dataField: 'document_Id',
                    caption: 'Total Answered Questions'
                        },
           ]



           tempDataSource:any;


           ChooseOptions=[
            { id:1,text:"Add More Mitigation Action(s)"},
            { id:2,text:"No Additional Mitigation Action Required"}
          ];
          ChooseOptionsConformation=[
            { id:1,text:" Mitigation Action Required"},
            { id:2,text:"No Action Required"}
          ];
          chooseYesorNo=[
            { id:1,text:"Yes"},
            { id:2,text:"No"}
          ];

        
          selectedchange:boolean=false;
       
          gridDataSource:any;
          gridDataSource1:any;
          gridDataSource2:any;
          gridDataSource3: any;
          gridDataSource4:any;
          KeyImprovementsds:any;
          compotencygridData:any;
          subjecttopicgridData:any;
          gridBoxValue: number[] = [];
          isGridBoxOpened: boolean = false;
          NewTaskForm:FormGroup;
          comptencyskill:boolean=false;
          subjecttopic:boolean=false;
          overall:boolean=false;
          showTotalsPrior: boolean = true; 
          rowsDataFieldArea: boolean = true; 
          treeHeaderLayout: boolean = true;
          griddatajson1:any;
          canvas: any;
          ctx: any;
          scoreindicators:any[] = [];
          selectedRowKeys:any;
          selectedRowKeys1:any[] = [];
        
          keyImprovementsdatasource:any[]=[];
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

                      } ,{
                        dataField: 'verson_no',
                        caption: 'Version-No'
                            },
                      // {
                      //   dataField:'sug_status',
                      //   caption:'Mitigation Status'

                      // } ,
                       {
                              dataField: 'type_Name',
                              caption: 'Assessment Type'
                                  },{
                                    dataField: 'subType_Name',
                                    caption: 'Assessment SubType'
                                        },
                       {
                    dataField: 'competency_Name',
                    caption: 'Competency Skill Level'
                        },
                        {
                                dataField: 'assessementcompletedDate',
                                caption: 'Assessment Completed Date',
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
                                    },

                                    
               ]
        
              
        
        
        
        
                 
          griddatajson: any;





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
           ngOnInit() {









//Add Swggestions
            // this.mitigationForm=new FormGroup({
              
            //   Suggestions:new FormArray([
            //      new FormControl(null,Validators.required)
            //   ])
            // })
  

            this.MitigationActionOption = new ArrayStore({
              data: this.ChooseOptions,
              key: "ID"
            });

            this.MitigationActionAcknowledge = new ArrayStore({
              data: this.ChooseOptionsConformation,
              key: "ID"
            });

            this.RequiredManSuggestions=new ArrayStore({
              data:this.chooseYesorNo,
              key:"ID"
            });
          
          

         


         
           }

          

              


           constructor(public dialog: MatDialog,private router: Router,private http: HttpClient,private FB:FormBuilder,private cdr: ChangeDetectorRef,  private fb:FormBuilder,
          ) {

            this.taskForm=this.fb.group({
              SuggestionId:[''],
              Acknowledge:[''],
              ActionRequired:[''],
              
              Comments:[''],
              ManInputReq:[''],
              EndDate:[''],
              SelectPo:[''],
              Tentativedate:[''],
              selectedAssignee:[''],
              SuggestiveDoc:[''],
              FilePath:[''],
              taskStatus:[''],
             PoRemarks:[''],
             completed_date:[''],
             management_remarks:['']
            
            });

          



            this.NewTaskForm=this.fb.group({
              Task:[''],
             
           
            });

            const acknowledgeControl = this.taskForm.get('Acknowledge');
    if (acknowledgeControl) {
      acknowledgeControl.valueChanges.subscribe(value => {
        if (value === true) {
          // Show or enable additional fields
        } else {
          // Hide or disable additional fields
        }
      });
    }
  

            
//Grid Methods
// this.dataSource = new CustomStore({

//   key: 'suggestions_id',
//   load: () => this.sendRequest(URL + '/MitigationController/GetSuggestionsList/'+this.mitigations_id),
  
//   insert: (values) => this.sendRequest(URL + '/MitigationController/insertSuggestionsList/'+this.UserIdValue, 'POST', {
//       //values: JSON.stringify(values)
//       values
//   }),
//   update: (key, values) => this.sendRequest(URL + '/MitigationController/UpdateSuggestionsList', 'PUT', {
//        key,
//        //values: JSON.stringify(values)
//       values
//    }),
//    remove: (key) => this.sendRequest(URL + '/MitigationController/deleteSuggestionsList', 'DELETE', {
//        key
//    })
// });




this.gridDataSource = this.makeAsyncDataSource(this.http);
this.selectedchange=false;
this.comptencyskill=false;
              this.mitigationForm=this.fb.group({
                Assessment_id:[''],
                no_of_Users_Assigned:[''],
                no_of_Users_completed:[''],
                no_of_Users_incomplete:[''],
                no_of_Users_ass_Expired:[''],
                assessment_name:'',
                timealloted:[''],
                timetaken:'',
                doc_SubCategoryName:'',
                docTypeName:'',
                doc_CategoryName:'',
                key_Impr_Indicator_Name:'',
                Suggestions:new FormArray([
                  new FormControl(null,Validators.required)
               ]),
               scoreindicators:this.fb.array([]),
              });














//Creating Form Group Instance

this.MitigationForm= this.FB.group({
 
  action_required: ['', Validators.required],

  notify_management: [''], 
  input_date: [''],
  assign_responsibility:['', Validators.required],
  tentative_timeline:['', Validators.required],
  suggested_documents:[''],
  action_priority:['',Validators.required],
  comments:['']
})

//UserIdValue
const storedData:any = localStorage.getItem('user');
const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.UserIdValue=Userid;



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


getscoreindicators():FormArray{
  return this.mitigationForm.get('scoreindicators') as FormArray;
}
makeAsyncDataSource(http:HttpClient) {
  this.griddatajson
  return new CustomStore({
    loadMode: 'raw',
    key: 'trackerID',
    load() {
      return lastValueFrom(http.get(`${URL}/MitigationController/GetAssessmentsUpdate`, { headers }));
    },
  });
}
makeAsyncDataSource1(http:HttpClient,ass_tempid:any,uniqueid:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
    key: 'userID',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetUsersScoreCounts?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid, { headers }));
    },
  });
}
makeAsyncDataSource2(http:HttpClient,ass_tempid:any,uniqueid:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
  //  key: 'userID',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetCounts?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid, { headers }));
    },
  });
}
makeAsyncDataSource3(http:HttpClient,ass_tempid:any,uniqueid:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
   key: 'userAss_Ans_DetailsID',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetAssessmentResultsDetails?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid, { headers }));
    },
  });
}
makeAsyncDataSource4(http:HttpClient,ass_tempid:any,uniqueid:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
 //  key: 'userAss_Ans_DetailsID',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetScoreIndicators?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid, { headers }));
    },
  });
}
makeAsyncDataSourcekeyimp(http:HttpClient,score_id:any,Competency_id:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
   key: 'key_Impr_Indicator_id',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetScoreKeyImprovements?score_id='+score_id+"&&Competency_id="+Competency_id, { headers }));
    },
  });
}
makeAsyncDataSourcecomptency(http:HttpClient,ass_tempid:any,uniqueid:any) {
  //this.griddatajson1
  return new CustomStore({
    loadMode: 'raw',
   key: 'userid',
    load() {
      return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetComptencySkill?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid, { headers }));
    },
  });
}



onSelectionChanged(selectedItems: any[]) {
  this.selectedRowKeys1 = selectedItems.map(item => item.key_Impr_Indicator_id);
  

}

onGridBoxOptionChanged(e:any) {
 

  if (e.name === 'value') {

    localStorage.setItem('TrackerId',e.value);
 
    this.isGridBoxOpened = false;
    this.cdr.detectChanges();
this.selectedchange=true;
this.overall=true;

this.TrackerId=e.value;
   this.getTempId(e.value);
   this.secondStepper=true;
  this.secondgrid(e.value);
   
  // alert(localStorage.getItem('ass_template_id'))
localStorage.getItem('trackerID');
this.gridDataSource.load({ filter: ['trackerID', '=', e.value] }).then((data: any) => {
// Handle the retrieved data
if (Array.isArray(data) && data.length > 0) {
  // Access the first object in the array (assuming there's only one)
  const firstItem = data[0];
 console.log(JSON.stringify(firstItem));
 let ass_template_id:any=firstItem.ass_template_id;
 localStorage.setItem('ass_template_id',ass_template_id);
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
  

this.mitigationForm.controls['no_of_Users_Assigned'].setValue(response[0].no_of_Users_Assigned);
this.mitigationForm.controls['no_of_Users_incomplete'].setValue(response[0].no_of_Users_incomplete);

this.mitigationForm.controls['no_of_Users_completed'].setValue(response[0].no_of_Users_completed);

this.mitigationForm.controls['no_of_Users_ass_Expired'].setValue(response[0].no_of_Users_ass_Expired);

this.mitigationForm.controls['assessment_name'].setValue(response[0].assessment_name);
this.mitigationForm.controls['docTypeName'].setValue(response[0].docTypeName);

this.mitigationForm.controls['doc_CategoryName'].setValue(response[0].doc_CategoryName);

this.mitigationForm.controls['doc_SubCategoryName'].setValue(response[0].doc_SubCategoryName);



 
// alert(Getcounts.no_of_Users_Assigned)
  
// alert(JSON.stringify(Getcounts))



}


});

this.gridDataSource1 = this.makeAsyncDataSource1(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
this.gridDataSource2 = this.makeAsyncDataSource2(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
this.gridDataSource3 = this.makeAsyncDataSource3(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
this.gridDataSource4 = this.makeAsyncDataSource4(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
this.KeyImprovementsds = this.makeAsyncDataSourcekeyimp(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));

this.http.get(URL + '/ScheduleAssessementReviewController/GetScoreIndicators?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})
.subscribe((response: any) => {
//alert(JSON.stringify(response))
if (Array.isArray(response) && response.length > 0) 
{

let Getcounts:any = response[0] as any; // Access the first element of the array

console.log(JSON.stringify(Getcounts));

let scoreindicatorsarray=this.getscoreindicators();
scoreindicatorsarray.clear();
for(let i = 0; i < response.length; i++){

this.keyImprovementsdatasource.push(this.makeAsyncDataSourcekeyimp(this.http,response[i].score_id,localStorage.getItem('Competency_id')));
scoreindicatorsarray.push(this.fb.group({
key:i,
scoreIndicator:response[i].scoreIndicator,
key_Impr_Indicator_Name:'',
Remarks:''
}))
//this.mitigationForm.controls['key_Impr_Indicator_Name'].setValue(response[i].key_Impr_Indicator_Name);
}
}



});
//       this.http.get(URL + '/ScheduleAssessementReviewController/GetScoreKeyImprovements?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})
//       .subscribe((response: any) => {
//       //alert(JSON.stringify(response))
//         if (Array.isArray(response) && response.length > 0) 
//         {

//           let Getcounts:any = response[0] as any; // Access the first element of the array

//           console.log(JSON.stringify(Getcounts));

//    for(let i = 0; i < response.length; i++){
//     this.mitigationForm.controls['key_Impr_Indicator_Name'].setValue(response[i].key_Impr_Indicator_Name);
//    }


//         }
// this.scoreindicators=response;
// alert(this.scoreindicators)

//   });
let d1:any
this.http.get(URL + '/ScheduleAssessementReviewController/GetComptencySkill?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})
//this.http.get(URL + '/ScheduleAssessementReviewController/GetComptencySkilldummy' , {headers})
.subscribe((response: any) => {
d1=response;
//    alert(JSON.stringify(response))



this.compotencygridData = new PivotGridDataSource({
store: response,
fields:[
//   {
//     dataField: "userid",
//     area: "row",

// },
{
dataField: "firstname",
area: "row"

},
 {
      dataField: "skill_Level_Name",
      area: "column",
      caption: "Skill Level",
    
    },
{
  dataField: "type",
  area: "column",

  },
{
dataField: "no_of_Questions",
area: "data",
dataType: "number",
caption:"No.of.Qstns",
summaryType: 'sum',
//  groupName:"Easy"
},
{
dataField: "no_of_answered_Questions",
area: "data",
dataType: "number",
caption:"No.of.Answered.Qstns",
summaryType: 'sum',
//  groupName:"Easy"

},
{
dataField: "correctAnswers",
area: "data",
dataType: "number",
caption:"No.of.Answered.Correctly",
summaryType: 'sum',
//  groupName:"Easy"
},
{
dataField: "accuracyPercentage",
area: "data",
dataType: "number",
caption:"Accuracy%",
summaryType: 'sum',
//  groupName:"Easy"
},
// {
// dataField: "scoreindictor",
// area: "data",

// caption:"scoreindictor",
// summaryType: 'sum',
// //  groupName:"Easy"
// },
{
dataField: "scoreName",
area: "data",  // Move scoreName to the data section
caption: "Score Indicater Name",
summaryType: "max", // Forces it to display its value instead of counting
dataType: "string"
},


]
});
});

let ds:any
this.http.get(URL + '/ScheduleAssessementReviewController/GetSubjectTopic?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})

.subscribe((response: any) => {
ds=response;

this.subjecttopicgridData = new PivotGridDataSource({
  store: response,
  fields:[
  //   {
  //     dataField: "usR_ID",
  //     area: "row",

  // },
    {
    dataField: "firstname",
    area: "row"
},
{
  dataField:"subject_Name",
  area:"column"
},
{
  dataField:"topic_Name",
  area:"column"
},
{
  dataField: "no_of_Questions",
  area: "data",
  dataType: "number",
  caption:"No.of.Qstns",
  summaryType: 'sum',
//  groupName:"Easy"
},
{
dataField: "no_of_answered_qstns",
area: "data",
dataType: "number",
caption:"No.of.Answered.Qstns",
summaryType: 'sum',

},
{
dataField: "correctAnswers",
area: "data",
dataType: "number",
caption:"No.of.Answered.Correctly",
summaryType: 'sum',
//  groupName:"Easy"
},
{
dataField: "accuracyPercentage",
area: "data",
dataType: "number",
caption:"Overall Accuracy%",
summaryType: 'avg', 
//  groupName:"Easy"
},
// {
// dataField: "scoreIndicator",
// area: "data",

// caption:"scoreindictor",
// summaryType: 'sum',

// },
{
  dataField: "scoreIndicatorName",
  area: "data",  // Move scoreName to the data section
  caption: "Score Indicater Name",
  summaryType: "max", // Forces it to display its value instead of counting
  dataType: "string"
},


  ]
});
});

this.http.get(URL + '/MitigationController/GetTimeBarchatDetails?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid') , {headers})

.subscribe((response: any) => {
let TimeDetails=response;

const userid = TimeDetails.map((item: any) => item.usR_ID);
//const name = TimeDetails.map((item: any) => item.firstname);
const days = TimeDetails.map((item: any) => item.days);

this.createBarGraph(days, userid);
});






}
}
gridBox_displayExpr(item: any) {
// return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
return item.assessment_name;
}

createBarGraph(name: string[], days: number[]) {
// alert(name)
// alert(days)
const config =  new Chart('canvas', {
type: 'bar',
data: {

  datasets: [{
    label: 'Users',
    data: days,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }],
  labels: name
},
options: {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Days' 
      }
    },
    y: {
      beginAtZero: true,
      title:{
        display: true,
        text: 'Number of Users'
      } 
    }
  },

  responsive: true, 
maintainAspectRatio: false,

}
});
}
updateGridColumns(value: number): void {

if (value ==1){
// this.tempDataSource = this.gridColumns;
this.comptencyskill=true;
this.subjecttopic=false;
this.overall=false;

console.log((this.compotencygridData))
}
else if(value==2) {
this.subjecttopic=true;
this.comptencyskill=false;
this.overall=false;

}
else{
this.overall=true;
this.comptencyskill=false;
this.subjecttopic=false;


}
}
 







SuggestionRequired(e:any){
  if(e.value==1)
   {
     this.AdditionalAction=true;
   
  }
  else
  {
    this.AdditionalAction=false;
  }
}
AddSuggestions(){
  let suggestionsArray = this.mitigationForm.get('Suggestions') as FormArray;
  if ( suggestionsArray.length>=99) {
    this.AddButtonVisible=false;
   
   
  }
 

     
     if(this.mitigationForm.valid){
      this.mitigationForm.get('Suggestions').push(
        new FormControl(null,Validators.required)
      )}
      else{
        const message = "please fill the previous suggestion before adding New.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
      
  
    
 

    }
 
}
removeSuggestion(i: number): void {
  let suggestionsArray = this.mitigationForm.get('Suggestions') as FormArray;
  if (i > 0 && i < suggestionsArray.length) {
    suggestionsArray.removeAt(i);
    if(suggestionsArray.length<=10)
    this.AddButtonVisible=true;

  }
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

onSubmitSuggestions() {
  // Check if the form is valid
  if (this.mitigationForm.valid) {
    // Get the Suggestions form array
    const suggestionsArray = this.mitigationForm.get('Suggestions') as FormArray;

    // Get the values from the form array
    const suggestions = suggestionsArray.value;
//alert(suggestions)
    // Call your API endpoint to insert the suggestions
    this.sendSuggestionsToAPI(suggestions);
  } else {
    // Handle the case when the form is not valid
    console.log('Form is not valid');
  }
}

sendSuggestionsToAPI(suggestions: any[]) {
  // Replace 'YOUR_API_ENDPOINT' with the actual endpoint where you want to insert suggestions
  
let assessid=1;
  // Make a POST request to the API
  this.http.post(URL + '/MitigationController/AddedSuggestions/'+this.UserIdValue+"/"+assessid,suggestions,{headers})
  .subscribe((response: any) => {
    const message = "Suggestions Added Successfully.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
       
        });
        this.clearSuggestions();
  },
      (error) => {
        // Handle the API error if needed
        console.error('API Error:', error);
      }
    );
}

clearSuggestions() {
  const suggestionsArray = this.mitigationForm.get('Suggestions') as FormArray;
  suggestionsArray.clear();
 this.Acknowledgedlistview=true;
}

RequiredMoreSuggestions(e:any){
  if(e.value==1)
  {
    this.AddingMoreSuggestionsOption=true;
  
 }
 else
 {
 this.AddingMoreSuggestionsOption=false;
 }
}
RequiredManagementSuggestions(e:any){
  if(e.value==1)
  {
    this.VisibleExpiredDate=true;
  
 }
 else
 {
 this.VisibleExpiredDate=false;
 }
}


SubmitMitigationAction(){
  if( this.AdditionalAction==true){
    if (this.MitigationForm.valid) { 
      this.UpdateAction();
    
   
    const message = "Mitigation Action Saved Add New Mitigation Action.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
    this.MitigationForm.reset();
  this.SuggestionStepper=true;
  this.AcknowledgeStepper=false;
  if ( this.stepper) {  // Add a null check for this.stepper
    // Assuming you have two steps in your mat-stepper (indexes 0 and 1)
    this.stepper.selectedIndex = 1; // Set the index to navigate to the second step
  }
}else{
  const message = "Please Fill The form before save.";
  const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
    width: '550px',
    data: { message: message},
   
  });
}
       
  }
  else{
    if (this.MitigationForm.valid) { 
    this.UpdateAction();
    const message = "Mitigation Action Saved .";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
    this.MitigationForm.reset();
  }
  else{
    const message = "Please Fill The form before save.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
  }
}

}




UpdateAction(){

  let formData:any;
 let Status:any;
  if(this.taskForm.value.taskStatus=="completed"){
    Status="Assigned";
  }
  else{
    Status=this.taskForm.value.taskStatus
  }
  
  formData = {
    suggestions_id: this.SelectedTask,
   
    assign_responsibility: this.taskForm.value.SelectPo,
    tentative_timeline: this.taskForm.value.Tentativedate,
    PO_remarks:this.taskForm.value.PoRemarks,
    file_path:this.taskForm.value.FilePath,
    status:Status,
   
  };


  //   alert(JSON.stringify(formData))

      this.http.put(URL + '/MitigationController/UpdateSuggestion',formData,{headers})
      .subscribe((response: any) => {
       
const message="updated task successfully";
const dialogErrorRef=this.dialog.open(DaidailogeComponent,{
  data:{
message:message},
width:'550px',
  
})
this.taskForm.reset();

this.tempDataSource=this.gridColumnsforTasks;
   this.gridColumnsforTasks=this.gridColumnsforUpdate;
   this.gridColumnsforUpdate=this.tempDataSource;
  
 this.isPopupVisible = false;
this.secondgrid(this.TrackerId);

      }, (err) => {
        const message = "Error Saving Data.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
      
 
   })
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
              .subscribe((res) => {
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

this.SuggestionsInfo.mitigations_id=this.mitigations_id;

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
//alert(JSON.stringify(this.SuggestionsInfo));
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

    const message = "Update Task Successfully";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
   

   
    // let gridlength:any=this.unacknowledgegrid(this.mitigations_id);
    // alert(gridlength.length);
    //   if (gridlength && gridlength.length >0) {
    //     this.showOptions = true;
    //   } else {
    //     window.location.reload();
    //   }
    
    
});

}


//method for no mitigation actions required 

NoMoreActionRequired(){

 
  this.http.post(URL+'/MitigationController/UpdateTrackerID/'+this.mitigations_id,{headers}).subscribe((data:any)=>{
    
    // console.log('API Response:', data);

    // const message = "Changes Sent to Management Successfully";
    // const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
    //   width: '550px',
    //   data: { message: message},
     
    // });
   //this.showOptions=true;
});

}




//second stepper grid function

secondgrid(e:any){

  this.cdr.detectChanges();
  const id=e;
 setTimeout(() => {
  this.dataSource = new CustomStore({

    key: 'suggestions_id',
    load: () => this.sendRequest(URL + '/MitigationController/UpdateBasedOnStatus/'+id),
    
    insert: (values) => this.sendRequest(URL + '/MitigationController/insertSuggestionsList/'+this.UserIdValue, 'POST', {
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
 }, 1000);
 this.cdr.detectChanges();
 
}



unacknowledgegrid(e:any){


  const id=e;
 
  this.dataSource = new CustomStore({

    key: 'suggestions_id',
    load: () => this.sendRequest(URL + '/MitigationController/UpdateBasedOnStatus/'+id),
    
    insert: (values) => this.sendRequest(URL + '/MitigationController/insertSuggestionsList/'+this.UserIdValue, 'POST', {
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


optionSelected(option: string) {
  // Do something based on the selected option
  console.log("Selected Option:", option);
 let check=option;
  if(check=='option1'){
   
    this.unacknowledgegrid(this.mitigations_id);
    this.showOptions=false;
  }
   else if(check=='option2'){
    this.NoMoreActionRequired();
    window.location.reload();
    this.showOptions=false;
  }
  else{
    window.location.reload();
    this.showOptions=false;
  }
 
}





onViewButtonClick(rowData: any) {

 
  this.selectedRowData = rowData;
//alert(JSON.stringify(this.selectedRowData));
if(this.selectedRowData.status!='completed'){
  this.Status1=true;
  this.Status2=false;
}
else{
  this.Status2=true;
  this.Status1=false;
}



if(this.selectedRowData.acknowledge==1){
  this.taskForm.get('Acknowledge')?.setValue('Yes');
}else this.taskForm.get('Acknowledge')?.setValue('No');
console.log('Before setting ActionRequired value:', this.taskForm.get('ActionRequired')?.value);
this.taskForm.get('ActionRequired')?.setValue(this.selectedRowData.action_required === 1 ? 'Mitigation Action Required' : 'No Action Required');
console.log('After setting ActionRequired value:', this.taskForm.get('ActionRequired')?.value);

console.log('Before setting ManInputReq value:', this.taskForm.get('ManInputReq')?.value);
this.taskForm.get('ManInputReq')?.setValue(this.selectedRowData.notify_management === 1 ? 'Yes' : 'No');
console.log('After setting ManInputReq value:', this.taskForm.get('ManInputReq')?.value);

this.taskForm.get('ActionRequired')?.setValue(this.selectedRowData.action_required);
this.taskForm.get('Comments')?.setValue(this.selectedRowData.remarks);

this.taskForm.get('EndDate')?.setValue(this.selectedRowData.input_date);
this.taskForm.get('selectedAssignee')?.setValue(this.selectedRowData.assignerName);
this.taskForm.get('SelectPo')?.setValue(this.selectedRowData.assign_responsibility);


this.taskForm.get('Tentativedate')?.setValue(this.selectedRowData.tentative_timeline);
this.taskForm.get('SuggestiveDoc')?.setValue(this.selectedRowData.suggested_documents);
this.taskForm.get('PoRemarks')?.setValue(this.selectedRowData.pO_remarks);
this.taskForm.get('FilePath')?.setValue(this.selectedRowData.file_path);
this.taskForm.get('taskStatus')?.setValue(this.selectedRowData.status);
this.taskForm.get('management_remarks')?.setValue(this.selectedRowData.management_remarks);
this.taskForm.get('completed_date')?.setValue(this.selectedRowData.completed_date);




  // Select the row if needed
 

   this.SelectedTask = rowData.suggestions_id;
   this.tempDataSource=this.gridColumnsforTasks;
   this.gridColumnsforTasks=this.gridColumnsforUpdate;
   this.gridColumnsforUpdate=this.tempDataSource;
  this.isContainerVisible = true;
  
  this.isPopupVisible = true;
}


addTask() {
 // alert("testing add row")
 this.isAddtaskpopupVisible=true;
 this.isContainerVisible = false;
  
 this.isPopupVisible = false;



}


InsertTask(){


let  form:any;
form={
  suggestions:this.NewTaskForm.value.Task,
  mitigations_id:this.mitigations_id,
}

  this.http.post(URL+"/MitigationController/insertSuggestionsList/"+this.UserIdValue,form,{headers}).subscribe((res:any)=>{

    const message="Inserted Successfully";
    const dialogErrorRef=this.dialog.open(DaidailogeComponent,{
      data:{message:message},
      width:'550px',
    })
    this.NewTaskForm.reset();
    this.isAddtaskpopupVisible=false;
 this.isContainerVisible = true;
  
 this.isPopupVisible = false;
this.secondgrid(this.mitigations_id);
  });
  

}

goBack(){
  this.NewTaskForm.reset();
  this.taskForm.reset();
  
this.tempDataSource=this.gridColumnsforTasks;
this.gridColumnsforTasks=this.gridColumnsforUpdate;
this.gridColumnsforUpdate=this.tempDataSource;
  this.isAddtaskpopupVisible=false;
this.isContainerVisible = true;

this.isPopupVisible = false;
this.secondgrid(this.TrackerId);
}





// onAcknowledgeChange(event: any): void {
//   const acknowledgeCheckbox = this.taskForm.get('Acknowledge');

//   if (acknowledgeCheckbox && acknowledgeCheckbox.value === true) {
//     // Enable all form controls
//     this.taskForm.enable();
//   } else {
//     // Disable all form controls except Acknowledge checkbox
//     this.taskForm.controls['Acknowledge'].enable(); // Enable Acknowledge checkbox
//     this.taskForm.disable({ onlySelf: true, exclude: ['Acknowledge'] }); // Disable all other controls
//   }
// }


enableAllControls(): void {
  this.taskForm.enable();
}

disableAllControlsExceptAcknowledge(): void {
  Object.keys(this.taskForm.controls).forEach(controlName => {
    if (controlName !== 'Acknowledge') {
      this.taskForm.controls[controlName].disable();
    }
  });
}
dateFilter = (date: Date | null): boolean => {
  if (!date) {
    return false; // Return false for null dates
  }
  const day = date.getDay();
  // Disable weekends (Saturday = 6, Sunday = 0)
  return day !== 0 && day !== 6 && date >= this.today;
};
      exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Assessment Answer Details']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "AssessmentAnswerDetails.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("Assessment Answer Details", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('AssessmentAnswerDetails.pdf');
      });
    }
  
  
  
}
      exportGrid1(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Assessment Performance Details']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Assessment Performance Details.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("Assessment Performance Details", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Assessment Performance Details.pdf');
      });
    }
  
  
  
}
}
