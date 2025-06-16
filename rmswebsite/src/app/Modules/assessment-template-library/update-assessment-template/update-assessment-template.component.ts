import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import CustomStore from 'devextreme/data/custom_store';
import { ViewChild,AfterViewInit  } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import ArrayStore from 'devextreme/data/array_store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentBuilderNew } from 'src/app/inspectionservices.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
const URL = BASE_URL;
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { StepperService } from 'src/app/assessment-service.service';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Component({
  selector: 'app-update-assessment-template',
  template: `
  <img [src]="sanitizedImage" alt="Image Description">
`,
  templateUrl: './update-assessment-template.component.html',
  styleUrls: ['./update-assessment-template.component.scss']
})
export class UpdateAssessmentTemplateComponent {
  private refresh: Subscription = new Subscription;
  @ViewChild('stepper') stepper!: MatStepper;
  questionIdsArray:number[]=[];
  currentStep:any;
  gridBoxValue:any;
  showQuestionForm:boolean=false;
  visiblestepper:boolean=false;
  OptionA=true;
  OptionB=false;
  OptionC=false;
  Useridvalue:any;
  AssessmentBuilderinfo:AssessmentBuilderNew = new AssessmentBuilderNew();
  AssBuilderForm: FormGroup;
  SkillData1:any;
  dataNew1:any;
  subType:any;
  type_id:any;
  dataNew:any;
  typedata1:any;
  vstepper:boolean=false;
  ChooseOpt_to_showexp:Array<{id:number,text:string}>=[];
  ChooseOptions1:Array<{id:number,text:string}>=[];
  sumOfEstimatedTime:any;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  sanitizedImage: SafeResourceUrl| null =null;
  isImageHidden: boolean = true;
  SubjectData: any;
  subjectId: any;
  Selectedtopic: any;
  resptypedata:any;
  TopicData: any;
  resptype: Array<{ id: number, text: string }> = [];
  ChooseOptions:Array<{id:string,text:string}>=[];
  checklevels:Array<{id:number,text:string}>=[];
  data:any;
  CheckLevelData:any;
  checklevel_weightage: number = 0.01;
  SelectedSubtype1:any;
  subtypedata1: any;
  isGridBoxOpened: boolean = false;
  questionbankoptions: any;
  GetAllQuestions:any;
  TotalQuestionsList:any;
  QuestionList:any;
  ass_template_id:any;
  dataSource:any;
    MyQuestionsselectionForAdd:any='My Questions';
  questionsType: string[] = [
    'My Questions',
    'Question Bank Reserve',
  ];
  TemplateColumns: any = [{ dataField: 'ass_template_id' ,caption:'Assessment Template Id'},'assessment_name', 'type_Name', 'subType_Name',
  'competency_Name', {
    dataField: 'created_date',
    caption: 'Created Date',
    alignment: "right",
    width: 180,
    dataType: "date",
format:'dd-MMM-yyyy'
  },'keywords'];
  gridColumns: any[] = [
    { dataField:'question_id',  caption:'question Id'},
    {
      dataField: 'question',
      caption: 'Question Description'
    },
    {
      dataField: 'subject_Name',
      caption: 'Subject'
    },
    {
      dataField: 'topic_Name',
      caption: 'Topic'
    },
    {
      dataField: 'check_level',
      caption: 'Competency Skill Level'
    },
    {
      dataField: 'created_date',
      caption: 'Created Date',
      alignment: "right",
      width: 180,
      dataType: "date",
      format:'dd-MMM-yyyy'
 
    },
    {
      dataField: 'estimated_time',
      caption: 'Estimated Time(in Minutes)',
      alignment: 'center'
    },
    {
      caption: 'Actions',
      cellTemplate: 'viewButtonTemplate'
    }
    
  ];
  
containerColumns: any[] = [
  {
    dataField: 'question',
    caption: 'Question Description'
  },

  {
    dataField: 'objective',
    caption: 'Objective'
  },
  {
    dataField: 'subject_Name',
    caption: 'Subject'
  },
  {
    dataField: 'topic_Name',
    caption: 'Topic'
  },
  {
    dataField: 'skill_Level_Name',
    caption: 'Competency Check Level'
  },
  {
    dataField: 'created_date',
    caption: 'Created Date',
    alignment: "right",
    width: 180,
    dataType: "date",
format:'dd-MMM-yyyy'
  },
  {
    dataField: 'keywords',
    caption: 'Keywords'
  },
  {
    dataField: 'estimated_time',
    caption: 'Time estimate to answer Question(in Minutes)'
  },
 
 
 
];

selectedRowData:any;
TempGridColumns: any[]=[] ;
isContainerVisible:boolean=false;
isRowSelected(): boolean {
  return this.SelectedQuestion.length > 0;
}


showGridAndHideContainer() {

  this.gridColumns= this.TempGridColumns ; 
  this.ref.detectChanges();
 
  this.isContainerVisible=false;
 
 
}

onViewButtonClick(rowData: any) {
  // Handle the click event, you can show the container or perform other actions here
  this.selectedRowData = rowData;
  // Select the row if needed
   this.SelectedQuestion = [rowData.question_id];
   this.TempGridColumns=this.gridColumns;
   this.gridColumns= this.containerColumns ; 
  this.isContainerVisible = true;


  this.SelectedQuestion = [rowData.id]; 
  
  
}

 
  gridDataSource: any;
  SelectedQuestion: any[] = [];
  SelectedQuestionForAdd:any;
  AllQuesDropdown:boolean=false;
  GeneratedDropdown:boolean=true;
  NextButton:boolean=true;
 addbutton:boolean=true;
  BackButton:boolean=false;
  CreateButton:boolean=false;
  AssessTemplateList:any;

