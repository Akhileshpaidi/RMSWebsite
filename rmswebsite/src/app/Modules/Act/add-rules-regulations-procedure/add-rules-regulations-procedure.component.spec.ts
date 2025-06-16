import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRulesRegulationsProcedureComponent } from './add-rules-regulations-procedure.component';

describe('AddRulesRegulationsProcedureComponent', () => {
  let component: AddRulesRegulationsProcedureComponent;
  let fixture: ComponentFixture<AddRulesRegulationsProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRulesRegulationsProcedureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRulesRegulationsProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
