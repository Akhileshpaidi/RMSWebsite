import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { AuthorityType} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';

import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

const URL = BASE_URL;
// const headers = new HttpHeaders();
// headers.append('Content-Type', 'text/plain');
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Component({
  selector: 'app-my-assessment',
  templateUrl: './my-assessment.component.html',
  styleUrls: ['./my-assessment.component.scss']
})
export class MyAssessmentComponent {
  templateForm: any;
  gridBoxValue:number[] = [];
  gridDataSource:any = [];

  dataSource: any;
  typedata:any;
  isGridBoxOpened: boolean = false;
username:any=null;
createddate:any=null;
updatedusername:any=null;
updateddate:any=null;
listOfQuestions: any;
sumOfEstimatedTime:any;
gridColumns: any = ['assessment_name', 'type_Name', 'subType_Name',
'competency_Name','created_date','keywords'];
  
  ngOnInit(): void {
  }

  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
    this.dataSource = new CustomStore({
      loadMode: 'raw',
      key: 'userAss_Ans_DetailsID',
      load() {
    
        return lastValueFrom(http.get(`${URL}/AssessmentResults/GetAssessmentResultsDetails`, { headers }));
        
      },
    });
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
          this.templateForm.controls['no_of_questions_mapped'].setValue(questionbank.no_of_questions_mapped);
        
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
        
        } else {
         
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
  gridBox_displayExpr(item: any) {
        return item.assessment_name;
   }
onValueChanged(evt: any, data: any): void {  
  
  data.setValue(evt.value);  
  this.ref.detectChanges();
} 
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Types of Authority']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "AuthorityType.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Types of Authority',85,10);
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('AuthorityType.pdf');
      });
    }
  }
 

}
