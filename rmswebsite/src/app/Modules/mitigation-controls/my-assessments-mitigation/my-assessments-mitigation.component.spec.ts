import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssessmentsMitigationComponent } from './my-assessments-mitigation.component';

describe('MyAssessmentsMitigationComponent', () => {
  let component: MyAssessmentsMitigationComponent;
  let fixture: ComponentFixture<MyAssessmentsMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAssessmentsMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAssessmentsMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
