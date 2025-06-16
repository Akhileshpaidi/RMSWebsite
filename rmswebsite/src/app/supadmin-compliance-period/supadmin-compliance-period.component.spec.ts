import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminCompliancePeriodComponent } from './supadmin-compliance-period.component';

describe('SupadminCompliancePeriodComponent', () => {
  let component: SupadminCompliancePeriodComponent;
  let fixture: ComponentFixture<SupadminCompliancePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminCompliancePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminCompliancePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
