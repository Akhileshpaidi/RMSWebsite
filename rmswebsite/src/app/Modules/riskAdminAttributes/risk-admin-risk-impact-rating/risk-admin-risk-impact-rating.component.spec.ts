import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskImpactRatingComponent } from './risk-admin-risk-impact-rating.component';

describe('RiskAdminRiskImpactRatingComponent', () => {
  let component: RiskAdminRiskImpactRatingComponent;
  let fixture: ComponentFixture<RiskAdminRiskImpactRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskImpactRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskImpactRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
