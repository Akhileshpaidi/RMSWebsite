import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminActRegulatorMasterComponent } from './supadmin-act-regulator-master.component';

describe('SupadminActRegulatorMasterComponent', () => {
  let component: SupadminActRegulatorMasterComponent;
  let fixture: ComponentFixture<SupadminActRegulatorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminActRegulatorMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminActRegulatorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
