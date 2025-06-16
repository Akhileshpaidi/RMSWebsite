import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUserAccessComponent } from './doc-user-access.component';

describe('DocUserAccessComponent', () => {
  let component: DocUserAccessComponent;
  let fixture: ComponentFixture<DocUserAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocUserAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
