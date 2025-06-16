import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeFrequencySelfComponent } from './one-time-frequency-self.component';

describe('OneTimeFrequencySelfComponent', () => {
  let component: OneTimeFrequencySelfComponent;
  let fixture: ComponentFixture<OneTimeFrequencySelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeFrequencySelfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTimeFrequencySelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
