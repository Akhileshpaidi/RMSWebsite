import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Document } from './document'; // Adjust the path to where your Document interface is located
import { FormControl, FormGroup } from '@angular/forms';
//import * as nodemailer from 'nodemailer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YourDataService {
  //generatedOtp!: string;
  constructor(private http: HttpClient) {}
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  getFiles(endpoint: string): Observable<Document[]> {
    return this.http.get<Document[]>(endpoint).pipe(
      catchError(this.handleError<Document[]>('getFiles', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
 // generateOtp(): string {
  //  generateOtp(): string {
  //   this.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  //   alert("otp for view document    "+ this.generatedOtp);
  //   return this.generatedOtp;

  // }
  generateOtp(): string {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    //alert("otp for view document " + generatedOtp);
    return generatedOtp;
  }

 // sendOtpEmail(email: string | undefined): void {
    // Your logic to send OTP via email goes here
 // }

  sendOtpEmail(email: string): void {
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'your_email@gmail.com',
  //       pass: 'your_email_password'
  //     }
  //   });

  //   const mailOptions = {
  //     from: 'your_email@gmail.com',
  //     to: email,
  //     subject: 'Your OTP Code',
  //     text: `Your OTP code is: ${this.generatedOtp}`
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
   }
   //validateOtp(enteredOtp: string): boolean {
   validateOtp(enteredOtp: string): any {
  //   return enteredOtp === this.generatedOtp;
   }
}
