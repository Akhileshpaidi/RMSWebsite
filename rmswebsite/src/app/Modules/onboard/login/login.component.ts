import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { OnboardService } from 'src/app/core/services/onboard/onboard.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  roleType: any;
  selected: any;
  submitted = false;
  loading = false;
  returnUrl: string | undefined;
  hide = true;
  erroMessage: String = '';
  showOtpSection = true; // Initially false
  timer: any;
  otpArray: string[] = ['', '', '', '', '', ''];  // Assuming a 6-digit OTP
  otpDigits = [0, 1, 2, 3, 4, 5];  // Corresponding to 6 OTP input fields
  
  otpForm!: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  invalid: boolean = false;
  countdown: number = 0;
  countdownInterval: any;
  otpExpiryCountdown: number = 0;
  otpExpiryInterval: any;

  otpVerificationStatus: string | null = null;

  constructor(
    private authService: AuthService,
    private loginService: OnboardService,
    private router: Router,
    private encrypt: EncryptionService,
    private formBuilder: FormBuilder,
    private session: SessionService,
    public dialog: MatDialog

  ) {
    //this.getMetaData();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: [''] // optional initially
     // roleType: this.selected,
    });

    if (this.session.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;
  
    // Allow only digits (numeric input validation)
    if (!/^\d$/.test(value)) {
      input.value = ''; // Clear the invalid input
      this.otpArray[index] = ''; // Reset the array value
      return;
    }
    this.otpArray[index] = value;

    // If the current input is valid and we are not at the last box
    if (index < this.otpDigits.length - 1 && value) {
      // Focus the next input element
      const nextInput = input.parentElement.children[index + 1];
      if (nextInput) {
        (nextInput as HTMLElement).focus();
      }
    }
  
    this.updateOtpFormControl();
  }
  
  onOtpBackspace(event: any, index: number) {
    const input = event.target as HTMLInputElement;
  
    // If the current input has a value, delete it
    if (this.otpArray[index] !== '') {
      this.otpArray[index] = ''; // Clear the value in the array
      input.value = ''; // Clear the input field
      this.updateOtpFormControl();
      return;
    }
  
    // If we are at the first input box and it's empty, do nothing
    if (index === 0) {
      return;
    }
  
    // If the current input is empty and we're not at the first input, move focus to the previous input
    if (this.otpArray[index] === '' && index > 0) {
      const previousInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLElement;
      if (previousInput) {
        previousInput.focus();
      }
    }
  
    this.updateOtpFormControl();
  }
  

  updateOtpFormControl() {
    const otp = this.otpArray.join('');
    this.loginForm.get('otp')?.setValue(otp);
  }
  
  


// Send OTP after successful login
sendOtp(): void {
  const userData = this.loginForm.value;

  if (!userData.username || !userData.password) {
    alert('Please enter both User ID and Password.');
    return;
  }

  const payload = {
    USR_LOGIN: userData.username,
    Password: userData.password,
    device: 'Web'
  };

  this.loginService.sendOtp(payload).subscribe(
    (response: any) => {
      if (response && response.responseCode) {
        if (response.responseCode === "1") {
          this.otpSent = true;
          this.invalid = false;
          this.otpVerified = false; // reset on new OTP
          this.startCountdown(60); // 5 minutes

          const expiryTime = new Date(response.responseTime);
          //alert(expiryTime)
          this.startOtpExpiryCountdown(expiryTime);
          alert('OTP has been sent successfully to registered EmailId.');

          const decryptedData = this.encrypt.decryptionAES(response.responseData);// In your component:
          this.session.saveTempUser(decryptedData);
          this.otpVerificationStatus = null;
        } else {
          this.invalid = true;
          //alert('Invalid UserId and Password.');
        }
      } else {
        alert('No responseCode found in server response.');
        this.otpVerificationStatus = 'error';
      }
    },
    (error) => {
      console.error('HTTP Error:', error);
      alert('Server error');
      this.otpVerificationStatus = 'error';
    }
  );
}


verifyOtp(): void {
  const otp = this.loginForm.get('otp')?.value;
  //alert(JSON.stringify(otp))
  const userStr = this.session.getTempUser();
  const userObj = userStr ? JSON.parse(userStr) : null;
  if (!otp) {
    alert('Please enter OTP send to your mail.');
    return;
  }
  
  if (!userObj || !userObj.userId) {
    alert('User information missing. Please request OTP again.');
    return;
  }
  const payload = {
    otp: otp,
    userId: userObj.userId
  };
  
  this.loginService.verifyOtp(payload).subscribe((res: any) => {
   // console.log('Response from API:', res);

    if (res.responseCode === '1') {
      //alert('OTP verified successfully!');
      this.otpVerified = true;
      this.otpSent = false;
      clearInterval(this.timer);
      this.countdown = 0;
      //this.session.saveUser(userStr);
      //this.router.navigate(['dashboard']);
    } else {
      this.otpVerified = false;
      alert('Invalid or expired OTP.');
    }
  }, error => {
    alert('Error verifying OTP.');
  });
}

