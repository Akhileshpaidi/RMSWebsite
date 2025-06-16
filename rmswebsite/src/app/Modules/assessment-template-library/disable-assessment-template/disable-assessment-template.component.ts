
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import ArrayStore from 'devextreme/data/array_store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';



const URL = BASE_URL;

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Component({
  selector: 'app-disable-assessment-template',
  templateUrl: './disable-assessment-template.component.html',
  styleUrls: ['./disable-assessment-template.component.scss']
})
export class DisableAssessmentTemplateComponent {

  templateForm: FormGroup;
  gridBoxValue:number[] = [];
  OptionA=true;
  OptionB=false;
  OptionC=false;
  Useridvalue:any;
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
  gridDataSource:any = [];
  isGridBoxOpened: boolean = false;
  visibleStepper: any;
  question_id: any;
  selectedOption:any;
  asstempid:any;

  gridColumns: any = [{ dataField: 'ass_template_id' ,caption:'Assessment Template Id'},'assessment_name', 
  'competency_Name', 'type_Name', 'subType_Name', {
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

  

  constructor(private http: HttpClient,private ref: ChangeDetectorRef,public dialog: MatDialog,private formBuilder: FormBuilder,private zone: NgZone,private sanitizer: DomSanitizer){

    
  const storedData:any = localStorage.getItem('user');
  const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.Useridvalue=Userid;
    this.templateForm = this.formBuilder.group({
      // type_Name: ['', Validators.required],
      // subType_Name: ['', Validators.required],
      // assessment_name: ['', Validators.required],
      // assessment_description: [''],
      // keywords: [''],
      // no_of_questions_mapped:['', Validators.required],
      // estimated_time:['', Validators.required],
      // ass_template_id:['', Validators.required],
      // check_level: ['', Validators.required],
      // checklevel_weightage: ['', Validators.required],
      //  created_date: ['', Validators.required],
      //  ref_to_governance_control: ['', Validators.required],
      //  question_hint:['', Validators.required],
      //  subjectid:['',Validators.required],
       reason_for_disable: ['', Validators.required],
       options: this.formBuilder.array([]),
  
     
    });
  
  
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

  gridBox_displayExpr(item: any) {
    // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
    return item.assessment_name;
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

  onGridBoxOptionChanged(e:any) {
    
    if (e.name === 'value') {
  
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
     let ass_template_id=e.value;
     localStorage.setItem('ass_template_id',ass_template_id);
   
     this.http.get(URL + '/Assessment/GetActiveAssesmentByID?ass_template_id='+ass_template_id, {headers})
      .subscribe((response: any) => {
      
        if (Array.isArray(response) && response.length > 0) {
          // Data is an array and has at least one element
          const questionbank = response[0]; // Access the first element of the array
          this.subjectId=questionbank.subjectid;
         // alert(JSON.stringify(questionbank));
          this.templateForm.controls['type_Name'].setValue(questionbank.type_Name);
          this.templateForm.controls['subType_Name'].setValue (questionbank.subType_Name);
          this.templateForm.controls['assessment_name'].setValue (questionbank.assessment_name);
          this.templateForm.controls['assessment_description'].setValue (questionbank.assessment_description);
          this.templateForm.controls['keywords'].setValue(questionbank.keywords);
          this.templateForm.controls['no_of_questions_mapped'].setValue(questionbank.no_of_questions_mapped);
          this.templateForm.controls['estimated_time'].setValue(questionbank.estimated_time);
          this.templateForm.controls['ass_template_id'].setValue(questionbank.ass_template_id);
          this.templateForm.controls['check_level'].setValue(questionbank.check_level);
          this.templateForm.controls['checklevel_weightage'].setValue(questionbank.checklevel_weightage);
          this.templateForm.controls['ref_to_governance_control'].setValue(questionbank.ref_to_governance_control);
          this.templateForm.controls['question_hint'].setValue(questionbank.question_hint);

         this.templateForm.controls['subjectid'].setValue(questionbank.subjectid);
          this.TopicData = this.makeAsyncDataSourceTopicData(this.http,this.subjectId);
         // Load the TopicData and set the value once it's loaded
        this.TopicData.load().then((data: any) => {
        this.zone.run(() => {
          this.templateForm.controls['topicid'].setValue(questionbank.topicid);
          this.ref.detectChanges();
        });
       });
      this.templateForm.controls['response_type'].setValue(questionbank.response_type);
        if(questionbank.response_type==1){
          this.OptionA=true;
          this.OptionB=false;
          this.OptionC=true;
          this.templateForm.controls['no_of_selectionchoices'].setValue(questionbank.no_of_selectionchoices);
          const optionCount = questionbank.no_of_selectionchoices;
       
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
          if (questionbank.options && Array.isArray(questionbank.options)) {
            // Assuming 'options' is an array of objects with 'index' and 'value' properties
            questionbank.options.forEach((option: any) => {
            this.templateForm.controls['fullresponse'].setValue(option.value);
           
         });
       }

    }
         
          this.templateForm.controls['question'].setValue(questionbank.question);
          this.templateForm.controls['objective'].setValue(questionbank.objective);
          this.templateForm.controls['correct_answer'].setValue(questionbank.correct_answer);
        
          this.templateForm.controls['questionmarked_favourite'].setValue(questionbank.questionmarked_favourite);
         
          this.templateForm.controls['score_weightage'].setValue(questionbank.score_weightage);
        
         //this.templateForm.controls['reason_for_disable'].setValue(questionbank.reason_for_disable);
         
          this.templateForm.controls['assessor_randomselection'].setValue(questionbank.assessor_randomselection);
          this.templateForm.controls['assessment_randomsetting'].setValue(questionbank.assessment_randomsetting);

         
         
         
        
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
     const message2 = "Dear User, you have chosen to ‘Disable’ this Assessment Template. Kindly be aware that your action will affect the Assessment scheduling (one-time & repeat frequency), notification and alerts, and User accessibility. Your action will not affect the validity of the questions listed therein.This action cannot be reversed, but however, you may ‘Re-activate’ this template later, but all your mapping action will be reset.";

     const dialogRef = this.dialog.open(DaidailogeComponent, {
       width: '550px',
       data: { message: message2 },
     });
   }


  

  }

  get options(): FormArray {
    return this.templateForm.get('options') as FormArray;
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
        return lastValueFrom(http.get(`${URL}/Assessment/GetActiveAssesment/`+userId, { headers }));
      },
    });
  }
  
    selectedValue(selectedValue: any) {
      throw new Error('Method not implemented.');
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

    showInvalidFieldsAlert() {
      let invalidFields = '';
      if (this.templateForm.controls['reason_for_disable'].invalid) {
        invalidFields += '-  Enter Reason For Disable \n';
      }
      if (invalidFields) {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {
            message: `Please provide valid information for the following fields:\n${invalidFields}`,
          },
        });
      }
    }
    onSubmit(data: any = {}) {

      if (this.templateForm.invalid) {
        this.showInvalidFieldsAlert();
        return;
        
      }
    
      // if (this.templateForm.valid) {
      //   const message = "Please Enter Reason.";
      //   const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
      //     width: '550px',
      //     data: { message: message },
      //   });
       
      
      else {
        const dialogRefConfirmation = this.dialog.open(ToasterComponent, {
          width: '550px',
          data: {
            title: 'Disable Assessment Template?',
            message: 'Are you sure you want to Disable Assessment Template?',
          },
        });
    
        dialogRefConfirmation.afterClosed().subscribe((result: boolean) => {
          if (result) {
         
            this.selectedOption = null;
            const ass_template_id=  localStorage.getItem('ass_template_id')?.toString();
            const disableReasonControl =  this.templateForm.value.reason_for_disable
         this.asstempid=ass_template_id;
            // alert(ass_template_id)
            // alert(disableReasonControl)
           
            const apiUrl = URL + '/Assessment/DisableAssessmentDetailsByID';
            const params = new HttpParams()
              .set('ass_template_id', this.asstempid.toString())
              .set('reason_for_disable', disableReasonControl)
              .set('disableby',this.Useridvalue);
            
            this.http.put(apiUrl, null, { headers, params }).subscribe((data: any) => {
              this.visibleStepper = false;
            });
          //  alert( "Disabled Published Document Successfully");
            const message1 = "Disabled Published Assessment Successfully";
            const dialogRefSuccess = this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: message1 },
            });
            window.location.reload();
         
          }
         
        });
     
      }
      
    }


}
