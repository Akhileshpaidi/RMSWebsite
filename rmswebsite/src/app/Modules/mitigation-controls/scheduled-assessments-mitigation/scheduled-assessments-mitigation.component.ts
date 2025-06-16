import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
//import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { LoadResult } from 'devextreme/common/data/custom-store';
//import Chart from 'chart.js/auto';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js';
import { UsersListOfQuestionsComponent } from '../users-list-of-questions/users-list-of-questions.component';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-scheduled-assessments-mitigation',
  templateUrl: './scheduled-assessments-mitigation.component.html',
  styleUrls: ['./scheduled-assessments-mitigation.component.scss']
})
export class ScheduledAssessmentsMitigationComponent {
  
  MitigationActionOption:any;
  mitigationForm:any;
  SuggestionVisible:boolean=false;
  AddButtonVisible:boolean=false;
  selectedchange:boolean=false;
  selectedToggleValue: string = 'red';
  gridDataSource:any;
  gridDataSource1:any;
  gridDataSource2:any;
  gridDataSource3: any;
  gridDataSource4:any;
  KeyImprovementsds:any;
  compotencygridData:any;
  subjecttopicgridData:any;
  gridBoxValue: any;
  isGridBoxOpened: boolean = false;
  Useridvalue:number;
  
  comptencyskill:boolean=false;
  subjecttopic:boolean=false;
  overall:boolean=false;
  submitbtn:boolean=false;
  showTotalsPrior: boolean = true; 
  rowsDataFieldArea: boolean = true; 
  treeHeaderLayout: boolean = true;
  griddatajson1:any;
  canvas: any;
  ctx: any;
  scoreindicators:any[] = [];
  selectedRowKeys:any;
  selectedRowKeys1:any[] = [];
  gridDataSource6:any;
  keyImprovementsdatasource:any[]=[];
  endDate:any;
  gridColumns: any = [{dataField:'uq_ass_schid',caption:'Assessment ID'},'assessment_name', 'type_Name', 'subType_Name',
    'competency_Name',{dataField:'total_assigned_users',caption:'No of user Assgined', visible: false},{dataField:'completed_users',caption:'No of User Completed', visible: false},{dataField:'overallAssessmentStatus',caption:'Assessment Status'},
   ,{
      dataField: 'startDate',
      caption: 'Start Date',
      dataType:"date", format:'dd-MMM-yyyy'
    }
    
    ,
    {
      dataField: 'endDate',
      caption: 'End Date',
      dataType:"date", format:'dd-MMM-yyyy'
    },
    {
      dataField:'created_date',caption:'Assessement Scheduled Date',
      dataType:"date", format:'dd-MMM-yyyy'
}];

       competencySkillLevelColumns=[ 
        {
        dataField: 'title_Doc',
        caption: 'Competency Check Level'
            },   {
              dataField: 'total_questions',
              caption: 'Total Questions'
                  },  {
                    dataField: 'totalQuestionsAnswered',
                    caption: 'Total Answered Questions'
                        },
                        {
                          dataField: 'percentage',
                          caption: 'percentage'
                              },
           ]



           tempDataSource:any[]=this.competencySkillLevelColumns;


           ChooseOptions=[
            { id:1,text:"Suggest Mitigation Action"},
            { id:2,text:"No Mitigation Action Required"}
          ];
  griddatajson: any;
  chartInstance: Chart | null = null; // Store chart instance to destroy old ones
           ngOnInit() {

            // this.mitigationForm=new FormGroup({
            //   Suggestions:new FormArray([
            //      new FormControl(null,Validators.required)
            //   ])
            // }) 
             this.gridDataSource = this.makeAsyncDataSource(this.http);

            this.MitigationActionOption = new ArrayStore({
              data: this.ChooseOptions,
              key: "ID"
            });
          
           }

          

              


