import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityWorkgroupComponent } from './create-activity-workgroup.component';

describe('CreateActivityWorkgroupComponent', () => {
  let component: CreateActivityWorkgroupComponent;
  let fixture: ComponentFixture<CreateActivityWorkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateActivityWorkgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
