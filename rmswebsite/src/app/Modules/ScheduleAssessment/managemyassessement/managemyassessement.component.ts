import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog,MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
import { ConfirmmessageComponent } from '../confirmmessage/confirmmessage.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Title } from 'chart.js';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-managemyassessement',
  templateUrl: './managemyassessement.component.html',
  styleUrls: ['./managemyassessement.component.scss']
})
export class ManagemyassessementComponent {
  Begin_Ass_form:any;
  gridBoxValue: any[] = [];
  gridDataSource:any = [];
  griddatajson: any;
  //parentRows:any;
  parentRows: any[] = [];
  questionids: any[] = [];

  question_id:any;
  isGridBoxOpened:any;
  AssessementTemplateID:any;
  currentIndex: number = 0;
  defaultValues: string[] = [];
  option: any[]=[];
  countqstns:any;
  userdata:any;
  erroMessage:any;
  beginass:boolean=false;
  beginass1:boolean=true;
  asstextbox:boolean=false;
  sanitizedImages: SafeResourceUrl[] = [];
  isImageHidden: boolean = true;
 base64Image: string | null = null;
 userid:any;
 response_type:any;
 question_hint:any;
  gridColumns: any = [{dataField:'uq_ass_schid',caption:'Assessment ID'},'assessment_name', 'type_Name', 'subType_Name',
  'competency_Name',{dataField:'builder_version_firstname',caption:'Risk Asessor'},
  {dataField:'objective',caption:'Objective of Assessement'},{dataField:'message',caption:'Message for Taskowner'},{dataField:'firstname',caption:'Assessee Name'},
  {
    dataField: 'startDate',
    caption: 'Start Date',
    dataType:"date",format:'dd-MMM-yyyy'

  }
  
  ,
  {
    dataField: 'endDate',
    caption: 'End Date',
    dataType:"date",format:'dd-MMM-yyyy'

  },
  {
    dataField:'created_date',caption:'Assessement Scheduled Date',
    dataType:"date",format:'dd-MMM-yyyy'
}];
 versonNo:any='';
  
