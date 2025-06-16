import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminComplianceRecordTypeComponent } from './supadmin-compliance-record-type.component';

describe('SupadminComplianceRecordTypeComponent', () => {
  let component: SupadminComplianceRecordTypeComponent;
  let fixture: ComponentFixture<SupadminComplianceRecordTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminComplianceRecordTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminComplianceRecordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
