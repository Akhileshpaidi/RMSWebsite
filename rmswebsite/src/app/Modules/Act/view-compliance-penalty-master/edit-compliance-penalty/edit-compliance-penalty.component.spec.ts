import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompliancePenaltyComponent } from './edit-compliance-penalty.component';

describe('EditCompliancePenaltyComponent', () => {
  let component: EditCompliancePenaltyComponent;
  let fixture: ComponentFixture<EditCompliancePenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompliancePenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCompliancePenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
