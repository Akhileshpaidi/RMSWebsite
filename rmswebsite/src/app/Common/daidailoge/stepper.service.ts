// stepper.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class StepperService {
  private stepperVisible = new BehaviorSubject<boolean>(false);
  stepperVisible$ = this.stepperVisible.asObservable();
  constructor() { 
    
  }
  // Show the stepper
  showStepper() {
    this.stepperVisible.next(true);
  }

  // Hide the stepper
  hideStepper() {
    this.stepperVisible.next(false);
  }
}


