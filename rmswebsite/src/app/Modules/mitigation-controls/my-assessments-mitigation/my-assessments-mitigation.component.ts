import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-my-assessments-mitigation',
  templateUrl: './my-assessments-mitigation.component.html',
  styleUrls: ['./my-assessments-mitigation.component.scss'],
  
  
})
export class MyAssessmentsMitigationComponent {
  gridDataSource:any;
  userdata:any;
  userid:any;
  mitigationForm:any;
  gridBoxValue: any[] = [];
  isGridBoxOpened:any;
  comptencyskill:boolean=false;
  subjecttopic:boolean=false;
  overall:boolean=false;
  compotencygridData:any;
  subjecttopicgridData:any;
  gridDataSource1:any;
  gridDataSource3: any;
  selectedchange:boolean=false;


  gridColumns=[ 
  {dataField:'uq_ass_schid',caption:'Assessment ID'},
         {
          dataField: 'assessment_name',
          caption: 'Assessment Name'
              },  
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
                },{dataField:'verson_no',caption:'Version Number'}, 
                {dataField:'objective',caption:'Objective of Assessement'},{dataField:'message',caption:'Message for Taskowner'} ,
                {
                  dataField: 'assessementDueDate',
                caption: 'Assessment Due Date',
               
                  calculateCellValue: function(data:any) {
                    if (data.created_date) {
                      const date = new Date(data.created_date);
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = date.toLocaleString('default', { month: 'short' });
                      const year = date.getFullYear();
                      return `${day}/${month}/${year}`;
                    }
                    return null;
                  }
                }
       ]

 CompetencySkillLevelGrid=[ 
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

 TopicAndSubTopicwiseGrid=[ 
            {
            dataField: 'title_Doc',
            caption: 'Topic'
                },   {
                  dataField: 'sub_title_doc',
                  caption: 'Sub Topic'
                      },  {
                        dataField: 'document_Id',
                        caption: 'Total Questions'
                            },
                            {
                              dataField: 'document_Id',
                              caption: 'Total Answered Questions'
                                  },
                                  {
                                    dataField: 'document_Id',
                                    caption: 'Total Unanswered Questions'
                                        },
               ]
  griddatajson: any;
               constructor(private http: HttpClient,
                private ref: ChangeDetectorRef,
                private fb:FormBuilder,
                private router:Router,
                public dialog: MatDialog,
                private session: SessionService,
                private sanitizer: DomSanitizer,
            
                ){
                  this.selectedchange=false;

                  this.gridDataSource = this.makeAsyncDataSource(this.http, localStorage.getItem('USERID'));
                  this.mitigationForm=this.fb.group({
                    Assessment_id:[''],
                    Assessorname:[''],
                    type_Name:[''],
                    startDates:[''],
                    endDates:[''],
                    remarks:[''],
                    Suggestions:new FormArray([
                      new FormControl(null,Validators.required)
                   ]),
                   scoreindicators:this.fb.array([]),
                  });
                }
                gridBox_displayExpr(item: any) {
                  // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
                  return item.assessment_name;
                 }
                ngOnInit(): void 
                {
                   
                    let user: any = this.session.getUser();
                
                    this.userdata = JSON.parse(user);//userdata.profile.userid
                    console.log("userid",this.userdata.profile.userid)
                    localStorage.setItem('USERID',this.userdata.profile.userid);
                   localStorage.getItem('USERID');
                    this.userid=this.userdata.profile.userid;
                    this.gridDataSource = this.makeAsyncDataSource(this.http, localStorage.getItem('USERID'));
                }  
                makeAsyncDataSource(http:HttpClient,userid:any) {
                  this.griddatajson
                  return new CustomStore({
                    loadMode: 'raw',
                    key: 'schedule_Assessment_id',
                    load() {
             const url = `${URL}/MyAssessementsReviewController/GetCompletedScheduleAssesment?mapped_user=`+userid;
                        
                     // return lastValueFrom(http.get(`${URL}/Assessment/GetActiveAssesment`, { headers }));
                     return lastValueFrom(http.get(url, { headers }));
                    },
                  });
                }

                   onGridBoxOptionChanged(e:any) {
                    if (e.name === 'value') 
                    {
                      this.isGridBoxOpened = false;
                      this.ref.detectChanges();
                      let schedule_Assessment_id=e.value;
                      localStorage.setItem('schedule_Assessment_id',schedule_Assessment_id);
                      this.overall=true;
                      this.selectedchange=true;

                      
                     // alert(localStorage.getItem('ass_template_id'))
                 localStorage.getItem('schedule_Assessment_id');
                 this.gridDataSource.load({ filter: ['schedule_Assessment_id', '=', e.value] }).then((data: any) => {
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
                this.http.get(URL + '/MyAssessementsReviewController/GetCompletedScheduleAssesmentDetails?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid')+"&&mapped_user="+  localStorage.getItem('USERID') , {headers})
                      .subscribe((response: any) => {
                  //    alert(JSON.stringify(response))
                        if (Array.isArray(response) && response.length > 0) 
                        {
                       
                          let Getcounts:any = response[0] as any; // Access the first element of the array
                          
                          console.log(JSON.stringify(Getcounts));
                      //    alert(JSON.stringify(Getcounts))
                      this.mitigationForm.controls['remarks'].setValue(response[0].remarks);
                   
                      this.mitigationForm.controls['Assessorname'].setValue(response[0].firstname);
                      this.mitigationForm.controls['type_Name'].setValue(response[0].type_Name);
            
                      this.mitigationForm.controls['startDates'].setValue(response[0].startDates);
            
                      this.mitigationForm.controls['endDates'].setValue(response[0].endDates);
            
                      this.mitigationForm.controls['assessment_name'].setValue(response[0].assessment_name);
                 
                
                        }
               
                  });

      this.gridDataSource1 = this.makeAsyncDataSource1(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'),localStorage.getItem('USERID'));
      this.gridDataSource3 = this.makeAsyncDataSource3(this.http,localStorage.getItem('ass_template_id'),localStorage.getItem('uq_ass_schid'),localStorage.getItem('USERID'));

                  let ds:any
                  this.http.get(URL + '/MyAssessementsReviewController/GetSubjectTopic?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid')+"&&mapped_user="+  localStorage.getItem('USERID'), {headers})
                
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
               // dataField: "scoreIndicator",// suggest by jasmeet
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
              //          this.subjecttopicgridData = new PivotGridDataSource({
              //            store: response,
              //            fields:[
                    
              //              {
              //              dataField: "firstname",
              //              area: "row"
              //          },
              //          {
              //            dataField:"subject_Name",
              //            area:"column"
              //          },
              //          {
              //            dataField:"topic_Name",
              //            area:"column"
              //          },
              //          {
              //            dataField: "no_of_Questions",
              //            area: "data",
              //            dataType: "number",
              //            caption:"No.of.Qstns",
              //            summaryType: 'sum',
              //          //  groupName:"Easy"
              //        },
              //        {
              //          dataField: "no_of_answered_qstns",
              //          area: "data",
              //          dataType: "number",
              //          caption:"No.of.Answered.Qstns",
              //          summaryType: 'sum',
                  
              //      },
              //   //    {    
              //   //      dataField: "scoreIndicator", // Score inducate result Suggest by Jasmeet to comment
              //                 //   area: "data",
              //   //      area: "data",
                
              //   //      caption:"scoreindictor",
              //   //      summaryType: 'sum',
                   
              //   //  },
              //    {
              //     dataField: "scoreIndicatorName",  
              //     area: "data",  // Move scoreName to the data section
              //     caption: "Score Indicater Name",
              //     summaryType: "max", // Forces it to display its value instead of counting
              //     dataType: "string"
              //   },
              //  //ScoreIndicatorName
              //            ]
              //          });
              //         });
                      let d1:any
                      this.http.get(URL + '/MyAssessementsReviewController/GetComptencySkill?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid')+"&&mapped_user="+  localStorage.getItem('USERID') , {headers})
                      //this.http.get(URL + '/ScheduleAssessementReviewController/GetComptencySkilldummy' , {headers})
                          .subscribe((response: any) => {
                           d1=response;
                       console.log(JSON.stringify(response))
                   
                   
                          //  this.compotencygridData = new PivotGridDataSource({
                          //    store: response,
                          //    fields:[
                           
                          //     {
                          //       dataField: "firstname",
                          //       area: "row"  // Keeps user name in rows
                          //     },
                          //     {
                          //       dataField: "skill_Level_Name",
                          //       area: "column" // Grouping by skill level
                          //     },
                          //     {
                          //       dataField: "type",
                          //       area: "column" // Grouping by type (Easy/Hard, etc.)
                          //     },
                            
                          //     {
                          //       dataField: "no_of_Questions",
                          //       area: "data",
                          //       dataType: "number",
                          //       caption: "No. of Qstns",
                          //       summaryType: "sum"
                          //     },
                          //     {
                          //       dataField: "no_of_answered_Questions",
                          //       area: "data",
                          //       dataType: "number",
                          //       caption: "No. of Answered Qstns",
                          //       summaryType: "sum"
                          //     },
                          //     // {
                          //     //   dataField: "scoreindictor", //  Score inducate result Suggest by Jasmeet to comment
                          //     //   area: "data",
                          //     //   caption: "Score Indicator",
                          //     //   summaryType: "sum"
                          //     // },
                          //       {
                          //       dataField: "scoreName",  
                          //       area: "data",  // Move scoreName to the data section
                          //       caption: "ScoreScore Indicater Name",
                          //       summaryType: "max", // Forces it to display its value instead of counting
                          //       dataType: "string"
                          //     },
                    
                       
                          //    ]
                          //  });
                          // });

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
caption:"Overall Accuracy%",
summaryType: 'avg',
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
                    }
         
        }

        makeAsyncDataSource1(http:HttpClient,ass_tempid:any,uniqueid:any,userid:any) {
          //this.griddatajson1
          return new CustomStore({
            loadMode: 'raw',
            key: 'userID',
            load() {
              return lastValueFrom(http.get(`${URL}`+'/MyAssessementsReviewController/GetUsersScoreCounts?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid+"&&mapped_user="+userid, { headers }));
            },
          });
        }
        makeAsyncDataSource3(http:HttpClient,ass_tempid:any,uniqueid:any,userid:any) {
          //this.griddatajson1
          return new CustomStore({
            loadMode: 'raw',
           key: 'userAss_Ans_DetailsID',
            load() {
              return lastValueFrom(http.get(`${URL}`+'/MyAssessementsReviewController/GetAssessmentResultsDetails?AssessementTemplateID='+ass_tempid+"&&uq_ass_schid="+uniqueid+"&&mapped_user="+userid, { headers }));
            },
          });
        }
        updateGridColumns(value: number): void {

          if (value ==1){
       
        this.comptencyskill=true;
        this.subjecttopic=false;
        this.overall=false;
        
        
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
