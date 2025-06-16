import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossEventThreatCategoryL1Component } from './loss-event-threat-category-l1.component';

describe('LossEventThreatCategoryL1Component', () => {
  let component: LossEventThreatCategoryL1Component;
  let fixture: ComponentFixture<LossEventThreatCategoryL1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossEventThreatCategoryL1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LossEventThreatCategoryL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
