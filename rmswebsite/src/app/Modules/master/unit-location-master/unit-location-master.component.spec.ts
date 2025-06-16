import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLocationMasterComponent } from './unit-location-master.component';

describe('UnitLocationMasterComponent', () => {
  let component: UnitLocationMasterComponent;
  let fixture: ComponentFixture<UnitLocationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitLocationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitLocationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
