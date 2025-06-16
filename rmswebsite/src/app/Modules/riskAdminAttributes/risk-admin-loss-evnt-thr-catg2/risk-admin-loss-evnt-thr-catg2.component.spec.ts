import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminLossEvntThrCatg2Component } from './risk-admin-loss-evnt-thr-catg2.component';

describe('RiskAdminLossEvntThrCatg2Component', () => {
  let component: RiskAdminLossEvntThrCatg2Component;
  let fixture: ComponentFixture<RiskAdminLossEvntThrCatg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminLossEvntThrCatg2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminLossEvntThrCatg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
