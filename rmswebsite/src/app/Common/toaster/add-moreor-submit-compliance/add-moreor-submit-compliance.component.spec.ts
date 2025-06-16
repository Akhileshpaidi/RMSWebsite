import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreorSubmitComplianceComponent } from './add-moreor-submit-compliance.component';

describe('AddMoreorSubmitComplianceComponent', () => {
  let component: AddMoreorSubmitComplianceComponent;
  let fixture: ComponentFixture<AddMoreorSubmitComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoreorSubmitComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMoreorSubmitComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
