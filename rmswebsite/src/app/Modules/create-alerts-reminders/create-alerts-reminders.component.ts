import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-create-alerts-reminders',
  templateUrl: './create-alerts-reminders.component.html',
  styleUrls: ['./create-alerts-reminders.component.scss']
})
export class CreateAlertsRemindersComponent {
  alertsForm: FormGroup;
  Notification:any;
  dataSource1:any;
  userdata:any;
  defaultindicative: number = 1;
   defaultindicative1: number = 1;
    defaultindicative2: number = 1;
  defaultReviewDate:string='After Compliance Review Due Date';
  defaultApprovalDate:string='After Compliance Approval Due Date';
  defaultAduitDate:string='After Compliance Audit Due Date';
  ReviewerperiodicityOptions = [
    { id: 1, name: 'After Compliance Update Date' },
  ];
  ApproverperiodicityOptions = [
    { id: 1, name: 'After Compliance Update Date' },
    { id: 2, name: 'After Compliance Review Date' },
   
  ];
 AuditperiodicityOptions = [
    { id: 1, name: 'After Compliance Update Date' },
    { id: 2, name: 'After Compliance Review Date' },
    { id: 3, name: 'After Compliance Approval Date' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, public session: SessionService, public dialog: MatDialog, private router: Router) {

 
    this.alertsForm = this.fb.group({
    });

    this.Notification={
      paginate: true,
      store: new CustomStore({
          key: 'NotificationMailAlertid',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/ComplainceUserMappingController/GetNotificationMailAlerts', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };

     this.dataSource1={
      store: new CustomStore({
        key: 'alerts_reminders_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/AlertsAndreminder/GetAlertandreminder', {headers})
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
   

  ngOnInit(): void {
    this.alertsForm = this.fb.group({
      review: this.fb.group({
        reviewDays: ['', Validators.required],
        reviewPeriodicity: ['', Validators.required],
        reviewHolidayFactor: [false],
        reviewReminderDays: ['',Validators.required],
        reviewReminderPeriodicity: ['', Validators.required],
        reviewNotification: ['', Validators.required]
      }),
      approval: this.fb.group({
        approvaldays: ['',Validators.required],
        approvalPeriodicity: ['', Validators.required],
        includeHolidays: [false],
        reminderDays: ['', Validators.required],
        approvalReminderPeriodicity: ['', Validators.required],
        approvalNotification: ['', Validators.required]
      }),
      audit: this.fb.group({
        auditDays: ['', Validators.required],
        auditPeriodicity: ['', Validators.required],
        auditHolidayFactor: [false],
        auditReminderDays: ['', Validators.required],
        auditReminderPeriodicity: ['', Validators.required],
        auditNotification: ['', Validators.required]
      })
    });

    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);
  }

  onSubmit(): void {
    if (this.alertsForm.valid) {
      const pistdatalist = [];
  
      // Review Form Group
      if (this.alertsForm.get('review')) {
        const reviewForm = this.alertsForm.get('review');
        const postdata = {
          workactivity: 'Review',
          expectedDays: parseInt( reviewForm?.get('reviewDays')?.value),
          expectedperiodicity: reviewForm?.get('reviewPeriodicity')?.value,
          expectedhoilday: reviewForm?.get('reviewHolidayFactor')?.value,
          reminderalertdays:  parseInt(reviewForm?.get('reviewReminderDays')?.value),
          reminderalertperidicty: reviewForm?.get('reviewReminderPeriodicity')?.value,
          notification: parseInt( reviewForm?.get('reviewNotification')?.value),
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata);
      }
  
      // Approval Form Group
      if (this.alertsForm.get('approval')) {
        const approvalForm = this.alertsForm.get('approval');
        const postdata1 = {
          workactivity: 'Approve',
          expectedDays: parseInt(approvalForm?.get('approvaldays')?.value),
          expectedperiodicity: approvalForm?.get('approvalPeriodicity')?.value,
          expectedhoilday: approvalForm?.get('includeHolidays')?.value,
          reminderalertdays: parseInt(approvalForm?.get('reminderDays')?.value),
          reminderalertperidicty: approvalForm?.get('approvalReminderPeriodicity')?.value,
          notification:parseInt( approvalForm?.get('approvalNotification')?.value),
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata1);
      }
  
      // Audit Form Group
      if (this.alertsForm.get('audit')) {
        const auditForm = this.alertsForm.get('audit');
        const postdata2 = {
          workactivity: 'Audit',
          expectedDays: parseInt(auditForm?.get('auditDays')?.value),
          expectedperiodicity: auditForm?.get('auditPeriodicity')?.value,
          expectedhoilday: auditForm?.get('auditHolidayFactor')?.value,
          reminderalertdays: parseInt(auditForm?.get('auditReminderDays')?.value),
          reminderalertperidicty: auditForm?.get('auditReminderPeriodicity')?.value,
          notification: parseInt(auditForm?.get('auditNotification')?.value),
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata2);
      }
  
     // alert(JSON.stringify(pistdatalist));

      console.log(pistdatalist)
  

  
      this.http.put(URL + '/AlertsAndreminder/insertAlertandreminder', pistdatalist, { headers })
      .subscribe({
        next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Data Updated Successfully" },
          });
          this.alertsForm.reset();
          
          window.location.reload();
    
        },
        error: (error) => {
          console.error('Error from API:', error);
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Error: An error occurred while processing your request." }
          });

        }
      });

  }


}
reloadComponent() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
Cancel(){
  this.reloadComponent();
}
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet");
    worksheet.addRow(['Alert and Reminders']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Alert and Reminders.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Alert and Reminders',80,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Alert and Reminders.pdf');
    });
  }
}
}
