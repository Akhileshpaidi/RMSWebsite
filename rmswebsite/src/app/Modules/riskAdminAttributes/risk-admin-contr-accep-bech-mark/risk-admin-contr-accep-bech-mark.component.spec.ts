import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContrAccepBechMarkComponent } from './risk-admin-contr-accep-bech-mark.component';

describe('RiskAdminContrAccepBechMarkComponent', () => {
  let component: RiskAdminContrAccepBechMarkComponent;
  let fixture: ComponentFixture<RiskAdminContrAccepBechMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContrAccepBechMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContrAccepBechMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
