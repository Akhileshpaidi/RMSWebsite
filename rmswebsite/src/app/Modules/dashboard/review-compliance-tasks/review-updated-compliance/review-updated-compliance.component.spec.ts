import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUpdatedComplianceComponent } from './review-updated-compliance.component';

describe('ReviewUpdatedComplianceComponent', () => {
  let component: ReviewUpdatedComplianceComponent;
  let fixture: ComponentFixture<ReviewUpdatedComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewUpdatedComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewUpdatedComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
