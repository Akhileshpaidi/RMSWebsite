import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledassessmentstatuslistComponent } from './scheduledassessmentstatuslist.component';

describe('ScheduledassessmentstatuslistComponent', () => {
  let component: ScheduledassessmentstatuslistComponent;
  let fixture: ComponentFixture<ScheduledassessmentstatuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledassessmentstatuslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledassessmentstatuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
