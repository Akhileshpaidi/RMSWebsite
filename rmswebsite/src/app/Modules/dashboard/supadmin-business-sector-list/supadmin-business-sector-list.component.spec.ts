import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminBusinessSectorListComponent } from './supadmin-business-sector-list.component';

describe('SupadminBusinessSectorListComponent', () => {
  let component: SupadminBusinessSectorListComponent;
  let fixture: ComponentFixture<SupadminBusinessSectorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminBusinessSectorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminBusinessSectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
