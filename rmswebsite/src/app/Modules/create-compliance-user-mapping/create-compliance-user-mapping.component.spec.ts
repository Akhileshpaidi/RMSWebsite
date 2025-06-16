import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplianceUserMappingComponent } from './create-compliance-user-mapping.component';

describe('CreateComplianceUserMappingComponent', () => {
  let component: CreateComplianceUserMappingComponent;
  let fixture: ComponentFixture<CreateComplianceUserMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComplianceUserMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComplianceUserMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
