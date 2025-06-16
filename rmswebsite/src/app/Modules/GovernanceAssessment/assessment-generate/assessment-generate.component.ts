import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { DxDropDownBoxModule, DxListComponent, DxListModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl  } from '@angular/forms';
import { DxRadioGroupModule, DxTemplateModule } from 'devextreme-angular';
import { lastValueFrom } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { RandomSeleForm, StepperService } from 'src/app/assessment-service.service';
const URL = BASE_URL;
// const headers = new HttpHeaders();
// headers.append('Content-Type', 'text/plain');
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
interface Subject {
  subject_id: number;
  subject_Name: string;
  subject_Desc : string;
  // ... other properties
}


interface Topic {
  topic_id: number;
  topic_Name: string;
  subject_id : number;
  // ... other properties
}


@Component({
  selector: 'app-assessment-generate',
  templateUrl: './assessment-generate.component.html',
  styleUrls: ['./assessment-generate.component.scss']
})
export class AssessmentGenerateComponent implements OnInit {

  totlq:any;
  RandomForminfo:RandomSeleForm=new RandomSeleForm();
  questionForm: FormGroup;
  optionsFormArray: FormArray | undefined; 
  checklevelmix: string[] = [
    'Competency Check Level',
    'Random Selection',
  ];
  questionsType: string[] = [
    'My Questions',
    'Question Bank Reserve',
  ];
  MyQuestionsSelection:any="My Questions";
  userIdsList:any[]=[];
  QuestionsListFrom:string="";
  TopicArray:any;
  stepvalue:any=0;
  SubjectData: { [key: string]: Subject } = {};
  Selectedtopic:any;
  TopicData:{ [key: string]: Topic } = {};
  subjectId:any={};
  selectedSubjectNames: string[] = [];
  selectedSubjectIDs: number[] = [];
  selectedTopicNames:string[] = [];
  selectedTopicIDs: number[] = [];
  checkdata:boolean=true;
  randomselection:boolean=false;
  skill_Level_Name: string = '';
  timeEstimateisChecked:boolean=false;
  errormsg:any;
  validationcheck:boolean=false;
  Useridvalue:any;
 
  constructor(public dialog: MatDialog,private stepperService: StepperService,private http: HttpClient,private formBuilder: FormBuilder,private ref: ChangeDetectorRef,private zone: NgZone){

    this.questionForm = this.formBuilder.group({
      questionMixtype: [this.checklevelmix[0], Validators.required],
      questions: ['', Validators.required],
      subjectid: ['', Validators.required],
      topicid: ['', Validators.required],
      options: this.formBuilder.array([]),
      mostUsedQuestions: [''],
      favouritesDefaults: [''],
      recentlyAdded: [''],
      timeEstimate: [''],
      timeEstimateInputMin:[''],
      timeEstimateInputMax:[''],
      questionsFrom:['',Validators.required]
    });

     // Initialize optionsFormArray
     this.optionsFormArray = this.questionForm.get('options') as FormArray;

     // Add an initial option FormGroup
     const optionFormGroup = this.formBuilder.group({
      id: [0],
      value: [''],
      totalQuestions: [],
      selected_ques:[]// Changed to number type
    });
    
 
     this.optionsFormArray.push(optionFormGroup);

    this.fetchCheckLevelData();
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);

