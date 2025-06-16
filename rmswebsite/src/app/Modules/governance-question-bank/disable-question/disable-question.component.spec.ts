import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableQuestionComponent } from './disable-question.component';

describe('DisableQuestionComponent', () => {
  let component: DisableQuestionComponent;
  let fixture: ComponentFixture<DisableQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
