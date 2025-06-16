import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplainceDepartmentMappingComponent } from './create-complaince-department-mapping.component';

describe('CreateComplainceDepartmentMappingComponent', () => {
  let component: CreateComplainceDepartmentMappingComponent;
  let fixture: ComponentFixture<CreateComplainceDepartmentMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComplainceDepartmentMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComplainceDepartmentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
