import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminPotenBussinImpactComponent } from './risk-admin-poten-bussin-impact.component';

describe('RiskAdminPotenBussinImpactComponent', () => {
  let component: RiskAdminPotenBussinImpactComponent;
  let fixture: ComponentFixture<RiskAdminPotenBussinImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminPotenBussinImpactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminPotenBussinImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
