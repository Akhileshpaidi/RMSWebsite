import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMappingComplianceComponent } from './update-mapping-compliance.component';

describe('UpdateMappingComplianceComponent', () => {
  let component: UpdateMappingComplianceComponent;
  let fixture: ComponentFixture<UpdateMappingComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMappingComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMappingComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
