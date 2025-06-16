import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginassessmentscheduleComponent } from './beginassessmentschedule.component';

describe('BeginassessmentscheduleComponent', () => {
  let component: BeginassessmentscheduleComponent;
  let fixture: ComponentFixture<BeginassessmentscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginassessmentscheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginassessmentscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
