import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminActionPrioListComponent } from './risk-admin-action-prio-list.component';

describe('RiskAdminActionPrioListComponent', () => {
  let component: RiskAdminActionPrioListComponent;
  let fixture: ComponentFixture<RiskAdminActionPrioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminActionPrioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminActionPrioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
