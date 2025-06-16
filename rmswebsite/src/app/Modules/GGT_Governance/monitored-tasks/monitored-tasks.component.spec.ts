import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredTasksComponent } from './monitored-tasks.component';

describe('MonitoredTasksComponent', () => {
  let component: MonitoredTasksComponent;
  let fixture: ComponentFixture<MonitoredTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoredTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
