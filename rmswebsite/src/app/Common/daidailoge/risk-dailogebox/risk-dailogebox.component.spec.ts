import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskDailogeboxComponent } from './risk-dailogebox.component';

describe('RiskDailogeboxComponent', () => {
  let component: RiskDailogeboxComponent;
  let fixture: ComponentFixture<RiskDailogeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskDailogeboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskDailogeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
