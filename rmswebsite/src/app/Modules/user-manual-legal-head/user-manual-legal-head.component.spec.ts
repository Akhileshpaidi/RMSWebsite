import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManualLegalHeadComponent } from './user-manual-legal-head.component';

describe('UserManualLegalHeadComponent', () => {
  let component: UserManualLegalHeadComponent;
  let fixture: ComponentFixture<UserManualLegalHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManualLegalHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManualLegalHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
