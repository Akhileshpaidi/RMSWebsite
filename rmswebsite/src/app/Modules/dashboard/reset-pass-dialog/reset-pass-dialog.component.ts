import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClientModule } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';
const URL = BASE_URL;
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Component({
  selector: 'app-reset-pass-dialog',
  templateUrl: './reset-pass-dialog.component.html',
  styleUrls: ['./reset-pass-dialog.component.scss'],
})
export class ResetPassDialogComponent {
  submitted = false;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  sessionData: any;
  erroMessage: any;
  successMessage: any;
  hide = true;
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  resetPasswordForm = this.formBuilder.group(
    {
      currentPassword: '',
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );
  

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<ResetPassDialogComponent>,
    public dialog: MatDialog

  ) {}

  forgotPass(data: any): void {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
   //alert(this.sessionData.profile.userid);
console.log(this.sessionData);
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    let payload = {
      userid: this.sessionData.profile.userid,
      tpauserid:this.sessionData.profile.tpauserid,
      OldPassword: data.currentPassword,
      NewPassword: data.newPassword,
    };

    console.log('currentPassword', payload);
    
    console.log('Payload sent to API:', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.http.post(URL + '/updateuserDetails/UpdatecurrentuserpasswordDetails/', encryptedPayload,{headers })
    .subscribe({
        next: (response: any) => {
          console.log(response, 'response');
          if (response.responseCode  === '0') {
            this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {  message: response.responseDesc }
        });
        this.dialogRef.close();

      } else this.erroMessage = response.responseDesc;          
     }
    });
    // this.user.resetPassword(encryptedPayload).subscribe((response: any) => {
    //   console.log('response', response);

    //   if (response.ResponseCode === '0') {
    //         this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: {  message: response.ResponseDesc }
    //     });
    //     this.dialogRef.close();

    //   } else this.erroMessage = response.ResponseDesc;
    // });
  }
  reloadComponent() {
    throw new Error('Method not implemented.');
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
