import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveComplianceTasksComponent } from './approve-compliance-tasks.component';

describe('ApproveComplianceTasksComponent', () => {
  let component: ApproveComplianceTasksComponent;
  let fixture: ComponentFixture<ApproveComplianceTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveComplianceTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveComplianceTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
