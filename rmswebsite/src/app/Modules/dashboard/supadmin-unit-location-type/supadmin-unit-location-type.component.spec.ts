import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminUnitLocationTypeComponent } from './supadmin-unit-location-type.component';

describe('SupadminUnitLocationTypeComponent', () => {
  let component: SupadminUnitLocationTypeComponent;
  let fixture: ComponentFixture<SupadminUnitLocationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminUnitLocationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminUnitLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
