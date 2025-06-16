import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalComplianceContentLibraryComponent } from './global-compliance-content-library.component';

describe('GlobalComplianceContentLibraryComponent', () => {
  let component: GlobalComplianceContentLibraryComponent;
  let fixture: ComponentFixture<GlobalComplianceContentLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalComplianceContentLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalComplianceContentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
