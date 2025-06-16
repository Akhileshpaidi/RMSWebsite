import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminBpMaturRatScaleComponent } from './risk-admin-bp-matur-rat-scale.component';

describe('RiskAdminBpMaturRatScaleComponent', () => {
  let component: RiskAdminBpMaturRatScaleComponent;
  let fixture: ComponentFixture<RiskAdminBpMaturRatScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminBpMaturRatScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminBpMaturRatScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
