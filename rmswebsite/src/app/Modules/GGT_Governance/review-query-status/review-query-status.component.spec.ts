import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewQueryStatusComponent } from './review-query-status.component';

describe('ReviewQueryStatusComponent', () => {
  let component: ReviewQueryStatusComponent;
  let fixture: ComponentFixture<ReviewQueryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewQueryStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewQueryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
