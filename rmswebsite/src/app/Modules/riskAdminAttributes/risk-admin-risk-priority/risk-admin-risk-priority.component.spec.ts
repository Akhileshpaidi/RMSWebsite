import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskPriorityComponent } from './risk-admin-risk-priority.component';

describe('RiskAdminRiskPriorityComponent', () => {
  let component: RiskAdminRiskPriorityComponent;
  let fixture: ComponentFixture<RiskAdminRiskPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskPriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
