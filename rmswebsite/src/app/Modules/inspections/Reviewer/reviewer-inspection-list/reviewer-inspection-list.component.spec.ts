import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerInspectionListComponent } from './reviewer-inspection-list.component';

describe('ReviewerInspectionListComponent', () => {
  let component: ReviewerInspectionListComponent;
  let fixture: ComponentFixture<ReviewerInspectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerInspectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
