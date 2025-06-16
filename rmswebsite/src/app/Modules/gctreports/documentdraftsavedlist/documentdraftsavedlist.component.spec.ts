import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdraftsavedlistComponent } from './documentdraftsavedlist.component';

describe('DocumentdraftsavedlistComponent', () => {
  let component: DocumentdraftsavedlistComponent;
  let fixture: ComponentFixture<DocumentdraftsavedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentdraftsavedlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentdraftsavedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
