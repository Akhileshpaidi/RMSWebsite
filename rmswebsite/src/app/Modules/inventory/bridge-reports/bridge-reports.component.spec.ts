import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeReportsComponent } from './bridge-reports.component';

describe('ReportsComponent', () => {
  let component: BridgeReportsComponent;
  let fixture: ComponentFixture<BridgeReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BridgeReportsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BridgeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
