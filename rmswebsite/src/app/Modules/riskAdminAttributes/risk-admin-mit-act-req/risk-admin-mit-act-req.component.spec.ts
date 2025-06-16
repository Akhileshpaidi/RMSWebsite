import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminMitActReqComponent } from './risk-admin-mit-act-req.component';

describe('RiskAdminMitActReqComponent', () => {
  let component: RiskAdminMitActReqComponent;
  let fixture: ComponentFixture<RiskAdminMitActReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminMitActReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminMitActReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
