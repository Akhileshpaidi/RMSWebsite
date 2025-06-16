import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateriskLossEventTrackerComponent } from './updaterisk-loss-event-tracker.component';

describe('UpdateriskLossEventTrackerComponent', () => {
  let component: UpdateriskLossEventTrackerComponent;
  let fixture: ComponentFixture<UpdateriskLossEventTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateriskLossEventTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateriskLossEventTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
