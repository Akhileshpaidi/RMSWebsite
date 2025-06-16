import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import CustomStore from 'devextreme/data/custom_store';
const URL = BASE_URL;
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

export type DialogDataSubmitCallback<T> = (row: T) => void;

@Component({
  selector: 'app-user-pass-reset',
  templateUrl: './user-pass-reset.component.html',
  styleUrls: ['./user-pass-reset.component.scss'],
})
export class UserPassResetComponent implements OnInit {
  submitted = false;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  sessionData: any;
  erroMessage: any;
  successMessage: any;
  hide = true;
  Password = new FormControl(null, [
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
      newPassword: this.Password,
      confirmPassword: this.confirmPassword,
    },
    {
     // validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public id: { callback: DialogDataSubmitCallback<any>; defaultValue: any }
  ) {}

  // constructor(
  //   @Inject(MAT_DIALOG_DATA)
  //   public data: { callback: DialogDataSubmitCallback<any>; defaultValue: any },
  //   private dialogRef: MatDialogRef<DialogComponent>
  // ) {}

  ngOnInit() {
    // this.userid = this.id.defaultValue;
   console.log(this.id.defaultValue, 'user id');
  }

  forgotPass(data: any): void {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    console.log(this.sessionData);
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'P',
      USR_ID: this.id.defaultValue,
      password: this.encrypt.encryptionAES(data.newPassword),
    };

    console.log('payload', payload);
//alert(JSON.stringify(payload))
    // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api


    this.http.put(URL + '/updateuserDetails/UpdatecreateuserpasswordDetails/', payload,{headers })
    .subscribe({
        next: (response: any) => {
          console.log(response, 'response');
          
            this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
            });
            this.dialogRef.close();
            this.router.navigate(['/dashboard/user']);
          
         
        },
        error: (error: any) => {
          console.error('Error updating status:', error);
        }
      });
    // this.user.CRUDUser(encryptedPayload).subscribe((response: any) => {
    //   console.log('response', response);
    //   if (response.ResponseCode == '0') {
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    //     this.dialogRef.close();
    //     this.router.navigate(['/dashboard/user']);
    //   } else {
    //     this.erroMessage = response.ResponseDesc;
    //   }
    // });
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
