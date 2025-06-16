import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskToleranceComponent } from './risk-admin-risk-tolerance.component';

describe('RiskAdminRiskToleranceComponent', () => {
  let component: RiskAdminRiskToleranceComponent;
  let fixture: ComponentFixture<RiskAdminRiskToleranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskToleranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskToleranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
