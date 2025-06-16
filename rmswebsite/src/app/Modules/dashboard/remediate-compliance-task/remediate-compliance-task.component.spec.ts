import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemediateComplianceTaskComponent } from './remediate-compliance-task.component';

describe('RemediateComplianceTaskComponent', () => {
  let component: RemediateComplianceTaskComponent;
  let fixture: ComponentFixture<RemediateComplianceTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemediateComplianceTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemediateComplianceTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
