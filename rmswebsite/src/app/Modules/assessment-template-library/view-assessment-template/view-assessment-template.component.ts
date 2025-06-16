import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import ArrayStore from 'devextreme/data/array_store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';



const URL = BASE_URL;

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Component({

  selector: 'app-view-assessment-template',
  template: `
  <img [src]="sanitizedImage" alt="Image Description">
`,
  templateUrl: './view-assessment-template.component.html',
  styleUrls: ['./view-assessment-template.component.scss']
})
export class ViewAssessmentTemplateComponent {
  Useridvalue:any;
  templateForm: FormGroup;
  gridBoxValue:number[] = [];
  OptionA=true;
  OptionB=false;
  OptionC=false;
  ques:any="questions"
  sumOfEstimatedTime:any;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  sanitizedImage: SafeResourceUrl| null =null;
  isImageHidden: boolean = true;
  SubjectData: any;
  subjectId: any;
  Selectedtopic: any;
  resptypedata:any;
  ass_template_id:any;
  TopicData: any;
  resptype: Array<{ id: number, text: string }> = [];
  ChooseOptions:Array<{id:string,text:string}>=[];
  checklevels:Array<{id:number,text:string}>=[];
  data:any;
  CheckLevelData:any;
  checklevel_weightage: number = 0.01;
  gridDataSource:any = [];
username:any=null;
updatedusername:any=null;
updateddate:any=null;
createddate:any=null;
  gridColumns: any = [{ dataField: 'ass_template_id' ,caption:'Assessment Template Id'},'assessment_name', 'type_Name', 'subType_Name',
  'competency_Name',  {
    dataField: 'created_date',
    caption: 'Created Date',
    alignment: "right",
    width: 180,
    dataType: "date",
    format: {
      type: "custom",
      formatter: function(date:any) {
        if (date) {
          const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
          const month = date.toLocaleString('default', { month: 'short' }); // Short month
          const year = date.getFullYear();
          return `${day} ${month} ${year}`; // Format: "12 Dec 2024"
        }
        return "";
      }
    },
    filterValue: null,
    customizeText: function(cellInfo:any) {
      // Ensures consistent display in filter dropdown
      if (cellInfo.value) {
        const date = new Date(cellInfo.value);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }
      return "";
    }
  },'keywords'];
  questionbankoptions: any;
  listOfQuestions: any;
 
  
  // gridBox_displayExpr(question_id:any) {
  //   return question_id && `${question_id.assessment_name} , ${question_id.created_date} `;
  // }
  
  gridBox_displayExpr(item: any) {
    // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
    return item.assessment_name;
   }

  isGridBoxOpened: boolean = false;
  visibleStepper: any;
  question_id: any;

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


  
  this.resptypedata = new ArrayStore({
    data: this.resptype,
    key: "ID"
  });
}

constructor(private http: HttpClient,private ref: ChangeDetectorRef,private formBuilder: FormBuilder,private zone: NgZone,private sanitizer: DomSanitizer){

  
  this.templateForm = this.formBuilder.group({
    
    type_Name: [''],
    subType_Name: [''],
    assessment_name: [''],
    assessment_description: [''],
    keywords: [''],
    no_of_questions_mapped:['', Validators.required],
    estimated_time:['', Validators.required],
    ass_template_id:['', Validators.required],
    check_level: ['', Validators.required],
    checklevel_weightage: ['', Validators.required],
     created_date: ['', Validators.required],
     ref_to_governance_control: ['', Validators.required],
     question_hint:['', Validators.required],
     subjectid:['',Validators.required],
     CometencySkillLevel:['',Validators.required],
     options: this.formBuilder.array([]),
     

   
  });
  const storedData:any = localStorage.getItem('user');
  const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.Useridvalue=Userid;

  const optionFormGroup = this.formBuilder.group({
    id: 0,   // Initial value for 'id'
    value: '' // Initial value for 'value'
  });
  
  (this.templateForm.get('options') as FormArray).push(optionFormGroup); // Add the FormGroup to the FormArray
  this.gridDataSource = this.makeAsyncDataSource(this.http,this.Useridvalue);

 

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


 makeAsyncDataSource(http:HttpClient,userId:any) {
  return new CustomStore({
    loadMode: 'raw',
    key: 'ass_template_id',
    load() {
      return lastValueFrom(http.get(`${URL}/Assessment/GetActiveAssesmentforview/`+userId, { headers }));
    },
  });
}

  selectedValue(selectedValue: any) {
    throw new Error('Method not implemented.');
  }




  onGridBoxOptionChanged(e:any) {
    
    if (e.name === 'value') {
  
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
     let ass_template_id=e.value;
     localStorage.setItem('ass_template_id',ass_template_id);
   
     this.http.get(URL + '/Assessment/GetActiveAssesByID/'+ass_template_id, {headers})
      .subscribe((response: any) => {
      
        if (Array.isArray(response) && response.length > 0) {
          // Data is an array and has at least one element
          const questionbank = response[0]; // Access the first element of the array
         
        // alert(JSON.stringify(questionbank));
          this.templateForm.controls['type_Name'].setValue(questionbank.type_Name);
          this.templateForm.controls['subType_Name'].setValue (questionbank.subType_Name);
          this.templateForm.controls['assessment_name'].setValue (questionbank.assessment_name);
          this.templateForm.controls['assessment_description'].setValue (questionbank.assessment_description);
          this.templateForm.controls['keywords'].setValue(questionbank.keywords);
          this.templateForm.controls['no_of_questions_mapped'].setValue(questionbank.total_questions);
        
          this.templateForm.controls['ass_template_id'].setValue(questionbank.ass_template_id);
          this.templateForm.controls['check_level'].setValue(questionbank.competency_Name);
       let ShowExplaination=questionbank.show_explaination;
       if(ShowExplaination==1)
          this.templateForm.controls['ref_to_governance_control'].setValue("Yes");
        else
        this.templateForm.controls['ref_to_governance_control'].setValue("No");
         
          let ShowHint=questionbank.show_hint;
       if(ShowHint==1)
          this.templateForm.controls['question_hint'].setValue("Yes");
        else
        this.templateForm.controls['question_hint'].setValue("No");
        console.log(questionbank);
        this.username = questionbank.firstname;
        this.createddate=questionbank.created_date;
        if(questionbank.updateUsername==null){
          this.updatedusername=questionbank.firstname;
        }
        else{
        this.updatedusername=questionbank.updateUsername;
        }
        if(questionbank.updated_date==null){
          this.updateddate=questionbank.created_date;
        }
        else{
          this.updateddate=questionbank.updated_date;
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
    

      this.listOfQuestions={
        paginate: true,
        store: new CustomStore({
            key: 'ass_template_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/Assessment/GetListOfQuestionsByID/' +ass_template_id, {headers})
                .subscribe((res:any) => {
                 (resolve(res));
                 this.templateForm.controls['no_of_questions_mapped'].setValue(res.length);
                 this.sumOfEstimatedTime=0;
         
            for (let i = 0; i < res.length; i++) {
             
              this.sumOfEstimatedTime += res[i].estimated_time;
            }
          
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };

     // alert(e.value)
   }
  }
  get options(): FormArray {
    return this.templateForm.get('options') as FormArray;
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
 

 
}