  constructor(private http: HttpClient,
    private ref: ChangeDetectorRef,
    private fb:FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private session: SessionService,
    private sanitizer: DomSanitizer,

    // public dialogRef: MatDialogRef<ToasterComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any
    ){

      let user: any = this.session.getUser();
      //  console.log(user)
       this.userdata = JSON.parse(user);//userdata.profile.userid
       console.log("userid",this.userdata.profile.userid)
   this.userid=this.userdata.profile.userid;
      this.asstextbox=false;
      
      this.gridDataSource = this.makeAsyncDataSource(this.http,this.userid);
      this.Begin_Ass_form=this.fb.group({
        question_id:['', Validators.required],
        question:['', Validators.required],
        user_Selected_Ans:['', Validators.required],
  
      })
      
     

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
    onTextareaChange(newValue: any,questionid:number,questionIndex:number) {
      console.log(JSON.stringify(this.parentRows))
this.parentRows[questionIndex].backgroundColor='rgb(127, 255, 0)';

this.questionids.push(questionid);
    
  }
   
    setDefaultValueForQuestion(questionIndex: number, defaultValue: string,questionid:number) {
      //alert(defaultValue)
      this.defaultValues[questionIndex] = defaultValue;
      this.parentRows[questionIndex].user_Selected_Ans=defaultValue;
this.parentRows[questionIndex].backgroundColor='rgb(127, 255, 0)';
this.questionids.push(questionid);
      

    }
    updateCurrentIndex(index: number) {
      this.currentIndex = index;
    }
    onGridBoxOptionChanged(e:any) {
  
      if (e.name === 'value') {
  
        this.isGridBoxOpened = false;
        this.ref.detectChanges();
       let schedule_Assessment_id=e.value;
       localStorage.setItem('schedule_Assessment_id',schedule_Assessment_id);
       
      // alert(localStorage.getItem('ass_template_id'))


 if (e.value && this.gridDataSource) {
  // alert('1')
   this.gridDataSource.load({ filter: ['schedule_Assessment_id', '=', e.value] }).then((data: any) => {
    // Handle the retrieved data
    if (Array.isArray(data) && data.length > 0) {
      // Access the first object in the array (assuming there's only one)
      const firstItem = data[0];
     console.log(JSON.stringify(firstItem));

     let ass_template_id:any=firstItem.ass_template_id;
     this.AssessementTemplateID= localStorage.getItem('ass_template_id');
   localStorage.setItem('ass_template_id',ass_template_id);

   let uq_ass_schid:any=firstItem.uq_ass_schid;
   this.versonNo=firstItem.verson_no;
 localStorage.setItem('uq_ass_schid',uq_ass_schid);
   //this.Ass_ProvideAccess_form.controls['Assessment_id'].setValue (firstItem.assessment_name);

   } });}
//alert("Your Assessment Acknowledged")
//----- This Alert is for Assessement Acknowledged & to Begin or Attempt Later  --------
const MatDialogRef = this.dialog.open(ConfirmmessageComponent, {
  width: '550px',
  
});
this.http.get(URL + '/BeginAssessementController/GetQuestions?AssessementTemplateID='+localStorage.getItem('ass_template_id')+ '&versonNo=' + this.versonNo, {headers})
.subscribe((response: any) => {
//alert(JSON.stringify(response))
  if (Array.isArray(response) && response.length > 0) 
  {
    this.parentRows=response;
    console.log(JSON.stringify(this.parentRows))
    this.parentRows.forEach((element:any)=>{
        element.backgroundColor='lightgray';
        element.user_Selected_Ans="";
        element.AssessementTemplateID=localStorage.getItem('ass_template_id');
        element.UserID=this.userdata.profile.userid;
        element.TextFieldAnswer="";
    });
    for(let i=0;i<response.length;i++){
      const GetQuestions = response[i]; // Access the first element of the array
      console.log(GetQuestions.question_hint)
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(GetQuestions.base64);
      //console.log(sanitizedUrl)
      this.sanitizedImages.push(sanitizedUrl); 
      //alert(GetQuestions.response_type)
      if(GetQuestions.response_type==2){
      
      //  this.asstextbox=true;
      }
   }
   this.countqstns=response.length;
   

}

  
});
MatDialogRef.afterClosed().subscribe(result => {

  if (result === true) {
   this.beginass = true; 
   this.http.get(URL + '/BeginAssessementController/GetUserAnswersList?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&UserID="+this.userid+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid'), {headers})
   .subscribe((response: any) => {
   //alert(JSON.stringify(response))
     if (Array.isArray(response) && response.length > 0) 
     {
      // this.parentRows=response;

       response.forEach((element: any) => {
        for (let i = 0; i < response.length; i++) {
          const selectedQuestion = response[i]
          
          const existingQuestionIndex = this.parentRows.findIndex((question: any) => question.question_id === selectedQuestion.question_id);
          if (existingQuestionIndex !== -1) {
            
          
          
           this.setDefaultValueForQuestion(existingQuestionIndex, selectedQuestion.user_Selected_Ans.toString(),selectedQuestion.question_id)
           this.parentRows[existingQuestionIndex].TextFieldAnswer=selectedQuestion.textFieldAnswer;
          
          }
//alert(JSON.stringify(this.defaultValues))
      }
    //     // Check if element.question_id is present in questionids array
    //     if (this.questionids.includes(parseInt(element.question_id))) {
    //       this.defaultValues[element.question_id] = element.question_id;
    //       this.parentRows[element.user_Selected_Ans].user_Selected_Ans=element.user_Selected_Ans;
    // this.parentRows[element.question_id].backgroundColor='green';
    //     }
    });
  //   for(let i=0;i<response.length;i++){
  //     const GetQuestions = response[i]; // Access the first element of the array
  //     const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(GetQuestions.base64);
  //     //console.log(sanitizedUrl)
  //     this.sanitizedImages.push(sanitizedUrl); 
  //  }
       
     // this.countqstns=response.length;
      

}

     
});

  }
   else if (result === false) {
    
  }  else {
   
  }
});


      }
    }
      makeAsyncDataSource(http:HttpClient,userid:any) {
        this.griddatajson
        return new CustomStore({
          loadMode: 'raw',
          key: 'schedule_Assessment_id',
          load() {
   const url = `${URL}/BeginAssessementController/GetAssesmentsInitiated?userid=`+userid;
              
           // return lastValueFrom(http.get(`${URL}/Assessment/GetActiveAssesment`, { headers }));
           return lastValueFrom(http.get(url, { headers }));
          },
        });
      }
    gridBox_displayExpr(item: any) {
      // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
      return item.assessment_name;
     }

     nextQuestion() {
      if (this.currentIndex < this.parentRows.length - 1) {
          this.currentIndex++;
      }
    }

