import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminPenaltyCategoryComponent } from './supadmin-penalty-category.component';

describe('SupadminPenaltyCategoryComponent', () => {
  let component: SupadminPenaltyCategoryComponent;
  let fixture: ComponentFixture<SupadminPenaltyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminPenaltyCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminPenaltyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
