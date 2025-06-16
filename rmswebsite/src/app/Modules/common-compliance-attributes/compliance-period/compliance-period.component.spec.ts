import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancePeriodComponent } from './compliance-period.component';

describe('CompliancePeriodComponent', () => {
  let component: CompliancePeriodComponent;
  let fixture: ComponentFixture<CompliancePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliancePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompliancePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
