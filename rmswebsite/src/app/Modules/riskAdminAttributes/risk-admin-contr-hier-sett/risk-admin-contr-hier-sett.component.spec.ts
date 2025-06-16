import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContrHierSettComponent } from './risk-admin-contr-hier-sett.component';

describe('RiskAdminContrHierSettComponent', () => {
  let component: RiskAdminContrHierSettComponent;
  let fixture: ComponentFixture<RiskAdminContrHierSettComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContrHierSettComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContrHierSettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
