import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import ArrayStore from 'devextreme/data/array_store';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import { ExitNav } from 'src/app/assessment-service.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-view-act-rule-regulation',
  templateUrl: './view-act-rule-regulation.component.html',
  styleUrls: ['./view-act-rule-regulation.component.scss']
})
export class ViewActRuleRegulationComponent {
  rulename:any;
  actid:any;
  actname:any;
  act_rule_regulatory_id: any;
  act_rule:any;
  SelectedAct:any;
  isLinkCopied: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private http: HttpClient, public dialog: MatDialog)
  {
     
     this.actname={
      paginate: true,
      store: new CustomStore({
          key: 'actregulatoryid',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Actregulatory/GetActregulatory', {headers})
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
getRules(event: any) {
  console.log("selected Act : ", event.value);
  this.actid = event.value;
  //alert(this.actid)
   this.SelectedAct=null;  


 // To get Rules
  this.rulename={
    paginate: true,
    store: new CustomStore({
      key: 'act_rule_regulatory_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/rulesandregulatory/GetrulesandregulatoryByID/'+this.actid,{headers})
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
  

  getactruledata(selectedactrule: any) {
    //console.log("Selected act_rule_regulatory_id : ", selectedactrule.value);
    this.act_rule_regulatory_id = selectedactrule.value;
    this.http.get(URL + '/actruleregulation/GetactruleandprocudreDetails/' + this.act_rule_regulatory_id, { headers })
      .subscribe(
        (res: any) => {
          this.act_rule = res;
          //alert(JSON.stringify(this.act_rule)) // Assign the fetched data to act_rule property
          //console.log(this.act_rule);
        },
        (err) => {
          console.error(err);
        }
      );
  
  
   
  
  
  
   
  }
  copyLink(link: string) {
    const el = document.createElement('textarea');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.isLinkCopied = true;
    setTimeout(() => {
      this.isLinkCopied = false;
    }, 3000);
  }

  download(filePath: string, fileType: string): void {
    const apiUrl = `${URL}/actruledownload/actruleDownLoadFiles?filePath=${filePath}`;
  
    this.http.get(apiUrl, { responseType: 'blob' }).pipe(
      catchError((error: any) => {
        console.error('Error occurred while downloading file:', error);
        return throwError('Something went wrong in file download. Please try again later.');
      })
    ).subscribe((res: Blob) => {
  console.log(res)
  //alert (JSON.stringify(res))
      // Extract filename from the URL
      const filenameFromUrl = this.extractFilenameFromUrl(filePath);
  
      // Create a blob URL to trigger the download
      const blob = new Blob([res], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element and click on it to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = filenameFromUrl;
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  }
  
  extractFilenameFromUrl(url: string): string {
    // Extract the filename part from the URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  editAct(actruleid: number) {
    console.log('Edit Act with ID:', actruleid); // Debug log
    //alert(actruleid)
    this.act_rule_regulatory_id = actruleid;
    this.router.navigate(['dashboard/Actregulation/editActrulesregulations'], {
      queryParams: { act_rule_regulatory_id: this.act_rule_regulatory_id }
    });
  }
}
