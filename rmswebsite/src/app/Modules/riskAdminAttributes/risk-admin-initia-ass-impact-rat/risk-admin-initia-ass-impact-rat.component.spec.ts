import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminInitiaAssImpactRatComponent } from './risk-admin-initia-ass-impact-rat.component';

describe('RiskAdminInitiaAssImpactRatComponent', () => {
  let component: RiskAdminInitiaAssImpactRatComponent;
  let fixture: ComponentFixture<RiskAdminInitiaAssImpactRatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminInitiaAssImpactRatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminInitiaAssImpactRatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
