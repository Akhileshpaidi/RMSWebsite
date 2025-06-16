import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpMaturityRatingScaleComponent } from './bp-maturity-rating-scale.component';

describe('BpMaturityRatingScaleComponent', () => {
  let component: BpMaturityRatingScaleComponent;
  let fixture: ComponentFixture<BpMaturityRatingScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpMaturityRatingScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpMaturityRatingScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
