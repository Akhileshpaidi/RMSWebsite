import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompliancePenaltyMasterComponent } from './view-compliance-penalty-master.component';

describe('ViewCompliancePenaltyMasterComponent', () => {
  let component: ViewCompliancePenaltyMasterComponent;
  let fixture: ComponentFixture<ViewCompliancePenaltyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompliancePenaltyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompliancePenaltyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
