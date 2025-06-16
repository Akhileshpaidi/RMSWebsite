import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLevelComponent } from './check-level.component';

describe('CheckLevelComponent', () => {
  let component: CheckLevelComponent;
  let fixture: ComponentFixture<CheckLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
