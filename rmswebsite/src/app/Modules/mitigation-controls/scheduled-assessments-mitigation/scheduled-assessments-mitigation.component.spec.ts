import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAssessmentsMitigationComponent } from './scheduled-assessments-mitigation.component';

describe('ScheduledAssessmentsMitigationComponent', () => {
  let component: ScheduledAssessmentsMitigationComponent;
  let fixture: ComponentFixture<ScheduledAssessmentsMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledAssessmentsMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledAssessmentsMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
