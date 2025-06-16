import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgeMonitoredAssessMitigationComponent } from './acknowledge-monitored-assess-mitigation.component';

describe('AcknowledgeMonitoredAssessMitigationComponent', () => {
  let component: AcknowledgeMonitoredAssessMitigationComponent;
  let fixture: ComponentFixture<AcknowledgeMonitoredAssessMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcknowledgeMonitoredAssessMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcknowledgeMonitoredAssessMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
