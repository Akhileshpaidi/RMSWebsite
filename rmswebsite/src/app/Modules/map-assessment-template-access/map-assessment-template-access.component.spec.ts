import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAssessmentTemplateAccessComponent } from './map-assessment-template-access.component';

describe('MapAssessmentTemplateAccessComponent', () => {
  let component: MapAssessmentTemplateAccessComponent;
  let fixture: ComponentFixture<MapAssessmentTemplateAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAssessmentTemplateAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAssessmentTemplateAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
