import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfComplianceMasterComponent } from './type-of-compliance-master.component';

describe('TypeOfComplianceMasterComponent', () => {
  let component: TypeOfComplianceMasterComponent;
  let fixture: ComponentFixture<TypeOfComplianceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfComplianceMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfComplianceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
