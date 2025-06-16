import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewControlMatrixComponent } from './view-control-matrix.component';

describe('ViewControlMatrixComponent', () => {
  let component: ViewControlMatrixComponent;
  let fixture: ComponentFixture<ViewControlMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewControlMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewControlMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
