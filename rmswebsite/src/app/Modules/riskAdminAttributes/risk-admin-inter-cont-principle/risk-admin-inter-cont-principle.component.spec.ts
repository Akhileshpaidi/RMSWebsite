import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminInterContPrincipleComponent } from './risk-admin-inter-cont-principle.component';

describe('RiskAdminInterContPrincipleComponent', () => {
  let component: RiskAdminInterContPrincipleComponent;
  let fixture: ComponentFixture<RiskAdminInterContPrincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminInterContPrincipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminInterContPrincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
