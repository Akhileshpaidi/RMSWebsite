import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminRiskCauseListComponent } from './risk-admin-risk-cause-list.component';

describe('RiskAdminRiskCauseListComponent', () => {
  let component: RiskAdminRiskCauseListComponent;
  let fixture: ComponentFixture<RiskAdminRiskCauseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminRiskCauseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminRiskCauseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
