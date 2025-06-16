import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlertsRemindersComponent } from './create-alerts-reminders.component';

describe('CreateAlertsRemindersComponent', () => {
  let component: CreateAlertsRemindersComponent;
  let fixture: ComponentFixture<CreateAlertsRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlertsRemindersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAlertsRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
