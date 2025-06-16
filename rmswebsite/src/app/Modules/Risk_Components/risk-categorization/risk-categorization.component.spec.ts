import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCategorizationComponent } from './risk-categorization.component';

describe('RiskCategorizationComponent', () => {
  let component: RiskCategorizationComponent;
  let fixture: ComponentFixture<RiskCategorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCategorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
