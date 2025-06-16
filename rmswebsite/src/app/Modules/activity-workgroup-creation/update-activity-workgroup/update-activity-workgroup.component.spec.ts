import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivityWorkgroupComponent } from './update-activity-workgroup.component';

describe('UpdateActivityWorkgroupComponent', () => {
  let component: UpdateActivityWorkgroupComponent;
  let fixture: ComponentFixture<UpdateActivityWorkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActivityWorkgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActivityWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
