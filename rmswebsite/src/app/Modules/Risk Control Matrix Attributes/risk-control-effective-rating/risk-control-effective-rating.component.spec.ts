import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskControlEffectiveRatingComponent } from './risk-control-effective-rating.component';

describe('RiskControlEffectiveRatingComponent', () => {
  let component: RiskControlEffectiveRatingComponent;
  let fixture: ComponentFixture<RiskControlEffectiveRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskControlEffectiveRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskControlEffectiveRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
