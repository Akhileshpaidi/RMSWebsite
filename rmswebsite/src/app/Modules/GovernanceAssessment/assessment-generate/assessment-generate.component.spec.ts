import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentGenerateComponent } from './assessment-generate.component';

describe('AssessmentGenerateComponent', () => {
  let component: AssessmentGenerateComponent;
  let fixture: ComponentFixture<AssessmentGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
