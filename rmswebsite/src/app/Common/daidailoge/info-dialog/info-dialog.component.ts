import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  complianceStageColors: { [key: string]: string } = {
    'Due': 'rgb(157, 191, 241)',
    'Due(RPA)': 'rgb(240, 192, 62)',
    'Overdue': 'rgb(235, 144, 91)',
    'Overdue(RPA)': 'rgb(199, 191, 191)',
    'Remediation In Progress': 'rgb(128, 125, 125)',
    'Review Due': 'rgb(157, 191, 241)',
    'Review Overdue': 'rgb(235, 144, 91)',
    'Extension Applied': 'rgb(157, 191, 241)',
    'Remediation Applied': 'rgb(235, 144, 91)',
    'Approval Due': 'rgb(157, 191, 241)',
    'Approval Overdue': 'rgb(235, 144, 91)',
    'Audit Due': 'rgb(157, 191, 241)',
    'Audit Overdue': 'rgb(235, 144, 91)'
    
  };

  // Method to get color based on compliance stage
  getComplianceStageColor(stage: string): string {
    return this.complianceStageColors[stage] || 'transparent'; // Fallback to transparent if not found
  }

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, complianceStage: string }
  ) {}
  
  // Method to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}
