import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContRiskAssComponent } from './risk-admin-cont-risk-ass.component';

describe('RiskAdminContRiskAssComponent', () => {
  let component: RiskAdminContRiskAssComponent;
  let fixture: ComponentFixture<RiskAdminContRiskAssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContRiskAssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContRiskAssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
