import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksupadminTypeofriskComponent } from './risksupadmin-typeofrisk.component';

describe('RisksupadminTypeofriskComponent', () => {
  let component: RisksupadminTypeofriskComponent;
  let fixture: ComponentFixture<RisksupadminTypeofriskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksupadminTypeofriskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksupadminTypeofriskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
