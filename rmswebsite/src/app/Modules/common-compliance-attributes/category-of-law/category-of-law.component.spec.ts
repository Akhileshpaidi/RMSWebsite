import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOfLawComponent } from './category-of-law.component';

describe('CategoryOfLawComponent', () => {
  let component: CategoryOfLawComponent;
  let fixture: ComponentFixture<CategoryOfLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryOfLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryOfLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
