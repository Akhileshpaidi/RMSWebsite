import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-moreor-submit-compliance',
  templateUrl: './add-moreor-submit-compliance.component.html',
  styleUrls: ['./add-moreor-submit-compliance.component.scss']
})
export class AddMoreorSubmitComplianceComponent {

  constructor(
     public dialogRef: MatDialogRef<AddMoreorSubmitComplianceComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:any){}


  onSubmit(): void {
    this.dialogRef.close(true);
  }

  onAddMore(): void {
    this.dialogRef.close(false);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
