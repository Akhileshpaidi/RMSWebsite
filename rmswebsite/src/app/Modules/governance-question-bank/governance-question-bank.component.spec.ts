import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernanceQuestionBankComponent } from './governance-question-bank.component';

describe('GovernanceQuestionBankComponent', () => {
  let component: GovernanceQuestionBankComponent;
  let fixture: ComponentFixture<GovernanceQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernanceQuestionBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernanceQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
