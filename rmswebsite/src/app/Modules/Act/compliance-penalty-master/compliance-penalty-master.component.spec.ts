import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancePenaltyMasterComponent } from './compliance-penalty-master.component';

describe('CompliancePenaltyMasterComponent', () => {
  let component: CompliancePenaltyMasterComponent;
  let fixture: ComponentFixture<CompliancePenaltyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliancePenaltyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompliancePenaltyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
