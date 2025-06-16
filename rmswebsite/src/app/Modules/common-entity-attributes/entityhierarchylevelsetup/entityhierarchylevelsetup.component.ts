import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import jsPDF from 'jspdf';
import { lastValueFrom } from 'rxjs';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-entityhierarchylevelsetup',
  templateUrl: './entityhierarchylevelsetup.component.html',
  styleUrls: ['./entityhierarchylevelsetup.component.scss']
})

export class EntityhierarchylevelsetupComponent implements OnInit {
  HierarchyForm!: FormGroup;
  heirarchydata: any = [];
  dataSource: any;

  isEditMode = false;
  constructor(private http: HttpClient, private fb: FormBuilder, private dialog: MatDialog,private session:SessionService) {

    this.HierarchyForm = this.fb.group({
      Level1: '',
      Level2: '',
      Level3: '',
    })

  }
  ngOnInit(): void {
    this.dataSource = this.abcd(this.http);

    console.log("visvff")

  }

  Update() {
    if (this.HierarchyForm.invalid) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px', data: { message: 'Select Mandatory Fields' }
      });
      return;
    }
    let user:any=this.session.getUser();
    user=JSON.parse(user as any)
    const userid:number=user.profile.userid;
    let postdata=[
      {'EntityHeirarchyLevelID':1,'Level':'Level 1','Entity':this.HierarchyForm.value.Level1,'ModifiedBy':userid},
      {'EntityHeirarchyLevelID':2,'Level':'Level 2','Entity':this.HierarchyForm.value.Level2,'ModifiedBy':userid},
      {'EntityHeirarchyLevelID':3,'Level':'Level 3','Entity':this.HierarchyForm.value.Level3,'ModifiedBy':userid},
    ];
    this.http.post(`${BASE_URL}/EntityHierarchyLevel/UpdateEntityHierarchyLevels`,postdata,{headers}).subscribe((response:any)=>{
        this.dialog.open(DaidailogeComponent,{
            width:'550px',data:{message:response}
        })  ;  
        this.isEditMode = false;
        this.dataSource = this.abcd(this.http);

    });

  }
  Edit() {
    this.isEditMode = true;
    this.http.get(`${BASE_URL}/EntityHierarchyLevel/GetEntityHierarchyLevels`, { headers })
      .subscribe((response: any) => {
        console.log(response)
        this.heirarchydata = response as any;
        let a = this.heirarchydata.filter((item: any) => {
          return item.level == 'Level 1';
        })[0].entity;
        (this.HierarchyForm.get('Level1') as FormControl).setValue(this.heirarchydata.filter((item: any) => {
          return item.level == 'Level 1';
        })[0].entity);
        (this.HierarchyForm.get('Level2') as FormControl).setValue(this.heirarchydata.filter((item: any) => {
          return item.level == 'Level 2';
        })[0].entity);
        (this.HierarchyForm.get('Level3') as FormControl).setValue(this.heirarchydata.filter((item: any) => {
          return item.level == 'Level 3';
        })[0].entity);
      });
  }

  abcd(http: HttpClient) {



    //this.griddatajson
    return new CustomStore({
      loadMode: 'raw',
      key: 'entityHeirarchyLevelID',
      load() {
        //return this.heirarchydata;
        return lastValueFrom(http.get(`${URL}/EntityHierarchyLevel/GetEntityHierarchyLevels`, { headers }));
      },
    });
  }
  exportGrid1(e: any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Sub-Types Of Assessment']);
      worksheet.addRow([]);
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "unitlocationmaster.xlsx");
        });
      });
      e.cancel = true;
    }
    else if (e.format === 'pdf') {
      //alert("test")
      const doc = new jsPDF();
      doc.text('Sub-Types Of Assessment', 75, 10);
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('unitlocationmaster.pdf');
      });
    }
  }
}
