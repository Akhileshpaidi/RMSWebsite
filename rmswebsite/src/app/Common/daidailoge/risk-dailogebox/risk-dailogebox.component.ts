import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-risk-dailogebox',
  templateUrl: './risk-dailogebox.component.html',
  styleUrls: ['./risk-dailogebox.component.scss']
})
export class RiskDailogeboxComponent {
  constructor(
    public dialogRef: MatDialogRef<RiskDailogeboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
