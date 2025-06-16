import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMeasureComponent } from './control-measure.component';

describe('ControlMeasureComponent', () => {
  let component: ControlMeasureComponent;
  let fixture: ComponentFixture<ControlMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlMeasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
