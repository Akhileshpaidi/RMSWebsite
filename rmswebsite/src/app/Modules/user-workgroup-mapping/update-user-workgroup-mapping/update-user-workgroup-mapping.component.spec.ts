import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserWorkgroupMappingComponent } from './update-user-workgroup-mapping.component';

describe('UpdateUserWorkgroupMappingComponent', () => {
  let component: UpdateUserWorkgroupMappingComponent;
  let fixture: ComponentFixture<UpdateUserWorkgroupMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserWorkgroupMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserWorkgroupMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
