import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminRegionMasterComponent } from './supadmin-region-master.component';

describe('SupadminRegionMasterComponent', () => {
  let component: SupadminRegionMasterComponent;
  let fixture: ComponentFixture<SupadminRegionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminRegionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminRegionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
