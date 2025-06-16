import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskadmincontrolmonitoringmechanismComponent } from './riskadmincontrolmonitoringmechanism.component';

describe('RiskadmincontrolmonitoringmechanismComponent', () => {
  let component: RiskadmincontrolmonitoringmechanismComponent;
  let fixture: ComponentFixture<RiskadmincontrolmonitoringmechanismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskadmincontrolmonitoringmechanismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskadmincontrolmonitoringmechanismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
