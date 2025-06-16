import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSectionComponent } from './import-section.component';

describe('ImportSectionComponent', () => {
  let component: ImportSectionComponent;
  let fixture: ComponentFixture<ImportSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
