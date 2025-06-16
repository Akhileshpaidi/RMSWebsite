import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewDisableComponent } from './document-review-disable.component';

describe('DocumentReviewDisableComponent', () => {
  let component: DocumentReviewDisableComponent;
  let fixture: ComponentFixture<DocumentReviewDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReviewDisableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentReviewDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
