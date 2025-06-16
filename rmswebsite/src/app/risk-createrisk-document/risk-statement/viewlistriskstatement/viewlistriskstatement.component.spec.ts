import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistriskstatementComponent } from './viewlistriskstatement.component';

describe('ViewlistriskstatementComponent', () => {
  let component: ViewlistriskstatementComponent;
  let fixture: ComponentFixture<ViewlistriskstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlistriskstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlistriskstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
