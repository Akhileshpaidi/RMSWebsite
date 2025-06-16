import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserAccessComponent } from './remove-user-access.component';

describe('RemoveUserAccessComponent', () => {
  let component: RemoveUserAccessComponent;
  let fixture: ComponentFixture<RemoveUserAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveUserAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
