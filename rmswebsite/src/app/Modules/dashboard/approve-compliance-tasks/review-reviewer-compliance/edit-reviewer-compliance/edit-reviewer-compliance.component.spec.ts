import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewerComplianceComponent } from './edit-reviewer-compliance.component';

describe('EditReviewerComplianceComponent', () => {
  let component: EditReviewerComplianceComponent;
  let fixture: ComponentFixture<EditReviewerComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewerComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReviewerComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
