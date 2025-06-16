import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {  OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { InfoDialogComponent } from 'src/app/Common/daidailoge/info-dialog/info-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { SessionService } from 'src/app/core/Session/session.service';
import { EComplianceDataService } from '../../e-compliance-data.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-request-to-remediate',
  templateUrl: './request-to-remediate.component.html',
  styleUrls: ['./request-to-remediate.component.scss']
})
export class RequestToRemediateComponent implements OnInit, OnDestroy{
  originalData: any[] = [];
  isVisibleDetails:Boolean= true;
  selectedDated: Date | undefined; // Date to apply to all selected compliance
  remarks: string = '';
  paginatedData: any[] = [];
  totalCompliance: number = 0;
  currentIndex: number = 0;
  itemsPerPage: number = 1; 
  proposedRemedialDate!: Date; 
  //selectedDated: Date | null = null;
  selectedDate: string | Date = new Date();
  requestremidateform:any;
  userdata: any;
  dueDate!: Date; // Store dynamic due date
  minDate: Date = new Date();  
  constructor(private fb: FormBuilder,private session: SessionService, public dialog: MatDialog, private router: ActivatedRoute, private http: HttpClient, private routers: Router, private complianceDataService: EComplianceDataService) { }


  ngOnInit(): void {
    this.originalData = this.complianceDataService.getRequestToRemediationData();
    this.totalCompliance = this.originalData.length;
    this.updatePaginatedData();
    
  //console.log(JSON.stringify(this.originalData))
    if (!this.originalData.length) {
      console.error('No compliance data found!');
    }

    this.requestremidateform = this.fb.group({
      proposedRemedialDate:['', [this.dateAfterDueDateValidator.bind(this)]],
      remarks: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });
    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
        // console.log("userid", this.userdata.profile.userid);
  }

requestForm = new FormGroup({
  remarks: new FormControl('')  // Initialize remarks as an empty string or default value
});

updatePaginatedData() {
  this.paginatedData = this.originalData.slice(this.currentIndex * this.itemsPerPage, (this.currentIndex + 1) * this.itemsPerPage);
}
// dateBetweenTodayAndDueDateValidator(control: any) {
//   const selectedDate = new Date(control.value);  // The selected remedial date
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);  // Reset time to midnight

//   if (this.dueDate) {
//     // Check if the selectedDate is between today's date and the due date
//     if (selectedDate <= today || selectedDate > this.dueDate) {
//       return { invalidDateRange: true };  // Invalid date range
//     }
//   }

//   return null;  // Valid date
// }

// // Custom date filter to disable dates outside the range in the datepicker
// dateFilter = (d: Date | null): boolean => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset today to midnight
//   return d ? d >= today && d <= this.dueDate! : false; // Only enable dates within the valid range
// }
dateAfterDueDateValidator(control: any) {
  if (!control.value) {
    return null; // Skip validation if no date selected
  }

  const selectedDate = new Date(control.value); // Selected remedial date

  // Check if dueDate exists and is valid
  if (this.dueDate && !isNaN(this.dueDate.getTime())) {
    // Check if selectedDate is before or on the due date
    if (selectedDate <= this.dueDate) {
      return { invalidDateRange: true }; // Invalid range
    }
  }

  return null; // Date is valid
}

dateFilter = (d: Date | null): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset today to midnight

  // Convert dueDate to Date if it's a string
  let dueDateObj: Date | null = null;

  if (typeof this.dueDate === 'string') {
    dueDateObj = new Date(this.dueDate);
  } else if (this.dueDate instanceof Date) {
    dueDateObj = this.dueDate;
  }

  // Check if dueDate is valid
  if (!dueDateObj || isNaN(dueDateObj.getTime())) {
    return d ? d > today : false; // If no valid dueDate, allow only future dates
  }

  // Set the day after dueDate
  const dayAfterDueDate = new Date(dueDateObj);
  dayAfterDueDate.setDate(dueDateObj.getDate() + 1);

  // Enable only dates after both due date and today
  return d ? d > dayAfterDueDate && d > today : false;
};

dateFilter1 = (d: Date | null): boolean => {
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
  this.routers.navigate(['dashboard/e-compliance-dashboard/Compliance'],);
}
ngOnDestroy(): void {
  localStorage.removeItem('RTRCcomplianceData');
  // Remove other specific items as needed
}
onUpdate() {
   const filteredData = this.originalData.map(item => ({
    entityName: item.entityName,
    complianceName: item.complianceName,
    dueDate: item.dueDate,
    complianceStage: item.complianceStage,
    entity_id:item.entityid,
    unit_location_id :item.unitlocationid,
    department_id:item.departmentId,
    compliance_id:item.complianceID
  }));

  const updatePayload = {
    proposed_remedial_comply_date:  this.requestremidateform.get('proposedRemedialDate').value,

    remediation_request_remarks: this.requestremidateform.get('remarks').value,
    requester_id:this.userdata.profile.userid,
    originalData: filteredData
  };

if(this.requestremidateform.get('proposedRemedialDate').value==""){
  alert('Please Provide Proposed Remedial Comply Date')
  return;
}
if(this.requestremidateform.get('remarks').value==""){
  alert('Please Provide Remediation Reason/Remarks');
  return;
}
  console.log(JSON.stringify(updatePayload));  // For debugging purposes, remove in production
  
  // this.http.post(URL + '/RemediationPlan/InsertRemediationPlanRequestDetails', updatePayload, {headers})
  //   .subscribe(
  //     (response: any) => {
  //       console.log('Update successful', response);
  //     },
  //     (error: any) => {
  //       console.error('Error occurred during update', error);
  //     }
  //   );
  let formdata:any[]=[];
   this.http.post(URL + '/RemediationPlan/InsertRemediationPlanRequestDetails',updatePayload)
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