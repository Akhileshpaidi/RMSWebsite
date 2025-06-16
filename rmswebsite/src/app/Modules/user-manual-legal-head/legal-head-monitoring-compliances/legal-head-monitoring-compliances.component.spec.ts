import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalHeadMonitoringCompliancesComponent } from './legal-head-monitoring-compliances.component';

describe('LegalHeadMonitoringCompliancesComponent', () => {
  let component: LegalHeadMonitoringCompliancesComponent;
  let fixture: ComponentFixture<LegalHeadMonitoringCompliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalHeadMonitoringCompliancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalHeadMonitoringCompliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
