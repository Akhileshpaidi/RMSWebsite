import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminComplianceNotifiedStatusComponent } from './supadmin-compliance-notified-status.component';

describe('SupadminComplianceNotifiedStatusComponent', () => {
  let component: SupadminComplianceNotifiedStatusComponent;
  let fixture: ComponentFixture<SupadminComplianceNotifiedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminComplianceNotifiedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminComplianceNotifiedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
