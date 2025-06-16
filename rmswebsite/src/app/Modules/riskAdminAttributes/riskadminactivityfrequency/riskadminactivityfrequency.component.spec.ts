import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskadminactivityfrequencyComponent } from './riskadminactivityfrequency.component';

describe('RiskadminactivityfrequencyComponent', () => {
  let component: RiskadminactivityfrequencyComponent;
  let fixture: ComponentFixture<RiskadminactivityfrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskadminactivityfrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskadminactivityfrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