    previousQuestion() {
      if (this.currentIndex > 0) {
          this.currentIndex--;
      }
    }
    qstnxt(event:any){
//       alert(this.currentIndex)
//       if(this.countqstns==event)
// this.currentIndex=this.currentIndex;
// else
this.currentIndex=event;

    }
    reloadComponent() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
    ngOnInit(): void {
      
       
      }
    AttemptLater(){
      this.erroMessage='Dear User, you have chosen to attempt this Assessment ‘later’. You can continue to access this Assessment under “My Assessments” Tab. It will be in your own interest to attempt the  Assessment within due time allocated.';
       const dialogRef = this.dialog.open(ToasterComponent, {
          width: '550px',
          
            data: {
              title: 'Attempt Later',
              message: this.erroMessage,
              confirmButtonText: 'Attempt Later'
            },
          });
      
          dialogRef.afterClosed().subscribe((result) => {
            if (result) { // User clicked "OK" in the confirmation dialog
              const headers = {
                'Content-Type': 'application/json', // Adjust content type as needed
              };
             
            
        let formData: any[]=[];


        
        this.parentRows.forEach((element: any) => {
          // Check if element.question_id is present in questionids array
          let textfield_answer:any=element.TextFieldAnswer;
            
          if(textfield_answer=="")
          textfield_answer=""
        else
          textfield_answer=element.TextFieldAnswer
          if (this.questionids.includes(parseInt(element.question_id))) {
              formData.push({
                  AssessementTemplateID: parseInt(element.AssessementTemplateID).toString(),
                  question_id: parseInt(element.question_id),
                  user_Selected_Ans: parseInt(element.user_Selected_Ans),
                  UserID: parseInt(element.UserID),
                  finalsubmit: 0,
                  TextFieldAnswer:textfield_answer,
    uq_ass_schid:localStorage.getItem('uq_ass_schid'),
  
              });
          }
      });
       
       
       
      let savedata={row:this.parentRows,asstempid:localStorage.getItem('ass_template_id')?.toString()};

      console.log(JSON.stringify(formData))
        this.http.post(URL + '/BeginAssessementController/UserAnswers',formData,{headers})
        .subscribe((response: any) => {
          console.log('Data Save Succefully ', response);
        window.alert('Data Saved Successfully');
          this.reloadComponent();
        },
        (error: any) => {
         
          window.alert('Error Saving Data');
        });
  
      
    }
  });
    }

    Cancel(){
       this.erroMessage = `Dear User, you have chosen to attempt this Assessment ‘later’. You can continue to access this Assessment under “My Assessments” Tab. No part of the Assessment will be saved and you will need to attempt this from beginning. It will be in your own interest to attempt the Assessment within due time allocated.`;
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '550px',
      
        data: {
          title: 'Continue to Close Assessment',
          message: this.erroMessage,
          confirmButtonText: 'Close Assessment'
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) { // User clicked "OK" in the confirmation dialog
          const headers = {
            'Content-Type': 'application/json', // Adjust content type as needed
          };
          this.reloadComponent();
        }
      });
        
    }

    Submit(){
      let formData: any[]=[];
      this.parentRows.forEach((element: any) => {
        // Check if element.question_id is present in questionids array
        let textfield_answer:any=element.TextFieldAnswer;
          
        if(textfield_answer=="")
        textfield_answer=""
      else
        textfield_answer=element.TextFieldAnswer
        if (this.questionids.includes(parseInt(element.question_id))) {
            formData.push({
                AssessementTemplateID: parseInt(element.AssessementTemplateID).toString(),
                question_id: parseInt(element.question_id),
                user_Selected_Ans: parseInt(element.user_Selected_Ans),
                UserID: parseInt(element.UserID),
                finalsubmit: 1,
                TextFieldAnswer:textfield_answer,
  uq_ass_schid:localStorage.getItem('uq_ass_schid'),

            });
        }
    });
     
     
    let savedata={row:this.parentRows,asstempid:localStorage.getItem('ass_template_id')?.toString()};

    console.log(JSON.stringify(formData))
      this.http.post(URL + '/BeginAssessementController/UserAnswers',formData,{headers})
      .subscribe((response: any) => {
        console.log('Data Save Succefully ', response);
        let formData1: any;
        formData1={
         ass_template_id:localStorage.getItem('ass_template_id'),
         userid:this.userid.toString(),
         AssessmentStatus:'Finished',
         AssessementTemplateID:localStorage.getItem('ass_template_id'),
  uq_ass_schid:localStorage.getItem('uq_ass_schid'),

        };
        console.log(formData1)
        this.http.post(URL + '/BeginAssessementController/UpdateStatus',formData1)
        .subscribe((response: any) => {
          console.log('Data Updated Succefully ', response);
          this.http.post(URL + '/BeginAssessementController/AssessmentScoreDetails',formData1)
          .subscribe((response: any) => {
            console.log('Data Updated Succefully ', response);
            
            // Handle the response from the server if needed
            window.alert('Assessement Submitted Successfully');
          
         
          },
          (error: any) => {
           
            window.alert('Error Saving Data');
          });
          // Handle the response from the server if needed
          
       
        },
        (error: any) => {
         
          window.alert('Error Saving Data');
        });
      //window.alert('Data Saved Successfully');
        this.reloadComponent();
      },
      (error: any) => {
       
        window.alert('Error Saving Data');
      });
    }
    Review(event:any){
this.parentRows[event].backgroundColor='rgb(244, 196, 48)';

   }
     
}
