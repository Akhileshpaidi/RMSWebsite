import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPriorityComponent } from './risk-priority.component';

describe('RiskPriorityComponent', () => {
  let component: RiskPriorityComponent;
  let fixture: ComponentFixture<RiskPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskPriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
