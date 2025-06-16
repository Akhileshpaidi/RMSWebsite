import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksupadminRiskImpactRatingComponent } from './risksupadmin-risk-impact-rating.component';

describe('RisksupadminRiskImpactRatingComponent', () => {
  let component: RisksupadminRiskImpactRatingComponent;
  let fixture: ComponentFixture<RisksupadminRiskImpactRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksupadminRiskImpactRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksupadminRiskImpactRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
