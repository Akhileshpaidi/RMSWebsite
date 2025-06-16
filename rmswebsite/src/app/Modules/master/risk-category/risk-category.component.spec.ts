import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCategoryComponent } from './risk-category.component';

describe('RiskCategoryComponent', () => {
  let component: RiskCategoryComponent;
  let fixture: ComponentFixture<RiskCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
