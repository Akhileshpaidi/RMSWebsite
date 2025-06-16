import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRepositoryComponent } from './doc-repository.component';

describe('DocRepositoryComponent', () => {
  let component: DocRepositoryComponent;
  let fixture: ComponentFixture<DocRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
