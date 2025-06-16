import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredAssessmentsComponent } from './monitored-assessments.component';

describe('MonitoredAssessmentsComponent', () => {
  let component: MonitoredAssessmentsComponent;
  let fixture: ComponentFixture<MonitoredAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredAssessmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoredAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
