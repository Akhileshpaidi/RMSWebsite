import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminTypeofRiskComponent } from './risk-admin-typeof-risk.component';

describe('RiskAdminTypeofRiskComponent', () => {
  let component: RiskAdminTypeofRiskComponent;
  let fixture: ComponentFixture<RiskAdminTypeofRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminTypeofRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminTypeofRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
