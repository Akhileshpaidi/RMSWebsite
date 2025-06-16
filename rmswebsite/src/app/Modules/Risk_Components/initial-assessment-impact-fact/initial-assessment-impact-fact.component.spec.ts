import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialAssessmentImpactFactComponent } from './initial-assessment-impact-fact.component';

describe('InitialAssessmentImpactFactComponent', () => {
  let component: InitialAssessmentImpactFactComponent;
  let fixture: ComponentFixture<InitialAssessmentImpactFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialAssessmentImpactFactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialAssessmentImpactFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
