import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditriskstatementComponent } from './editriskstatement.component';

describe('EditriskstatementComponent', () => {
  let component: EditriskstatementComponent;
  let fixture: ComponentFixture<EditriskstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditriskstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditriskstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
