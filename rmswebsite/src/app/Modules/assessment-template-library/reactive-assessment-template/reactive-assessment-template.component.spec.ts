import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveAssessmentTemplateComponent } from './reactive-assessment-template.component';

describe('ReactiveAssessmentTemplateComponent', () => {
  let component: ReactiveAssessmentTemplateComponent;
  let fixture: ComponentFixture<ReactiveAssessmentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveAssessmentTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveAssessmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
