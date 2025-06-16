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
import { EditReviewerComplianceComponent } from './edit-reviewer-compliance/edit-reviewer-compliance.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-review-reviewer-compliance',
  templateUrl: './review-reviewer-compliance.component.html',
  styleUrls: ['./review-reviewer-compliance.component.scss']
})
export class ReviewReviewerComplianceComponent implements OnDestroy {
  originalData: any[] = [];
  isVisibleDetails:Boolean= true;
  selectedDate: Date | undefined;
  remarks: string = '';
  paginatedData: any[] = [];
  totalCompliance: number = 0;
  currentIndex: number = 0;
  itemsPerPage: number = 1; 
  Approveremidateform:any;
  Useridvalue:any;
  rejectremark:boolean=false;
  complianceData: any;
  Approverform!: FormGroup;
  constructor(private fb: FormBuilder, private complianceDataService: EComplianceDataService, public dialog: MatDialog, private routers: Router, private router: ActivatedRoute, private http: HttpClient) { 
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
    
    const Userid = parsedData ? parsedData.profile.userid : null;
      console.log('User id:', Userid);
      this.Useridvalue=Userid;

      this.Approverform = new FormGroup({
        ApproverRemarks: new FormControl('', [Validators.maxLength(250)]),
      });
  }
  ngOnInit(): void {
    this.originalData = this.complianceDataService.getApproverUpdateComplianceData();
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
  this.routers.navigate(['dashboard/e-compliance-dashboard/Approve']);
}
ngOnDestroy(): void {
  localStorage.removeItem('ARCcomplianceData');
  // Remove other specific items as needed
}
edit(compliance: any) {
  const dialogRef = this.dialog.open(EditReviewerComplianceComponent, {
    width: '850px',
    data: {
      compliance: { ...compliance },
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.handleComplianceUpdate(result);
    }
  });
}
handleComplianceUpdate(updatedCompliance: any) {
  console.log('Received data from dialog:', updatedCompliance);

  if (updatedCompliance.action === 'updated') {
    const index = this.originalData.findIndex(
      item => item.update_compliance_id === updatedCompliance.data
    );

    if (index !== -1) {
      this.originalData.splice(index, 1);
      this.complianceDataService.setApproverUpdateComplianceData(this.originalData);
    }
  } else if (updatedCompliance.action === 'reject') {
    const rejectId = updatedCompliance.data;
    this.originalData = this.originalData.filter(
      item => item.update_compliance_id !== rejectId
    );
    this.complianceDataService.setApproverUpdateComplianceData(this.originalData);
  } else if (updatedCompliance.action === 'cancel') {
    this.originalData = this.complianceDataService.getApproverUpdateComplianceData();
  }
  this.totalCompliance = this.originalData.length;
  if (this.currentIndex >= this.totalCompliance) {
    this.currentIndex = Math.max(0, this.totalCompliance - 1);
  }
  this.updatePaginatedData();
}

onUpdate() {
  const approverRemarks = this.Approverform.controls['ApproverRemarks'].value;

  const updatedComplianceData = this.originalData.map(item => ({
    compliance_id: item.complianceID,
    update_compliance_id: item.update_compliance_id,
    approval_remarks: approverRemarks,
    updated_by: this.Useridvalue
  }));
//alert(JSON.stringify(updatedComplianceData))
  this.http.put(`${URL}/ApproverCompliance/ApproverBulkUpdateComplianceDetails`, updatedComplianceData)
  .subscribe(
    (response: any) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: response.message }
      });
  this.clearComplianceData();
  this.routers.navigate(['dashboard/e-compliance-dashboard/Approve']);
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
  const approverRemarks = this.Approverform.controls['ApproverRemarks'].value?.trim();

  if (!approverRemarks) {
    alert('Please provide Remarks');
    return;
  }
  const updatedComplianceData = this.originalData.map(item => ({
    compliance_id: item.complianceID,
    update_compliance_id: item.update_compliance_id,
    approval_remarks: approverRemarks,
    updated_by: this.Useridvalue
  }));

  this.http.delete(`${URL}/ApproverCompliance/ApproverRejectBulkCompliance`, {
    body: updatedComplianceData
  })
  .subscribe(
    (response: any) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: response.message }
      });
  this.clearComplianceData();
  this.routers.navigate(['dashboard/e-compliance-dashboard/Approve']);
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
