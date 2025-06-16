import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSamplingStandardsComponent } from './risk-sampling-standards.component';

describe('RiskSamplingStandardsComponent', () => {
  let component: RiskSamplingStandardsComponent;
  let fixture: ComponentFixture<RiskSamplingStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskSamplingStandardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskSamplingStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
