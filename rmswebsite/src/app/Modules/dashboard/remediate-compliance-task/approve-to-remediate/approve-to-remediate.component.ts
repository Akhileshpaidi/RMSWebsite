import { Component,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { DateAdapter } from '@angular/material/core';
import { EComplianceDataService } from '../../e-compliance-data.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-approve-to-remediate',
  templateUrl: './approve-to-remediate.component.html',
  styleUrls: ['./approve-to-remediate.component.scss']
})
export class ApproveToRemediateComponent implements OnDestroy {
  originalData: any[] = [];
  isVisibleDetails:Boolean= true;
  selectedDate: Date | undefined; // Date to apply to all selected compliance
  remarks: string = '';
  paginatedData: any[] = [];
  totalCompliance: number = 0;
  currentIndex: number = 0;
  itemsPerPage: number = 1; 
  Approveremidateform:any;
  Useridvalue:any;
  rejectremark:boolean=false;
  dueDate: Date | null = null;  // Store dynamic due date
  minDate: Date = new Date();  
  constructor(private fb: FormBuilder, public dialog: MatDialog, private routers: Router, private router: ActivatedRoute, private http: HttpClient,private complianceDataService: EComplianceDataService,
    private dateAdapter: DateAdapter<Date>
  ) { 
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
    
    const Userid = parsedData ? parsedData.profile.userid : null;
      console.log('User id:', Userid);
      this.Useridvalue=Userid;
  }


  ngOnInit(): void {
    this.minDate = new Date(); 
    this.originalData = this.complianceDataService.getRequestToRemediationData();
    this.totalCompliance = this.originalData.length;
    this.updatePaginatedData();
          
       
        this.dueDate = new Date(this.originalData[0].effective_EndDate); 


    this.Approveremidateform = this.fb.group({
      
      ApprovedRemedialremarks:'',
      RejectionRemedialremarks:'',
      ApprovedRemedialDate: ['', [this.dateAfterDueDateValidator.bind(this)]]
    });
  }

requestForm = new FormGroup({
  remarks: new FormControl('')  // Initialize remarks as an empty string or default value
});

updatePaginatedData() {
  this.paginatedData = this.originalData.slice(this.currentIndex * this.itemsPerPage, (this.currentIndex + 1) * this.itemsPerPage);
}
ngOnDestroy(): void {
  localStorage.removeItem('ATRCcomplianceData');
  // Remove other specific items as needed
}
// dateValidator(control: any) {
//   const selectedDate = new Date(control.value);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset time part of today

//   if (this.dueDate) {
//     // Check if selectedDate is on or before either dueDate or today
//     if (selectedDate <= today || selectedDate > this.dueDate) {
//       return { invalidDateRange: true };  // Invalid date range
//     }
//   }

//   return null; // Valid date
// }





dateAfterDueDateValidator(control: any) {
  const selectedDate = new Date(control.value);  // The selected remedial date
  if (this.dueDate) {
    // Check if the selectedDate is before or on the due date
    if (selectedDate <= this.dueDate) {
      return { invalidDateRange: true };  // Invalid date range
    }
  }

  return null;  // Valid date
}
dateFilter = (d: Date | null): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset today to midnight
  const dayAfterDueDate = new Date(this.dueDate!);
  dayAfterDueDate.setDate(this.dueDate!.getDate() + 1); // The day after the due date
  return d ? d > dayAfterDueDate && d > today : false; // Enable only dates after both due date and today
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
  // Handle the cancel action
  console.log('Cancel clicked');
  this.routers.navigate(['dashboard/e-compliance-dashboard/Remediates'],);
}

onUpdate() {
  
  const filteredData = this.originalData.map(item => ({
    entityName: item.entityName,
    complianceName: item.complianceName,
    dueDate: item.dueDate,
    remedialDate:item.remedialDate,
    complianceStage: item.complianceStage,
    rpa_request_date:item.rpa_request_date,
    remediation_request_remarks:item.remediation_request_remarks,
    remediation_plan_id:parseInt(item.remediation_plan_id),
    compliance_status:item.compliance_status
  }));

  
  const updatePayload = {
    approved_remedial_comply_date:  this.Approveremidateform.get('ApprovedRemedialDate').value,
    remediation_approval_remarks: this.Approveremidateform.get('ApprovedRemedialremarks').value,
    approver_id:parseInt(this.Useridvalue),
    originalData: filteredData
  };
  console.log(JSON.stringify(updatePayload));  // For debugging purposes, remove in production

  if(this.Approveremidateform.get('ApprovedRemedialDate').value==""){
    alert('Please Provide Approval Remedial Comply Date')
    return;
  }
  if(this.Approveremidateform.get('ApprovedRemedialremarks').value==""){
    alert('Please Provide Remediation Reason/Remarks');
    return;
  }

    this.http.post(URL + '/RemediationPlan/ApproveRemediationPlanRequest',updatePayload)
    .subscribe((response: any) => {
      console.log('Data Save Succefully ', response);
    window.alert('Data Saved Successfully');
      this.reloadComponent();
    },
    (error: any) => {
     
      window.alert('Error Saving Data');
    });
}
reloadComponent() {
  const currentUrl = this.router.url;
  this.routers.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.routers.navigate([currentUrl]);
  });
}

onReject() {
  this.rejectremark=true;
  if(this.rejectremark=true)
  {
  if(this.Approveremidateform.get('RejectionRemedialremarks').value==""){
    alert('Please Provide Remediation Reason/Remarks');
    return;
  }
  const filteredData = this.originalData.map(item => ({
    entityName: item.entityName,
    complianceName: item.complianceName,
    dueDate: item.dueDate,
    remedialDate:item.remedialDate,
    complianceStage: item.complianceStage,
    rpa_request_date:item.rpa_request_date,
    remediation_request_remarks:item.remediation_request_remarks,
    remediation_plan_id:parseInt(item.remediation_plan_id),
    compliance_status:item.compliance_status
  }));
  const updatePayload = {
       remediation_rejection_remarks: this.Approveremidateform.get('RejectionRemedialremarks').value,
    rejecter_id:parseInt(this.Useridvalue),
     originalData: filteredData
       };
  

 //  alert(JSON.stringify(updatePayload));  // For debugging purposes, remove in production
   
   this.http.post(URL + '/RemediationPlan/RejectRemediationPlanRequest', updatePayload, {headers})
   .subscribe((response: any) => {
    console.log('Data Save Succefully ', response);
  window.alert('Data Saved Successfully');
    this.reloadComponent();
  },
  (error: any) => {
   
    window.alert('Error Saving Data');
  });
}
  
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