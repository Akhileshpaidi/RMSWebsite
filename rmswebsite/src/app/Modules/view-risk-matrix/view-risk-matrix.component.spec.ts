import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRiskMatrixComponent } from './view-risk-matrix.component';

describe('RiskMatrixComponent', () => {
  let component: ViewRiskMatrixComponent;
  let fixture: ComponentFixture<ViewRiskMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRiskMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRiskMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
