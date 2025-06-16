import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskKeyFocusAresComponent } from './risk-key-focus-ares.component';

describe('RiskKeyFocusAresComponent', () => {
  let component: RiskKeyFocusAresComponent;
  let fixture: ComponentFixture<RiskKeyFocusAresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskKeyFocusAresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskKeyFocusAresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
