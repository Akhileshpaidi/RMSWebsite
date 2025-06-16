import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActRuleRegulationComponent } from './edit-act-rule-regulation.component';

describe('EditActRuleRegulationComponent', () => {
  let component: EditActRuleRegulationComponent;
  let fixture: ComponentFixture<EditActRuleRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActRuleRegulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActRuleRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
