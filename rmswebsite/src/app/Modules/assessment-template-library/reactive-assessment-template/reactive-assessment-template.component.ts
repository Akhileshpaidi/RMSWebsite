import { ChangeDetectorRef, Component, NgZone,NgModule} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import ArrayStore from 'devextreme/data/array_store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDropDownBoxModule } from 'devextreme-angular';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';


const URL = BASE_URL;

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Component({
  selector: 'app-reactive-assessment-template',
  templateUrl: './reactive-assessment-template.component.html',
  styleUrls: ['./reactive-assessment-template.component.scss']
})
export class ReactiveAssessmentTemplateComponent {
  Useridvalue:any;
 
  gridBoxValue:any;
  OptionA=true;
  OptionB=false;
  OptionC=false;

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
  ChooseOptions:Array<{id:number,text:string}>=[];
  checklevels:Array<{id:number,text:string}>=[];
  data:any;
  CheckLevelData:any;
  checklevel_weightage: number = 0.01;
  gridDataSource:any = [];

  gridColumns: any = [{ dataField: 'ass_template_id' ,caption:'Assessment Template Id'},'assessment_name', 'competency_Name', 'type_Name', 'subType_Name',
{
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
  
  

  gridBox_displayExpr(item: any) {
    // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
    return item.assessment_name;
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



  isGridBoxOpened: boolean = false;
  visibleStepper: any;
  question_id: any;
  optionCount: number = 2; // default value
  optionsArray: number[] = Array(this.optionCount).fill(0);





constructor(private http: HttpClient,private ref: ChangeDetectorRef,public dialog: MatDialog,private formBuilder: FormBuilder,private zone: NgZone,private sanitizer: DomSanitizer){

 
  
  const storedData:any = localStorage.getItem('user');
  const parsedData = JSON.parse(storedData);

//UserId
const Userid = parsedData ? parsedData.profile.userid : null;
console.log('User id:', Userid);
this.Useridvalue=Userid;

  this.gridDataSource={
    paginate: true,
    store: new CustomStore({
     key:'ass_template_id',
     loadMode:'raw',
     load:()=>{return new Promise((resolve, reject) => {
       this.http.get(URL + '/Assessment/GetInActiveAssesmentByAll/'+this.Useridvalue, {headers})
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



  selectedValue(selectedValue: any) {
    throw new Error('Method not implemented.');
  }




  onGridBoxOptionChanged(e: { name: string; }) {
    if (e.name === 'value') {
     
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
     
    }
  }
  
  onClick(){
  
  
     
    
  
      const dialogRefConfirmation = this.dialog.open(ToasterComponent, {
        width: '550px',
        data: {
          title: 'Reactivate Document?',
          message: 'Are you sure you want to reactivate document?',
        },
      });
  
      dialogRefConfirmation.afterClosed().subscribe((result: boolean) => {
if (result) {
 
 
  //alert(question_id);
   this.http.put(URL + '/Assessment/ReActivateAssessmentDetailsByID?ass_template_id='+this.gridBoxValue.toString(),{headers})
      .subscribe(
          (response: any) => {
              //alert('Question ReActivated successfully');
              const message1 = "Question ReActivated successfully";
              const dialogRefSuccess = this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: message1 },
              });
             // this.templateForm.reset();
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