    //UserId
    const Userid = parsedData ? parsedData.profile.userid : null;
    this.Useridvalue=Userid;
    
  }

  ngOnInit() {


    // this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforCustomization/'+this.Useridvalue,{headers}).subscribe((res:any)=>
    //   {
    //     this.totlq=res.length;
    //     this.onTopicSelectionChange();
    
    //   })



    setTimeout(()=>{
      this.stepperService.goToStep(this.stepvalue);
    },10);

//    this.GetAllQuestions();

    
  }
  ngAfterViewInit() {
    // Your existing code here to fetch data
    this.http.get<any[]>(URL + '/Subject/GetSubjectDetails', { headers })
    .subscribe((res: any[]) => {
      console.log('API Response:', res); // Check API response in console
      this.SubjectData = res.reduce((acc, curr) => {
        acc[curr.subject_id] = curr;
        return acc;
      }, {});
      console.log('SubjectData:', this.SubjectData); // Check SubjectData after assignment
      this.ref.detectChanges(); // Trigger change detection
    }, (err) => {
      console.error('Error fetching data:', err);
    });
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }
  fetchCheckLevelData(): void {
    
    this.http.get(URL + '/AssessmentBuilder/GetCheckLevels', {headers})
    .subscribe((response: any) => {
    
      if (Array.isArray(response) && response.length > 0) {
        while (this.options.length !== 0) {
          this.options.removeAt(0);
        }

        const options = response;
      
        options.forEach((option: any) => {
          const optionFormGroup = this.formBuilder.group({
            id: option.check_level_id,       // Use 'id' as a FormControl
            value: option.skill_Level_Name, // Use 'value' as a FormControl
            totalQuestions:0,
            selected_ques:0
          });
          console.log('option id '+option.check_level_id)
          console.log('option id '+option.skill_Level_Name)
          // Add the option FormGroup to the 'options' FormArray
          this.options.push(optionFormGroup);
        });
      }

   
    
  },
  (error: any) => {
   
   // window.alert('Error Saving Data');
  });
  

  }
  
  // Event handler for the timeEstimate checkbox change
  onTimeEstimateChange(event: MatCheckboxChange): void {
    const isChecked = event.checked;
   
    console.log('timeEstimate checkbox value:', isChecked);

    if(isChecked==true){
      this.timeEstimateisChecked=true;
    }
    else{
      this.timeEstimateisChecked=false;
    }
  }
  

  handleValueChange (e: any) {
    const previousValue = e.previousValue;
    const radiobtnValue = e.value;
    this.fetchCheckLevelData();
    if(radiobtnValue=="Competency Check Level"){
      this.checkdata=true;
      this.randomselection=false;
    }
    else{
      this.checkdata=false;
      this.randomselection=true;
    }
    // Event handling commands go here
}

 
  onSubjectSelectionChange(): void {
   
    const selectedSubjects = this.questionForm.get('subjectid')?.value || [];
    this.questionForm.get('topicid')?.setValue([]);
   
  this.selectedSubjectNames = [];
  const selectedSubjectIds: number[] = [];
  this.TopicData={};
  for (const subjectId of selectedSubjects) {
    const subject = this.SubjectData[subjectId];
    if (subject && !this.selectedSubjectNames.includes(subject.subject_Name)) {
      this.selectedSubjectNames.push(subject.subject_Name);
      selectedSubjectIds.push(subject.subject_id);

     // this.selectedSubjectIDs.push(subject.subject_id);
    }
  }
  
  this.selectedSubjectIDs = selectedSubjectIds;
  this.callTopicDetailsAPI();
  

}

onTopicSelectionChange(): void {
 
 // const selectedTopics = this.questionForm.get('topicid')?.value || [];

this.selectedTopicNames = [];
//const selectedTopicIds: number[] = [];

// this.TopicArray.forEach((topic:any) => {
//   // Check if the topic's ID is selected
//   if (selectedTopics.includes(topic.topic_id.toString())) {
//     // Avoid duplicate topic names
//     if (!this.selectedTopicNames.includes(topic.topic_Name)) {
//       this.selectedTopicNames.push(topic.topic_Name);
//       selectedTopicIds.push(topic.topic_id);
//     }
//   }
// });
const selectedTopicIds = this.questionForm.get('topicid')?.value;  // Adjust according to your form group
this.selectedTopicNames = selectedTopicIds.map((id: number) => {
  const topic = this.TopicArray.find((t:any) => t.topic_id === id);
  return topic ? topic.topic_Name : '';
}).filter((name:any) => name);  // Filter out any invalid names

this.selectedTopicIDs = selectedTopicIds;
console.log("this is ids",this.selectedTopicIDs);

console.log("this is names",this.selectedTopicNames);
 
  // Make an API call to get count values for each option based on selected topics
  if(this.QuestionsListFrom==="My Questions"){
    if (this.selectedTopicIDs.length > 0) {
      this.http.post<any>(URL + '/AssessmentBuilder/getCountValues/'+this.Useridvalue, this.selectedTopicIDs)
        .subscribe(
          (countValues: any) => {
            // Clear previous count values
            const optionsFormArray = this.questionForm.get('options') as FormArray;
            optionsFormArray.controls.forEach((optionFormGroup) => {
              if (optionFormGroup instanceof FormGroup) {
                optionFormGroup.patchValue({ totalQuestions:0,});
              }
            });
  
            // Update form controls with new count values
            Object.entries(countValues).forEach(([index, count]) => {
              const optionFormGroup = optionsFormArray.at(Number(index)) as FormGroup;
              // Assuming 'value' is the name of the form control to be updated
              optionFormGroup.get('totalQuestions')?.setValue(count);
            });
             this.ref.detectChanges();
            // No need to manually trigger change detection in most cases
  
          },
          (error) => {
            console.error('Error fetching count values:', error);
          }
        );
    } else {
      // Handle the case when no topics are selected
      console.warn('No topics selected.');
    }
  }
  else{
    let form={
      selectedTopics:this.selectedTopicIDs,
      usersList:this.userIdsList
    }
    if (this.selectedTopicIDs.length > 0) {
      this.http.post<any>(URL + '/AssessmentBuilder/getTotalCountValues',form)
        .subscribe(
          (countValues: any) => {
            // Clear previous count values
            const optionsFormArray = this.questionForm.get('options') as FormArray;
            optionsFormArray.controls.forEach((optionFormGroup) => {
              if (optionFormGroup instanceof FormGroup) {
                optionFormGroup.patchValue({ totalQuestions:0,});
              }
            });
  
            // Update form controls with new count values
            Object.entries(countValues).forEach(([index, count]) => {
              const optionFormGroup = optionsFormArray.at(Number(index)) as FormGroup;
              // Assuming 'value' is the name of the form control to be updated
              optionFormGroup.get('totalQuestions')?.setValue(count);
            });
             this.ref.detectChanges();
            // No need to manually trigger change detection in most cases
  
          },
          (error) => {
            console.error('Error fetching count values:', error);
          }
        );
    } else {
      // Handle the case when no topics are selected
      console.warn('No topics selected.');
    }
  }
 
}

