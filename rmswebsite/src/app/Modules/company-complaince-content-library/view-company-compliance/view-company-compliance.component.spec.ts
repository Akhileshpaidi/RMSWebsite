import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyComplianceComponent } from './view-company-compliance.component';

describe('ViewCompanyComplianceComponent', () => {
  let component: ViewCompanyComplianceComponent;
  let fixture: ComponentFixture<ViewCompanyComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompanyComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompanyComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
