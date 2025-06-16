import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewVersionChangeComponent } from './document-review-version-change.component';

describe('DocumentReviewVersionChangeComponent', () => {
  let component: DocumentReviewVersionChangeComponent;
  let fixture: ComponentFixture<DocumentReviewVersionChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReviewVersionChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentReviewVersionChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
