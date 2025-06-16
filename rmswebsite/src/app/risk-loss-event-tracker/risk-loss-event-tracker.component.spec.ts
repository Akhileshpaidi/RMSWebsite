import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskLossEventTrackerComponent } from './risk-loss-event-tracker.component';

describe('RiskLossEventTrackerComponent', () => {
  let component: RiskLossEventTrackerComponent;
  let fixture: ComponentFixture<RiskLossEventTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskLossEventTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskLossEventTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
