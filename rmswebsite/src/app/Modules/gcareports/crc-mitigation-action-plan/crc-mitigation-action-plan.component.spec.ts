import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcMitigationActionPlanComponent } from './crc-mitigation-action-plan.component';

describe('CrcMitigationActionPlanComponent', () => {
  let component: CrcMitigationActionPlanComponent;
  let fixture: ComponentFixture<CrcMitigationActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrcMitigationActionPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrcMitigationActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
