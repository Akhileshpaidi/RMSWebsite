import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGlobalComplianceComponent } from './view-global-compliance.component';

describe('ViewGlobalComplianceComponent', () => {
  let component: ViewGlobalComplianceComponent;
  let fixture: ComponentFixture<ViewGlobalComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGlobalComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGlobalComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
