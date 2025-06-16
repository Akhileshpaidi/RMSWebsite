import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationActionPlanComponent } from './mitigation-action-plan.component';

describe('MitigationActionPlanComponent', () => {
  let component: MitigationActionPlanComponent;
  let fixture: ComponentFixture<MitigationActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitigationActionPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitigationActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
