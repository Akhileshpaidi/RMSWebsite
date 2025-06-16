import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentversoninglistComponent } from './documentversoninglist.component';

describe('DocumentversoninglistComponent', () => {
  let component: DocumentversoninglistComponent;
  let fixture: ComponentFixture<DocumentversoninglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentversoninglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentversoninglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
