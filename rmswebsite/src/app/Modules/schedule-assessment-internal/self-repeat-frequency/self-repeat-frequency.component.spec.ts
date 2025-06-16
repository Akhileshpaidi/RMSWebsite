import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRepeatFrequencyComponent } from './self-repeat-frequency.component';

describe('SelfRepeatFrequencyComponent', () => {
  let component: SelfRepeatFrequencyComponent;
  let fixture: ComponentFixture<SelfRepeatFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfRepeatFrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfRepeatFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