callTopicDetailsAPI(): void {
  if (this.selectedSubjectIDs.length === 0) {
    console.log('No subjects selected. Skipping API call.');
    return;
  }
  
  const queryParams = this.selectedSubjectIDs.map(id => `selectedSubjectIDs=${id}`).join('&');

  this.http.get<any[]>(`${URL}/topic/GettopicDetailsByMultipleIds?${queryParams}`, { headers })
    .subscribe((res: any[]) => {
      console.log('Topic Data API Response:', res);
      this.TopicArray = res;

      // Create an object for quick lookup by topic_id
      this.TopicData = res.reduce((acc, curr) => {
        acc[curr.topic_id.toString()] = curr;
        return acc;
      }, {});
    }, (err) => {
      console.error('Error fetching data:', err);
    });
}
updateOptionValue(value: number, index: number): void {
  const optionsArray = this.questionForm.get('options') as FormArray;
  const selectedQuesControl = optionsArray.at(index).get('selected_ques');

  if (selectedQuesControl) {
    // Update 'selected_ques' with the new value
    selectedQuesControl.setValue(value);
    console.log(`Option ${index} selected_ques updated to: ${value}`);
  }
}




saveQuestion() {
   
  this.validationcheck=false;
  this.errormsg="";
  
 
  
    let formData: any;
   let QuestionMixtype= this.questionForm.value.questionMixtype;
   if(QuestionMixtype=="Competency Check Level"){
    
    if (this.questionForm.valid) {
     
      const selectedTopicIds = this.questionForm.get('topicid')?.value;  // Get the selected topic IDs

      // Convert numeric IDs to strings
      const topicIdsAsStrings = selectedTopicIds.map((id: number) => id.toString());
    formData = {
      Assessment_generationID:0,
      QuestionMixtype: this.questionForm.value.questionMixtype,
      No_of_Questions: this.questionForm.value.questions,
       Topics: topicIdsAsStrings,
       MostUsedQuestions: "false",
       FavouritesDefaults: "false",
       RecentlyAdded: "false",
       TimeEstimate: "false",
       timeEstimateInputMin: 0,
       timeEstimateInputMax:0,
       UserID:this.Useridvalue,
       QuestionsListFrom:this.QuestionsListFrom,
     };

     const optionValues: { id: number; value: string }[] = [];

     const optionsArray = this.questionForm.get('options') as FormArray;
     
     for (let i = 0; i < optionsArray.length; i++) {
       const optionValue = optionsArray.at(i).value;
     
       // Get selected_ques value and convert to string
       let value = '0';
       if (optionValue.selected_ques === undefined || optionValue.selected_ques === null) {
         value = '0';
       } else {
         value = optionValue.selected_ques.toString(); 
       }
     
       optionValues.push({ id: optionValue.id, value: value });
     }
     
     formData.Competancychecks = optionValues;
     


console.log("This is my form"+JSON.stringify(formData));

     console.log('Form Data:', formData);
     // check for validations
     this.http.post(URL + '/AssessmentBuilder/AssessmentGenValidationCheck',formData,{headers})
     .subscribe((response: any) => {
      
          if(this.validationcheck==false){
      this.http.post(URL + '/AssessmentBuilder/AssessmentGeneration',formData,{headers})
      .subscribe((response: any) => {
        console.log('Data Save Succefully ', response);
        // Handle the response from the server if needed
        
        const message = "Assessment Template Questions Generated.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
       this.questionForm.reset();
       this.stepvalue=1;
         setTimeout(()=>{
           this.stepperService.goToStep(this.stepvalue);
         },10);
        
         this.stepperService.Status();
         this.stepperService.refreshSecondStepper();
        
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
   
    }  
     },
     (error: any) => {
       if (error.error && error.error.includes('Validation errors:')) {
         // Etract and display the validation errors
         const validationErrors=error.error;
         
         const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
           width: '550px',
           data: { message: validationErrors},
          
         });
        
         //const validationErrors = error.error.split('Validation errors:')[1];
        // window.alert('Validation errors:\n' + validationErrors);
        this.errormsg=validationErrors;
       } else {
         // Handle other types of errors
        
         const message = "Error Saving Data.";
         const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
           width: '550px',
           data: { message: message},
          
         });
       }
     });
    
   }
    else{
   
     const message = "Please fill in all the required values and generate again..";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
     }
   







   }
   else if(QuestionMixtype=="Random Selection"){
    
    if (this.questionForm.valid) {
   
      const selectedTopicIds = this.questionForm.get('topicid')?.value;  // Get the selected topic IDs

      // Convert numeric IDs to strings
      const topicIdsAsStrings = selectedTopicIds.map((id: number) => id.toString());
   
    this.RandomForminfo.QuestionMixtype = this.questionForm.value.questionMixtype;
    this.RandomForminfo.No_of_Questions = this.questionForm.value.questions;
    this.RandomForminfo.Topics = topicIdsAsStrings;
    this.RandomForminfo.RandomserialNumbers = [];

    if (this.questionForm.value.mostUsedQuestions==true) {
      this.RandomForminfo.RandomserialNumbers.push(1);
    }
    
    if (this.questionForm.value.favouritesDefaults==true) {
      this.RandomForminfo.RandomserialNumbers.push(2);
    }
    
    if (this.questionForm.value.recentlyAdded==true) {
      this.RandomForminfo.RandomserialNumbers.push(3);
    }
    
    if (this.questionForm.value.timeEstimate==true) {
      this.RandomForminfo.RandomserialNumbers.push(4);
      this.RandomForminfo.TimeEstimateInputMin = this.questionForm.value.timeEstimateInputMin;
      this.RandomForminfo.TimeEstimateInputMax = this.questionForm.value.timeEstimateInputMax;
    }
    else{
      this.RandomForminfo.TimeEstimateInputMin = 0;
      this.RandomForminfo.TimeEstimateInputMax = 0;
    }
    
   
    this.RandomForminfo.UserID = this.Useridvalue;

    if (this.RandomForminfo.RandomserialNumbers.length === 0) {
      // Show error or perform any action you want
      const message = "Please Select atleast one filter option";
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: message},
       
      });
    }
    else{const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(URL + '/AssessmentBuilder/RandomAssessmentGeneration', this.RandomForminfo, { headers })
      .subscribe(
        (response: any) => {
          console.log(response);
          
        const message = "Assessment Template Questions Generated.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
       this.questionForm.reset();
       this.stepvalue=1;
         setTimeout(()=>{
           this.stepperService.goToStep(this.stepvalue);
         },10);
         
         this.stepperService.Status();
         this.stepperService.refreshSecondStepper();
        
        },
        (error) => {
          console.error(error);
          const message = "Error Generating Questions.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
        }
      );
      }}
    // Now you can send the data to the API
    
      else{
   
        const message = "Please fill in all the required values and generate again..";
           const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
             width: '550px',
             data: { message: message},
            
           });
        }
   }

}


