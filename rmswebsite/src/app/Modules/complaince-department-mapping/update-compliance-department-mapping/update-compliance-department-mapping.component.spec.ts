import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComplianceDepartmentMappingComponent } from './update-compliance-department-mapping.component';

describe('UpdateComplianceDepartmentMappingComponent', () => {
  let component: UpdateComplianceDepartmentMappingComponent;
  let fixture: ComponentFixture<UpdateComplianceDepartmentMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComplianceDepartmentMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateComplianceDepartmentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
