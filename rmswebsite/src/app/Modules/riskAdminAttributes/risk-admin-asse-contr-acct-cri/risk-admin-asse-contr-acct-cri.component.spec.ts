import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminAsseContrAcctCriComponent } from './risk-admin-asse-contr-acct-cri.component';

describe('RiskAdminAsseContrAcctCriComponent', () => {
  let component: RiskAdminAsseContrAcctCriComponent;
  let fixture: ComponentFixture<RiskAdminAsseContrAcctCriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminAsseContrAcctCriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminAsseContrAcctCriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
