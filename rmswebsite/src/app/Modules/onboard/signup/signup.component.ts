import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { OnboardService } from 'src/app/core/services/onboard/onboard.service';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-sugnup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  pipe = new DatePipe('en-US');
  submitted = false;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  sessionData: any;
  erroMessage: any;
  successMessage: any;
  hide = true;
  hide1 = true;

  termsChecked = false;

  constructor(
    private authService: AuthService,
    private signingUp: OnboardService,
    private router: Router,
    private encrypt: EncryptionService,
    private formBuilder: FormBuilder,
    private session: SessionService,
    public dialog: MatDialog

  ) {}

  ngOnInit(): void {}

  password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
    Validators.required,
  ]);
  cpassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
    Validators.required,
  ]);

  mail = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/    ),
    Validators.required,
  ]);


  signUpform = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employer: ['', Validators.required],
      employeeId: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      email: this.mail,
      dob: ['', Validators.required],
      TC: [false, Validators.requiredTrue],
      password: this.password,
      cpassword: this.cpassword,
    },
    {
      validator: this.ConfirmedValidator('password', 'cpassword'),
    }
  );

  signUp(data: any) {
    // stop here if form is invalid
    console.log(data);
    // Check if the form is valid
    if (this.signUpform.invalid) {
      this.showInvalidFieldsAlert();
      return;
    }

    let payload = {
      firstname: data.firstName,
      lastname: data.lastName,
      company: data.employer,
      employeeid: data.employeeId,
      city: data.city,
      state: data.state,
      country: data.country,
      email: data.email,
      password: data.password,
      dob: this.pipe.transform(data.dob, 'dd/MM/yyyy'),
    };
    console.log('Sign-Up Payload', payload);
    //encryting payload
    let requestPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    this.signingUp.signUp(requestPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: {  message: response.ResponseDesc }
        });
        this.router.navigate(['/login']);
      } else {
      this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: {  message: response.ResponseDesc }
      });
      }
    });
  }

  showInvalidFieldsAlert() {
    if (this.signUpform.valid) {
      // submit form
    } else {
      let invalidFields = '';
      if (
        this.signUpform.controls['password'].value !==
        this.signUpform.controls['cpassword'].value
      ) {
        invalidFields += '- Passwords do not match\n';
      }

      if (this.signUpform.controls['firstName'].invalid) {
        invalidFields += '- First Name\n';
      }

      if (this.signUpform.controls['lastName'].invalid) {
        invalidFields += '- Last Name\n';
      }

      if (this.signUpform.controls['email'].invalid) {
        invalidFields += '- Email\n';
      }

      if (this.signUpform.controls['TC'].invalid) {
        invalidFields += '- Terms and Conditions\n';
      }

      if (this.signUpform.controls['employer'].invalid) {
        invalidFields += '- Employer\n';
      }

      if (this.signUpform.controls['employeeId'].invalid) {
        invalidFields += '- Employee ID\n';
      }

      if (this.signUpform.controls['city'].invalid) {
        invalidFields += '- City\n';
      }

      if (this.signUpform.controls['state'].invalid) {
        invalidFields += '- State\n';
      }

      if (this.signUpform.controls['country'].invalid) {
        invalidFields += '- Country\n';
      }

      if (this.signUpform.controls['dob'].invalid) {
        invalidFields += '- Date of Birth\n';
      }

      if (invalidFields) {
          this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {  message: `Please provide valid information for the following fields:\n${invalidFields}` }
        });
      }
    }
  }

  home() {
    this.router.navigate(['/']);
  }

  TC() {
    this.router.navigate(['/T&Cpage']);
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
