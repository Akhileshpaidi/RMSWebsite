import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTemplateLibraryComponent } from './assessment-template-library.component';

describe('AssessmentTemplateLibraryComponent', () => {
  let component: AssessmentTemplateLibraryComponent;
  let fixture: ComponentFixture<AssessmentTemplateLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentTemplateLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentTemplateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
