import notify from 'devextreme/ui/notify';
import { DxDropDownBoxModule, DxListComponent, DxListModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Component, ViewChild,AfterViewInit  } from '@angular/core';
import { MatStepper  } from '@angular/material/stepper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { AssessmentBuilder,RepositoryFiles,questionBankUpdate } from 'src/app/inspectionservices.service';

import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../customized-assessment/customized-assessment.component';
import { StepperService } from 'src/app/assessment-service.service';
import { Router } from '@angular/router';
import { format } from 'crypto-js';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

interface Food {
  value: string;
  viewValue: string;
  
}

@Component({
  selector: 'app-assessment-builder',
  templateUrl: './assessment-builder.component.html',
  styleUrls: ['./assessment-builder.component.scss']
})

export class AssessmentBuilderComponent implements OnInit, OnDestroy {
  private refresh: Subscription = new Subscription;

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('Obj_Doc') textarea!: ElementRef;

  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
 
  
  visiblestepper2:boolean=false;
  isPopupVisible: boolean = false;
  selectedRowData: any;
  visstep:boolean=true;
  currentStep:number=0;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  dataGrid: any;
  skillleveldata:any[] = [];
  frequencyArray:any[]=[];
  totalques:any;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.AssBuilderForm.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
    }

    // Clear the input value
   // event.chipInput!.clear();
   if (event.chipInput) {
    event.chipInput.clear();
  }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
       this.tags.splice(index, 1);
      this.AssBuilderForm.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
    }
    // Clear the input field explicitly
    this.chipListInput.nativeElement.value = '';
  }


  sumOfEstimatedTime:any;
  QuestionListColumns: string[] = [
    'question',
    'subject_Name',
    'topic_Name',
    'skill_Level_Name',
    'created_date',
    'keywords',
  ];

 
  
  GetAllQuestions:any;
dissapearButtons:boolean=true;
BackButton:boolean=false;
NextButton:boolean=true;
AllSelectedQuestion:any;


isStep3Completed:boolean=false;
isStep4Completed:boolean=false;
  AssessmentBuilderinfo:AssessmentBuilder = new AssessmentBuilder();
  GeneratedDropdown:boolean=true;
  AllQuesDropdown:boolean=false;
  showQuestionForm:boolean=false;
  showParentComponent:boolean=true;
  addbutton:boolean=true;
  CreateButton:boolean=false;
  selectedOptionRadio: any; // variable to store the selected option
  RadioOptions = [
    { label: 'Remove Question(s) ', value: 'option1' },
    { label: 'Select Question(s) to be added', value: 'option2' },
    { label: 'Create Question(s) to be added', value: 'option3' },
  
  ];
  questionsType: string[] = [
    'My Questions',
    'Question Bank Reserve',
  ];

 
  foods: Food[] = [
    {value: '1', viewValue: 'Create New Question'},
    {value: '2', viewValue: 'Get Question'},
   
  ];
  
  SkillName:any;
  Typename:any;
  SubTypename:any;
  SelectedQuestion: any[] = [];
  QuestionList:any;
  SelectedQuestionForAdd:any;
  TotalQuestionsList:any;
  MyQuestionsselectionForAdd:any='My Questions'
  Useridvalue:any;
  //Create New Question code
  ShowAddQuestion:boolean=false;
  SearchAddQuestion:boolean=false;
  data: any;
  CheckLevelData:any;
  resptypedata:any;
  MapSubject:any;
  TopicData:any;
  SubjectData:any;
  Selectedtopic:any;
  subjectId:any;
  optionCount: number = 2; // default value
  //optionsArray: number[] = Array(this.optionCount).fill(0);
  OptionA=false;
  OptionB=false;
  OptionC=false;
  resptype: Array<{ id: number, text: string }> = [];
 ChooseOptions:Array<{id:string,text:string}>=[];
 checklevels:Array<{id:number,text:string}>=[];
 selectedFile: File | null = null;
 base64Image: string | null = null;

 questionForm: FormGroup;
 AssBuilderForm: FormGroup;
 checklevel_weightage: number = 0.01;


