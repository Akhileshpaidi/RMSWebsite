import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManualReportingHeadComponent } from './user-manual-reporting-head.component';

describe('UserManualReportingHeadComponent', () => {
  let component: UserManualReportingHeadComponent;
  let fixture: ComponentFixture<UserManualReportingHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManualReportingHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManualReportingHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
