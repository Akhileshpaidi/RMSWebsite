import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocationComplaintMappingComponent } from './create-location-complaint-mapping.component';

describe('CreateLocationComplaintMappingComponent', () => {
  let component: CreateLocationComplaintMappingComponent;
  let fixture: ComponentFixture<CreateLocationComplaintMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLocationComplaintMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLocationComplaintMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
