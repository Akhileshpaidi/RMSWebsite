import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContMeasureComponent } from './risk-admin-cont-measure.component';

describe('RiskAdminContMeasureComponent', () => {
  let component: RiskAdminContMeasureComponent;
  let fixture: ComponentFixture<RiskAdminContMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContMeasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
