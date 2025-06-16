import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminResiduRiskRatComponent } from './risk-admin-residu-risk-rat.component';

describe('RiskAdminResiduRiskRatComponent', () => {
  let component: RiskAdminResiduRiskRatComponent;
  let fixture: ComponentFixture<RiskAdminResiduRiskRatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminResiduRiskRatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminResiduRiskRatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
