import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRemedyComponent } from './import-remedy.component';

describe('ImportRemedyComponent', () => {
  let component: ImportRemedyComponent;
  let fixture: ComponentFixture<ImportRemedyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRemedyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportRemedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