// Your existing gridColumns configuration
gridColumns: any[] = [
    {
  dataField: 'question_id', caption: 'Question ID'
  },
  {
    dataField: 'question',
    caption: 'Question Description'
  },
  {
    dataField: 'subject_Name',
    caption: 'Subject Name'
  },
  {
    dataField: 'topic_Name',
    caption: 'Topic Name'
  },
  {
    dataField: 'skill_Level_Name',
    caption: 'Competency Skill Level'
  },
  {
    dataField: 'created_date',
    caption: 'Created Date',
    alignment: "right",
    width: 180,
    dataType: "date",
    format:'dd-MMM-yyyy'
  }
  ,
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
    caption: 'Subject Name'
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






  SelectedSubtype1:any;
  typedata1:any;
  subtypedata1:any;
  SkillData1:any;
  dataNew1:any;
  resptype1: Array<{ id: number, text: string }> = [];
  ChooseOptions1:Array<{id:number,text:string}>=[];
  ChooseOpt_to_showexp:Array<{id:number,text:string}>=[];
  checklevels1:Array<{id:number,text:string}>=[];
  ShowHint:string='';
  dataNew: any;
  ShowExplanation:string='';
  type_id:any;
  subType_id:any;
  public isButtonDisabled = false;
  
  ngOnInit() {
    
    this.loadQuestions();
   this.loadFunctions();
   store: new CustomStore({
    key: 'question_id',
    loadMode: 'raw',
    load: () => {
      return this.http.get(URL + '/AssessmentBuilder/GetQuestions/' + this.Useridvalue, { headers })
        .toPromise()
        .then((res: any) => res.data) // Assuming your data is nested within the 'data' property
        .catch((err) => {
          console.error(err);
          throw err;
        });
    },
  }),

    
this.GetAllQuestions={
  paginate: true,
  
  store: new CustomStore({
      key: 'question_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforCustomization/'+this.Useridvalue,{headers})
          .subscribe(res => {
           (resolve(res));
  
          }, (err) => {
            reject(err);
          });
    });
    },
  }),
  };
    
    this.ChooseOpt_to_showexp=[
      { id:1,text:'Yes' },
      { id:2,text:'No'  }
    ];


    this.ChooseOptions1=[
      { id:1,text:'Yes' },
      { id:2,text:'No'  }
    ];

    this.checklevels1=[
      {id:1,text:'Easy'},
      {id:2,text:'Medium'},
      {id:3,text:'Hard'}
    ];


    this.dataNew = new ArrayStore({
      data: this.ChooseOptions1,
      key: "ID"
    });


    this.dataNew1 = new ArrayStore({
      data: this.ChooseOpt_to_showexp,
      key: "ID"
    });


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

    this.checklevels=[
      {id:1,text:'Easy'},
      {id:2,text:'Medium'},
      {id:3,text:'Hard'}
    ];


    this.data = new ArrayStore({
      data: this.ChooseOptions,
      key: "ID"
    });








    

  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }
  private questionsSubject = new BehaviorSubject<any[]>([]);
  questions$ = this.questionsSubject.asObservable();

  dataSource: any;


  constructor(public stepperService: StepperService,private router: Router,public dialog: MatDialog,private http: HttpClient,private formBuilder: FormBuilder,private ref: ChangeDetectorRef,public ngzone:NgZone) {

    this.stepperService.currentStep$.subscribe((step) => {
      this.currentStep = step;
   
     
    });
   
    this.refresh = this.stepperService.refreshSecondStepper$.subscribe(() => {
   
      this.loadQuestions();
      this.loadFunctions();
     
      console.log('Refreshing Second Stepper');
    });

    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      objective: ['', Validators.required],
      response_type: ['', Validators.required],
      //no_of_selectionchoices: ['', Validators.required],
      fullresponse: [''],
      correct_answer:['', Validators.required],
      question_hint:['', Validators.required],
      questionmarked_favourite:['', Validators.required],
      check_level: ['', Validators.required],
      score_weightage: ['', Validators.required],
      checklevel_weightage: ['', Validators.required],
      estimated_time: ['', Validators.required],
      keywords: ['', Validators.required],
      assessor_randomselection: ['', Validators.required],
      assessment_randomsetting: ['', Validators.required],
      subjectid: ['', Validators.required],
      topicid: ['', Validators.required],
      ref_to_governance_control: ['', Validators.required],
      options: this.formBuilder.array([]),
    });


    //Assessement Builder Page Form

    this.AssBuilderForm = this.formBuilder.group({
      CometencySkillLevel: ['', Validators.required],
      ExplanationOpt: [''],
      HintOpt: [''],
      AssessmentType: ['',Validators.required],
      AssessmentSubType:['', Validators.required],
      AssessmentName:['', Validators.required],
      AssessmentDescription:[''],
      Keywords: [''],
    
    });


    this.MapSubject={
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

    for (let i = 0; i < 2; i++) {
      this.options.push(this.formBuilder.control(''));
    }
  




    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.Useridvalue=Userid;



   
setTimeout(() => {
  this.GetAllQuestions={
    paginate: true,
    
    store: new CustomStore({
        key: 'question_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforCustomization/'+this.Useridvalue,{headers})
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



  

  }
  loadQuestions(): void {
    this.http.get(URL + '/AssessmentBuilder/GetQuestions/' + this.Useridvalue, { headers })
      .subscribe((res: any) => {
        if (Array.isArray(res)) {
          this.questionsSubject.next(res);
        
          const skillLevelName: string[] = [];
          this.dataSource = res; // Set data for MatTableDataSource
          this.sumOfEstimatedTime=0;

          // Iterate over each question in the array
            for (let i = 0; i < res.length; i++) {
              // Add the 'estimated_time' value of each question to the sum
              this.sumOfEstimatedTime += res[i].estimated_time;
              skillLevelName.push(String(res[i].skill_Level_Name));
            }
            const frequencyMap = new Map<string, number>();
            skillLevelName.forEach(element => {
              frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
            });
            const totalQuestions = skillLevelName.length;

            const percentageArray: { element: string; percentage: number }[] = [];
            const frequencyArray: { element: string; frequency: number }[] = [];

            frequencyMap.forEach((frequency, element) => {

              const percentage = Math.round((frequency / totalQuestions) * 100);
              percentageArray.push({ element, percentage });
              frequencyArray.push({ element, frequency });
            });
      this.skillleveldata=percentageArray;
      this.frequencyArray = frequencyArray;
           this.totalques=totalQuestions;


        } else {
          console.error('Invalid response format. Expected an array.');
        }
      }, (err) => {
        console.error('Error loading questions', err);
      });
  }


  toggleQuestionForm() {
    this.showParentComponent = !this.showParentComponent; // Update visibility
    this.showQuestionForm = !this.showQuestionForm;
  }


  
  selectOption1(event: any) {
    // handle the selection change here
    console.log('Selected:', event.value);
   
   
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


// Create a getter to access the 'options' FormArray
get options(): FormArray {
  return this.questionForm.get('options') as FormArray;
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
  
  selectOption(event: any) {
    // handle the selection change here
    console.log('Selected:', event.value);
    if (event.value === 1) { // Assuming 'Direct Upload' has an id of 1
    this.OptionA=true;
    this.OptionB=false;
    this.OptionC=true;
    } else {
      this.OptionA=false;
      this.OptionB=true;
      this.OptionC=false;
    }
  }
 
  updateOptionsArray(event: any) {
  //  console.log("Updated value: ", event.value);
  //   this.optionCount = event.value;
  //     this.optionsArray = Array(this.optionCount).fill(0);
 

  const optionCount = event.value;
  this.options.clear();
  
  for (let i = 0; i < optionCount; i++) {
    this.options.push(this.formBuilder.control(''));
  }
}
 
  
longText = "";
updateClick() {
  notify('Uncomment the line to enable sending a form to the server.');
  // form.submit();
}


 
getSubTypes(event: any) {
  console.log("selected Type id: ", event.value);
  this.subjectId = event.value;
   this.Selectedtopic=null;  
  this.TopicData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
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


 saveQuestion() {
 
   if (this.questionForm.valid) {
   
    const response_type = this.questionForm.value.response_type;
    let question_id=localStorage.getItem('question_id');
    let formData: any;
    formData = {
      question_id:question_id,
      question: this.questionForm.value.question,
      objective: this.questionForm.value.objective,
      response_type: this.questionForm.value.response_type,
      no_of_selectionchoices: this.questionForm.value.no_of_selectionchoices,
      fullresponse: '',
      correct_answer: this.questionForm.value.correct_answer,
      question_hint: this.questionForm.value.question_hint,
      questionmarked_favourite: this.questionForm.value.questionmarked_favourite,
      check_level: this.questionForm.value.check_level,
      score_weightage: this.questionForm.value.score_weightage,
      checklevel_weightage: this.questionForm.value.checklevel_weightage,
      estimated_time: this.questionForm.value.estimated_time,
      keywords: this.questionForm.value.keywords,
      assessor_randomselection: this.questionForm.value.assessor_randomselection,
      assessment_randomsetting: this.questionForm.value.assessment_randomsetting,
      subjectid: this.questionForm.value.subjectid,
      topicid: this.questionForm.value.topicid,
      ref_to_governance_control: this.questionForm.value.ref_to_governance_control,
      base64: this.base64Image,
      question_disabled:'No',
      userid:this.Useridvalue,

    };
    const optionValues: { index: number; value: string }[] = [];
    if (response_type === 1) {
      // Fetch dynamic options from your optionsArray
     // const options = []
     const optionsArray = this.questionForm.get('options') as FormArray;
    

     

     for (let i = 0; i < optionsArray.length; i++) {
       const optionValue = optionsArray.at(i).value;
       optionValues.push({ index: i, value: optionValue });
     }
     formData.options = optionValues;
   //  formData.options={}
    
  }
  else if (response_type === 2) {
   
  
     optionValues.push({ index: 1, value: this.questionForm.value.fullresponse });
    
    formData.options=optionValues;

    formData.fullresponse=this.questionForm.value.fullresponse;
    
    };
  
  console.log('Form Data:', formData);

    // Handle form submission or API call here

    this.http.post(URL + '/QuestionBank/CustomizedAssessment',formData)
    .subscribe((response: any) => {
      console.log('Data Save Succefully ', response);
      // Handle the response from the server if needed
  
 const message = "Data Saved Successfully.";
 const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
   width: '550px',
   data: { message: message},
  
 });
     this.questionForm.reset();
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
   
   const message = "Invalid Form.";
   const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
     width: '550px',
     data: { message: message},
    
   });
   }
   this.showParentComponent = true; // Show parent component
   this.showQuestionForm = false;
}


PublishAssBuilder():void{

   //2nd Stepper
  

      this.AssessmentBuilderinfo.Competency_id=this.AssBuilderForm.value.CometencySkillLevel;   
      this.AssessmentBuilderinfo.show_explaination=this.AssBuilderForm.value.ExplanationOpt;   
      this.AssessmentBuilderinfo.show_hint=this.AssBuilderForm.value.HintOpt;
      this.AssessmentBuilderinfo.Type_id=this.AssBuilderForm.value.AssessmentType;
      this.AssessmentBuilderinfo.SubType_id=this.AssBuilderForm.value.AssessmentSubType;
      this.AssessmentBuilderinfo.assessment_name=this.AssBuilderForm.value.AssessmentName;
      this.AssessmentBuilderinfo.assessment_description=this.AssBuilderForm.value.AssessmentDescription;
      this.AssessmentBuilderinfo.total_questions=this.totalques;
      this.AssessmentBuilderinfo.total_estimated_time=this.sumOfEstimatedTime;
      
      const UpdateKeywords = this.AssBuilderForm.value.Keywords;
    
    if (Array.isArray(UpdateKeywords) && UpdateKeywords.length > 0) {
      this.AssessmentBuilderinfo.keywords = UpdateKeywords.join(', ');
      // Additional code inside the condition if needed
    } else {
      // Handle the case where no value is selected (null or empty array)
      console.log('No key values');
    }
  
    
  
      this.http.post(URL+'/AssessmentBuilder/InsertAssBuilder/'+this.Useridvalue, this.AssessmentBuilderinfo,{headers}).subscribe((response:any)=>{
        console.log("Data Saved Successfully",response);
        const message = "Assessment Template published Successfully.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });

       
        
      },(error:any)=>{
      
        const message = "Error Saving Data.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
      });

      let questionBankUpdateInstance = new questionBankUpdate();
      questionBankUpdateInstance.no_of_times_used = [];
      
      // HTTP GET request
      this.http.get(URL + '/AssessmentBuilder/GetQuestions/' + this.Useridvalue).subscribe((data: any) => {
        if (Array.isArray(data)) {
          data.forEach((e: any) => {
            // Push the question_id into the no_of_times_used array
            questionBankUpdateInstance.no_of_times_used.push(e.question_id);
          });
          this.http.put(URL + '/AssessmentBuilder/PutQuestionsUsed',questionBankUpdateInstance).subscribe((response:any) => {
            console.log("Questions Used Successfully", response);
          });
      
          // Log the contents of the no_of_times_used array
          console.log("Contents of no_of_times_used array:",questionBankUpdateInstance.no_of_times_used);
        }
       
       
        this.ref.detectChanges();
        this.AssBuilderForm.reset();
      });

   
    
}

publishPreview(event: Event, stepper: MatStepper): void {
 
  this.PublishAssBuilder();
  this.loadFunctions();
  
  this.stepper.reset();
  
  setTimeout(()=>{window.location.reload();},2000)
}
 

validateAndMoveToNextStep(): void {
 
 
  const invalidControls: string[] = [];
  // Check if the form is valid before moving to the next step
  if (this.AssBuilderForm.valid) {
    // Move to the next step in the stepper
    this.loadQuestions();
    this.SkillData1.store.load()
    .then((data: any[]) => {
      if (Array.isArray(data)) {
        const selectedCompetency = data.find(item => item.competency_id === this.AssBuilderForm.value.CometencySkillLevel);
        if (selectedCompetency) {
          const competencyName = selectedCompetency.competency_Name;
this.SkillName=competencyName;
        } 
      } 
    })
    this.typedata1.store.load()
    .then((data: any[]) => {
      if (Array.isArray(data)) {
        const selectedType = data.find(item => item.type_id === this.AssBuilderForm.value.AssessmentType);
        if (selectedType) {
          const selectedTypeName = selectedType.type_Name;
this.Typename=selectedTypeName;
        } 
      } 
    })

    this.subtypedata1.store.load()
    .then((data: any[]) => {
      if (Array.isArray(data)) {
        const subtypedata = data.find(item => item.subType_id === this.AssBuilderForm.value.AssessmentSubType);
        if (subtypedata) {
          const selectedTypeName = subtypedata.subType_Name;
this.SubTypename=selectedTypeName;
        } 
      } 
    })
    if(this.AssBuilderForm.value.HintOpt==1)
this.ShowHint="Yes";
  else this.ShowHint="No"
   
  if(this.AssBuilderForm.value.ExplanationOpt==1)
this.ShowExplanation="Yes";
  else this.ShowExplanation="No"
   
  this.isStep3Completed=true;
    this.stepper.next();

  } else {

    const invalidControls: string[] = [];
  
    // Map control names to user-friendly names
    const controlNameMap: { [key: string]: string } = {
      'CometencySkillLevel': 'Cometency Skill Level',
      'AssessmentType': 'Assessment Template Type ',
      'AssessmentSubType': 'Assessment Template Sub-Type',
      'AssessmentName': 'Name of Assessment Template',
         

    };
    Object.keys(this.AssBuilderForm.controls).forEach(key => {
      const control = this.AssBuilderForm.get(key);

      if (control?.invalid) {
        Object.keys(control.errors || {}).forEach(errorKey => {
          const message = this.getErrorMessage(controlNameMap[key] || key, errorKey);
          invalidControls.push(message);
        });
      }
    });

    // Display error messages for all invalid controls
    if (invalidControls.length > 0) {
      const errorMessage = `Form is not valid. Please correct the following issues:\n${invalidControls.join('\n')}`;
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: errorMessage },
      });
    }
   
  }

}
           
getErrorMessage(controlName: string, errorKey: string): string {
  const errorMessages: { [key: string]: string } = {
    'required': `${controlName} is required.`,
    // Add more error messages as needed
    panelClass: 'custom-error-dialog' // Add a custom class for styling
  };

  return errorMessages[errorKey] || `Validation error for ${controlName}.`;
}


onOptionSelected(event:any): void {
  const selectedvalue=event.value;
if (selectedvalue==1)
{ this.ShowAddQuestion=true;
this.SearchAddQuestion=false;
}
else
{
this.ShowAddQuestion=false;
this.SearchAddQuestion=true;
}
}


//RadioButton Code

onButtonClick(value: string) {
  console.log('Button clicked with value:', value);
  this.selectedOptionRadio = value;
  this.onSelectionChange(); // Call the function to perform actions based on the selected option
}

onSelectionChange() {
  // Perform actions based on the selected option
  console.log('Selected option:', this.selectedOptionRadio);

  // Example: Call a function or trigger some logic based on the selected option
  switch (this.selectedOptionRadio) {
    case 'option1':
      this.performAction1();
      break;
    case 'option2':
      this.performAction2();
      break;
      case 'option3':
       
        break;
    
    default:
      break;
  }
}

performAction1() {
  // Implement the logic for Option 1
  console.log('Performing action for Option 1');
  this.dissapearButtons=false;
  this.GeneratedDropdown=true;
  this.AllQuesDropdown=false;
  this.NextButton=true;
  
}

performAction2() {
  // Implement the logic for Option 2
  console.log('Performing action for Option 2');
  this.dissapearButtons=false;
  this.AllQuesDropdown=true;
  this.GeneratedDropdown=false;
 
}

loadFunctions(){


    
  setTimeout(() => {
  this.GetAllQuestions={
    paginate: true,
    
    store: new CustomStore({
        key: 'question_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforCustomization/'+this.Useridvalue,{headers})
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



  setTimeout(() => {
    // Recreate the QuestionList object
    this.QuestionList = {
      paginate: true,
      store: new CustomStore({
        key: 'question_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/AssessmentBuilder/GetQuestions/' + this.Useridvalue, { headers })
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
          this.http.get(URL + '/AssessmentBuilder/GetAllQuestions/' + this.Useridvalue, { headers })
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

//Remove Questions Code
removeButtonClick() {
  // Implement the logic you want to execute when the button is clicked
  console.log('Remove button clicked');
 console.log(this.SelectedQuestion);
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
this.http.post(URL+`/AssessmentBuilder/GenQuestStaUpdated/`+this.Useridvalue,payload, { headers })
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
this.NextButton=true;
  console.log('Add button clicked');
  console.log(this.SelectedQuestionForAdd);
 // Check if there are selected questions
 if (this.SelectedQuestionForAdd.length === 0) {
  // Handle the case where no questions are selected
  return;
}

const payload =this.SelectedQuestionForAdd;


// Make an HTTP POST request to your API
this.http.post(URL+`/AssessmentBuilder/insertGenDetails/`+this.Useridvalue,payload, { headers })
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


GenerateTemplate(){
console.log(this.AllSelectedQuestion);
if(this.AllSelectedQuestion.length==0){
  return
}

const QuestArray=this.AllSelectedQuestion;

  this.http.post(URL+'/AssessmentBuilder/insertGenQuestions/'+this.Useridvalue,QuestArray,{headers}).subscribe((arraydata:any)=>{
   
    console.log('API Response:', arraydata);

    const message = "Assessment Template Questions Generated";
    const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: message},
     
    });
    this.loadFunctions();
   
   
    
   
    setTimeout(() => {
     
      this.stepper.next();
     
    }, 100);
    this.ref.detectChanges();
  },error => {
      // Handle errors from the API request
      console.error('API Error:', error);
     
});
 

}


addButton(){
  // this.toggleQuestionForm();
  this.AllQuesDropdown=true;
  this.GeneratedDropdown=false;
  this.NextButton=true;
  this.addbutton=false;
  this.BackButton=true;
  this.CreateButton=true;
}
CreateButtonClick(){
  
 // this.toggleQuestionForm();
 this.showQuestionForm=true;
 this.AllQuesDropdown=false;
this.GeneratedDropdown=false;
this.NextButton=true;
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

removeGeneratedDropdown() {
  // Implement the logic to remove the generated dropdown
  console.log('Removing generated dropdown');
  
  this.GeneratedDropdown = false;
}

exitPage() {
    this.showParentComponent = true; // Show parent component
    this.showQuestionForm = false;
    this.dissapearButtons=false;
    this.AllQuesDropdown=false;
    this.GeneratedDropdown=true;
  
   
  this.addbutton=true;
  this.BackButton=false;
 
  this.NextButton=true;
}


CancelTemplate(): void {
    // Refresh the page using location.reload()
    window.location.reload();
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
              this.http.get(URL + '/AssessmentBuilder/GetAllQuestions/'+this.Useridvalue,{headers})
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
              this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsForAdd/'+this.Useridvalue,{headers})
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
