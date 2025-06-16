import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementMonitoredAssessmentComponent } from './management-monitored-assessment.component';

describe('ManagementMonitoredAssessmentComponent', () => {
  let component: ManagementMonitoredAssessmentComponent;
  let fixture: ComponentFixture<ManagementMonitoredAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementMonitoredAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementMonitoredAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
