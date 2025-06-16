import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerregformComponent } from './customerregform.component';

describe('CustomerregformComponent', () => {
  let component: CustomerregformComponent;
  let fixture: ComponentFixture<CustomerregformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerregformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerregformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
