import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskUpdateOverallRiskAppetiteComponent } from './risk-update-overall-risk-appetite.component';

describe('RiskUpdateOverallRiskAppetiteComponent', () => {
  let component: RiskUpdateOverallRiskAppetiteComponent;
  let fixture: ComponentFixture<RiskUpdateOverallRiskAppetiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskUpdateOverallRiskAppetiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskUpdateOverallRiskAppetiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
