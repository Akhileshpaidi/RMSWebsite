import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditApproveComplianceComponent } from './audit-approve-compliance.component';

describe('AuditApproveComplianceComponent', () => {
  let component: AuditApproveComplianceComponent;
  let fixture: ComponentFixture<AuditApproveComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditApproveComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditApproveComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
