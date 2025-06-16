import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskClassificationComponent } from './risk-admin-risk-classification.component';

describe('RiskAdminRiskClassificationComponent', () => {
  let component: RiskAdminRiskClassificationComponent;
  let fixture: ComponentFixture<RiskAdminRiskClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
