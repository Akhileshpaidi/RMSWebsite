import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardService {
  readonly apiUrl = 'http://localhost:18593/api/';
  constructor(private http: HttpClient) {}
// Login
  loginUser(body: any) {
    //alert(JSON.stringify(body))
    //return this.http.post(this.apiUrl + 'Login/CheckUser', body);
   // return this.http.post(`${BASE_URL}/Login/CheckUser`, body);
     return this.http.post(`${BASE_URL}/Authenticate/login`, body);
  }

  // Get Roles
  // getRoleList(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl + 'RoleDetails/GetRoleDetails');
  // }
  sendOtp(body: any): Observable<any> {
    //alert("send otp" + JSON.stringify(body))
     //return this.http.post(`${BASE_URL}/Authenticate/login`, body);
    return this.http.post<any>(`${BASE_URL}/ValidateLoginAndSendOtp`, body);
  }
  
  // Verify the OTP entered by user
  verifyOtp(body: any): Observable<any> {
    //alert("send otp" + JSON.stringify(body))
    return this.http.post(`${BASE_URL}/VerifyOtpAndReturnUserData`, body);
  }

  // Resend OTP to the user
  resendOtp(body: any): Observable<any> {
    return this.http.post(`${BASE_URL}/ValidateLoginAndSendOtp`, body);
  }

  // SignUp
  signUp(body: any) {
    return this.http.post(`${BASE_URL}/User/UserSignin`, body);
  }
  //forgot Password
  ForgotPasswordMail(body: any) {
    return this.http.post(`${BASE_URL}/User/ForgotPasswordMail`, body);
  }
  ForgotPasswordReset(body: any) {
    return this.http.post(`${BASE_URL}/Authenticate/ForgotPasswordReset`, body);
  }
  ForcePasswordReset(body: any) {
    return this.http.post(`${BASE_URL}/Authenticate/ForcePasswordReset`, body);
  }
  verifyToken(body: any) {
    return this.http.post(`${BASE_URL}/user/tokenverfication`, body);
  }
}
