import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,Input } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { DxDropDownBoxModule, DxListComponent, DxListModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tag } from '../../inventory/bridge-list/bridge-list.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { StepperService,RandomSeleForm } from 'src/app/assessment-service.service';



const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-create-new-questions',
  templateUrl: './create-new-questions.component.html',
  styleUrls: ['./create-new-questions.component.scss']
})
export class CreateNewQuestionsComponent {

 @Input()templateId:any;
@Output() EventMessage = new EventEmitter<{flag: boolean, message: string}>();
@ViewChild('Obj_Doc') textarea!: ElementRef;
@ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
stepvalue:any=0;
Useridvalue:any;

data: any;
erroMessage: any;
value:any;
CheckLevelData:any;
resptypedata:any;
MapSubject:any;
TopicData:any;
SubjectData:any;
Selectedtopic:any;
subjectId:any;
exitValue:boolean=false;
optionCount: number = 2; // default value
//optionsArray: number[] = Array(this.optionCount).fill(0);
OptionA=false;
OptionB=false;
OptionC=false;
Answers=false;
resptype: Array<{ id: number, text: string }> = [];
ChooseOptions:Array<{id:string,text:string}>=[];
checklevels:Array<{id:number,text:string}>=[];
selectedFile: File | null = null;
base64Image: string  = "";

questionForm: any;
checklevel_weightage: number = 0.01;
form:any;
addOnBlur = true;
readonly separatorKeysCodes = [ENTER, COMMA] as const;
tags: Tag[] = [];

add(event: MatChipInputEvent): void {
const value = (event.value || '').trim();

// Add our fruit
if (value) {
  this.tags.push({name: value});
  this.questionForm.controls['keywords'].setValue(this.tags.map(tag => tag.name));
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
  this.questionForm.controls['keywords'].setValue(this.tags.map(tag => tag.name));
}
// Clear the input field explicitly
this.chipListInput.nativeElement.value = '';
}

  ngOnInit() {
    setTimeout(()=>{
      this.stepperService.goToStep(this.stepvalue);
    },10); 

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
  selectedOption = 'No';
  selectedCount='2';
  selectedType=1;
  constructor(private stepperService: StepperService,private http: HttpClient,private fb: FormBuilder, public dialog: MatDialog,private formBuilder: FormBuilder,private ref: ChangeDetectorRef){
    this.OptionA=true;
    this.OptionB=false;
    this.OptionC=true;
    this.Answers=true;
    this.questionForm = this.fb.group({
      questionmarked_favourite: ['No'] // Set the initial value to 'No'
    });
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
//UserId

const Userid = parsedData ? parsedData.profile.userid : null;


this.Useridvalue=Userid;


    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      objective: ['', Validators.required],
      response_type: ['', Validators.required],
      no_of_selectionchoices: [''],
     fullresponse: [''],
      correct_answer:[''],
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
  onInput() {
    this.resize();
   }
   private resize() {
    const textareaElement = this.textarea.nativeElement;
    //textareaElement.style.overflow = 'hidden';
    textareaElement.style.height = 'auto';
    textareaElement.style.height = textareaElement.scrollHeight + 'px';
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
    this.Answers=true;
    } else {
      this.OptionA=false;
      this.OptionB=true;
      this.Answers=false;
      this.OptionC=false;
    }
  }
 
  updateOptionsArray(event: any) {
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

// ngOnInitt(form: FormGroup) {
//  
// }
 
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

 validation(){

    const optionCountControl:any = this.questionForm.value.no_of_selectionchoices;
    const correctAnswerControl:any = this.questionForm.value.correct_answer;
  // alert(optionCountControl)
  // alert(correctAnswerControl)
    if (parseInt(optionCountControl) <parseInt(correctAnswerControl) ) {
    
       
 
 const message = "The correct answer must match the number of selection choices.";
 const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
   width: '550px',
   data: { message: message},
  
 });
      return;
    }
  

  }
 
 saveQuestion() {
 

   if (this.questionForm.valid) {
   
    const optionCountControl:any = this.questionForm.value.no_of_selectionchoices;
    const correctAnswerControl:any = this.questionForm.value.correct_answer;
  // alert(optionCountControl)
  // alert(correctAnswerControl)
    if (parseInt(optionCountControl) <parseInt(correctAnswerControl) ) {
    
      
 const message = "The correct answer must match the number of selection choices.";
 const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
   width: '550px',
   data: { message: message},
  
 });
      return;
    }
   
