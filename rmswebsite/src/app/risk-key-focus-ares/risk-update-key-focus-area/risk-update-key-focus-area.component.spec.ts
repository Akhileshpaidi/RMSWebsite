import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskUpdateKeyFocusAreaComponent } from './risk-update-key-focus-area.component';

describe('RiskUpdateKeyFocusAreaComponent', () => {
  let component: RiskUpdateKeyFocusAreaComponent;
  let fixture: ComponentFixture<RiskUpdateKeyFocusAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskUpdateKeyFocusAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskUpdateKeyFocusAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
