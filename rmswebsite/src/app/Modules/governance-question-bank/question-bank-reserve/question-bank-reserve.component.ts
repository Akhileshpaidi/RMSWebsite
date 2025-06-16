import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AddQuestionsComponent } from '../add-questions/add-questions.component';
import { FormArray, FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Tag } from '../../inventory/bridge-list/bridge-list.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { SessionService } from 'src/app/core/Session/session.service';
import { format } from 'crypto-js';


const URL = BASE_URL;
// const headers = new HttpHeaders();
// headers.append('Content-Type', 'text/plain');

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Component({
  selector: 'app-question-bank-reserve',
  templateUrl: './question-bank-reserve.component.html',
  styleUrls: ['./question-bank-reserve.component.scss']
})
export class QuestionBankReserveComponent {

  optionCount: number = 2; // default value
  optionsArray: number[] = Array(this.optionCount).fill(0);

  resptypedata: any;
  data: any;
  MapSubject: any;
  visibleStepper = false;

  OptionA = true;
  OptionB = false;
  OptionC = false;
  Answers = false;
  chooserandom:any;
  resptype: Array<{ id: number, text: string }> = [];
  ChooseOptions: Array<{ id: string, text: string }> = [];
  checklevels: Array<{ id: number, text: string }> = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  chipListInput: any;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
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

  gridDataSource: any = [];

  gridBoxValue: number[] = [];

  isGridBoxOpened: boolean = false;

  // gridColumns: any = [{ dataField: 'question_id', caption: 'Question ID' },'question', 'subject_Name', 'topic_Name','checklevel_name', {
  //   dataField: 'estimated_time',
  //   caption: 'Estimated Time(Mins)'
  // },{
  //   dataField: 'created_date',
  //   caption: 'Created Date',
  //    dataType:"date",
  //   calculateCellValue: function(data:any) {
  //     if (data.created_date) {
  //       const date = new Date(data.created_date);
  //       const day = String(date.getDate()).padStart(2, '0');
  //       const month = date.toLocaleString('default', { month: 'short' });
  //       const year = date.getFullYear();
  //       return `${day}/${month}/${year}`;
  //     }
  //     return null;
  //   }
  // },
  //   'authorName','departmentName','location','entity'
  // ];
gridColumns: any[] = [
  { dataField: 'question_id', caption: 'Question ID' },
  { dataField: 'question', caption: 'Question' },
  { dataField: 'subject_Name', caption: 'Subject Name' },
  { dataField: 'topic_Name', caption: 'Topic Name' },
  { dataField: 'checklevel_name', caption: 'Check Level Name' },
  {
    dataField: 'estimated_time',
    caption: 'Estimated Time (Mins)'
  },
  {
    dataField: 'created_date',
    caption: 'Created Date',
    dataType: 'date',
  format:'dd-MMM-yyyy'
  },
  { dataField: 'authorName', caption: 'Author Name' },
  { dataField: 'departmentName', caption: 'Department Name' },
  { dataField: 'location', caption: 'Location' },
  { dataField: 'entity', caption: 'Entity' }
];

  gridEditDataSource: any;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  questionForm: FormGroup;
  checklevel_weightage: number = 0.01;
  CheckLevelData: any;
  SubjectData: any;
  TopicData: any;
  subjectId: any;
  userdata:any;
  userid:any;
  Selectedtopic: any;
  sanitizedImage: SafeResourceUrl | null = null;
  isImageHidden: boolean = true;

