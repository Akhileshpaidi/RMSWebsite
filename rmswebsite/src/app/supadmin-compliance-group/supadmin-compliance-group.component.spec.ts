import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminComplianceGroupComponent } from './supadmin-compliance-group.component';

describe('SupadminComplianceGroupComponent', () => {
  let component: SupadminComplianceGroupComponent;
  let fixture: ComponentFixture<SupadminComplianceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminComplianceGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminComplianceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
