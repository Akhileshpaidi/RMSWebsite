import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfInspectionComponent } from './self-inspection.component';

describe('SelfInspectionComponent', () => {
  let component: SelfInspectionComponent;
  let fixture: ComponentFixture<SelfInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
