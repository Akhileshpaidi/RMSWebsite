import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMitigDecisionListComponent } from './risk-mitig-decision-list.component';

describe('RiskMitigDecisionListComponent', () => {
  let component: RiskMitigDecisionListComponent;
  let fixture: ComponentFixture<RiskMitigDecisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskMitigDecisionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskMitigDecisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
