import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkgroupMappingComponent } from './user-workgroup-mapping.component';

describe('UserWorkgroupMappingComponent', () => {
  let component: UserWorkgroupMappingComponent;
  let fixture: ComponentFixture<UserWorkgroupMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWorkgroupMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWorkgroupMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
