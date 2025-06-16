import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankReserveListingComponent } from './question-bank-reserve-listing.component';

describe('QuestionBankReserveListingComponent', () => {
  let component: QuestionBankReserveListingComponent;
  let fixture: ComponentFixture<QuestionBankReserveListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankReserveListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBankReserveListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
