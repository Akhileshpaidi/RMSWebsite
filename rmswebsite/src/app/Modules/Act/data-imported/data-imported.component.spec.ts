import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImportedComponent } from './data-imported.component';

describe('DataImportedComponent', () => {
  let component: DataImportedComponent;
  let fixture: ComponentFixture<DataImportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataImportedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataImportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
