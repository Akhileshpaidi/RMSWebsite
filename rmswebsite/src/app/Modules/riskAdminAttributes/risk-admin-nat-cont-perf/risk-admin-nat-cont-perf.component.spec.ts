import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminNatContPerfComponent } from './risk-admin-nat-cont-perf.component';

describe('RiskAdminNatContPerfComponent', () => {
  let component: RiskAdminNatContPerfComponent;
  let fixture: ComponentFixture<RiskAdminNatContPerfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminNatContPerfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminNatContPerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
