import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContrActvSubNatureComponent } from './risk-admin-contr-actv-sub-nature.component';

describe('RiskAdminContrActvSubNatureComponent', () => {
  let component: RiskAdminContrActvSubNatureComponent;
  let fixture: ComponentFixture<RiskAdminContrActvSubNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContrActvSubNatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContrActvSubNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
