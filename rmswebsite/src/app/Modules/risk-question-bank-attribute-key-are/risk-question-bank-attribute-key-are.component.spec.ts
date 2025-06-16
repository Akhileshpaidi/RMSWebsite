import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskQuestionBankAttributeKeyAreComponent } from './risk-question-bank-attribute-key-are.component';

describe('RiskQuestionBankAttributeKeyAreComponent', () => {
  let component: RiskQuestionBankAttributeKeyAreComponent;
  let fixture: ComponentFixture<RiskQuestionBankAttributeKeyAreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskQuestionBankAttributeKeyAreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskQuestionBankAttributeKeyAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
