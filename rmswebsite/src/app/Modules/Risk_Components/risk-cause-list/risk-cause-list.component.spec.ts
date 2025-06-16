import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCauseListComponent } from './risk-cause-list.component';

describe('RiskCauseListComponent', () => {
  let component: RiskCauseListComponent;
  let fixture: ComponentFixture<RiskCauseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCauseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCauseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
