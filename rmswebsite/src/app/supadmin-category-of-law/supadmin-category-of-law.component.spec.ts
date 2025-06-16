import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminCategoryOfLawComponent } from './supadmin-category-of-law.component';

describe('SupadminCategoryOfLawComponent', () => {
  let component: SupadminCategoryOfLawComponent;
  let fixture: ComponentFixture<SupadminCategoryOfLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminCategoryOfLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminCategoryOfLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
