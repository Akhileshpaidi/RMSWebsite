import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDropDownBoxModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import {  HttpParams, HttpHeaders } from '@angular/common/http';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';


import { FormBuilder, FormControl, FormGroup,FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Subscriber, lastValueFrom } from 'rxjs';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-disable-question',
  templateUrl: './disable-question.component.html',
  styleUrls: ['./disable-question.component.scss']
})
export class DisableQuestionComponent {
  treeBoxValue: string;
  gridDataSource: any;
  userdata:any;
  userid:any;
  gridBoxValue:any;

  isGridBoxOpened: boolean;

  //gridColumns: any = ['question', 'subject_Name', 'topic_Name'];
  gridColumns: any = [
  { dataField: 'question_id', caption: 'Question ID' },
  { dataField: 'question', caption: 'Question' },
  { dataField: 'subject_Name', caption: 'Subject Name' },
  { dataField: 'topic_Name', caption: 'Topic Name' }
];
  optionCount: number = 2; // default value
    optionsArray: number[] = Array(this.optionCount).fill(0);

    OptionA=true;
    OptionB=false;

    resptype: Array<{ id: number, text: string }> = [];
    ChooseOptions:Array<{id:number,text:string}>=[];
    checklevels:Array<{id:number,text:string}>=[];

    data: any;
    resptypedata:any;
    MapSubject:any;
    form:any;
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
        { id:1,text:'Yes' },
        { id:2,text:'No'  }
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


  constructor(private httpClient: HttpClient,private session: SessionService, private ref: ChangeDetectorRef,public dialog: MatDialog,
    private formBuilder: FormBuilder) {
   
    this.treeBoxValue = '1_1';
    
    this.isGridBoxOpened = false;
    // this.MapSubject={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'Value',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.httpClient.get(URL + '/Subject/GetSubjectDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };


    this.form =  this.formBuilder.group ({
      question_id: ['', Validators.required],
      reason_for_disable: ['', Validators.required],
   
   })


this.gridDataSource={
 paginate: true,
 store: new CustomStore({
  key:'question_id',
  loadMode:'raw',
  load:()=>{return new Promise((resolve, reject) => {
    this.httpClient.get(URL + '/QuestionBank/GetActiveQuestionsbyUserid/'+this.userid, {headers})
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
    //return item && `${item.question} <${item.subject_Name}`;
    return item.question;
   }
  selectOption(event: any) {
    // handle the selection change here
    console.log('Selected:', event.value);
    if (event.value === 1) { // Assuming 'Direct Upload' has an id of 1
    this.OptionA=true;
    this.OptionB=false;
    } else {
      this.OptionA=false;
      this.OptionB=true;
    }
   
  }
  // treeView_itemSelectionChanged(e) {
  //   this.treeBoxValue = e.component.getSelectedNodeKeys();
  // }


  // gridBox_displayExpr(item) {
  //   return item && `${item.CompanyName} <${item.Phone}>`;
  // }
  onGridBoxOptionChanged(e: { name: string; }) {
   
    if (e.name === 'value') {
     
      this.isGridBoxOpened = false;
     
      this.ref.detectChanges();
    }
  }
  
  onClick(){
    this.form.patchValue({
      question_id:this.gridBoxValue
     })
    if (this.form.valid ) {
      const formData: FormData = new FormData();

      //var message = JSON.stringify('Do you want to Submit');
//var result = window.confirm(message);
const dialogRefConfirmation = this.dialog.open(ToasterComponent, {
  width: '550px',
  data: {
    title: 'Disabled Question?',
    message: 'Are you sure you want to disabled question?',
  },
});

dialogRefConfirmation.afterClosed().subscribe((result: boolean) => {
 
if (result) {
  // User clicked "OK"
  // You can put your submission logic here
 
  Object.keys(this.form.controls).forEach(key => {
   
    formData.append(key, this.form.get(key).value);
    
});
 console.log(JSON.stringify(formData))
this.httpClient.put(URL + '/QuestionBank/DisableQuestionByID', formData)
    .subscribe(
        (response: any) => {
       
            const message = "Question Disabled successfully.";
            const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: message},
             
            });
           // this.form.reset();
           // this.reloadComponent();
            window.location.reload();
           // console.log('Data saved successfully:', response);
        },
        (error: any) => {
            console.error('Error saving data:', error);
        }
    );
  console.log('User clicked OK');
}
else {
  // User clicked "Cancel" or closed the dialog
  console.log('User clicked Cancel or closed the dialog');
} 
 
});

















  } 
  else {
     
      const message = "Enter Reason for Disable.";
        const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message},
         
        });
  }
    
  }
  reloadComponent() {
    throw new Error('Method not implemented.');
  }

    updateOptionsArray(event: any) {
     console.log("Updated value: ", event.value);
      this.optionCount = event.value;
        this.optionsArray = Array(this.optionCount).fill(0);
      
    }
   
    
  longText = "";
  updateClick() {
    notify('Uncomment the line to enable sending a form to the server.');
    // form.submit();
  }


}

@NgModule({
  imports: [
   DxDropDownBoxModule,
    HttpClientModule,
    DxDataGridModule,
  ],
 
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);






