import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminSubRegionMasterComponent } from './supadmin-sub-region-master.component';

describe('SupadminSubRegionMasterComponent', () => {
  let component: SupadminSubRegionMasterComponent;
  let fixture: ComponentFixture<SupadminSubRegionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminSubRegionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminSubRegionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
