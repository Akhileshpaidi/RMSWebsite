import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminEditRuleregulationComponent } from './superadmin-edit-ruleregulation.component';

describe('SuperadminEditRuleregulationComponent', () => {
  let component: SuperadminEditRuleregulationComponent;
  let fixture: ComponentFixture<SuperadminEditRuleregulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminEditRuleregulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminEditRuleregulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
