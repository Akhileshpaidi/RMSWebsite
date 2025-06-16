import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupAdminEditCompliancepenaltyComponent } from './sup-admin-edit-compliancepenalty.component';

describe('SupAdminEditCompliancepenaltyComponent', () => {
  let component: SupAdminEditCompliancepenaltyComponent;
  let fixture: ComponentFixture<SupAdminEditCompliancepenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupAdminEditCompliancepenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupAdminEditCompliancepenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
