import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskownerDashboardComponent } from './taskowner-dashboard.component';

describe('TaskownerDashboardComponent', () => {
  let component: TaskownerDashboardComponent;
  let fixture: ComponentFixture<TaskownerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskownerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskownerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
