import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRiskRegisterComponent } from './edit-risk-register.component';

describe('EditRiskRegisterComponent', () => {
  let component: EditRiskRegisterComponent;
  let fixture: ComponentFixture<EditRiskRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRiskRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRiskRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
