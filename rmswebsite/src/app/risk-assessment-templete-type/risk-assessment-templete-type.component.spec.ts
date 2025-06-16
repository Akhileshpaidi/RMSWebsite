import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentTempleteTypeComponent } from './risk-assessment-templete-type.component';

describe('RiskAssessmentTempleteTypeComponent', () => {
  let component: RiskAssessmentTempleteTypeComponent;
  let fixture: ComponentFixture<RiskAssessmentTempleteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAssessmentTempleteTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAssessmentTempleteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
