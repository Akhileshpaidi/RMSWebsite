import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewquestionsComponent } from './addnewquestions.component';

describe('AddnewquestionsComponent', () => {
  let component: AddnewquestionsComponent;
  let fixture: ComponentFixture<AddnewquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewquestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