resendOtp1(): void {

  if (this.countdown === 0 && !this.otpVerified) {
    this.sendOtp(); // same logic as original send
    this.otpArray = Array(6).fill('');
    this.updateOtpFormControl();
    setTimeout(() => {
      const firstInput = document.getElementById('otp-0') as HTMLElement;
      if (firstInput) firstInput.focus();
    });
  }
}
resendOtp(): void {
  if (this.countdown === 0 && !this.otpVerified) {
    this.sendOtp(); // Resend OTP logic
    this.otpArray = Array(6).fill('');
    this.updateOtpFormControl();

    // Clear all input fields
    const inputs = document.querySelectorAll('.otp-input') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.value = '');

    // Focus the first input
    setTimeout(() => {
      const firstInput = document.getElementById('otp-0') as HTMLElement;
      if (firstInput) firstInput.focus();
    });
  }
}

startCountdown(seconds: number): void {
  this.countdown = seconds;
  if (this.timer) clearInterval(this.timer);

  this.timer = setInterval(() => {
    this.countdown--;
    if (this.countdown <= 0) {
      clearInterval(this.timer);
    }
  }, 1000);
}
startOtpExpiryCountdown(expiryTime: Date) {
  if (this.otpExpiryInterval) {
    clearInterval(this.otpExpiryInterval);
  }

  const expiryTimestamp = new Date(expiryTime).getTime();

  this.otpExpiryInterval = setInterval(() => {
    const now = new Date().getTime();
    const secondsLeft = Math.floor((expiryTimestamp - now) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(this.otpExpiryInterval);
      this.otpExpiryCountdown = 0;
      // Optional: Handle OTP expiration (e.g., notify user)
    } else {
      this.otpExpiryCountdown = secondsLeft;
    }
  }, 1000);
}



  login(data: any) {

    // console.log('roleType', data.options.key);
    // let type = Number(data.roleType);
    // console.log('type', type);
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // console.log('data', data);

    let payload = {
      // loginid: data.username,
      // userpwd: data.password,
      // roleid: 0,
      USR_LOGIN:data.username,
      Password:data.password,
    //  RoleId: 0,
      //roletype: type,
      device: 'Web',
    };

    let requestPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    let mockResponse = {
      ResponseCode: '1',
     ResponseData: {"profile":{"userid":23,"firstname":"Vishnu","lastname":"neemus","useremialid":"vishnu.v@neemus.com","employeeid":"S0001","lastloginsuccess":"2023-08-04 14:15:59.913",
     "defaultrole":1,"defaultrolename":"Admin","authid":"00000058014653085430995018107734","company":"Neemus Soft Solutions","city":"Hyderabad","state":"Telangana","country":"India"},
     "role":{"roles":[{"roleid":1,"rolename":"Admin",
     "component":[{"componentid":0,"componentname":"Home  Component","statusbitvalue":true,"status":0},
     {"componentid":2,"componentname":"	Admin Configuration","statusbitvalue":true,"status":0},
     {"componentid":3,"componentname":"Department Master","statusbitvalue":true,"status":0},
     {"componentid":4,"componentname":"Unit Location Master","statusbitvalue":true,"status":0},
     {"componentid":5,"componentname":"User Location Mapping","statusbitvalue":true,"status":0},
     {"componentid":6,"componentname":"Task master","statusbitvalue":true,"status":0},
     {"componentid":7,"componentname":"Document Type","statusbitvalue":true,"status":0},
     {"componentid":8,"componentname":"Document Category","statusbitvalue":true,"status":0},
     {"componentid":9,"componentname":"Document Sub Category","statusbitvalue":true,"status":0},
     {"componentid":10,"componentname":"Authority Type","statusbitvalue":true,"status":0},
     {"componentid":11,"componentname":"Authority Name","statusbitvalue":true,"status":0},
     {"componentid":12,"componentname":"Nature of Document","statusbitvalue":true,"status":0},
     {"componentid":13,"componentname":"View Published Document","statusbitvalue":true,"status":0},
     {"componentid":14,"componentname":"Update Published Document","statusbitvalue":true,"status":0},
     {"componentid":15,"componentname":"Disable Published Document","statusbitvalue":true,"status":0},
     {"componentid":16,"componentname":"Reactive Published Document","statusbitvalue":true,"status":0},
     {"componentid":17,"componentname":"Version Change","statusbitvalue":true,"status":0},
     {"componentid":18,"componentname":"Document Review Period Status","statusbitvalue":true,"status":0},
     {"componentid":19,"componentname":"Add Document","statusbitvalue":true,"status":0},
     {"componentid":20,"componentname":"Saved Drafts","statusbitvalue":true,"status":0},
     {"componentid":21,"componentname":"Provide Access","statusbitvalue":true,"status":0},
     {"componentid":22,"componentname":"Edit Access","statusbitvalue":true,"status":0},
     {"componentid":23,"componentname":"Remove Access	","statusbitvalue":true,"status":0},
     {"componentid":24,"componentname":"Acknowledgement Requested","statusbitvalue":true,"status":0},
     {"componentid":25,"componentname":"Document User Accessibility	","statusbitvalue":true,"status":0},
     {"componentid":0,"componentname":"Home  Component","statusbitvalue":true,"status":0},
     {"componentid":2,"componentname":"Create Inventory","statusbitvalue":true,"status":0},
     {"componentid":3,"componentname":"Create Bridge","statusbitvalue":true,"status":0},
     {"componentid":4,"componentname":"Inspection Management","statusbitvalue":true,"status":0},
     {"componentid":5,"componentname":"Reviewer Inspection","statusbitvalue":true,"status":0},
     {"componentid":6,"componentname":"Perform Inspection","statusbitvalue":true,"status":0},
     {"componentid":10,"componentname":"Assign Inspection","statusbitvalue":true,"status":0},
     {"componentid":11,"componentname":"Self Inspection","statusbitvalue":true,"status":0},
     {"componentid":14,"componentname":"Question Bank","statusbitvalue":true,"status":0},
     {"componentid":17,"componentname":"User Management","statusbitvalue":true,"status":0},
     {"componentid":20,"componentname":"Role Management","statusbitvalue":true,"status":0},
     {"componentid":21,"componentname":"Project Management","statusbitvalue":true,"status":0},
     {"componentid":22,"componentname":"Product Management","statusbitvalue":true,"status":0},
     {"componentid":24,"componentname":"Manufacturer Management","statusbitvalue":true,"status":0},
     {"componentid":25,"componentname":"Report Management","statusbitvalue":true,"status":0},
     {"componentid":26,"componentname":"BOQReport","statusbitvalue":true,"status":0},
     {"componentid":26,"componentname":"Document Repository","statusbitvalue":true,"status":0}]}]}}

   };


    // console.log('payload', requestPayload);
   //alert(JSON.stringify( payload));
    // this.loginService.loginUser(payload).subscribe((returnValue: any) => {
    //    console.log(returnValue);
    //    //alert(returnValue[0])
    //   if (returnValue[0] === 1) {
    //     alert((returnValue[1]+returnValue[3]));
    //     //let userData = JSON.stringify(returnValue[1]+returnValue[3]);
    //     let userData = JSON.stringify(returnValue[1]+returnValue[3]);
    //     alert(userData)
    //     let concatenatedDataObject = JSON.parse(userData);
    //     this.session.saveUser(concatenatedDataObject);
    //     window.location.reload();
    //    // alert(JSON.parse(this.userData))
    //       this.router.navigate(['inspection-list']);
    //     //this.router.navigate(['dashboard']);

    //    // console.log(JSON.parse(userData), 'data');
    //   } else {
    //     this.erroMessage = returnValue.ResponseDesc;
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '400px',
    //       data: {  message: returnValue.ResponseDesc }
    //     });
    //     this.loginForm.setErrors({ unauthenticated: true });
    //   }
    // });

    this.loginService.loginUser(payload).subscribe((response: any) => {
      // console.log(response.responseData);
      if (response.responseCode == '1') {
    //    let userData = JSON.stringify(mockResponse.ResponseData);
    let userData = this.encrypt.decryptionAES(response.responseData);
       // console.log(JSON.stringify(userData))
        
        this.session.saveUser(userData);
        window.location.reload();
   // Extract allowed components and save them

   const jsonData = JSON.parse(userData); // Replace `yourJSONString` with your JSON string.
     //console.log(jsonData)

   const componentIds: number[] = [];
   
   // Traverse through roles and components to extract component IDs
   jsonData.role.roles.forEach((role: any) => {
     role.component.forEach((comp: any) => {
       componentIds.push(comp.componentid);
     });
   });
  //  alert(jsonData.profile.firstname);  // Alerts "Vishnu Vardhan"
  //  alert(jsonData.profile.departmentName); 
  //  console.log(componentIds);
  //  alert(componentIds)
  

   this.authService.setAllowedComponents(componentIds);

       // alert(JSON.parse(this.userData))
          this.router.navigate(['document-review-status']);
        //this.router.navigate(['dashboard']);

       // console.log(JSON.parse(userData), 'data');
      } else {
        this.erroMessage = response.responseDesc;
        this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: {  message: response.responseDesc }
        });
        this.loginForm.setErrors({ unauthenticated: true });
      }
    });
  }

  signUp() {
    this.router.navigate(['sign-up']);
    console.log('signUp');
  }

  forgotPassword() {
    this.router.navigate(['forgot-passwrod']);
    console.log('forgot Password');
  }

  

}
