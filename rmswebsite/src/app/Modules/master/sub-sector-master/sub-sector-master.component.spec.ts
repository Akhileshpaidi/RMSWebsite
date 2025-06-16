import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectorMasterComponent } from './sub-sector-master.component';

describe('SubSectorMasterComponent', () => {
  let component: SubSectorMasterComponent;
  let fixture: ComponentFixture<SubSectorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSectorMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSectorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
