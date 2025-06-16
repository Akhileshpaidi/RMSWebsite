import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminHolidayMasterComponent } from './supadmin-holiday-master.component';

describe('SupadminHolidayMasterComponent', () => {
  let component: SupadminHolidayMasterComponent;
  let fixture: ComponentFixture<SupadminHolidayMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminHolidayMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminHolidayMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
