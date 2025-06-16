import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AduitComplianceTasksComponent } from './aduit-compliance-tasks.component';

describe('AduitComplianceTasksComponent', () => {
  let component: AduitComplianceTasksComponent;
  let fixture: ComponentFixture<AduitComplianceTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AduitComplianceTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AduitComplianceTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
