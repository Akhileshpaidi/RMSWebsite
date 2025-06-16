import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,Subject,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// export class ExitNav {
//   // goToMethod() {
//   //   console.log('Method called from ExitNavService');
//   // }

//   private exitButtonClickSubject = new Subject<void>();

//   exitButtonClick$ = this.exitButtonClickSubject.asObservable();

//   triggerExitButtonClick() {
//     this.exitButtonClickSubject.next();

// }
// }

export class StepperService {
  private currentStepSubject = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStepSubject.asObservable();
 
  private refreshSecondStepperSubject = new BehaviorSubject<void>(undefined);
  refreshSecondStepper$ = this.refreshSecondStepperSubject.asObservable();
  isStep1Completed:boolean=false;
  isStep2Completed:boolean=false;
  goToStep(step: number) {
    this.currentStepSubject.next(step);
  }
  
  refreshSecondStepper() {
    this.refreshSecondStepperSubject.next();
  }
  Status(){
   this.isStep1Completed=true;
   this.isStep2Completed=true;
  }
}

export class AssessmentServiceService {

  constructor() { }
}





export class RandomSeleForm {
 
  TimeEstimateInputMin: number | undefined;
  TimeEstimateInputMax: number | undefined;
 
 // Assessment_generationID: number | undefined;
  QuestionMixtype: string | undefined;
  No_of_Questions: number | undefined;
  Topics: string[] | undefined;
  UserID: number | undefined;
 
  RandomserialNumbers:number[] | undefined

}
