import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskIntensityComponent } from './risk-admin-risk-intensity.component';

describe('RiskAdminRiskIntensityComponent', () => {
  let component: RiskAdminRiskIntensityComponent;
  let fixture: ComponentFixture<RiskAdminRiskIntensityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskIntensityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskIntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
