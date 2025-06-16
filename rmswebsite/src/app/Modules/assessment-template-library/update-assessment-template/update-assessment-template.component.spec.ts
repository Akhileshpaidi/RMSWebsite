import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssessmentTemplateComponent } from './update-assessment-template.component';

describe('UpdateAssessmentTemplateComponent', () => {
  let component: UpdateAssessmentTemplateComponent;
  let fixture: ComponentFixture<UpdateAssessmentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssessmentTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAssessmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
