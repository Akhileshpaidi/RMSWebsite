import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActRuleRegulationComponent } from './view-act-rule-regulation.component';

describe('ViewActRuleRegulationComponent', () => {
  let component: ViewActRuleRegulationComponent;
  let fixture: ComponentFixture<ViewActRuleRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActRuleRegulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActRuleRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
