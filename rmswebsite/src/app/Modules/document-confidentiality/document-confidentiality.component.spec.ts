import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentConfidentialityComponent } from './document-confidentiality.component';

describe('DocumentConfidentialityComponent', () => {
  let component: DocumentConfidentialityComponent;
  let fixture: ComponentFixture<DocumentConfidentialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentConfidentialityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentConfidentialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
