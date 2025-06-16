import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCommonAssessmentTemplateRulesComponent } from './risk-common-assessment-template-rules.component';

describe('RiskCommonAssessmentTemplateRulesComponent', () => {
  let component: RiskCommonAssessmentTemplateRulesComponent;
  let fixture: ComponentFixture<RiskCommonAssessmentTemplateRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCommonAssessmentTemplateRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCommonAssessmentTemplateRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
