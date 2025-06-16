import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonComplianceLibraryAttributesComponent } from './common-compliance-library-attributes.component';

describe('CommonComplianceLibraryAttributesComponent', () => {
  let component: CommonComplianceLibraryAttributesComponent;
  let fixture: ComponentFixture<CommonComplianceLibraryAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonComplianceLibraryAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonComplianceLibraryAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
