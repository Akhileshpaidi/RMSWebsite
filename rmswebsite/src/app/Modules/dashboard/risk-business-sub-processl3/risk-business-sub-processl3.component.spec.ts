import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBusinessSubProcessl3Component } from './risk-business-sub-processl3.component';

describe('RiskBusinessSubProcessl3Component', () => {
  let component: RiskBusinessSubProcessl3Component;
  let fixture: ComponentFixture<RiskBusinessSubProcessl3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskBusinessSubProcessl3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskBusinessSubProcessl3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
