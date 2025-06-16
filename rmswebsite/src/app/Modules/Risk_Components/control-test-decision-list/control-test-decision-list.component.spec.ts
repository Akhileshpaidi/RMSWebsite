import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTestDecisionListComponent } from './control-test-decision-list.component';

describe('ControlTestDecisionListComponent', () => {
  let component: ControlTestDecisionListComponent;
  let fixture: ComponentFixture<ControlTestDecisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTestDecisionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlTestDecisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
