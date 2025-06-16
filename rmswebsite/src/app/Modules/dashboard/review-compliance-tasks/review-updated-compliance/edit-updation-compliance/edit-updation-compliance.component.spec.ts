import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUpdationComplianceComponent } from './edit-updation-compliance.component';

describe('EditUpdationComplianceComponent', () => {
  let component: EditUpdationComplianceComponent;
  let fixture: ComponentFixture<EditUpdationComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUpdationComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUpdationComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
