import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterInspectionComponent } from './unregister-inspection.component';

describe('UnregisterInspectionComponent', () => {
  let component: UnregisterInspectionComponent;
  let fixture: ComponentFixture<UnregisterInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisterInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
