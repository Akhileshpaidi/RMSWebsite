import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckreqassessmentComponent } from './ackreqassessment.component';

describe('AckreqassessmentComponent', () => {
  let component: AckreqassessmentComponent;
  let fixture: ComponentFixture<AckreqassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AckreqassessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AckreqassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
