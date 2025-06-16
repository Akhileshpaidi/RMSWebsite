import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminAddcompliancepenaltyComponent } from './supadmin-addcompliancepenalty.component';

describe('SupadminAddcompliancepenaltyComponent', () => {
  let component: SupadminAddcompliancepenaltyComponent;
  let fixture: ComponentFixture<SupadminAddcompliancepenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminAddcompliancepenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminAddcompliancepenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
