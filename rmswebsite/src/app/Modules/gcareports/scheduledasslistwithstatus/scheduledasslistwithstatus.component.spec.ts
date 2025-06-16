import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledasslistwithstatusComponent } from './scheduledasslistwithstatus.component';

describe('ScheduledasslistwithstatusComponent', () => {
  let component: ScheduledasslistwithstatusComponent;
  let fixture: ComponentFixture<ScheduledasslistwithstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledasslistwithstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledasslistwithstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
