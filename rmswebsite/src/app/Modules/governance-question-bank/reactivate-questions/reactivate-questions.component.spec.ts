import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateQuestionsComponent } from './reactivate-questions.component';

describe('ReactivateQuestionsComponent', () => {
  let component: ReactivateQuestionsComponent;
  let fixture: ComponentFixture<ReactivateQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivateQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivateQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
