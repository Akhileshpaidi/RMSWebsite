import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTreatmentDecisionListComponent } from './risk-treatment-decision-list.component';

describe('RiskTreatmentDecisionListComponent', () => {
  let component: RiskTreatmentDecisionListComponent;
  let fixture: ComponentFixture<RiskTreatmentDecisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskTreatmentDecisionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskTreatmentDecisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
