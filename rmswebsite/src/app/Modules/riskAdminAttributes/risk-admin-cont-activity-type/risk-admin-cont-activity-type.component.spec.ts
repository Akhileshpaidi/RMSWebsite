import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContActivityTypeComponent } from './risk-admin-cont-activity-type.component';

describe('RiskAdminContActivityTypeComponent', () => {
  let component: RiskAdminContActivityTypeComponent;
  let fixture: ComponentFixture<RiskAdminContActivityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContActivityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
