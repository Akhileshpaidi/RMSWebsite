import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyOfControlAppliedComponent } from './frequency-of-control-applied.component';

describe('FrequencyOfControlAppliedComponent', () => {
  let component: FrequencyOfControlAppliedComponent;
  let fixture: ComponentFixture<FrequencyOfControlAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyOfControlAppliedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyOfControlAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
