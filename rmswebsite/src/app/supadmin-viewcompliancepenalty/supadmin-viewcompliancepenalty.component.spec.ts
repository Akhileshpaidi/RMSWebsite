import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminViewcompliancepenaltyComponent } from './supadmin-viewcompliancepenalty.component';

describe('SupadminViewcompliancepenaltyComponent', () => {
  let component: SupadminViewcompliancepenaltyComponent;
  let fixture: ComponentFixture<SupadminViewcompliancepenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminViewcompliancepenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminViewcompliancepenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
