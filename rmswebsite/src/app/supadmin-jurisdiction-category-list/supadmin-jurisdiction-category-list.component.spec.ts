import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminJurisdictionCategoryListComponent } from './supadmin-jurisdiction-category-list.component';

describe('SupadminJurisdictionCategoryListComponent', () => {
  let component: SupadminJurisdictionCategoryListComponent;
  let fixture: ComponentFixture<SupadminJurisdictionCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminJurisdictionCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminJurisdictionCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
