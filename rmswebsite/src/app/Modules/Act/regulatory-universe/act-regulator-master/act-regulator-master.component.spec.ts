import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActRegulatorMasterComponent } from './act-regulator-master.component';

describe('ActRegulatorMasterComponent', () => {
  let component: ActRegulatorMasterComponent;
  let fixture: ComponentFixture<ActRegulatorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActRegulatorMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActRegulatorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
