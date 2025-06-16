import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringCompliancesComponent } from './monitoring-compliances.component';

describe('MonitoringCompliancesComponent', () => {
  let component: MonitoringCompliancesComponent;
  let fixture: ComponentFixture<MonitoringCompliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringCompliancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringCompliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
