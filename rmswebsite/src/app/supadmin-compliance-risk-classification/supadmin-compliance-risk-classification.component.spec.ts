import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminComplianceRiskClassificationComponent } from './supadmin-compliance-risk-classification.component';

describe('SupadminComplianceRiskClassificationComponent', () => {
  let component: SupadminComplianceRiskClassificationComponent;
  let fixture: ComponentFixture<SupadminComplianceRiskClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminComplianceRiskClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminComplianceRiskClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
