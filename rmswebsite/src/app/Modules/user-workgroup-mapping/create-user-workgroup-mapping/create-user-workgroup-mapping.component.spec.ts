import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserWorkgroupMappingComponent } from './create-user-workgroup-mapping.component';

describe('CreateUserWorkgroupMappingComponent', () => {
  let component: CreateUserWorkgroupMappingComponent;
  let fixture: ComponentFixture<CreateUserWorkgroupMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserWorkgroupMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserWorkgroupMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
