import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustomerregformComponent } from './viewcustomerregform.component';

describe('ViewcustomerregformComponent', () => {
  let component: ViewcustomerregformComponent;
  let fixture: ComponentFixture<ViewcustomerregformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcustomerregformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcustomerregformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
