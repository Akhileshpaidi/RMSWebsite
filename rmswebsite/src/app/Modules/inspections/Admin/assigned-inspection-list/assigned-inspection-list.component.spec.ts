import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedInspectionListComponent } from './assigned-inspection-list.component';

describe('AssignedInspectionListComponent', () => {
  let component: AssignedInspectionListComponent;
  let fixture: ComponentFixture<AssignedInspectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedInspectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
