import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskLikeOfOccuFactorComponent } from './risk-admin-risk-like-of-occu-factor.component';

describe('RiskAdminRiskLikeOfOccuFactorComponent', () => {
  let component: RiskAdminRiskLikeOfOccuFactorComponent;
  let fixture: ComponentFixture<RiskAdminRiskLikeOfOccuFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskLikeOfOccuFactorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskLikeOfOccuFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
