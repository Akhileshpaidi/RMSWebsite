import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIntensityComponent } from './risk-intensity.component';

describe('RiskIntensityComponent', () => {
  let component: RiskIntensityComponent;
  let fixture: ComponentFixture<RiskIntensityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskIntensityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskIntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
