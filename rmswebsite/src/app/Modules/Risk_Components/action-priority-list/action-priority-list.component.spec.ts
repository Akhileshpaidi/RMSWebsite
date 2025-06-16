import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPriorityListComponent } from './action-priority-list.component';

describe('ActionPriorityListComponent', () => {
  let component: ActionPriorityListComponent;
  let fixture: ComponentFixture<ActionPriorityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPriorityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPriorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
