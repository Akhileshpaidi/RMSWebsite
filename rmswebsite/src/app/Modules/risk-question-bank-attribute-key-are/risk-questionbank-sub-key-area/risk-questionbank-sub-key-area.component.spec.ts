import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskQuestionbankSubKeyAreaComponent } from './risk-questionbank-sub-key-area.component';

describe('RiskQuestionbankSubKeyAreaComponent', () => {
  let component: RiskQuestionbankSubKeyAreaComponent;
  let fixture: ComponentFixture<RiskQuestionbankSubKeyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskQuestionbankSubKeyAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskQuestionbankSubKeyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
