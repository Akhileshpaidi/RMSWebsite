import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContActNatureComponent } from './risk-admin-cont-act-nature.component';

describe('RiskAdminContActNatureComponent', () => {
  let component: RiskAdminContActNatureComponent;
  let fixture: ComponentFixture<RiskAdminContActNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContActNatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContActNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
