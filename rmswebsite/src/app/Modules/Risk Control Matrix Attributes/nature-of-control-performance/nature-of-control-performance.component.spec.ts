import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfControlPerformanceComponent } from './nature-of-control-performance.component';

describe('NatureOfControlPerformanceComponent', () => {
  let component: NatureOfControlPerformanceComponent;
  let fixture: ComponentFixture<NatureOfControlPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureOfControlPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureOfControlPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
