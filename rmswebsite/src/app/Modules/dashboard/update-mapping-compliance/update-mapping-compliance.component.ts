import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EComplianceDataService } from '../e-compliance-data.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  
@Component({
  selector: 'app-update-mapping-compliance',
  templateUrl: './update-mapping-compliance.component.html',
  styleUrls: ['./update-mapping-compliance.component.scss']
})
export class UpdateMappingComplianceComponent implements OnDestroy {
  paginatedData: any[] = [];
  originalData: any[] = [];
  totalCompliance: number = 0;
  currentIndex: number = 0;
  itemsPerPage: number = 1; 
  isVisibleDetails:Boolean= true;
  selectedOption:string ="1";
  amountInvolved: number | null = null; 
  penaltyInterestPaid: number | null = null; 
  selectedFiles: File[] = [];
  NumberOfAttachments : any;
  maxSizeInMB: number = 5;   // Default value
  errorMessages: string[] = [];
  isMandatory : boolean = false;
  nature_of_attachment: string = ''; 
  displayedColumns: string[] = ['fileName', 'nature_of_attachment', 'actions']; 
  UpdateComplianceForm : any;
  Useridvalue:any;
 //attachments: Array<{ file: File | null, nature: string }> = []; // Array to hold attachments
 //attachmentsMap: { [key: number]: { file: File, nature: string }[] } = {};
 attachments: { file: File; nature_of_attachment: string }[] = []; 
 maxAttachments: number = 0;
  //actualCompliedDueDate: Date | null = new Date('dd/MM/yyyy');
  actualCompliedDueDate: any;
  tempCompliedDueDate: Date | null = new Date('dd/MM/yyyy');
  selectedCompliance: any; 

