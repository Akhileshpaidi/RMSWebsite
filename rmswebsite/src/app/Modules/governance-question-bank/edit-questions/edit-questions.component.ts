import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AddQuestionsComponent } from '../add-questions/add-questions.component';
import { FormArray, FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Tag } from '../../inventory/bridge-list/bridge-list.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';


const URL = BASE_URL;
// const headers = new HttpHeaders();
// headers.append('Content-Type', 'text/plain');

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Component({

 
  selector: 'app-edit-questions',
  template: `
    <img [src]="sanitizedImage" alt="Image Description">
  `,
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class EditQuestionsComponent {
  @ViewChild('Obj_Doc') textarea!: ElementRef;
  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
  optionCount: number = 2; // default value
    optionsArray: number[] = Array(this.optionCount).fill(0);
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
  resptypedata:any;
  data: any;
  erroMessage: any;
  Useridvalue:any;

  MapSubject:any;
  keywords:any;
  OptionA=true;
  OptionB=false;
  OptionC=false;
  Answers=false;
  visibleStepper=false;
  resptype: Array<{ id: number, text: string }> = [];
  ChooseOptions:Array<{id:string,text:string}>=[];
  checklevels:Array<{id:number,text:string}>=[];

     
 gridDataSource: any=[];

 gridBoxValue: number[]=[];

 isGridBoxOpened: boolean=false;

 //gridColumns: any = ['question_id','question', 'subject_Name', 'topic_Name'];
gridColumns: any = [
  { dataField: 'question_id', caption: 'Question ID' },
  { dataField: 'question', caption: 'Question' },
  { dataField: 'subject_Name', caption: 'Subject Name' },
  { dataField: 'topic_Name', caption: 'Topic Name' }
];

 gridEditDataSource:any;
 selectedFile: File | null = null;
 base64Image: string | null = null;
 questionForm: FormGroup;
 checklevel_weightage: number = 0.01;
 CheckLevelData:any;
 SubjectData:any;
 TopicData:any;
 subjectId:any;
 userdata:any;
 userid:any;
 Selectedtopic:any;
 sanitizedImage: SafeResourceUrl| null =null;
 isImageHidden: boolean = true;
questionbankoptions : any;
tags: Tag[] = [];
 

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our fruit
  if (value) {
    this.tags.push({name: value});
    this.questionForm.controls['Keyword'].setValue(this.tags.map(tag => tag.name));
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
    this.questionForm.controls['Keyword'].setValue(this.tags.map(tag => tag.name));
  }
  // Clear the input field explicitly
  this.chipListInput.nativeElement.value = '';
}
  ngOnInit() {
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
    
    let user: any = this.session.getUser();
        this.userdata = JSON.parse(user);
        console.log("userid", this.userdata.profile.userid);
        this.userid = this.userdata.profile.userid;
    
  }

  constructor( public dialog: MatDialog, private session: SessionService,private http: HttpClient,private ref: ChangeDetectorRef,private formBuilder: FormBuilder , private zone: NgZone,private sanitizer: DomSanitizer){
    this.questionForm = this.formBuilder.group({
      question: [''],
      objective: [''],
      response_type: ['', Validators.required],
      no_of_selectionchoices: ['',Validators.required],
      fullresponse: [''],
      correct_answer:['', Validators.required],
      question_hint:[''],
      questionmarked_favourite:['', Validators.required],
      check_level: ['', Validators.required],
      score_weightage: ['', Validators.required],
      checklevel_weightage: ['', Validators.required],
      estimated_time: ['', Validators.required],
      keywords: [''],
      assessor_randomselection: ['', Validators.required],
      assessment_randomsetting: ['', Validators.required],
      subjectid: ['', Validators.required],
      topicid: ['', Validators.required],
      ref_to_governance_control: [''],
      options: this.formBuilder.array([]),
     
    });
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
//UserId

const Userid = parsedData ? parsedData.profile.userid : null;


this.Useridvalue=Userid;

    // Add FormGroups to the 'options' FormArray
const optionFormGroup = this.formBuilder.group({
  id: 0,   // Initial value for 'id'
  value: '' // Initial value for 'value'
});

(this.questionForm.get('options') as FormArray).push(optionFormGroup); // Add the FormGroup to the FormArray
   // this.gridDataSource = this.makeAsyncDataSource(this.http);
    
   this.gridDataSource={
    paginate: true,
    store: new CustomStore({
        key: 'question_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/QuestionBank/GetActiveQuestionsbyUserid/'+this.userid, {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
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

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }
  // makeAsyncDataSource(http:HttpClient) {
  //   return new CustomStore({
  //     loadMode: 'raw',
  //     key: 'question_id',
  //     load() {
  //       return lastValueFrom(http.get(`${URL}/QuestionBank/GetActiveQuestions`, { headers }));
  //     },
  //   });
  // }

  makeAsyncDataSourceTopicData(http:HttpClient,subjectId:any) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'topic_id',
      load() {
        return lastValueFrom(http.get(`${URL}/topic/GettopicDetailsById/${subjectId}`, { headers }));
      },
    });
  }

  gridBox_displayExpr(item: any) {
   // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
   return item.question;
  }

  onGridBoxOptionChanged(e:any) {
    
    if (e.name === 'value') {
  
      this.isGridBoxOpened = false;
      this.visibleStepper=true;
      this.ref.detectChanges();
     let question_id=e.value;
     localStorage.setItem('question_id',question_id);
   
     this.http.get(URL + '/QuestionBank/GetActiveQuestionsByID?question_id='+question_id, {headers})
      .subscribe((response: any) => {
      //alert(JSON.stringify(response) )
        if (Array.isArray(response) && response.length > 0) {
          // Data is an array and has at least one element
          const questionbank = response[0]; // Access the first element of the array
          this.subjectId=questionbank.subjectid;
          //alert(questionbank.question_id);
         this.questionForm.controls['subjectid'].setValue(questionbank.subjectid);
          this.TopicData = this.makeAsyncDataSourceTopicData(this.http,this.subjectId);
         

          // Load the TopicData and set the value once it's loaded
        this.TopicData.load().then((data: any) => {
        this.zone.run(() => {
          this.questionForm.controls['topicid'].setValue(questionbank.topicid);
          this.ref.detectChanges();
        });
       });
      this.questionForm.controls['response_type'].setValue(questionbank.response_type);
        if(questionbank.response_type==1){
          this.OptionA=true;
          this.OptionB=false;
          this.OptionC=true;
          this.Answers=true;
          this.questionForm.controls['no_of_selectionchoices'].setValue(questionbank.no_of_selectionchoices);
          const optionCount = questionbank.no_of_selectionchoices;
          //this.options.clear();
    
        //   for (let i = 0; i < optionCount; i++) {
        //   this.options.push(this.formBuilder.control(''));
        //  }

             // Check if 'options' property exists in questionbank
      if (questionbank.options && Array.isArray(questionbank.options)) {
       // Clear existing options
  while (this.options.length !== 0) {
    this.options.removeAt(0);
  }
   this.questionbankoptions=questionbank.options;
  const options = questionbank.options;

  options.forEach((option: any) => {
    const optionFormGroup = this.formBuilder.group({
      id: option.index,       // Use 'id' as a FormControl
      value: option.value, // Use 'value' as a FormControl
    });
    console.log('option id '+option.index)
    console.log('option id '+option.value)
    // Add the option FormGroup to the 'options' FormArray
    this.options.push(optionFormGroup);
  });

  }
        }
         else{
          this.OptionA=false;
          this.OptionB=true;
          this.OptionC=false;
          this.Answers=false;
          if (questionbank.options && Array.isArray(questionbank.options)) {
            // Assuming 'options' is an array of objects with 'index' and 'value' properties
            questionbank.options.forEach((option: any) => {
            this.questionForm.controls['fullresponse'].setValue(option.value);
           
         });
       }

    }
         
          this.questionForm.controls['question'].setValue(questionbank.question);
          this.questionForm.controls['objective'].setValue(questionbank.objective);
          this.questionForm.controls['correct_answer'].setValue(questionbank.correct_answer);
          this.questionForm.controls['question_hint'].setValue(questionbank.question_hint);
          this.questionForm.controls['questionmarked_favourite'].setValue(questionbank.questionmarked_favourite);
          this.questionForm.controls['check_level'].setValue(questionbank.check_level);
          this.questionForm.controls['score_weightage'].setValue(questionbank.score_weightage);
          this.questionForm.controls['checklevel_weightage'].setValue(questionbank.checklevel_weightage);
          this.questionForm.controls['estimated_time'].setValue(questionbank.estimated_time);
          this.questionForm.controls['assessor_randomselection'].setValue(questionbank.assessor_randomselection);
          //alert(questionbank.assessment_randomsetting)

          this.questionForm.controls['assessment_randomsetting'].setValue(questionbank.assessment_randomsetting);
          this.questionForm.controls['ref_to_governance_control'].setValue(questionbank.ref_to_governance_control);
          if (questionbank.keywords) {
            const keywordsArray = questionbank.keywords.split(',');
            this.tags = keywordsArray.map((keyword: string) => ({ name: keyword.trim() }));
         //   alert(JSON.stringify(this.tags))
            //this.questionForm.controls['keywords'].setValue(this.tags.map(tag => tag.name)); // Setting the form control
          } else {
            this.questionForm.controls['keywords'].setValue(['']); // Set to an empty array if no keywords
          }

          //this.questionForm.controls['keywords'].setValue(questionbank.keywords);
          
          this.sanitizedImage = this.sanitizer.bypassSecurityTrustResourceUrl(questionbank.base64);
          this.base64Image=questionbank.base64;
        
          if(this.base64Image==""){
            this.isImageHidden=true;
          }
          else{
            this.isImageHidden=false;
          }
          this.ref.detectChanges();
         // this.getSubTypes(questionbank.subjectid);
         // this.questionForm.controls['topicid'].setValue('1');
         
          
        } else {
          // Data is either not an array or it's empty
          // Handle this case as needed
        }
        
      },
      (error: any) => {
       
       // window.alert('Error Saving Data');
      });
    
     // alert(e.value)
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
   
    let count=0;
    this.optionCount = event.value;
    this.options.clear();
   
    this.questionbankoptions.forEach((option: any) => {
      const optionFormGroup = this.formBuilder.group({
        id: option.index,       // Use 'id' as a FormControl
        value: option.value, // Use 'value' as a FormControl
      });
    
      if(count < this.optionCount){
        this.options.push(optionFormGroup);
        count++;
       
      }
     
    });
  
    // const optionValues: { id: number; value: string }[] = [];
    // const optionsArray = this.questionForm.get('options') as FormArray;
    
    for (let i = count;  i < this.optionCount; i++) {
      const optionFormGroup = this.formBuilder.group({
        id: 0,       // Use 'id' as a FormControl
        value: '', // Use 'value' as a FormControl
      });
     
      this.options.push(optionFormGroup);
     
    }
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

onInput() {
  this.resize();
 }
 private resize() {
  const textareaElement = this.textarea.nativeElement;
  //textareaElement.style.overflow = 'hidden';
  textareaElement.style.height = 'auto';
  textareaElement.style.height = textareaElement.scrollHeight + 'px';
}
saveQuestion() {
   
  if (this.questionForm.valid) {
    let question_id  =localStorage.getItem('question_id');
   // Check if the value is not null before converting to an integer
   let questionIdAsInt =0;
if (question_id !== null) {
   questionIdAsInt = parseInt(question_id, 10);

  // Now, questionIdAsInt will be an integer
  console.log(questionIdAsInt);
} else {
  console.error("question_id is null in localStorage");
}
    
   const response_type = this.questionForm.value.response_type;

   let formData: any;
   if(this.base64Image==null){
    this.base64Image="";
   }
     // alert(JSON.stringify(this.tags))
   let  taglist:string[]=[];
   this.tags.forEach((element:any)=>{
taglist.push(element.name)
   });
   formData = {
     question_id: questionIdAsInt,
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
     //keywords: this.questionForm.value.keywords,
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
   

   const optionValues: { id: number; value: string }[] = [];
   if (response_type === 1) {
     // Fetch dynamic options from your optionsArray
    // const options = []
    const optionsArray = this.questionForm.get('options') as FormArray;
   

    

    for (let i = 0; i < optionsArray.length; i++) {
      const optionValue = optionsArray.at(i).value;
      // alert(optionValue.id)
      // alert(optionValue.value)
      optionValues.push({ id: optionValue.id, value: optionValue.value });
    }
    formData.options = optionValues;
  //  formData.options={}
   
 }
 else if (response_type === 2) {
  
 
    optionValues.push({ id: 0, value: this.questionForm.value.fullresponse });
   
   formData.options=optionValues;

   formData.fullresponse=this.questionForm.value.fullresponse;
   
   };
 
 console.log('Form Data:', formData);

   // Handle form submission or API call here

   this.http.post(URL + '/QuestionBank/UpdateQuestions',formData,{headers})
   .subscribe((response: any) => {
    
     // Handle the response from the server if needed
  
     const message = "Data Updated Successfully.";
     const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
       width: '550px',
       data: { message: message},
      
     });
   // this.questionForm.reset();
   //this.reloadComponent();
   window.location.reload();
   },
   (error: any) => {
    
     window.alert('Error Saving Data');
   });
 }
 else {
    
  let invalidFields = Object.keys(this.questionForm.controls)
    .filter(key => this.questionForm?.get(key)?.invalid)
    .map(key => {
      switch(key) {
        case 'question': return 'Question ';
       
        case 'response_type': return 'Response type ';
        case 'no_of_selectionchoices': return 'Noof Selection choices ';
        case 'correct_answer': return 'Correct answer ';
        case 'question_hint': return 'Question hint ';
        case 'questionmarked_favourite': return 'Mark this Question as Favourite';
        case 'score_weightage': return 'Score Weightage ';
        case 'checklevel_weightage': return 'Checklevel weightage ';
        case 'estimated_time': return 'Estimated Time ';
        //case 'keywords': return 'keywords ';
        case 'assessor_randomselection': return 'Assessor Randomselection ';
        case 'assessment_randomsetting': return 'Assessment Randomsetting ';
        case 'subjectid': return 'Subjectid ';
        case 'topicid': return 'Topicid ';
      
        case 'options': return 'ptions ';
                   
        default: return key; // Return the key itself if no user-friendly name is needed
      }
    });

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
//  else{
//   alert('invalid form');
//   }
}
  reloadComponent() {
    throw new Error('Method not implemented.');
  }

}
