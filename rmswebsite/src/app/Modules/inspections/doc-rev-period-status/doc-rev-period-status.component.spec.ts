import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRevPeriodStatusComponent } from './doc-rev-period-status.component';

describe('DocRevPeriodStatusComponent', () => {
  let component: DocRevPeriodStatusComponent;
  let fixture: ComponentFixture<DocRevPeriodStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRevPeriodStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocRevPeriodStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
