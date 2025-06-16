import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedAssessmentComponent } from './customized-assessment.component';

describe('CustomizedAssessmentComponent', () => {
  let component: CustomizedAssessmentComponent;
  let fixture: ComponentFixture<CustomizedAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizedAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
