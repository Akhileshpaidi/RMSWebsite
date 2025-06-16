import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfDocumentComponent } from './nature-of-document.component';

describe('NatureOfDocumentComponent', () => {
  let component: NatureOfDocumentComponent;
  let fixture: ComponentFixture<NatureOfDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureOfDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureOfDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
