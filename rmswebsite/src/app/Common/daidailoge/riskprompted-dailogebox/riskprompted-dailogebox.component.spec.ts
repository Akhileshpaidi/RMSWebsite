import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskpromptedDailogeboxComponent } from './riskprompted-dailogebox.component';

describe('RiskpromptedDailogeboxComponent', () => {
  let component: RiskpromptedDailogeboxComponent;
  let fixture: ComponentFixture<RiskpromptedDailogeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskpromptedDailogeboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskpromptedDailogeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
