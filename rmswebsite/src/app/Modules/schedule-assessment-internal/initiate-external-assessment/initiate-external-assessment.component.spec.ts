import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateExternalAssessmentComponent } from './initiate-external-assessment.component';

describe('InitiateExternalAssessmentComponent', () => {
  let component: InitiateExternalAssessmentComponent;
  let fixture: ComponentFixture<InitiateExternalAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateExternalAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiateExternalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
