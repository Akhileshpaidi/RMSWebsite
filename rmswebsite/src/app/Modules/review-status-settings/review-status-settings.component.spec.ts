import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStatusSettingsComponent } from './review-status-settings.component';

describe('ReviewStatusSettingsComponent', () => {
  let component: ReviewStatusSettingsComponent;
  let fixture: ComponentFixture<ReviewStatusSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewStatusSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewStatusSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
