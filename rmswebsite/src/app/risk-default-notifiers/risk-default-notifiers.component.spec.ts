import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskDefaultNotifiersComponent } from './risk-default-notifiers.component';

describe('RiskDefaultNotifiersComponent', () => {
  let component: RiskDefaultNotifiersComponent;
  let fixture: ComponentFixture<RiskDefaultNotifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskDefaultNotifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskDefaultNotifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
