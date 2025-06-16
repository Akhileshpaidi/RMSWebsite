import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskAppetiteComponent } from './risk-admin-risk-appetite.component';

describe('RiskAdminRiskAppetiteComponent', () => {
  let component: RiskAdminRiskAppetiteComponent;
  let fixture: ComponentFixture<RiskAdminRiskAppetiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskAppetiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskAppetiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
