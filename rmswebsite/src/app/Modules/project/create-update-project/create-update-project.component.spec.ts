import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateprojectComponent } from './create-update-project.component';

describe('CreateprojectComponent', () => {
  let component: CreateUpdateprojectComponent;
  let fixture: ComponentFixture<CreateUpdateprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
