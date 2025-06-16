import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewUpdateComponent } from './document-review-update.component';

describe('DocumentReviewUpdateComponent', () => {
  let component: DocumentReviewUpdateComponent;
  let fixture: ComponentFixture<DocumentReviewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReviewUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentReviewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
