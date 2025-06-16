import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { OnboardService } from 'src/app/core/services/onboard/onboard.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  ForgotPasswordMailForm!: FormGroup;
  ForgotPasswordMailForm1!: FormGroup;
  ForgotPasswordMailForm2! :FormGroup;
  step: 'email' | 'token' | 'newPassword' | 'done' = 'email';
  forgotPassword: boolean = true;
  checkEmail: boolean = false;
  setNewPassword: boolean = false;
  passwordReset: boolean = false;
  erroMessage: any;
  userId:any;
  showError: boolean = false;
  hide = true;
  hideconform = true;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private encrypt: EncryptionService,
    private forgotPasswordService: OnboardService
  ) {}

  ngOnInit(): void {
    this.ForgotPasswordMailForm = this.formBuilder.group({
      email: ['', Validators.required],
      verfiytoken: [''],
      password: [''],
      confirmPassword: [''],
    });
    //
    this.ForgotPasswordMailForm1 = this.formBuilder.group({
      //email: ['', Validators.required],
      verfiytoken: [''],
      //password: [''],
      //confirmPassword: [''],
    });
    this.ForgotPasswordMailForm2 = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  sendEmail(data: any) {
    if (!data.email || data.email.trim() === '') {
      this.showError = true;
      this.erroMessage = "User ID is required.";
    } else {
      this.showError = false;
      // Proceed with sending email
    
    // stop here if form is invalid
    if (this.ForgotPasswordMailForm.invalid) {
      return;
    }
    // Payload
    let payload = {
      USR_LOGIN: data.email,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

  //  console.log('payload', payload);
   /// console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.forgotPasswordService
      .ForgotPasswordMail(payload)
      .subscribe({
next: (response: any) =>{
  if(response.responseCode ==='1'){
    this.showError = false;
    this.step = 'token';
  }
  else{
    this.showError = true;
    this.erroMessage = response.responseDesc;
    this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
  }
},
  error: (error:HttpErrorResponse) => {
    if(error.error && error.error.responseDesc){
      this.erroMessage = error.error.responseDesc;
    }
    else{
      this.erroMessage = 'Something went wrong. Please try again.';
    }
    this.ForgotPasswordMailForm.setErrors({ httpError: true });
  }
  });
}



//         console.log('response', response);
//           alert(JSON.stringify(response));
//         // if (response.ResponseCode === '0') {
//         //   this.forgotPassword = false;
//         //   this.checkEmail = true;
//         //   this.setNewPassword = false;
//         //   this.passwordReset = false;
//         //   this.erroMessage = response.ResponseDesc;
//         //   this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
//         // } else {
//         //   this.forgotPassword = true;
//         //   this.checkEmail = false;
//         //   this.setNewPassword = false;
//         //   this.passwordReset = false;
//         //   this.erroMessage = response.ResponseDesc;
//         //   console.log('erroMessage', this.erroMessage);
//         //   this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
//         // }
//         if (response.responseCode === '1') {

//           this.step = 'token';
//         //  console.log('Step updated to:', this.step);
//         } else {
//           this.showError = true;
//           alert(JSON.stringify(response));
//           this.erroMessage = response.responseDesc;
//           this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
//         }
//       //  console.log('Current step:', this.step);
//       });
//   }
}

  verifyToken() {
  //  const email = this.ForgotPasswordMailForm.get('email')?.value;
   const token = this.ForgotPasswordMailForm1.get('verfiytoken')?.value;
  
    if (this.ForgotPasswordMailForm1.invalid) {
      this.showError = true;
      this.erroMessage = 'Token is required';
      return;
    }
  
    const payload = {
      //emailid: email,
      Token: token,
    };
 // alert(JSON.stringify(payload))
    const encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
  
    this.forgotPasswordService.verifyToken(payload).subscribe(
      (response: any) => {
        //console.log('Full response:', response);
        if (response.responseCode === '1') {
          
          this.showError = true;
          this.userId = response.responseData;
          this.step = 'newPassword';
          //console.log('Token verified, userId:', this.userId);
          
        } else {
          this.showError = true;
          this.erroMessage = response.responseDesc;
          this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
        }
      },
    
    );
  }
  

  resetPassword() {
    if (this.ForgotPasswordMailForm2.invalid) {
      //this.showError = true;
      alert("Please make sure password must contain at least one number, one uppercase,one special character, a lowercase letter and at least 8 characters")
      //this.erroMessage = 'Please Enter Password must contain at least one number, one uppercase,one special character, a lowercase letter and at least 8 characters';
       return;
    }
    const password = this.ForgotPasswordMailForm2.get('password')?.value;
    const confirmPassword = this.ForgotPasswordMailForm2.get('confirmPassword')?.value;
    if(password !== confirmPassword)
      {
        alert('Password dont match')
        return;
      }
      let encryptedPassword = {
        requestdata: this.encrypt.encryptionAES(password),
      };
      
   
  
    const payload = {
      USR_ID: parseInt (this.userId),
      password: encryptedPassword.requestdata,
      //emailid: email,
     // Token: token,
    };
 /// alert(JSON.stringify(payload))
    const encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
  
    this.forgotPasswordService.ForgotPasswordReset(payload).subscribe(
      (response: any) => {
        if (response.responseCode === '1') {
       //   this.userId = response.UserId;  
          this.step = 'done';
          console.log('Step updated to:', this.step);
        } else {
          this.showError = true;
          this.erroMessage = response.responseDesc;
          this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
        }
      },
    
    );
  }

  passwordResetSuccess() {
    this.router.navigate(['login']);
  }

  back() {
    this.router.navigate(['/']);
  }
}
