import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorMasterComponent } from './sector-master.component';

describe('SectorMasterComponent', () => {
  let component: SectorMasterComponent;
  let fixture: ComponentFixture<SectorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
