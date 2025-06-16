import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAccessStatusListComponent } from './doc-access-status-list.component';

describe('DocAccessStatusListComponent', () => {
  let component: DocAccessStatusListComponent;
  let fixture: ComponentFixture<DocAccessStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAccessStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAccessStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
