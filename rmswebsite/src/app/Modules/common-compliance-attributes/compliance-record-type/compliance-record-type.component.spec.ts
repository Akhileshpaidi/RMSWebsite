import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceRecordTypeComponent } from './compliance-record-type.component';

describe('ComplianceRecordTypeComponent', () => {
  let component: ComplianceRecordTypeComponent;
  let fixture: ComponentFixture<ComplianceRecordTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceRecordTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceRecordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