handleQuestionsType(e:any){
  this.QuestionsListFrom=e.value;

  if(e.value=="My Questions"){
    this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforCustomization/'+this.Useridvalue,{headers}).subscribe((res:any)=>
      {
        this.totlq=res.length;
        this.onTopicSelectionChange();
    
      })
  }
  else{
    // this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsfromQuestionBankReserve',{headers}).subscribe((res:any)=>
    //   {
    //     this.totlq=res.length;
    // this.onTopicSelectionChange();
    
    //   })

    this.http.get(URL + '/QuestionBank/GetActiveQuestionsbyentityid/'+this.Useridvalue,{headers}).subscribe((res:any)=>
      {
        res.forEach((e: any) => {
          if (!this.userIdsList.includes(e.userid)) {
            this.userIdsList.push(e.userid);
          }
        });
        
        console.log("This is my data"+JSON.stringify(this.userIdsList));
        this.totlq=res.length;
    this.onTopicSelectionChange();
    
      })


     
  }
}

 
GetAllQuestions(){
 
  this.http.get(URL + '/AssessmentBuilder/GetAllQuestionsforCustomization/'+this.Useridvalue,{headers}).subscribe((res:any)=>
  {
    this.totlq=res.length;
    this.onTopicSelectionChange();

  })
   
}
}
