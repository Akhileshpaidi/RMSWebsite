import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineSubjectComponent } from './define-subject.component';

describe('DefineSubjectComponent', () => {
  let component: DefineSubjectComponent;
  let fixture: ComponentFixture<DefineSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
