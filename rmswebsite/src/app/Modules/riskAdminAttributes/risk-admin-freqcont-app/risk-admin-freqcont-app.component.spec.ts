import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminFreqcontAppComponent } from './risk-admin-freqcont-app.component';

describe('RiskAdminFreqcontAppComponent', () => {
  let component: RiskAdminFreqcontAppComponent;
  let fixture: ComponentFixture<RiskAdminFreqcontAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminFreqcontAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminFreqcontAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
