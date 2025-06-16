import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminNatContOccurComponent } from './risk-admin-nat-cont-occur.component';

describe('RiskAdminNatContOccurComponent', () => {
  let component: RiskAdminNatContOccurComponent;
  let fixture: ComponentFixture<RiskAdminNatContOccurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminNatContOccurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminNatContOccurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
