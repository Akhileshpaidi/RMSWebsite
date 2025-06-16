import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityWorkgroupCreationComponent } from './activity-workgroup-creation.component';

describe('ActivityWorkgroupCreationComponent', () => {
  let component: ActivityWorkgroupCreationComponent;
  let fixture: ComponentFixture<ActivityWorkgroupCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityWorkgroupCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityWorkgroupCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
