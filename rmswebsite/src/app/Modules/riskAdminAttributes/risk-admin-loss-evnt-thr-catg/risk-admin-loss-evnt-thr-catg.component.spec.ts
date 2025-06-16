import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminLossEvntThrCatgComponent } from './risk-admin-loss-evnt-thr-catg.component';

describe('RiskAdminLossEvntThrCatgComponent', () => {
  let component: RiskAdminLossEvntThrCatgComponent;
  let fixture: ComponentFixture<RiskAdminLossEvntThrCatgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminLossEvntThrCatgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminLossEvntThrCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
