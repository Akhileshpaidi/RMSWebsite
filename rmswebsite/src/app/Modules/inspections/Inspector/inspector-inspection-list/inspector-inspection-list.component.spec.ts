import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorInspectionListComponent } from './inspector-inspection-list.component';

describe('InspectorInspectionListComponent', () => {
  let component: InspectorInspectionListComponent;
  let fixture: ComponentFixture<InspectorInspectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorInspectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