    const response_type = this.questionForm.value.response_type;
    let question_id=0;
    let formData: any;
   // alert(JSON.stringify(this.tags))
    let  taglist:string[]=[];
    this.tags.forEach((element:any)=>{
taglist.push(element.name)
    });
 let   correctanswer:any=this.questionForm.value.correct_answer;
let responsetype:any=this.questionForm.value.response_type;
 if(responsetype==2){
  correctanswer=0;
 }
  else if(responsetype==1){
if(correctanswer==''||null){
this.erroMessage = `Please provide valid information for the correct answer`;
    
// Open the DaidailogeComponent with the error message
this.dialog.open(DaidailogeComponent, {
  width: '900px',
  data: { message: this.erroMessage }
});
return;
}
  }
else{
 
}
    formData = {
      question_id:question_id,
      question: this.questionForm.value.question,
      objective: this.questionForm.value.objective,
      response_type: this.questionForm.value.response_type,
      
      no_of_selectionchoices: this.questionForm.value.no_of_selectionchoices,
      fullresponse: '',

      correct_answer:correctanswer,
      question_hint: this.questionForm.value.question_hint,
      questionmarked_favourite: this.questionForm.value.questionmarked_favourite,
      check_level: this.questionForm.value.check_level,
      score_weightage: this.questionForm.value.score_weightage,
      checklevel_weightage: this.questionForm.value.checklevel_weightage,
      estimated_time: this.questionForm.value.estimated_time,
      keywords: taglist.join(",").toString(),
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
   

    this.http.post(URL + '/QuestionBank/UpdateNewQues/'+this.templateId,formData)
    .subscribe((response: any) => {
      console.log('Data Save Succefully ', response);
      // Handle the response from the server if needed
    
       
 
 const message = "Data Saved Successfully.";
 const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
   width: '550px',
   data: { message: message},
  
 });
     this.questionForm.reset();
     this.EventMessage.emit({flag: this.exitValue, message: "Update"});
    },
    (error: any) => {
     
     
      
 const message = "Error Saving Data.";
 const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
   width: '550px',
   data: { message: message},
  
 });
    }
    );
  }
  else {
  
    let invalidFields:any = Object.keys(this.questionForm.controls)
      .filter(key => this.questionForm.get(key).invalid)
      .map(key => {
        switch(key) {
          case 'question': return 'Question ';
          case 'objective': return 'Objective ';
          case 'response_type': return 'Response type ';
          //case 'no_of_selectionchoices': return 'Noof Selectionchoices ';
          
         // case 'correct_answer': return 'Correct answer ';
          case 'question_hint': return 'Question hint ';
          case 'questionmarked_favourite': return 'Questionmarked favourite ';
          case 'score_weightage': return 'Score Weightage ';
          case 'checklevel_weightage': return 'Checklevel weightage ';
          case 'estimated_time': return 'Estimated Time ';
          case 'keywords': return 'keywords ';
          case 'assessor_randomselection': return 'Assessor Randomselection ';
          case 'assessment_randomsetting': return 'Assessment Randomsetting ';
          case 'subjectid': return 'Subjectid ';
          case 'topicid': return 'Topicid ';
          case 'ref_to_governance_control': return 'Ref to Governance control ';
          case 'options': return 'ptions ';
                     
          //default: return key; // Return the key itself if no user-friendly name is needed
          default: return key; // Return the key itself if no user-friendly name is needed
        }
      });
     // invalidFields.remove("");
   if(this.questionForm.controls["response_type"].value==1){
      if(this.questionForm.controls["no_of_selectionchoices"].value==""){

        invalidFields.push("no_of_selectionchoices");
    }
    else{
      this.options.controls.forEach((element:any)=>{
          if(element.value=""){
        invalidFields.push("Option");
        return;

          }
      });
    }
  
    }
    else{
  
      }
      
   
    
    this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
    
    // Open the DaidailogeComponent with the error message
    this.dialog.open(DaidailogeComponent, {
      width: '900px',
      data: { message: this.erroMessage }
    });
      // Optionally set form errors if needed
      this.questionForm.setErrors({ invalidFields: true });
   // alert(`Please provide valid information for the following fields: ${invalidFields.join(', ')}`);
    return; 
  }
  // else{
  //  alert('invalid form');
  //  }
}




exitPage(){
  setTimeout(()=>{
    this.EventMessage.emit({flag: this.exitValue, message: "Edit"});
    
  },10);
 
  
}
}
