import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRegionMasterComponent } from './sub-region-master.component';

describe('SubRegionMasterComponent', () => {
  let component: SubRegionMasterComponent;
  let fixture: ComponentFixture<SubRegionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRegionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubRegionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
