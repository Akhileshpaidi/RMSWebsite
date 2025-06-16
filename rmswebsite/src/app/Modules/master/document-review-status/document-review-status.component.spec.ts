import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewStatusComponent } from './document-review-status.component';

describe('DocumentReviewStatusComponent', () => {
  let component: DocumentReviewStatusComponent;
  let fixture: ComponentFixture<DocumentReviewStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReviewStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
