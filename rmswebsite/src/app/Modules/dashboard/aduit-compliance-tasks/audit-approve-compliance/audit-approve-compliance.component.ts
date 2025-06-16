import { Component,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { InfoDialogComponent } from 'src/app/Common/daidailoge/info-dialog/info-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { SessionService } from 'src/app/core/Session/session.service';
import { EComplianceDataService } from '../../e-compliance-data.service';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-audit-approve-compliance',
  templateUrl: './audit-approve-compliance.component.html',
  styleUrls: ['./audit-approve-compliance.component.scss']
})
export class AuditApproveComplianceComponent implements OnDestroy {
  originalData: any[] = [];
  isVisibleDetails:Boolean= true;
  selectedDate: Date | undefined; // Date to apply to all selected compliance
  remarks: string = '';
  paginatedData: any[] = [];
  totalCompliance: number = 0;
  currentIndex: number = 0;
  itemsPerPage: number = 1; 
  Auditform!: FormGroup;
  Useridvalue:any;
  rejectremark:boolean=false;
  complianceData: any;
  constructor(private fb: FormBuilder, private complianceDataService: EComplianceDataService, public dialog: MatDialog, private routers: Router, private router: ActivatedRoute, private http: HttpClient) { 
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
    
    const Userid = parsedData ? parsedData.profile.userid : null;
      console.log('User id:', Userid);
      this.Useridvalue=Userid;

      this.Auditform = new FormGroup({
        AuditorRemarks: new FormControl('', [Validators.maxLength(250)]),
      });
  }

  ngOnInit(): void {
    this.originalData = this.complianceDataService.getAuditUpdateComplianceData();
    this.totalCompliance = this.originalData.length;
    this.updatePaginatedData();
    
  console.log(JSON.stringify(this.originalData))
    if (!this.originalData.length) {
      console.error('No compliance data found!');
    }
  }

updatePaginatedData() {
  this.paginatedData = this.originalData.slice(this.currentIndex * this.itemsPerPage, (this.currentIndex + 1) * this.itemsPerPage);
}

onPrevious() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.updatePaginatedData();
  }
}

onNext() {
  if (this.currentIndex < this.totalCompliance - 1) {
    this.currentIndex++;
    this.updatePaginatedData();
  }
}
onCancel() {
  console.log('Cancel clicked');
  this.clearComplianceData();
  this.routers.navigate(['dashboard/e-compliance-dashboard/Audit']);
}
ngOnDestroy(): void {
  localStorage.removeItem('AACcomplianceData');
  // Remove other specific items as needed
}

onUpdate() {
  const auditRemarks = this.Auditform.controls['AuditorRemarks'].value;

  const updatedComplianceData = this.originalData.map(item => ({
    compliance_id: item.complianceID,
    update_compliance_id: item.update_compliance_id,
    audit_remarks: auditRemarks,
    actual_complied_date: item.actual_complied_date,
    dueDate: item.dueDate,
    updated_by: this.Useridvalue
  }));

  this.http.put(`${URL}/AuditCompliance/AuditUpdateComplianceDetails`, updatedComplianceData)
  .subscribe(
    (response: any) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: response.message }
      });
  this.clearComplianceData();
  this.routers.navigate(['dashboard/e-compliance-dashboard/Audit']);
    },
    (error) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: 'Error in saving data' }
      });
    }
  );
}

reloadComponent() {
  const currentUrl = this.router.url;
  this.routers.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.routers.navigate([currentUrl]);
  });
}
clearComplianceData() {
 // localStorage.removeItem('reviewComplianceData');
}
onReject() {
  const auditRemarks = this.Auditform.controls['AuditorRemarks'].value?.trim();

  if (!auditRemarks) {
    alert('Please provide Remarks');
    return;
  }
  const updatedComplianceData = this.originalData.map(item => ({
    compliance_id: item.complianceID,
    update_compliance_id: item.update_compliance_id,
    audit_remarks: auditRemarks,
    updated_by: this.Useridvalue
  }));

  this.http.delete(`${URL}/AuditCompliance/AuditRejectCompliance`, {
    body: updatedComplianceData
  })
  .subscribe(
    (response: any) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: response.message }
      });
  this.clearComplianceData();
  this.routers.navigate(['dashboard/e-compliance-dashboard/Audit']);
    },
    (error) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: 'Error in saving data' }
      });
    }
  );
}
getFormattedDate(dateString: string): string {
  // Check if dateString is null, empty, or invalid
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'N/A';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
}
