import { ChangeDetectorRef, Component,ElementRef,Inject,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-edit-reviewer-compliance',
  templateUrl: './edit-reviewer-compliance.component.html',
  styleUrls: ['./edit-reviewer-compliance.component.scss']
})
export class EditReviewerComplianceComponent {
  actualCompliedDueDate: Date | null = new Date('mm/dd/yyyy');
  complianceData: any;
  selectedFile: File[] = [];
  maxAttachments: number = 0;
  isMandatory : boolean = false;
  selectedFiles: File[] = [];
  update_compliance_id:any;
  nature_of_attachment: string = ''; 
  attachments: { file: File; filePath: string; fileName: string; nature_of_attachment: string; status: string }[] = [];
  originalAttachments: { file: File; filePath: string; fileName: string; nature_of_attachment: string; status: string }[] = [];
  Useridvalue:any;
  errorMessages: string[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef; 
  Approverform!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditReviewerComplianceComponent>,
     public dialog: MatDialog,
      private cdRef: ChangeDetectorRef,
       private http: HttpClient,
         @Inject(MAT_DIALOG_DATA) public data: any,) 
 { 
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
    if (!this.data || !this.data.compliance) {
      console.error('No compliance data received!');
      return;
    }
  
    //this.complianceData = { ...this.data.compliance };
    this.complianceData = JSON.parse(JSON.stringify(this.data.compliance));

    console.log('Received compliance data:', this.complianceData); 
  
    this.maxAttachments = this.complianceData.no_of_Attachements || 0;
    this.isMandatory = this.complianceData?.mandatory === true;
   // this.originalAttachments = this.complianceData.files || [];
    this.originalAttachments = JSON.parse(JSON.stringify(this.complianceData.files || []));
  
    this.updateTable();
  }

  onFileSelected(event: any) {
    const newFiles: FileList = event.target.files;
    const allowedNewFiles = this.maxAttachments - this.selectedFiles.length;
  
    if (newFiles.length > allowedNewFiles) {
      this.errorMessages.push(`You can only upload ${this.maxAttachments} files.`);
      return;
    }
  
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (file && !this.isFileAlreadySelected(file.name)) {
        if (this.selectedFiles.length < this.maxAttachments) {
          this.selectedFiles.push(file);
        } else {
          this.errorMessages.push(`You cannot upload more than ${this.maxAttachments} files.`);
          break;
        }
      }
    }
  }

  isFileAlreadySelected(fileName: string): boolean {
    return this.selectedFiles.some(file => file.name === fileName);
  }

  updateTable(): void {
    this.attachments = this.originalAttachments.filter(attachment => attachment.status === 'Active');
    this.cdRef.detectChanges();
  }
  onCancel() {
    // Restore the original compliance data and attachments
    this.complianceData = JSON.parse(JSON.stringify(this.data.compliance));
    this.originalAttachments = JSON.parse(JSON.stringify(this.complianceData.files || []));
    this.updateTable(); // Reapply original attachments
    this.dialogRef.close({ action: 'cancel' });
  }
  

onAttach() {
  if (this.selectedFiles.length) {
    this.selectedFiles.forEach(file => {
      const newAttachment = {
        file:file,
        filePath: '', 
        fileName: file.name,
        nature_of_attachment: this.nature_of_attachment || 'N/A',
        status: 'Active'
      };
      this.originalAttachments.push(newAttachment);
    });

    this.selectedFiles = [];
    this.nature_of_attachment = '';
    this.updateTable(); 
  }
}

removeAttachment(attachment: { file: File; filePath: string; fileName: string; nature_of_attachment: string; status: string }) {
  const index = this.originalAttachments.indexOf(attachment);
  if (index >= 0) {
    this.originalAttachments[index].status = 'Inactive';
    this.updateTable(); 
  }
}
onUpdate() {
  const approverRemarks = this.Approverform.controls['ApproverRemarks'].value;

  if(this.isMandatory == true){
    if (this.maxAttachments - this.attachments.length !== 0) {
      let moreCompliance = this.maxAttachments - this.attachments.length;
        alert('Please upload more ' + moreCompliance +' attachments.');
        return;
      }
    }
  const formData = new FormData();

  formData.append('compliance_id', this.complianceData.complianceID);
  formData.append('update_compliance_id', this.complianceData.update_compliance_id);
  if (this.complianceData.actual_complied_date) {
    const formattedDate = new Date(this.complianceData.actual_complied_date); 
    formData.append(`actual_complied_date`, formattedDate.toISOString().split('T')[0]); 
  }  else {
  formData.append(`actual_complied_date`, new Date(0).toISOString().split('T')[0]);
}
  formData.append('amount_paid', this.complianceData.amount_paid || '');
  formData.append('penalty_paid', this.complianceData.penalty_paid || '');
  formData.append('approval_remarks', approverRemarks);
  formData.append('updated_by', this.Useridvalue);
  this.originalAttachments
  .filter(attachment => attachment.status === 'Active')
  .forEach((attachment, index) => {
    if (attachment.file) {
      formData.append('attachments[' + index + '].file', attachment.file, attachment.file.name);
      formData.append('attachments[' + index + '].nature_of_attachment', attachment.nature_of_attachment);
    }
  });
console.log(JSON.stringify(formData))
  this.http.put(`${URL}/ApproverCompliance/ApproverUpdateComplianceDetailsById`, formData, { headers })
    .subscribe(
      (response: any) => {
        this.dialog.open(DaidailogeComponent, {
          data: { message: response.message }
        });
        this.dialogRef.close({
          action: 'updated',
          data: this.complianceData.update_compliance_id
        });
      },
      (error) => {
        this.dialog.open(DaidailogeComponent, {
          data: { message: 'Error in saving data' }
        });
        this.dialogRef.close({ action: 'cancel' });
      }
    );
}
onReject() {
  const approverRemarks = this.Approverform.controls['ApproverRemarks'].value?.trim();
  if (!approverRemarks) {
    alert('Please provide Remarks');
    return;
  }
  const rejectComplianceData = {
    update_compliance_id: this.complianceData.update_compliance_id,
    approval_remarks: approverRemarks,
    updated_by: this.Useridvalue
  };

  console.log('Reject API:', JSON.stringify(rejectComplianceData));

  this.http.delete(`${URL}/ApproverCompliance/ApproverRejectComplianceById`, {
    body: rejectComplianceData
  })
  .subscribe(
    (response: any) => {
      this.dialog.open(DaidailogeComponent, {
        data: { message: response.message }
      });
      this.dialogRef.close({
        action: 'updated',
        data: this.complianceData.update_compliance_id
      });
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
