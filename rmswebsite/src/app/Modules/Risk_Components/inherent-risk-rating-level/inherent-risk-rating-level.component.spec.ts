import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InherentRiskRatingLevelComponent } from './inherent-risk-rating-level.component';

describe('InherentRiskRatingLevelComponent', () => {
  let component: InherentRiskRatingLevelComponent;
  let fixture: ComponentFixture<InherentRiskRatingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InherentRiskRatingLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InherentRiskRatingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
