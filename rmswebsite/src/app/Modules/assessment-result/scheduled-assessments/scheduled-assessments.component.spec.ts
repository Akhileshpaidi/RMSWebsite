import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAssessmentsComponent } from './scheduled-assessments.component';

describe('ScheduledAssessmentsComponent', () => {
  let component: ScheduledAssessmentsComponent;
  let fixture: ComponentFixture<ScheduledAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledAssessmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
