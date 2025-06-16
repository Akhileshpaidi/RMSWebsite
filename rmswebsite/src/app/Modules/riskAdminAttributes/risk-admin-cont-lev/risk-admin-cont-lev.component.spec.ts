import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContLevComponent } from './risk-admin-cont-lev.component';

describe('RiskAdminContLevComponent', () => {
  let component: RiskAdminContLevComponent;
  let fixture: ComponentFixture<RiskAdminContLevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContLevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContLevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
