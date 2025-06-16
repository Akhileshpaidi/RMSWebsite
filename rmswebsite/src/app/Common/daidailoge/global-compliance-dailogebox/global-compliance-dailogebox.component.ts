import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-global-compliance-dailogebox',
  templateUrl: './global-compliance-dailogebox.component.html',
  styleUrls: ['./global-compliance-dailogebox.component.scss']
})
export class GlobalComplianceDailogeboxComponent {
  constructor(
    public dialogRef: MatDialogRef<GlobalComplianceDailogeboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
