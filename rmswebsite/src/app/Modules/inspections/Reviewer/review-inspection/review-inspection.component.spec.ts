import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInspectionComponent } from './review-inspection.component';

describe('ReviewInspectionComponent', () => {
  let component: ReviewInspectionComponent;
  let fixture: ComponentFixture<ReviewInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
