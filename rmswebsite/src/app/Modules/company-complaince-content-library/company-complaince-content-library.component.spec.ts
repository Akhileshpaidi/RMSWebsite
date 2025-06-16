import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComplainceContentLibraryComponent } from './company-complaince-content-library.component';

describe('CompanyComplainceContentLibraryComponent', () => {
  let component: CompanyComplainceContentLibraryComponent;
  let fixture: ComponentFixture<CompanyComplainceContentLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyComplainceContentLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyComplainceContentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
