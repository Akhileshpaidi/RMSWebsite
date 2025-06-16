import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionBankListingComponent } from './my-question-bank-listing.component';

describe('MyQuestionBankListingComponent', () => {
  let component: MyQuestionBankListingComponent;
  let fixture: ComponentFixture<MyQuestionBankListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyQuestionBankListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyQuestionBankListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