           constructor(private http: HttpClient,
            private ref: ChangeDetectorRef,
            private fb:FormBuilder,
            private router:Router,
            public dialog: MatDialog
            ){
//setting userid in local storage

const storedData:any = localStorage.getItem('user');
const parsedData = JSON.parse(storedData);

const Userid = parsedData ? parsedData.profile.userid : null;
  console.log('User id:', Userid);
  this.Useridvalue=Userid;





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
                overallremarks:'',
                action_required:['',Validators.required],
                Suggestions:new FormArray([
                  new FormControl(null)
               ]),
               scoreindicators:this.fb.array([]),
              });


            }
            
            getscoreindicators():FormArray{
              
              return this.mitigationForm.get('scoreindicators') as FormArray;
             
            }

            makeAsyncDataSource(http:HttpClient) {
              this.griddatajson
              return new CustomStore({
                loadMode: 'raw',
                key: 'uq_ass_schid',
                load() {
                  return lastValueFrom(http.get(`${URL}/ScheduleAssessementReviewController/GetCompletedScheduleAssesment`, { headers }));
                },
              });
            }
            makeAsyncDataSource1(http:HttpClient,ass_tempid:any,uq_ass_schid:any) {
              //this.griddatajson1
              return new CustomStore({
                loadMode: 'raw',
                key: 'userID',
                load() {
                  return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetUsersScoreCounts?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uq_ass_schid, { headers }));
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
            makeAsyncDataSource4(http:HttpClient,ass_tempid:any,uq_ass_schid:any) {
              //this.griddatajson1
              return new CustomStore({
                loadMode: 'raw',
             //  key: 'userAss_Ans_DetailsID',
                load() {
                  return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetScoreIndicators?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uq_ass_schid, { headers }));
                },
              });
            }
            makeAsyncDataSource6(http:HttpClient,ass_tempid:any,uq_ass_schid:any) {
              //this.griddatajson1
              return new CustomStore({
                loadMode: 'raw',      
             //  key: 'userAss_Ans_DetailsID',
                load() {
                  return lastValueFrom(http.get(`${URL}`+'/ScheduleAssessementReviewController/GetQuestionsUsersList?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uq_ass_schid, { headers }));
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
             // this.gridBoxValue=e.value;
  
              if (e.name === 'value') {
          
                this.isGridBoxOpened = false;
                this.ref.detectChanges();
this.selectedchange=true;
this.overall=true;

               let uq_ass_schid=e.value;
               localStorage.setItem('uq_ass_schid',uq_ass_schid);
               
              // alert(localStorage.getItem('ass_template_id'))
          localStorage.getItem('uq_ass_schid');
          this.gridDataSource.load({ filter: ['uq_ass_schid', '=', e.value] }).then((data: any) => {
            // Handle the retrieved data
            if (Array.isArray(data) && data.length > 0) {
              // Access the first object in the array (assuming there's only one)
              const firstItem = data[0];
             console.log(JSON.stringify(firstItem));
        
           let uq_ass_schid:any=firstItem.uq_ass_schid;
           localStorage.setItem('uq_ass_schid',uq_ass_schid);
           let ass_template_id:any=firstItem.ass_template_id;
           localStorage.setItem('ass_template_id',ass_template_id);
           
        let Competency_id:any=firstItem.competency_id;
        localStorage.setItem('Competency_id',Competency_id);
        let verson_no:any=firstItem.verson_no;
        localStorage.setItem('verson_no',verson_no);
this.endDate=firstItem.endDate;
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
    //  alert(localStorage.getItem('ass_template_id'))
    //  alert(localStorage.getItem('uq_ass_schid'))
      this.http.get(URL + '/ScheduleAssessementReviewController/GetTimeBarchatDetails?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid')  + "&timestamp=" + new Date().getTime(), {headers})
     
           .subscribe((response: any) => {
            let TimeDetails=response;
            
            const userid = TimeDetails.map((item: any) => item.usR_ID);
            //alert(userid)
            //const name = TimeDetails.map((item: any) => item.firstname);
            const days = TimeDetails.map((item: any) => item.days);
            this.ref.detectChanges(); // Force Angular to update UI
            this.createBarGraph(days,userid);
           });

      this.gridDataSource1 = this.makeAsyncDataSource1(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
      this.gridDataSource2 = this.makeAsyncDataSource2(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
      this.gridDataSource3 = this.makeAsyncDataSource3(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
      this.gridDataSource4 = this.makeAsyncDataSource4(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
      //this.KeyImprovementsds = this.makeAsyncDataSourcekeyimp(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
      this.gridDataSource6 = this.makeAsyncDataSource6(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'));
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
      no_of_users:response[i].no_of_users,
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
          dataField:"skill_Level_Name",
          area:"column"
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
  //   {
  //     dataField: "scoreindictor",// suggest by jasmeet
  //     area: "data",
 
  //     caption:"scoreindictor",
  //     summaryType: 'sum',
  //   //  groupName:"Easy"
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
            console.log(JSON.stringify(response))
           // Create a map to map scoreIndicator values (0, 100, etc.) to their corresponding names
    const scoreIndicatorMap = response.reduce((map: any, item: any) => {
      console.log("Mapping Item: ", item); // Log each item to ensure it has scoreIndicator and scoreIndicatorName
      map[item.scoreIndicator] = item.scoreIndicatorName; // Add the mapping (0 -> 'Disappointing', 100 -> 'Excellent')
      console.log("Map: ",map);
      return map;
     
    }, {});
    console.log("scoreIndicatorMap: ",scoreIndicatorMap);
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
      //   {
      //     dataField: "scoreIndicator", // suggest by jasmeet
      //     area: "data",
     
      //     caption:"scoreindictor",
      //     summaryType: 'sum',
        
      // },
      {
        dataField: "scoreIndicatorName",  
        area: "data",  // Move scoreName to the data section
        caption: "Score Indicater Name",
        summaryType: "max", // Forces it to display its value instead of counting
        dataType: "string"
      },
      // {
      //       dataField: "scoreIndicatorName",
      //       area: "data",
      //     dataType:"string" ,
      //     customizeText: function(cellInfo: any) {
      //       console.log("Cell Info Value: ", cellInfo); // Log the value being processed
      //       console.log("Cell Info Value: ", cellInfo.value); // Log the value being processed
            
      //       if (cellInfo.row && cellInfo.row.data) {
      //         const scoreIndicatorValue = cellInfo.row.data.scoreIndicator; // Access the scoreIndicator value from row data
      //         console.log("scoreIndicatorValue:", scoreIndicatorValue);

      //         // Check if the map contains this scoreIndicator and return the mapped value
      //         const mappedValue = scoreIndicatorMap[scoreIndicatorValue]; 
      //         console.log('Mapped Value:', mappedValue);

      //         // Return the mapped scoreIndicator name or fallback value
      //         return mappedValue || "No Label"; // If no mapping found, return "No Label"
      //       } else {
      //         console.error("Row data is undefined!");
      //         return "No Label";  // Fallback value if row data is missing
      //       }
      //     }
          
      //   },
      
        
              ]
            });
           });
        
         
     




      
        }
        }
        gridBox_displayExpr(item: any) {
          // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
          return item.assessment_name;
         }
         createBarGraph(days: number[], users: string[]) {
          // Destroy existing chart instance if it exists
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
        
          // Get canvas element
          const canvas = document.getElementById('canvas') as ChartItem;
          if (!canvas) {
            console.error("Canvas element not found!");
            return;
          }
        
          // Create new chart instance
          this.chartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
              labels: days.map(String), // Convert numbers to strings for labels
              datasets: [{
                label: 'Users',
                data: users.map(Number), // Convert user IDs to numbers if needed
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            },
            options: {
              indexAxis: 'x', // Ensure X-axis is categorical (days)
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Days' // X-axis represents "Days"
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Users' // Y-axis represents "Users"
                  }
                }
              },
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
        //  createBarGraph(name: string[], days: number[]) {
        //    //alert(name)
        //   // alert(days)
        //   // const config =  new Chart('canvas', {
        //   //   type: 'bar',
        //   //   data: {
            
        //   //     datasets: [{
        //   //       label: 'Users',
        //   //       data: days,
        //   //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //   //       borderColor: 'rgba(54, 162, 235, 1)',
        //   //       borderWidth: 1
        //   //     }],
        //   //     labels: name
        //   //   },
        //   //   options: {
        //   //     scales: {
        //   //       x: {
        //   //         title: {
        //   //           display: true,
        //   //           text: 'Days' 
        //   //         }
        //   //       },
        //   //       y: {
        //   //         beginAtZero: true,
        //   //         title:{
        //   //           display: true,
        //   //           text: 'Number of Users'
        //   //         } 
        //   //       }
        //   //     },

        //   //     responsive: true, 
        //   //   maintainAspectRatio: false,
            
        //   //   }
        //   // });
        //   if (this.chartInstance) {
        //     this.chartInstance.destroy();
        //   }
        
        //   // Get canvas element
        //   const canvas = document.getElementById('canvas') as ChartItem;
        //   if (!canvas) {
        //     console.error("Canvas element not found!");
        //     return;
        //   }
        
        //   // Create new chart instance
        //   this.chartInstance = new Chart(canvas, {
        //     type: 'bar',
        //     data: {
        //       labels: name, // Place labels correctly
        //       datasets: [{
        //         label: 'Users',
        //         data: days,
        //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //         borderColor: 'rgba(54, 162, 235, 1)',
        //         borderWidth: 1
        //       }]
        //     },
        //     options: {
        //       scales: {
        //         x: {
        //           title: {
        //             display: true,
        //             text: 'Number of Users' // Changed from 'Days' since x-axis is for users
        //           }
        //         },
        //         y: {
        //           beginAtZero: true,
        //           title: {
        //             display: true,
        //             text: 'Days' // Changed from 'Number of Users' since y-axis is for days
        //           }
        //         }
        //       },
        //       responsive: true,
        //       maintainAspectRatio: false
        //     }
        //   });
        // }
        buttontext(e:any){
          return 'Edit';
        }
        formatDate(dateString: string): string {
          return new Date(dateString).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
        }
      
        getTodayDate(): string {
          return new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD
        }
        
        NextAction(){
        let usersassigned:any=  this.mitigationForm.get('no_of_Users_Assigned').value;
        let userscompleted:any=  this.mitigationForm.get('no_of_Users_completed').value;
        const formattedEndDate = this.formatDate(this.endDate); // Convert API date to YYYY-MM-DD
    const todayDate = this.getTodayDate();

        if(usersassigned==userscompleted){
          this.submitbtn=true;
        }
        else if( todayDate>=  formattedEndDate){
          this.submitbtn=true;
        }
        else{
          this.submitbtn=false;
        }

        }
okClicked(e:any,id:any){
let a:any=1
localStorage.setItem('question_id',id);
localStorage.setItem('users',a);


this.dialog.open(UsersListOfQuestionsComponent, {
width: '800px',

});
        }
        okClicked1(e:any,id:any){
         // alert(e)
          let a:any=2
         localStorage.setItem('question_id',id);
         localStorage.setItem('users',a);


          this.dialog.open(UsersListOfQuestionsComponent, {
            width: '800px',
            
          });
         
    
                    }
                      okClicked2(e:any,id:any){
                      //  alert(e)

                        let a:any=3
                        localStorage.setItem('question_id',id);
                        localStorage.setItem('users',a);
         
         
                         this.dialog.open(UsersListOfQuestionsComponent, {
                           width: '800px',
                           
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
     this.SuggestionVisible=true;
    
  this.AddButtonVisible=true;
   
  }
  else
  {
  this.SuggestionVisible=false;
this.AddButtonVisible=false;
  }
}
AddSuggestions(){
  let suggestionsArray = this.mitigationForm.get('Suggestions') as FormArray;
  if ( suggestionsArray.length>=99) {
    this.AddButtonVisible=false;
   
   
  }
 

     
     if(this.mitigationForm.valid){
      (this.mitigationForm.get('Suggestions') as FormArray).push(
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


SubmitMitigationAction(){
 if(this.mitigationForm.valid){

  let suggestionsArray = this.mitigationForm.get('Suggestions').value;
 
  let schedule_Assessment_id=localStorage.getItem('schedule_Assessment_id');
  let uq_ass_schid=localStorage.getItem('uq_ass_schid');
  let ass_template_id=localStorage.getItem('ass_template_id');
 
 
  const formData = {
   

    assessment_id:schedule_Assessment_id,
    suggested_by: this.Useridvalue,
    ass_template_id:ass_template_id,
    uq_ass_schid:uq_ass_schid,
    proposed_by:this.Useridvalue,
    suggestions:suggestionsArray,
    action_required: this.mitigationForm.value.action_required,
    overallremarks:this.mitigationForm.value.overallremarks,
   scoreindicators:this.mitigationForm.value.scoreindicators
  };
  //alert(JSON.stringify(formData))
  console.log(JSON.stringify(formData))
  this.http.post(URL + '/MitigationController/InsertSuggestionsAndMitigationId',formData)
    
  .subscribe((response: any) => {
  
    console.log('Data Save Succefully ', response);
    // Handle the response from the server if needed
   
    const message = "Data Saved Successfully.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
  
    this.mitigationForm.reset();
    setTimeout(() => {
      
      window.location.reload();
    }, 100);
   

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
  const message = "Please Suggest Mitigation Action.";
  const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
    width: '550px',
    data: { message: message},
   
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
 exportGrid2(e:any) {
            if (e.format === 'xlsx') {
              const workbook = new Workbook(); 
              const worksheet = workbook.addWorksheet("Main sheet"); 
              worksheet.addRow(['Assessment Performance Answer Details']);
              worksheet.addRow([]);
              exportDataGrid({ 
                worksheet: worksheet, 
                component: e.component,
              }).then(function() {
                workbook.xlsx.writeBuffer().then(function(buffer) { 
                  saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Assessment Performance  Answer Details.xlsx"); 
                }); 
              }); 
              e.cancel = true;
            } 
            else if (e.format === 'pdf') {
              const doc = new jsPDF();
              doc.text("Assessment Performance Answer Details", 80,10); // Adjust the position as needed
              doc.setFontSize(12);
              exportDataGridToPdf({
                jsPDFDocument: doc,
                component: e.component,
              }).then(() => {
                doc.save('Assessment Performance  Answer Details.pdf');
              });
            }
          
          
 }
}
