import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskLikelihoodOfOccFactorComponent } from './risk-likelihood-of-occ-factor.component';

describe('RiskLikelihoodOfOccFactorComponent', () => {
  let component: RiskLikelihoodOfOccFactorComponent;
  let fixture: ComponentFixture<RiskLikelihoodOfOccFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskLikelihoodOfOccFactorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskLikelihoodOfOccFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
