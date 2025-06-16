import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRiskRegisterComponent } from './view-risk-register.component';

describe('ViewRiskRegisterComponent', () => {
  let component: ViewRiskRegisterComponent;
  let fixture: ComponentFixture<ViewRiskRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRiskRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRiskRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
