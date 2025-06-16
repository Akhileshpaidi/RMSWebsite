import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskRegisterDailogeComponent } from './risk-register-dailoge.component';

describe('RiskRegisterDailogeComponent', () => {
  let component: RiskRegisterDailogeComponent;
  let fixture: ComponentFixture<RiskRegisterDailogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskRegisterDailogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskRegisterDailogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
