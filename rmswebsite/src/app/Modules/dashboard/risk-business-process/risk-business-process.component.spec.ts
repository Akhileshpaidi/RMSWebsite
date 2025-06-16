import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBusinessProcessComponent } from './risk-business-process.component';

describe('RiskBusinessProcessComponent', () => {
  let component: RiskBusinessProcessComponent;
  let fixture: ComponentFixture<RiskBusinessProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskBusinessProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskBusinessProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
