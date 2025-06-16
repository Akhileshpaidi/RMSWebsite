import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAuthorityComponent } from './assign-authority.component';

describe('AssignAuthorityComponent', () => {
  let component: AssignAuthorityComponent;
  let fixture: ComponentFixture<AssignAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAuthorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
