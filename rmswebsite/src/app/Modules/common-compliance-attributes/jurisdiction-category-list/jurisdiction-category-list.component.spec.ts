import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionCategoryListComponent } from './jurisdiction-category-list.component';

describe('JurisdictionCategoryListComponent', () => {
  let component: JurisdictionCategoryListComponent;
  let fixture: ComponentFixture<JurisdictionCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JurisdictionCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JurisdictionCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
