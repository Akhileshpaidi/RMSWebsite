import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskadmincontrolcomponentComponent } from './riskadmincontrolcomponent.component';

describe('RiskadmincontrolcomponentComponent', () => {
  let component: RiskadmincontrolcomponentComponent;
  let fixture: ComponentFixture<RiskadmincontrolcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskadmincontrolcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskadmincontrolcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
