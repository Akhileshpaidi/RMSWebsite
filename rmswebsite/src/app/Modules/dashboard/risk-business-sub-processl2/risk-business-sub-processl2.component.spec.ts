import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBusinessSubProcessl2Component } from './risk-business-sub-processl2.component';

describe('RiskBusinessSubProcessl2Component', () => {
  let component: RiskBusinessSubProcessl2Component;
  let fixture: ComponentFixture<RiskBusinessSubProcessl2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskBusinessSubProcessl2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskBusinessSubProcessl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
