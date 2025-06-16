import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWindowComponent } from './report-window.component';

describe('ReportWindowComponent', () => {
  let component: ReportWindowComponent;
  let fixture: ComponentFixture<ReportWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
