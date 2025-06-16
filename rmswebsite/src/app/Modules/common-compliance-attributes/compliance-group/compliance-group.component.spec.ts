import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceGroupComponent } from './compliance-group.component';

describe('ComplianceGroupComponent', () => {
  let component: ComplianceGroupComponent;
  let fixture: ComponentFixture<ComplianceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
