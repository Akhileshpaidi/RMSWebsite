import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminEntitytypeMasterComponent } from './supadmin-entitytype-master.component';

describe('SupadminEntitytypeMasterComponent', () => {
  let component: SupadminEntitytypeMasterComponent;
  let fixture: ComponentFixture<SupadminEntitytypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminEntitytypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminEntitytypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
