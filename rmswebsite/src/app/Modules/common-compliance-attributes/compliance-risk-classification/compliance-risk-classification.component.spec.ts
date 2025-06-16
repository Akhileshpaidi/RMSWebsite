import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceRiskClassificationComponent } from './compliance-risk-classification.component';

describe('ComplianceRiskClassificationComponent', () => {
  let component: ComplianceRiskClassificationComponent;
  let fixture: ComponentFixture<ComplianceRiskClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceRiskClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceRiskClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
