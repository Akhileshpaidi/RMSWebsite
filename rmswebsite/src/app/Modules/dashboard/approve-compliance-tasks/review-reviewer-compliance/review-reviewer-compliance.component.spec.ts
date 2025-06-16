import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReviewerComplianceComponent } from './review-reviewer-compliance.component';

describe('ReviewReviewerComplianceComponent', () => {
  let component: ReviewReviewerComplianceComponent;
  let fixture: ComponentFixture<ReviewReviewerComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewReviewerComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewReviewerComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
