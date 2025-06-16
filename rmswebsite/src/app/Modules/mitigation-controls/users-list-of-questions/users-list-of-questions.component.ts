import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
//import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { LoadResult } from 'devextreme/common/data/custom-store';
import Chart from 'chart.js/auto';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-users-list-of-questions',
  templateUrl: './users-list-of-questions.component.html',
  styleUrls: ['./users-list-of-questions.component.scss']
})
export class UsersListOfQuestionsComponent {
  mitigationForm:any;
  serialNumber: number = 1;

  // Function to set serial number
  
constructor(private http: HttpClient,
  private ref: ChangeDetectorRef,
  private fb:FormBuilder,
  private router:Router,
  public dialog: MatDialog){
    this.mitigationForm=this.fb.group({
      question:'',
      correct_answer:'',
      firstname:'',

    });

    let serialNumber = 1; 

  this.http.get(URL + '/ScheduleAssessementReviewController/GetListofUsers?AssessementTemplateID='+localStorage.getItem('ass_template_id')+"&&uq_ass_schid="+localStorage.getItem('uq_ass_schid')+"&&question_id="+localStorage.getItem('question_id')+"&&Users="+localStorage.getItem('users') , {headers})
  .subscribe((response: any) => {
  //alert(JSON.stringify(response))
    if (Array.isArray(response) && response.length > 0) 
    {
      
      let Getcounts:any = response[0] as any; // Access the first element of the array
      
      console.log(JSON.stringify(Getcounts));
      
      this.mitigationForm.controls['question'].setValue(response[0].question);
      this.mitigationForm.controls['correct_answer'].setValue(response[0].correct_answer);
      const firstnames = response.map(item => item.firstname);
      this.mitigationForm.controls['firstname'].setValue(firstnames);


    }

    
});
}

}
