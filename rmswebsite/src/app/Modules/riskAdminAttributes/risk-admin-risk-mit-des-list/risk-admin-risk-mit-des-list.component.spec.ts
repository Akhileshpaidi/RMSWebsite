import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskMitDesListComponent } from './risk-admin-risk-mit-des-list.component';

describe('RiskAdminRiskMitDesListComponent', () => {
  let component: RiskAdminRiskMitDesListComponent;
  let fixture: ComponentFixture<RiskAdminRiskMitDesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskMitDesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskMitDesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
