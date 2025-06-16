import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceNotifiedStatusComponent } from './compliance-notified-status.component';

describe('ComplianceNotifiedStatusComponent', () => {
  let component: ComplianceNotifiedStatusComponent;
  let fixture: ComponentFixture<ComplianceNotifiedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceNotifiedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceNotifiedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
