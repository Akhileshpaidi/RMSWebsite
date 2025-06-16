import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableAssessmentTemplateComponent } from './disable-assessment-template.component';

describe('DisableAssessmentTemplateComponent', () => {
  let component: DisableAssessmentTemplateComponent;
  let fixture: ComponentFixture<DisableAssessmentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableAssessmentTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableAssessmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
