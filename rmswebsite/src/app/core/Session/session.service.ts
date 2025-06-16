import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionData: any;
  constructor() {}

  public saveUser(userData: any) {
    this.sessionData = userData;
    return localStorage.setItem('user', userData);
  }

  public getUser() {
    return localStorage.getItem('user');
  }
    public saveTempUser(userData: any) {
    this.sessionData = userData;
    return localStorage.setItem('tempuser', userData);
  }

  public getTempUser() {
    return localStorage.getItem('tempuser');
  }
  getSessionData(): any {
    if (!this.sessionData) {
      const storedData = localStorage.getItem('user');
      this.sessionData = storedData ? JSON.parse(storedData) : null;
    }
    return this.sessionData;
  }
  getUserId(): number | null {
    const session = this.getSessionData();
    return session?.profile?.userid || null; // Safely access `profile.userid`
  }

  public isLoggedIn() {
    if (typeof this.getUser() !== 'undefined' && this.getUser() !== null) {
      return true;
    } else {
      return false;
    }
  }

  public cleanSesssion() {
    localStorage.removeItem('user');
  }
}
