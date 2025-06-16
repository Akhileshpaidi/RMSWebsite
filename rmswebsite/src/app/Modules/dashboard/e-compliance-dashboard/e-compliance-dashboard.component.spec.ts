import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EComplianceDashboardComponent } from './e-compliance-dashboard.component';

describe('EComplianceDashboardComponent', () => {
  let component: EComplianceDashboardComponent;
  let fixture: ComponentFixture<EComplianceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EComplianceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EComplianceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
