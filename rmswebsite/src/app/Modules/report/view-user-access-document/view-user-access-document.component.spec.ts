import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserAccessDocumentComponent } from './view-user-access-document.component';

describe('ViewUserAccessDocumentComponent', () => {
  let component: ViewUserAccessDocumentComponent;
  let fixture: ComponentFixture<ViewUserAccessDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserAccessDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserAccessDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
