import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskEditsamplingstandardsComponent } from './risk-editsamplingstandards.component';

describe('RiskEditsamplingstandardsComponent', () => {
  let component: RiskEditsamplingstandardsComponent;
  let fixture: ComponentFixture<RiskEditsamplingstandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskEditsamplingstandardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskEditsamplingstandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
