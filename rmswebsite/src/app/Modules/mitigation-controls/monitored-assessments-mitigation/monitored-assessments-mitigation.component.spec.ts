import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredAssessmentsMitigationComponent } from './monitored-assessments-mitigation.component';

describe('MonitoredAssessmentsMitigationComponent', () => {
  let component: MonitoredAssessmentsMitigationComponent;
  let fixture: ComponentFixture<MonitoredAssessmentsMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredAssessmentsMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoredAssessmentsMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
