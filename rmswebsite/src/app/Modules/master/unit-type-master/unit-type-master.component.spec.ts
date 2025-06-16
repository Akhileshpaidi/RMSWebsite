import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeMasterComponent } from './unit-type-master.component';

describe('UnitTypeMasterComponent', () => {
  let component: UnitTypeMasterComponent;
  let fixture: ComponentFixture<UnitTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitTypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
