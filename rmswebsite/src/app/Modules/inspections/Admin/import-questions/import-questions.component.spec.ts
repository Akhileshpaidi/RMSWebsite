import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportQuestionsComponent } from './import-questions.component';

describe('ImportQuestionsComponent', () => {
  let component: ImportQuestionsComponent;
  let fixture: ComponentFixture<ImportQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
