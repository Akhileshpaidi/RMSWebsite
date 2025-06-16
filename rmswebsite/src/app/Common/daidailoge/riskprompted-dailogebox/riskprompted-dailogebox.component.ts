import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-riskprompted-dailogebox',
  templateUrl: './riskprompted-dailogebox.component.html',
  styleUrls: ['./riskprompted-dailogebox.component.scss']
})
export class RiskpromptedDailogeboxComponent {
  constructor(
    public dialogRef: MatDialogRef<RiskpromptedDailogeboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm(isYes: boolean): void {
    this.dialogRef.close(isYes);
  }

}
