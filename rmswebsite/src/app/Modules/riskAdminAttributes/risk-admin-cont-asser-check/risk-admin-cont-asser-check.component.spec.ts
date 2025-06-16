import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContAsserCheckComponent } from './risk-admin-cont-asser-check.component';

describe('RiskAdminContAsserCheckComponent', () => {
  let component: RiskAdminContAsserCheckComponent;
  let fixture: ComponentFixture<RiskAdminContAsserCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContAsserCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContAsserCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