  gridBox_displayExpr(item: any) {
   // alert(JSON.stringify(item))
    // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
    return item.assessment_name;
   }

  handleFileSelection(event: any): void {
    this.selectedFile = event.value[0] as File;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  ngOnInit(){
    
    this.rout.params.subscribe((params: any) => {
      const step = +params['step'] || 0;
      // Your logic to display the correct step based on the 'step' parameter
    });

    this.AssessTemplateList={
      paginate: true,
      store: new CustomStore({
          key: 'ass_template_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Assessment/GetActiveAssesmentforUpdate/'+this.Useridvalue, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };






    this.resptype = [
      { id: 1, text: 'Multiple Choice Selection' },
      { id: 2, text: 'Text Field Input' }
    ];

    this.resptypedata = new ArrayStore({
      data: this.resptype,
      key: "ID"
    });

    this.ChooseOptions=[
      { id:'Yes',text:'Yes' },
      { id:'No',text:'No'  }
    ];
    
    this.ChooseOptions1=[
      { id:1,text:'Yes' },
      { id:2,text:'No'  }
    ];

    this.ChooseOpt_to_showexp=[
      { id:1,text:'Yes' },
      { id:2,text:'No'  }
    ];

    this.checklevels=[
      {id:1,text:'Easy'},
      {id:2,text:'Medium'},
      {id:3,text:'Hard'}
    ];


  
  this.resptypedata = new ArrayStore({
    data: this.resptype,
    key: "ID"
  });
  this.dataNew = new ArrayStore({
    data: this.ChooseOptions1,
    key: "ID"
  });


  this.dataNew1 = new ArrayStore({
    data: this.ChooseOpt_to_showexp,
    key: "ID"
  });
}
private questionsSubject = new BehaviorSubject<any[]>([]);
  questions$ = this.questionsSubject.asObservable();



constructor(public stepperService: StepperService,private router: Router,private rout:ActivatedRoute,public dialog: MatDialog,private http: HttpClient,private ref: ChangeDetectorRef,private zone: NgZone,private sanitizer: DomSanitizer,private formBuilder: FormBuilder){
  // this.stepperService.currentStep$.subscribe((step) => {
  //   this.currentStep = step;
  // });

  
  
  const storedData:any = localStorage.getItem('user');
  const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.Useridvalue=Userid;
    //Assessement Builder Page Form

    this.AssBuilderForm = this.formBuilder.group({
      CometencySkillLevel: ['', Validators.required],
      ExplanationOpt: ['', Validators.required],
      HintOpt: ['', Validators.required],
      AssessmentType: [''],
      AssessmentSubType:['', Validators.required],
      AssessmentName:['', Validators.required],
      AssessmentDescription:[''],
      Keywords: [''],
     
    
    });
    

    
    this.typedata1={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Type/GetTypeDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };


    this.SkillData1={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/CompetencySkill/GetCompetencySkillDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

  this.SubjectData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/Subject/GetSubjectDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

  this.CheckLevelData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/CompetencyCheckLevel/GetCompetencyCheckLevelDetails', {headers})
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



CreateButtonClick(){
  this.showQuestionForm=true;
  this.GeneratedDropdown=false;
  this.AllQuesDropdown=false;

 this.NextButton=true;
 // this.router.navigate(['/create-new-questions']);
}

loadQuestions(): void {

  setTimeout(() => {
    // Recreate the QuestionList object
    this.QuestionList = {
      paginate: true,
      store: new CustomStore({
        key: 'ass_template_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/Assessment/GetListOfQuestionsByID/' +this.ass_template_id, { headers })
              .subscribe(
                (res) => {
                  console.log('Load success:', res);
                  resolve(res);
                },
                (err) => {
                  console.error('Load error:', err);
                  reject(err);
                }
              );
          });
        },
      }),
    };
  }, 100);

  this.TotalQuestionsList={
    paginate: true,
    
    store: new CustomStore({
        key: 'question_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforupdate/'+ this.ass_template_id+'/'+this.Useridvalue,{headers})
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


async handleCheckLevelChange(event: any){
  let check_level_id= event.value;

  try {
    const response = await fetch(URL+'/CompetencyCheckLevel/GetCompetencyCheckLevelDetailsByID?check_level_id='+check_level_id); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Do something with the response data

 // Check if data is an array and not empty
 if (Array.isArray(data) && data.length > 0) {
// Access the first object in the array (assuming there's only one)
const firstItem = data[0];
// Access properties within the object
const check_Level_Weightage = firstItem.check_Level_Weightage;
this.checklevel_weightage = check_Level_Weightage;
this.ref.detectChanges();
// You can now use these values in your application
 } else {
console.log("No data received or empty response.");
}  
    
} catch (error) {
    console.error('An error occurred:', error);
  }
}

makeAsyncDataSource(http:HttpClient) {
  return new CustomStore({
    loadMode: 'raw',
    key: 'question_id',
    load() {
      return lastValueFrom(http.get(`${URL}/Assessment/GetActiveAssesment`, { headers }));
    },
  });
}

getSubTypes(event: any) {
  console.log("selected Type id: ", event.value);
  this.subjectId = event.value;
   this.Selectedtopic=null;  
  this.TopicData={
    paginate: true,
    store: new CustomStore({
        key: 'topic_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/topic/GettopicDetailsById/'+this.subjectId, {headers})
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



getSubTypes1(event: any) {
  console.log("selected Type id: ", event.value);
  this.type_id = event.value;
   this.SelectedSubtype1=null;  
  this.subtypedata1={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/SubType/GetSubTypeDetails/'+this.type_id, {headers})
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


 onGridBoxOptionChanged(e:any) {
    
  if (e.name === 'value') {
this.gridBoxValue=e.value;
this.visiblestepper=true;
    this.isGridBoxOpened = false;
    this.ref.detectChanges();
    this.ass_template_id=encodeURIComponent(e.value);
   let ass_template_id=e.value;
   this.questionIdsArray=[];
   this.QuestionList = {
    paginate: true,
    store: new CustomStore({
      key: 'question_id',
      loadMode: 'raw',
      load: () => {
        return new Promise((resolve, reject) => {
          this.http.get(URL + '/Assessment/GetListOfQuestionsByID/' + ass_template_id, { headers })
            .subscribe(
              (res:any) => {
                console.log('Load success:', res);
  

                resolve(res);
                res.forEach((ele:any) => {
                  this.questionIdsArray.push(ele.question_id);
                });
                
              },
              (err) => {
                console.error('Load error:', err);
                reject(err);
              }
            );
        });
      },
    }),
  };






  this.http.get(URL + '/Assessment/GetActiveAssesmentbyid/'+this.ass_template_id, {headers})
    .subscribe((response: any) => {
   //  alert(JSON.stringify(response));
                  
  if (Array.isArray(response) && response.length > 0) {
    // Data is an array and has at least one element
    const PubList = response[0]; // Access the first element of the array
   // alert(JSON.stringify(PubList));
 
  

    this.AssBuilderForm.controls['AssessmentName'].setValue(PubList.assessment_name);
    this.AssBuilderForm.controls['AssessmentDescription'].setValue(PubList.assessment_description);
    this.AssBuilderForm.controls['CometencySkillLevel'].setValue(PubList.competency_id);    
    this.AssBuilderForm.controls['ExplanationOpt'].setValue(PubList.show_explaination);
    this.AssBuilderForm.controls['AssessmentType'].setValue(PubList.type_id);
    let typeid=PubList.type_id;
    this.subType = this.makeAsyncDataSource1(this.http,typeid);
      
         
    this.subType.load().then((data: any) => {    
      this.zone.run(() => {
        this.AssBuilderForm.controls['AssessmentSubType'].setValue(PubList.subType_id);
  
      this.ref.detectChanges();
    });
   
   });


    this.AssBuilderForm.controls['HintOpt'].setValue(PubList.show_hint);
    this.AssBuilderForm.controls['Keywords'].setValue(PubList.keywords);
   
    
this.ref.detectChanges();
//alert(JSON.stringify(this.AssBuilderForm.value));
  

this.zone.run(() => {
  this.ref.detectChanges();
});} 
    
      else {
        // Data is either not an array or it's empty
        // Handle this case as needed
      }
      
    },
    (error: any) => {
      // Handle error during HTTP request
      console.error('Error in GetActiveAssesmentbyid request:', error);
      // Add additional error handling as needed
    } );

 
   
  
   // alert(e.value)
 }
}


   makeAsyncDataSource1(http:HttpClient,typeid:any) {
  
    return new CustomStore({
      loadMode: 'raw',
      key: 'subType_id',
      load() {
        return lastValueFrom(http.get(URL+'/SubType/GetSubTypeDetails/'+typeid, { headers }));
      },
    });
  }

get options(): FormArray {
  return this.AssBuilderForm.get('options') as FormArray;
}
makeAsyncDataSourceTopicData(http:HttpClient,subjectId:any) {
  return new CustomStore({
    loadMode: 'raw',
    key: 'topic_id',
    load() {
      return lastValueFrom(http.get(`${URL}/topic/GettopicDetailsById/${subjectId}`, { headers }));
    },
  });
}



removeButtonClick() {
  // Implement the logic you want to execute when the button is clicked
 // alert('Remove button clicked');
//alert(this.SelectedQuestion);
 // Check if there are selected questions
 if (this.SelectedQuestion.length === 0) {
  // Handle the case where no questions are selected
  return;
}

// Prepare the payload to send to the API (adjust the structure based on your API requirements)
//const selectedQuestionIds = this.SelectedQuestion.join(',');

// Prepare the payload to send to the API (adjust the structure based on your API requirements)
const payload =this.SelectedQuestion;


// Make an HTTP POST request to your API
this.http.post(URL+`/AssessmentBuilder/GenQuestStaUpdatedforTempId/`+this.ass_template_id,payload, { headers })
  .subscribe(response => {
    // Handle the API response as needed
   
    console.log('API Response:', response);
    const message = "Removed Questions Successfully.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
this.loadFunctions();
    // Optionally, you can reset the selected questions array after a successful update
    this.SelectedQuestion = [];
   
   
  }, error => {
    // Handle errors from the API request
    console.error('API Error:', error);
   
  });

  // Example: Call a function or perform some action
 
}

//Adding Questions code
addButtonClick(){
//  alert('Add button clicked');
  console.log(this.SelectedQuestionForAdd);
 
  
 // Check if there are selected questions
 if (this.SelectedQuestionForAdd.length === 0) {
  // Handle the case where no questions are selected
  return;
}

const payload =this.SelectedQuestionForAdd;


// Make an HTTP POST request to your API
this.http.post(URL+`/AssessmentBuilder/UpdateGenDetails/`+this.ass_template_id,payload, { headers })
  .subscribe(response => {
    // Handle the API response as needed
    console.log('API Response:', response);

    const message = "Added Questions Successfully.";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
    
 this.loadFunctions();

    // Optionally, you can reset the selected questions array after a successful update
    this.SelectedQuestionForAdd = [];
    this.AllQuesDropdown=false;
    this.GeneratedDropdown=true;
    this.NextButton=true;
    this.addbutton=true;
    this.BackButton=false;
    this.CreateButton=false;
  }, error => {
    // Handle errors from the API request
    console.error('API Error:', error);
    this.AllQuesDropdown=false;
    this.addbutton=true;
    this.BackButton=false;
    this.CreateButton=false;
  });



}

loadFunctions(){

  setTimeout(() => {
    // Recreate the QuestionList object
    this.QuestionList = {
      paginate: true,
      store: new CustomStore({
        key: 'ass_template_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/Assessment/GetListOfQuestionsByID/' +this.ass_template_id, { headers })
              .subscribe(
                (res) => {
                  console.log('Load success:', res);
                  resolve(res);
                },
                (err) => {
                  console.error('Load error:', err);
                  reject(err);
                }
              );
          });
        },
      }),
    };
  }, 100);

this.loadQuestions();
  
setTimeout(() => {
  // Recreate the TotalQuestionsList object
  this.TotalQuestionsList = {
    paginate: true,
    store: new CustomStore({
      key: 'question_id',
      loadMode: 'raw',
      load: () => {
        return new Promise((resolve, reject) => {
          this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforupdate/' + this.ass_template_id, { headers })
            .subscribe(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
        });
      },
    }),
  };
}, 100);
}



addButton(){
  this.loadQuestions();
  this.MyQuestionsselectionForAdd='My Questions';
  // this.toggleQuestionForm();
  this.AllQuesDropdown=true;
  this.GeneratedDropdown=false;
  this.NextButton=true;
  this.addbutton=false;
  this.BackButton=true;
  this.CreateButton=true;
}
BackButtonClick(){
  this.GeneratedDropdown=true;
  this.addbutton=true;
  this.BackButton=false;
  this.AllQuesDropdown=false;
  this.NextButton=true;
  this.CreateButton=false;
  this.showQuestionForm=false;
}




publishPreview(event: Event, stepper: MatStepper): void {
 
  this.PublishAssBuilder();
  this.loadFunctions();
 
}

PublishAssBuilder(): void {
  // 2nd Stepper
  if (this.AssBuilderForm.valid) {
    this.AssessmentBuilderinfo.Competency_id = this.AssBuilderForm.value.CometencySkillLevel;
    this.AssessmentBuilderinfo.show_explaination = this.AssBuilderForm.value.ExplanationOpt;
    this.AssessmentBuilderinfo.show_hint = this.AssBuilderForm.value.HintOpt;
    this.AssessmentBuilderinfo.Type_id = this.AssBuilderForm.value.AssessmentType;
    this.AssessmentBuilderinfo.SubType_id = this.AssBuilderForm.value.AssessmentSubType;
    this.AssessmentBuilderinfo.assessment_name = this.AssBuilderForm.value.AssessmentName;
    this.AssessmentBuilderinfo.assessment_description = this.AssBuilderForm.value.AssessmentDescription;
    this.AssessmentBuilderinfo.keywords = this.AssBuilderForm.value.Keywords;
    this.AssessmentBuilderinfo.ass_template_id=this.ass_template_id;
    this.AssessmentBuilderinfo.user_id=this.Useridvalue;
    this.AssessmentBuilderinfo.OldQuestionsIds=this.questionIdsArray;
    this.http.post(URL + '/AssessmentBuilder/UpdateAssBuilderNew',this.AssessmentBuilderinfo, { headers })
      .subscribe((response: any) => {
        this.visiblestepper=false;
     
        console.log("Data updated Successfully", response);

        const message = "Assessment Template updated Successfully.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message },
        });
        this.ref.detectChanges();
        this.AssBuilderForm.reset();
       
        this.gridBoxValue = null;
      }, (error: any) => {
        console.log("Data not saved");
      
        const message = "Error Saving Data.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message },
        });
      });
  } else {
    // The form is not valid, display the names of all invalid controls

    // Get the names of all invalid controls
    const invalidControls = Object.keys(this.AssBuilderForm.controls).filter(controlName =>
      this.AssBuilderForm.controls[controlName].invalid
    );

    // Display the names of all invalid controls
    if (invalidControls.length > 0) {
     
      const message = `Please Enter values: ${invalidControls.join(', ')}`;
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: message },
      });
    
    }
  }
}
changeStatusAddQues(eventData: { flag: boolean, message: string }) {
  // Update properties based on the emitted event
  this.showQuestionForm = eventData.flag;
  
  // Perform actions based on the emitted event
  if(eventData.message=="Update"){
    this.BackButtonClick();
  }
  else{
    this.AllQuesDropdown=true;
  }
 
  this.refresh = this.stepperService.refreshSecondStepper$.subscribe(() => {
    this.loadQuestions();
    this.loadFunctions();
    console.log('Refreshing Second Stepper');
  });

  // Use the message from the emitted event if needed
  console.log('Received message from child component:', eventData.message);
}



handleQuestionsTypeForAdd(e:any){


  if(e.value=="My Questions"){
    this.TotalQuestionsList={
      paginate: true,
      
      store: new CustomStore({
          key: 'question_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforupdate/'+ this.ass_template_id+'/'+this.Useridvalue,{headers})
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
  else{
    this.TotalQuestionsList={
      paginate: true,
      
      store: new CustomStore({
          key: 'question_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsForAdd/'+ this.ass_template_id+'/'+this.Useridvalue,{headers})
              .subscribe((res:any) => {
               (resolve(res));
            
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
      };
   
    
     


  
  }
}

}
