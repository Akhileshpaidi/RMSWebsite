import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeFrequencyExternalComponent } from './one-time-frequency-external.component';

describe('OneTimeFrequencyExternalComponent', () => {
  let component: OneTimeFrequencyExternalComponent;
  let fixture: ComponentFixture<OneTimeFrequencyExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeFrequencyExternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTimeFrequencyExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
