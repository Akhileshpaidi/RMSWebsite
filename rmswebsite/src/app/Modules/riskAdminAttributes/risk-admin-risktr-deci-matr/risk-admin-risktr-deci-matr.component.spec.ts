import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRisktrDeciMatrComponent } from './risk-admin-risktr-deci-matr.component';

describe('RiskAdminRisktrDeciMatrComponent', () => {
  let component: RiskAdminRisktrDeciMatrComponent;
  let fixture: ComponentFixture<RiskAdminRisktrDeciMatrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRisktrDeciMatrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRisktrDeciMatrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
