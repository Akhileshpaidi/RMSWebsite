import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassResetComponent } from './user-pass-reset.component';

describe('UserPassResetComponent', () => {
  let component: UserPassResetComponent;
  let fixture: ComponentFixture<UserPassResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPassResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPassResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
