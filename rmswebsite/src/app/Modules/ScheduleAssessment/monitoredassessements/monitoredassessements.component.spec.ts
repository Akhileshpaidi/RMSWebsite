import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredassessementsComponent } from './monitoredassessements.component';

describe('MonitoredassessementsComponent', () => {
  let component: MonitoredassessementsComponent;
  let fixture: ComponentFixture<MonitoredassessementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredassessementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoredassessementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
