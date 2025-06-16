import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskTrDeciListComponent } from './risk-admin-risk-tr-deci-list.component';

describe('RiskAdminRiskTrDeciListComponent', () => {
  let component: RiskAdminRiskTrDeciListComponent;
  let fixture: ComponentFixture<RiskAdminRiskTrDeciListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskTrDeciListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskTrDeciListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
