import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTypeComponent } from './define-type.component';

describe('DefineTypeComponent', () => {
  let component: DefineTypeComponent;
  let fixture: ComponentFixture<DefineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
