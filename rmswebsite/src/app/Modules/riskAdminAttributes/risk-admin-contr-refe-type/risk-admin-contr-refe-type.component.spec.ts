import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContrRefeTypeComponent } from './risk-admin-contr-refe-type.component';

describe('RiskAdminContrRefeTypeComponent', () => {
  let component: RiskAdminContrRefeTypeComponent;
  let fixture: ComponentFixture<RiskAdminContrRefeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContrRefeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContrRefeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
