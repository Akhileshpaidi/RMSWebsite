import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminLossEvntThrCatg3Component } from './risk-admin-loss-evnt-thr-catg3.component';

describe('RiskAdminLossEvntThrCatg3Component', () => {
  let component: RiskAdminLossEvntThrCatg3Component;
  let fixture: ComponentFixture<RiskAdminLossEvntThrCatg3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminLossEvntThrCatg3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminLossEvntThrCatg3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
