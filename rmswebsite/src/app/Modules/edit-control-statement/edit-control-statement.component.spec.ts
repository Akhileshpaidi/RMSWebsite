import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditControlStatementComponent } from './edit-control-statement.component';

describe('EditControlStatementComponent', () => {
  let component: EditControlStatementComponent;
  let fixture: ComponentFixture<EditControlStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditControlStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditControlStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
