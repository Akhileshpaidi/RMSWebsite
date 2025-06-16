import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTreatmentDecisionMatrixComponent } from './risk-treatment-decision-matrix.component';

describe('RiskTreatmentDecisionMatrixComponent', () => {
  let component: RiskTreatmentDecisionMatrixComponent;
  let fixture: ComponentFixture<RiskTreatmentDecisionMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskTreatmentDecisionMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskTreatmentDecisionMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
