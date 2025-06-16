import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalityCategoryComponent } from './penality-category.component';

describe('PenalityCategoryComponent', () => {
  let component: PenalityCategoryComponent;
  let fixture: ComponentFixture<PenalityCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenalityCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenalityCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
