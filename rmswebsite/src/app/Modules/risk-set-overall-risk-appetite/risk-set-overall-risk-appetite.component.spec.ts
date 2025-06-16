import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSetOverallRiskAppetiteComponent } from './risk-set-overall-risk-appetite.component';

describe('RiskSetOverallRiskAppetiteComponent', () => {
  let component: RiskSetOverallRiskAppetiteComponent;
  let fixture: ComponentFixture<RiskSetOverallRiskAppetiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskSetOverallRiskAppetiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskSetOverallRiskAppetiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
