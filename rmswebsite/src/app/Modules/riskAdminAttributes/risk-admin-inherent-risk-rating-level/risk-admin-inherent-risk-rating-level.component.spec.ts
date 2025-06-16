import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminInherentRiskRatingLevelComponent } from './risk-admin-inherent-risk-rating-level.component';

describe('RiskAdminInherentRiskRatingLevelComponent', () => {
  let component: RiskAdminInherentRiskRatingLevelComponent;
  let fixture: ComponentFixture<RiskAdminInherentRiskRatingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminInherentRiskRatingLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminInherentRiskRatingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
