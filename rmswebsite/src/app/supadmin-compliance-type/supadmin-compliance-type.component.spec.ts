import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminComplianceTypeComponent } from './supadmin-compliance-type.component';

describe('SupadminComplianceTypeComponent', () => {
  let component: SupadminComplianceTypeComponent;
  let fixture: ComponentFixture<SupadminComplianceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminComplianceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminComplianceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