  ngOnInit() {
    this.resptype = [
      { id: 1, text: 'Multiple Choice Selection' },
      { id: 2, text: 'Text Field Input' }
    ];

    this.resptypedata = new ArrayStore({
      data: this.resptype,
      key: "ID"
    });

    this.ChooseOptions = [
      { id: 'Yes', text: 'Yes' },
      { id: 'No', text: 'No' }
    ];

    this.checklevels = [
      { id: 1, text: 'Easy' },
      { id: 2, text: 'Medium' },
      { id: 3, text: 'Hard' }
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

  constructor(private http: HttpClient,private session: SessionService, private ref: ChangeDetectorRef, private formBuilder: FormBuilder, private zone: NgZone, private sanitizer: DomSanitizer) {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      objective: ['', Validators.required],
      response_type: ['', Validators.required],
      no_of_selectionchoices: [''],
      fullresponse: [''],
      correct_answer: ['', Validators.required],
      question_hint: ['', Validators.required],
      questionmarked_favourite: ['', Validators.required],
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

    // Add FormGroups to the 'options' FormArray
    const optionFormGroup = this.formBuilder.group({
      id: 0,   // Initial value for 'id'
      value: '' // Initial value for 'value'
    });

    (this.questionForm.get('options') as FormArray).push(optionFormGroup); // Add the FormGroup to the FormArray
    //this.gridDataSource = this.makeAsyncDataSource(this.http);

    this.gridDataSource = {
    paginate: true,
    store: new CustomStore({
     key:'question_id',
     loadMode:'raw',
     load:()=>{return new Promise((resolve, reject) => {
       this.http.get(URL + '/QuestionBank/GetActiveQuestionsbyentityid/'+this.userid, {headers})
         .subscribe(res => {
          (resolve(res));
   
         }, (err) => {
           reject(err);
         });
   });
     },
   }),
   };

    this.MapSubject = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/Subject/GetSubjectDetails', { headers })
              .subscribe(res => {
                (resolve(res));

              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };

    this.CheckLevelData = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/CompetencyCheckLevel/GetCompetencyCheckLevelDetails', { headers })
              .subscribe(res => {
                (resolve(res));

              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };

    this.SubjectData = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/Subject/GetSubjectDetails', { headers })
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
    this.Selectedtopic = null;
    this.TopicData = {
      paginate: true,
      store: new CustomStore({
        key: 'topic_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/topic/GettopicDetailsById/' + this.subjectId, { headers })
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
  makeAsyncDataSource(http: HttpClient) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'question_id',
      load() {
        return lastValueFrom(http.get(`${URL}/QuestionBank/GetActiveQuestions`, { headers }));
      },
    });
  }

  makeAsyncDataSourceTopicData(http: HttpClient, subjectId: any) {
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

  onGridBoxOptionChanged(e: any) {



    if (e.name === 'value') {

      this.isGridBoxOpened = false;
      this.visibleStepper = true;
      this.ref.detectChanges();
      let question_id = e.value;
      localStorage.setItem('question_id', question_id);

      this.http.get(URL + '/QuestionBank/GetActiveQuestionsByID?question_id=' + question_id, { headers })
        .subscribe((response: any) => {
          //alert(JSON.stringify(response) )
          if (Array.isArray(response) && response.length > 0) {
            // Data is an array and has at least one element
            const questionbank = response[0]; // Access the first element of the array
            this.subjectId = questionbank.subjectid;
            //alert(questionbank.base64)
            this.sanitizedImage = this.sanitizer.bypassSecurityTrustResourceUrl(questionbank.base64);


            this.base64Image = questionbank.base64;

            if (this.base64Image == "") {
              this.isImageHidden = true;
            }
            else {
              this.isImageHidden = false;
            }
            //alert(questionbank.question_id);
            this.questionForm.controls['subjectid'].setValue(questionbank.subjectid);
            this.TopicData = this.makeAsyncDataSourceTopicData(this.http, this.subjectId);


            // Load the TopicData and set the value once it's loaded
            this.TopicData.load().then((data: any) => {
              this.zone.run(() => {
                this.questionForm.controls['topicid'].setValue(questionbank.topicid);
                this.ref.detectChanges();
              });
            });
            this.questionForm.controls['response_type'].setValue(questionbank.response_type);
            if (questionbank.response_type == 1) {
              this.OptionA = true;
              this.OptionB = false;
              this.OptionC = true;
              this.Answers = true;
              
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

                const options = questionbank.options;

                options.forEach((option: any) => {
                  const optionFormGroup = this.formBuilder.group({
                    id: option.index,       // Use 'id' as a FormControl
                    value: option.value, // Use 'value' as a FormControl
                  });
                  console.log('option id ' + option.index)
                  console.log('option id ' + option.value)
                  // Add the option FormGroup to the 'options' FormArray
                  this.options.push(optionFormGroup);
                });

              }
            }
            else {
              this.OptionA = false;
              this.OptionB = true;
              this.OptionC = false;
              this.Answers = false;
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
            if (questionbank.keywords) {
              const keywordsArray = questionbank.keywords.split(',');
              this.tags = keywordsArray.map((keyword: string) => ({ name: keyword.trim() }));
              //alert(JSON.stringify(this.tags))
             // this.questionForm.controls['keywords'].setValue(this.tags.map(tag => tag.name)); // Setting the form control
            } else {
              //this.questionForm.controls['keywords'].setValue(['']); // Set to an empty array if no keywords
            }
            //this.questionForm.controls['keywords'].setValue(questionbank.keywords);
            this.questionForm.controls['assessor_randomselection'].setValue(questionbank.assessor_randomselection);
            this.chooserandom=questionbank.assessor_randomselection.toString();
           // alert(this.chooserandom)
            this.questionForm.controls['assessment_randomsetting'].setValue(questionbank.assessment_randomsetting);
            this.questionForm.controls['ref_to_governance_control'].setValue(questionbank.ref_to_governance_control);

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
}



