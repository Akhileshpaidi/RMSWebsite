import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetpauserComponent } from './createtpauser.component';

describe('CreatetpauserComponent', () => {
  let component: CreatetpauserComponent;
  let fixture: ComponentFixture<CreatetpauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatetpauserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetpauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
