import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComplianceTasksComponent } from './review-compliance-tasks.component';

describe('ReviewComplianceTasksComponent', () => {
  let component: ReviewComplianceTasksComponent;
  let fixture: ComponentFixture<ReviewComplianceTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewComplianceTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComplianceTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
