import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainceDepartmentMappingComponent } from './complaince-department-mapping.component';

describe('ComplainceDepartmentMappingComponent', () => {
  let component: ComplainceDepartmentMappingComponent;
  let fixture: ComponentFixture<ComplainceDepartmentMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainceDepartmentMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainceDepartmentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
