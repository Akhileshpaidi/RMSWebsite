import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlLevelComponent } from './control-level.component';

describe('ControlLevelComponent', () => {
  let component: ControlLevelComponent;
  let fixture: ComponentFixture<ControlLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
