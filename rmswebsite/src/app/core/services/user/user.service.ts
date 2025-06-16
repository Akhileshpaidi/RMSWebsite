import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getUserList
  UserSummary(body: any) {
    return this.http.post(`${BASE_URL}/User/UserSummary`, body);
  }

// user CRUD 
  CRUDUser(body: any) {
    return this.http.post(`${BASE_URL}/User/CRUDUser`, body);
  }

  //Reset Passsword
  resetPassword(body: any) {
    return this.http.post(`${BASE_URL}/User/UserPasswordReset`, body);
  }

  //MyActivity
   MyActivity(body: any) {
    return this.http.post(`${BASE_URL}/Dashboard/MyActivity`, body);
  }
}
