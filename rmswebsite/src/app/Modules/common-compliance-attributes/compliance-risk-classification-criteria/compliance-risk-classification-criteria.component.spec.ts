import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceRiskClassificationCriteriaComponent } from './compliance-risk-classification-criteria.component';

describe('ComplianceRiskClassificationCriteriaComponent', () => {
  let component: ComplianceRiskClassificationCriteriaComponent;
  let fixture: ComponentFixture<ComplianceRiskClassificationCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceRiskClassificationCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceRiskClassificationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
