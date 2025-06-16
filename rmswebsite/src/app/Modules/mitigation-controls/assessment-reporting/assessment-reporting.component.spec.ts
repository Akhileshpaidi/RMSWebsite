import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportingComponent } from './assessment-reporting.component';

describe('AssessmentReportingComponent', () => {
  let component: AssessmentReportingComponent;
  let fixture: ComponentFixture<AssessmentReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentReportingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
