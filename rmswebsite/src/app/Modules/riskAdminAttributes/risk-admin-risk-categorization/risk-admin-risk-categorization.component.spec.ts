import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskCategorizationComponent } from './risk-admin-risk-categorization.component';

describe('RiskAdminRiskCategorizationComponent', () => {
  let component: RiskAdminRiskCategorizationComponent;
  let fixture: ComponentFixture<RiskAdminRiskCategorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskCategorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskCategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
