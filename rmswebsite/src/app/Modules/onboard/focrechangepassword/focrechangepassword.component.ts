import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { OnboardService } from 'src/app/core/services/onboard/onboard.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-focrechangepassword',
  templateUrl: './focrechangepassword.component.html',
  styleUrls: ['./focrechangepassword.component.scss']
})
export class FocrechangepasswordComponent {
  ForgotPasswordMailForm!: FormGroup;
  ForgotPasswordMailForm1!: FormGroup;
  ForgotPasswordMailForm2! :FormGroup;
  step: 'email' | 'token' | 'newPassword' | 'done' = 'newPassword';
  forgotPassword: boolean = false;
  checkEmail: boolean = false;
  setNewPassword: boolean = true;
  passwordReset: boolean = false;
  erroMessage: any;
  user_id:any;
  hide = true;
  hide1 = true;
  data: any = [];
  userdata:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
   
    private session: SessionService,
    private encrypt: EncryptionService,
    private forgotPasswordService: OnboardService
  ) {    let user1: any = this.session.getUser();
    
    this.userdata = JSON.parse(user1);
   // console.log("userid", this.userdata.profile.userid);
  
  }
  ngOnInit(): void {
    let user: any = this.session.getUser();
    this.data = JSON.parse(user);
    const userId = this.data.profile.userid;
    this.user_id = userId;
    //alert(JSON.stringify(this.user_id ))
  //  console.log(this.userdata.profile.userid);
    this.ForgotPasswordMailForm2 = this.formBuilder.group({
     
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check password match
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  resetPassword() {
  
    if (this.ForgotPasswordMailForm2.invalid) {
      alert("Please make sure password must contain at least one number, one uppercase,one special character, a lowercase letter and at least 8 characters")
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
      USR_ID: this.user_id ,
      password: encryptedPassword.requestdata,
      //emailid: email,
     // Token: token,
    };
 // alert(JSON.stringify(payload))
    const encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
  
    this.forgotPasswordService.ForcePasswordReset(payload).subscribe(
      (response: any) => {
        if (response.responseCode === '1') {
       //   this.userId = response.UserId;  
          this.step = 'done';
          console.log('Step updated to:', this.step);
        } else {
          this.erroMessage = response.responseDesc;
          this.ForgotPasswordMailForm.setErrors({ unauthenticated: true });
        }
      },
    
    );
  }

  passwordResetSuccess() {
    this.session.cleanSesssion();
    
    this.router.navigate(['/']);
  }
  passwordResetSuccess1() {
    this.session.cleanSesssion();
    
    this.router.navigate(['/']);
  }


  back() {
    this.router.navigate(['/']);
  }
}
