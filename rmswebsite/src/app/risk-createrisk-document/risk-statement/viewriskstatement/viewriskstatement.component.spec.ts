import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewriskstatementComponent } from './viewriskstatement.component';

describe('ViewriskstatementComponent', () => {
  let component: ViewriskstatementComponent;
  let fixture: ComponentFixture<ViewriskstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewriskstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewriskstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
