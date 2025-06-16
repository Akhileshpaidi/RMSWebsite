import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocrechangepasswordComponent } from './focrechangepassword.component';

describe('FocrechangepasswordComponent', () => {
  let component: FocrechangepasswordComponent;
  let fixture: ComponentFixture<FocrechangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocrechangepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocrechangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
