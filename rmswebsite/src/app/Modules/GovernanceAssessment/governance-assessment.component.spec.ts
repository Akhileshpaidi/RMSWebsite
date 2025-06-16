import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernanceAssessmentComponent } from './governance-assessment.component';

describe('GovernanceAssessmentComponent', () => {
  let component: GovernanceAssessmentComponent;
  let fixture: ComponentFixture<GovernanceAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernanceAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernanceAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