  maxDate: Date = new Date(); 
  updationRemarks:string='';
  @ViewChild('fileInput') fileInput!: ElementRef; 
  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: ActivatedRoute, private location: Location,private complianceDataService: EComplianceDataService, private cdRef: ChangeDetectorRef, private http: HttpClient) 
  { 
    this.maxDate = new Date();  
       const storedData: any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
    const Userid = parsedData ? parsedData.profile.userid : null;
    console.log('User id:', Userid);
    this.Useridvalue = Userid;
  }
  ngOnInit(): void {
        this.originalData = this.complianceDataService.getUpdateMappingComplianceData();
        this.totalCompliance = this.originalData.length;

        this.updatePaginatedData();
        this.onStatusChange();

        // Select the largest attachment number from the compliance list
        this.maxAttachments = this.originalData.reduce((max, compliance) => {
          return Math.max(max, compliance.no_of_Attachements || 0);
        }, 0);

        this.isMandatory = this.originalData.some(compliance => compliance.mandatory === true);
        // Select the first compliance on load
        this.selectCompliance(this.originalData[0]);

  }

  updatePaginatedData() {
    this.paginatedData = this.originalData.slice(this.currentIndex * this.itemsPerPage, (this.currentIndex + 1) * this.itemsPerPage);
    this.selectCompliance(this.paginatedData[0]); // Set selected compliance when data updates
  }

  selectCompliance(compliance: any) {
   // alert(JSON.stringify(compliance))
    this.selectedCompliance = compliance;
    this.NumberOfAttachments = compliance.no_of_Attachements || []; // Initialize attachments
   // this.maxAttachments = compliance.no_of_Attachements || 0; // Update max attachments
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
  onFileSelected(event: any) {
    //this.selectedFiles = [];
      const newFiles: FileList = event.target.files;
   /// this.errorMessages = []; // Reset error messages
  
    // Calculate how many new files can be added based on the current length of selectedFiles
    const allowedNewFiles = this.maxAttachments - this.selectedFiles.length;
  
    // If the user selects more new files than the allowed amount, show an error
    if (newFiles.length > allowedNewFiles) {
      this.errorMessages.push(`You can only upload ${this.maxAttachments}  files.`);
      return;
    }
  
    // Check each new file before adding it to the array
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
  
      // Check the file size against the limit
      //if (file.size > this.maxSizeInMB * 1024 * 1024) {
       // this.errorMessages.push(`The file ${file.name} exceeds the size limit of ${this.maxSizeInMB}MB.`);
        // Optionally, you can stop the loop here if you don't want to add any files upon a single failure
        // return;
     // } else {
        if (this.selectedFiles.length < this.maxAttachments) {
          this.selectedFiles.push(file);
        } else {
          this.errorMessages.push(`You cannot upload more than ${this.maxAttachments} files.`);
          break; // Stop checking more files as we've reached the limit
        }
      //}
    }
    const files: FileList | null = event.target?.files;
  
    // Add only new files to selectedFiles
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file && !this.isFileAlreadySelected(file.name)) {
          this.selectedFiles.push(file);
        }
      }
    }
  }

  isFileAlreadySelected(fileName: string): boolean {
    return this.selectedFiles.some(selectedFile => selectedFile.name === fileName);
  }
  
  onAttach() {
    if (this.selectedFiles.length) {
      // Attach each selected file with or without nature_of_attachment
      this.selectedFiles.forEach(file => {
        this.attachments = [
          ...this.attachments,
          {
            file,
            nature_of_attachment: this.nature_of_attachment || 'N/A' // Set to 'N/A' if not provided
          }
        ];
      });
  
      // Clear selected files and reset form
      this.selectedFiles = [];
      this.nature_of_attachment = ''; 
      this.fileInput.nativeElement.value = ''; 
      this.cdRef.detectChanges(); 
    }
  }
  
  
  removeAttachment1(attachment: { file: File; nature_of_attachment: string }) {
    const index = this.attachments.indexOf(attachment);
    if (index >= 0) {
      this.attachments.splice(index, 1); 
      //this.updateTable(); 
      this.cdRef.detectChanges(); 
    }
  }
  removeAttachment(attachmentToRemove: { file: File; nature_of_attachment: string }) {
  
    // Create a new array without the removed attachment
    this.attachments = this.attachments.filter(attachment => attachment !== attachmentToRemove);
  
    this.cdRef.detectChanges(); // Ensure UI updates
  }
  
  updatePaginatedData1(): void {
    this.paginatedData = this.originalData.slice(this.currentIndex, this.currentIndex + 1);
    this.maxAttachments = this.paginatedData[0]?.no_of_Attachements || 0; // Set max attachments for the current compliance item
    if (this.selectedOption === '2') {

      this.actualCompliedDueDate = this.paginatedData[0]?.dueDate;
    } 
    this.tempCompliedDueDate = this.paginatedData[0]?.dueDate;
    // In case status is anything else, don't reset the date to null
    // if (this.selectedOption === '1') {
    //   this.actualCompliedDueDate = this.actualCompliedDueDate ? this.actualCompliedDueDate : null; // Keep existing date if set
    // }
    this.selectedFiles = []; // Clear selected file
    this.nature_of_attachment = ''; // Clear nature input
  }
  onPrevious1() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePaginatedData();
      this.onStatusChange()
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('UCcomplianceData');
    // Remove other specific items as needed
  }
  // onRemove() {
  //   const currentCompliance = this.paginatedData[0]; // Current compliance item
  
  //   // Remove the current compliance item from originalData
  //   this.originalData = this.originalData.filter(item => item.complianceID !== currentCompliance.complianceID); // Assuming 'id' is the unique identifier
  //   this.totalCompliance = this.originalData.length; // Update total compliance count
    
  //   // Update pagination after removal
  //   if (this.currentIndex >= this.totalCompliance) {
  //     this.currentIndex = this.totalCompliance - 1; // Prevent going out of bounds
  //   }
  
  //   this.updatePaginatedData(); // Refresh displayed items
  
  //   // Optional: Provide feedback to the user
  //   alert(`Compliance item ${currentCompliance.complianceID} has been removed.`);
  // }
  onUpdate() {
    
    if (this.selectedOption === '2' && !this.updationRemarks) {
      alert('Remarks are mandatory.');
      return; 
    }
  
    if (this.isMandatory && (this.maxAttachments - this.attachments.length !== 0)) {
      const moreCompliance = this.maxAttachments - this.attachments.length;
      alert(`Please upload more ${moreCompliance} attachments.`);
      return; 
    }
const formData = new FormData();
// Append compliance details for each compliance entry
this.originalData.forEach((compliance, index) => {
  formData.append(`updateComplianceModels[${index}].compliance_id`, compliance.complianceID.toString());
  formData.append(`updateComplianceModels[${index}].auditWorkflow`, compliance.auditWorkflow.toString());
  formData.append(`updateComplianceModels[${index}].authWorkflow`, compliance.authWorkflow.toString());
  formData.append(`updateComplianceModels[${index}].review_Workflow`, compliance.review_Workflow.toString());
  formData.append(`updateComplianceModels[${index}].approve_Workflow`, compliance.approve_Workflow.toString());
  formData.append(`updateComplianceModels[${index}].applicability_status`, this.selectedOption);

  // Handle actual_complied_date as shown previously
  // if (this.selectedOption === '1') {
  //   formData.append(`updateComplianceModels[${index}].actual_complied_date`, new Date(this.actualCompliedDueDate).toString());
  // } else {
  //   formData.append(`updateComplianceModels[${index}].actual_complied_date`, '');
  // }
  if (this.selectedOption === '1') {
    if (this.actualCompliedDueDate) {
      // Append the valid Date object
      const formattedDate = new Date(this.actualCompliedDueDate); // Create Date object
      formData.append(`updateComplianceModels[${index}].actual_complied_date`, formattedDate.toISOString().split('T')[0]); // Send only date part
    } else {
      // If actualCompliedDueDate is null, send a zero-equivalent date
      formData.append(`updateComplianceModels[${index}].actual_complied_date`, new Date(0).toISOString().split('T')[0]); // '1970-01-01'
    }
  } else {
    formData.append(`updateComplianceModels[${index}].actual_complied_date`, new Date(0).toISOString().split('T')[0]);
  }
  
  
  // Convert amount_paid and penalty_paid to strings or set as empty string if null
  formData.append(`updateComplianceModels[${index}].amount_paid`, this.selectedOption === '1' ? (this.amountInvolved?.toString() || '') : '');
  formData.append(`updateComplianceModels[${index}].penalty_paid`, this.selectedOption === '1' ? (this.penaltyInterestPaid?.toString() || '') : '');
  
  formData.append(`updateComplianceModels[${index}].updation_remarks`, this.updationRemarks || '');
  formData.append(`updateComplianceModels[${index}].due_date`, new Date(compliance.dueDate).toISOString());
  formData.append('created_by', this.Useridvalue);

  // Append each attachment for this compliance entry
  if (compliance.no_of_Attachements > 0 && this.attachments.length > 0) {
    this.attachments.forEach((attachment, attachmentIndex) => {
      formData.append(`updateComplianceModels[${index}].attachments[${attachmentIndex}].file`, attachment.file);
      formData.append(`updateComplianceModels[${index}].attachments[${attachmentIndex}].nature_of_attachment`, attachment.nature_of_attachment);
      //console.log('Attachment added:', attachment.file.name);
    });
  }
});
alert(formData)
this.http.post(`${URL}/UpdateComplianceController/UpdateComplianceDetails`, formData)
// .subscribe(
//   (response) => {
//     alert('Compliance updated successfully!');
    
//     this.selectedFiles = [];
//     this.nature_of_attachment = '';
//     this.fileInput.nativeElement.value = ''; 
//     this.onCancel();
//   },
//   (error) => {
//     alert('Failed to update compliance. Please try again.');
//   }
// );
.subscribe(
  (response: any) => {
    alert(response)
    this.dialog.open(DaidailogeComponent, {
      data: { message: response.message }
    });
    this.selectedFiles = [];
    this.nature_of_attachment = '';
    this.fileInput.nativeElement.value = ''; 
    this.location.back();
  },
  (error) => {
    this.dialog.open(DaidailogeComponent, {
      data: { message: 'Error in saving data' }
    });
  }
);
  }
  
  
  validateDate(selectedDate: Date) {
    if (this.selectedOption === '1' && selectedDate > this.maxDate) {
      this.actualCompliedDueDate = null; 
      alert("Actual Compliance Date cannot be greater than today's date.");
    }
  }

  onCancel() {
      this.location.back();
  }

  onStatusChange() {
    // const today = new Date();
    // today.setHours(0, 0, 0, 0); // Reset time to start of the day
    
    // let dueDate = this.paginatedData[0]?.dueDate ? new Date(this.paginatedData[0].dueDate) : today;
    // if (this.actualCompliedDueDate) {
    //   dueDate = new Date(this.actualCompliedDueDate);
    // }
  
    // if (this.selectedOption === '2') {
    //   alert("due date"+ dueDate)
    //   if (today < dueDate) {
    //     alert("today"+ today)
    //     this.actualCompliedDueDate = today;  
    //   }
    //    else {
    //     alert("due "+ JSON.stringify(dueDate))
    //     this.actualCompliedDueDate = dueDate; 
    //   }
    // } 
    // In case status is anything else, don't reset the date to null
    if (this.selectedOption === '2') {
    this.amountInvolved = null;
    this.penaltyInterestPaid = null;
    this.actualCompliedDueDate = null;
    }
    if (this.selectedOption === '1') {
      this.actualCompliedDueDate = this.actualCompliedDueDate ? this.actualCompliedDueDate : null; // Keep existing date if set
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
