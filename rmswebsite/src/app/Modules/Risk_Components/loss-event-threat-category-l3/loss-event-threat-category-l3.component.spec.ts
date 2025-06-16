import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossEventThreatCategoryL3Component } from './loss-event-threat-category-l3.component';

describe('LossEventThreatCategoryL3Component', () => {
  let component: LossEventThreatCategoryL3Component;
  let fixture: ComponentFixture<LossEventThreatCategoryL3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossEventThreatCategoryL3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LossEventThreatCategoryL3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
