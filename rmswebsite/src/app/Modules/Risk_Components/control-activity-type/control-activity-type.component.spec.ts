import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlActivityTypeComponent } from './control-activity-type.component';

describe('ControlActivityTypeComponent', () => {
  let component: ControlActivityTypeComponent;
  let fixture: ComponentFixture<ControlActivityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlActivityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
