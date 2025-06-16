import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksupadminRiskClassificationComponent } from './risksupadmin-risk-classification.component';

describe('RisksupadminRiskClassificationComponent', () => {
  let component: RisksupadminRiskClassificationComponent;
  let fixture: ComponentFixture<RisksupadminRiskClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksupadminRiskClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksupadminRiskClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
