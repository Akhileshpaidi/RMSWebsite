import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMitigationTasksComponent } from './my-mitigation-tasks.component';

describe('MyMitigationTasksComponent', () => {
  let component: MyMitigationTasksComponent;
  let fixture: ComponentFixture<MyMitigationTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMitigationTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMitigationTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
