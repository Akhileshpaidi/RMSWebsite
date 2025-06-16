import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityNameComponent } from './authority-name.component';

describe('AuthorityNameComponent', () => {
  let component: AuthorityNameComponent;
  let fixture: ComponentFixture<AuthorityNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorityNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
