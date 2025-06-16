import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBusinessSubProcessl1Component } from './risk-business-sub-processl1.component';

describe('RiskBusinessSubProcessl1Component', () => {
  let component: RiskBusinessSubProcessl1Component;
  let fixture: ComponentFixture<RiskBusinessSubProcessl1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskBusinessSubProcessl1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskBusinessSubProcessl1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
