import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskCOnteffRatComponent } from './risk-admin-risk-conteff-rat.component';

describe('RiskAdminRiskCOnteffRatComponent', () => {
  let component: RiskAdminRiskCOnteffRatComponent;
  let fixture: ComponentFixture<RiskAdminRiskCOnteffRatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskCOnteffRatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskCOnteffRatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
