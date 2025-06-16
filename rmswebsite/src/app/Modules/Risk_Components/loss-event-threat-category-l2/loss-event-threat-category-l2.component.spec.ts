import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossEventThreatCategoryL2Component } from './loss-event-threat-category-l2.component';

describe('LossEventThreatCategoryL2Component', () => {
  let component: LossEventThreatCategoryL2Component;
  let fixture: ComponentFixture<LossEventThreatCategoryL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossEventThreatCategoryL2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LossEventThreatCategoryL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
