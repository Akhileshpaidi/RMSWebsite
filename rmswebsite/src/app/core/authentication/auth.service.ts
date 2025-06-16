import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private allowedComponentIds: number[] = [];
  hasAccess1(componentId: any) {
    throw new Error('Method not implemented.');
  }
  isUserLoggedIn: boolean = false;
  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    localStorage.setItem(
      'isUserLoggedIn',
      this.isUserLoggedIn ? 'true' : 'false'
    );

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }
  setAllowedComponents(components: number[]): void {
    this.allowedComponentIds = components; // Assign the component IDs
    localStorage.setItem('allowedComponentIds', JSON.stringify(components)); // Persist in localStorage
   // console.log('Allowed Component IDs set:', this.allowedComponentIds);
  }

  getAllowedComponents(): number[] {
    // Fetch from memory if available, or fallback to localStorage
    if (!this.allowedComponentIds.length) {
      const storedComponents = localStorage.getItem('allowedComponentIds');
      this.allowedComponentIds = storedComponents ? JSON.parse(storedComponents) : [];
    }
    //console.log('Allowed Component IDs fetched:', this.allowedComponentIds);
    return this.allowedComponentIds;
  }

  hasAccess(componentId: number): boolean {
    const allowedComponents = this.getAllowedComponents(); // Ensure data is fetched
   // console.log('Checking access for componentId:', componentId);
    //console.log('Allowed componentIds:', allowedComponents);
    return allowedComponents.includes(componentId);
  }
  constructor() {}
}
