import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlReferenceTypeComponent } from './control-reference-type.component';

describe('ControlReferenceTypeComponent', () => {
  let component: ControlReferenceTypeComponent;
  let fixture: ComponentFixture<ControlReferenceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlReferenceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlReferenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
