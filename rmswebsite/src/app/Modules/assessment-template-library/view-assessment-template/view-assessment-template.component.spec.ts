import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentTemplateComponent } from './view-assessment-template.component';

describe('ViewAssessmentTemplateComponent', () => {
  let component: ViewAssessmentTemplateComponent;
  let fixture: ComponentFixture<ViewAssessmentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssessmentTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssessmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
