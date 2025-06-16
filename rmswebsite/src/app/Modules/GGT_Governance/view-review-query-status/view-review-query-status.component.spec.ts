import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewQueryStatusComponent } from './view-review-query-status.component';

describe('ViewReviewQueryStatusComponent', () => {
  let component: ViewReviewQueryStatusComponent;
  let fixture: ComponentFixture<ViewReviewQueryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReviewQueryStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReviewQueryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
