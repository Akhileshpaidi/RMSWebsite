import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAssessmentTestAttrComponent } from './control-assessment-test-attr.component';

describe('ControlAssessmentTestAttrComponent', () => {
  let component: ControlAssessmentTestAttrComponent;
  let fixture: ComponentFixture<ControlAssessmentTestAttrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAssessmentTestAttrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAssessmentTestAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
