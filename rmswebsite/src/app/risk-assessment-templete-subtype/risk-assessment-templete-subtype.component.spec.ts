import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentTempleteSubtypeComponent } from './risk-assessment-templete-subtype.component';

describe('RiskAssessmentTempleteSubtypeComponent', () => {
  let component: RiskAssessmentTempleteSubtypeComponent;
  let fixture: ComponentFixture<RiskAssessmentTempleteSubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAssessmentTempleteSubtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAssessmentTempleteSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
