import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocationComplaintMappingComponent } from './update-location-complaint-mapping.component';

describe('UpdateLocationComplaintMappingComponent', () => {
  let component: UpdateLocationComplaintMappingComponent;
  let fixture: ComponentFixture<UpdateLocationComplaintMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLocationComplaintMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLocationComplaintMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
