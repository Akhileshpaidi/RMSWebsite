import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadQuestionsComponent } from './bulk-upload-questions.component';

describe('BulkUploadQuestionsComponent', () => {
  let component: BulkUploadQuestionsComponent;
  let fixture: ComponentFixture<BulkUploadQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUploadQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
