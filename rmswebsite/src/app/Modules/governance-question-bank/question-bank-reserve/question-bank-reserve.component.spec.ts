import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankReserveComponent } from './question-bank-reserve.component';

describe('QuestionBankReserveComponent', () => {
  let component: QuestionBankReserveComponent;
  let fixture: ComponentFixture<QuestionBankReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankReserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBankReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
