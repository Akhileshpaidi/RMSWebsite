import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratInspectionComponent } from './strat-inspection.component';

describe('StratInspectionComponent', () => {
  let component: StratInspectionComponent;
  let fixture: ComponentFixture<StratInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StratInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
