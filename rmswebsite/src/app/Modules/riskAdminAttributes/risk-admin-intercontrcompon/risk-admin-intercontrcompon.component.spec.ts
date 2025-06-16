import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminIntercontrcomponComponent } from './risk-admin-intercontrcompon.component';

describe('RiskAdminIntercontrcomponComponent', () => {
  let component: RiskAdminIntercontrcomponComponent;
  let fixture: ComponentFixture<RiskAdminIntercontrcomponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminIntercontrcomponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminIntercontrcomponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
