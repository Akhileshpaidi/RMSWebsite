import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRiskOfAssessmentComponent } from './control-risk-of-assessment.component';

describe('ControlRiskOfAssessmentComponent', () => {
  let component: ControlRiskOfAssessmentComponent;
  let fixture: ComponentFixture<ControlRiskOfAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlRiskOfAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlRiskOfAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
