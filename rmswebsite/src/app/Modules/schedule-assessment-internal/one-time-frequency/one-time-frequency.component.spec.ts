import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeFrequencyComponent } from './one-time-frequency.component';

describe('OneTimeFrequencyComponent', () => {
  let component: OneTimeFrequencyComponent;
  let fixture: ComponentFixture<OneTimeFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeFrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTimeFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
