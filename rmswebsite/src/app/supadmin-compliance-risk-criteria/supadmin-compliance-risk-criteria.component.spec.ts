import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminComplianceRiskCriteriaComponent } from './supadmin-compliance-risk-criteria.component';

describe('SupadminComplianceRiskCriteriaComponent', () => {
  let component: SupadminComplianceRiskCriteriaComponent;
  let fixture: ComponentFixture<SupadminComplianceRiskCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminComplianceRiskCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminComplianceRiskCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
