import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminStatutoryFormsComponent } from './supadmin-statutory-forms.component';

describe('SupadminStatutoryFormsComponent', () => {
  let component: SupadminStatutoryFormsComponent;
  let fixture: ComponentFixture<SupadminStatutoryFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminStatutoryFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminStatutoryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
