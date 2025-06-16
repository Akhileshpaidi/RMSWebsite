import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessPerfIndicatorsAnalysisComponent } from './assess-perf-indicators-analysis.component';

describe('AssessPerfIndicatorsAnalysisComponent', () => {
  let component: AssessPerfIndicatorsAnalysisComponent;
  let fixture: ComponentFixture<AssessPerfIndicatorsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessPerfIndicatorsAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessPerfIndicatorsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
