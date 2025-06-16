import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContrasstestattComponent } from './risk-admin-contrasstestatt.component';

describe('RiskAdminContrasstestattComponent', () => {
  let component: RiskAdminContrasstestattComponent;
  let fixture: ComponentFixture<RiskAdminContrasstestattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContrasstestattComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContrasstestattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
