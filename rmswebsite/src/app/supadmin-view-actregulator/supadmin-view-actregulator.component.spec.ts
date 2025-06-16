import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminViewActregulatorComponent } from './supadmin-view-actregulator.component';

describe('SupadminViewActregulatorComponent', () => {
  let component: SupadminViewActregulatorComponent;
  let fixture: ComponentFixture<SupadminViewActregulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminViewActregulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminViewActregulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
