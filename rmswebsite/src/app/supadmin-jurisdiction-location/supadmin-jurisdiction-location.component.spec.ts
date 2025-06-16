import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminJurisdictionLocationComponent } from './supadmin-jurisdiction-location.component';

describe('SupadminJurisdictionLocationComponent', () => {
  let component: SupadminJurisdictionLocationComponent;
  let fixture: ComponentFixture<SupadminJurisdictionLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminJurisdictionLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminJurisdictionLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
