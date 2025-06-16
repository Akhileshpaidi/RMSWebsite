import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent {
  enteredOtp: string = '';
  countdown: number = 60; // Time limit in seconds
  correctOtp: string = '';

  constructor(
    public dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Start the countdown when the dialog is opened
    this.correctOtp = data.correctOtp;
    this.startCountdown();
  }

  validateOtp() {
    // Perform OTP validation logic here
    if (this.enteredOtp === this.data.correctOtp) {
      this.dialogRef.close(true); // Close the dialog with a success flag
    } else {
      //alert('Entered OTP Is Incorrect\n' + this.data.correctOtp)
    }
  }
  close() {
    // Perform OTP validation logic here
      this.dialogRef.close("close"); 
  }

  private startCountdown() {
    const timer = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(timer);
        this.dialogRef.close(false); // Close the dialog with a failure flag (timeout)
      }
    }, 5000);
  }

}
