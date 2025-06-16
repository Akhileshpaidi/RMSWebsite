import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAssessmentInternalComponent } from './schedule-assessment-internal.component';

describe('ScheduleAssessmentInternalComponent', () => {
  let component: ScheduleAssessmentInternalComponent;
  let fixture: ComponentFixture<ScheduleAssessmentInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAssessmentInternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAssessmentInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
