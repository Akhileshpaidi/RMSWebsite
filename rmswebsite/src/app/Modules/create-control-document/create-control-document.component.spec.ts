import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateControlDocumentComponent } from './create-control-document.component';

describe('CreateControlDocumentComponent', () => {
  let component: CreateControlDocumentComponent;
  let fixture: ComponentFixture<CreateControlDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateControlDocumentComponent ]
    })
    .compileComponents();
    

    fixture = TestBed.createComponent(CreateControlDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

