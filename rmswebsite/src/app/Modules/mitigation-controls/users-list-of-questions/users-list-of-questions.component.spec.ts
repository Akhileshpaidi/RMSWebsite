import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListOfQuestionsComponent } from './users-list-of-questions.component';

describe('UsersListOfQuestionsComponent', () => {
  let component: UsersListOfQuestionsComponent;
  let fixture: ComponentFixture<UsersListOfQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListOfQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListOfQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
