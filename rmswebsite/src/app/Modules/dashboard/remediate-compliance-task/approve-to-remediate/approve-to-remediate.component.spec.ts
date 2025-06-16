import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveToRemediateComponent } from './approve-to-remediate.component';

describe('ApproveToRemediateComponent', () => {
  let component: ApproveToRemediateComponent;
  let fixture: ComponentFixture<ApproveToRemediateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveToRemediateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveToRemediateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
