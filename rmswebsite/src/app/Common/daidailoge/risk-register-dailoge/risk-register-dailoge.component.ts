import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RiskpromptedDailogeboxComponent } from '../riskprompted-dailogebox/riskprompted-dailogebox.component';
import { RiskCreateriskDocumentComponent } from 'src/app/risk-createrisk-document/risk-createrisk-document.component';
import { Router } from '@angular/router';
import { StepperService } from 'src/app/Common/daidailoge/stepper.service';
@Component({
  selector: 'app-risk-register-dailoge',
  templateUrl: './risk-register-dailoge.component.html',
  styleUrls: ['./risk-register-dailoge.component.scss']
})
export class RiskRegisterDailogeComponent {
  constructor(
    public dialogRef: MatDialogRef<RiskRegisterDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router,    private stepperService: StepperService
  ) {}


 onSubmit(): void {
   this.dialogRef.close(true);
 }

 onAddMore(): void {
  
   this.dialogRef.close(false);
 }

 onClose(): void {
  this.openConfirmationDialog();
 }
 openConfirmationDialog(): void {
  const dialogRef = this.dialog.open(RiskpromptedDailogeboxComponent, {
    width: '500px',
    data: { message: 'Select YES to complete the Risk Document/Register, or NO to add more Risk Statements.' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.navigateToRiskCreateDocument(); // Navigate to the stepper if "Yes"
    } else {
      this.onAddMore(); // Handle adding more risk statements
    }
  });
}

navigateToRiskCreateDocument(): void {
  this.dialogRef.close(); // Close the first dialog
  this.stepperService.showStepper(); // Show the stepper
  this.router.navigate(['/risk-createrisk-document']); // Navigate to the stepper
}
} 
