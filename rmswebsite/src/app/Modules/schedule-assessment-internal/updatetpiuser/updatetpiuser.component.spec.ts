import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetpiuserComponent } from './updatetpiuser.component';

describe('UpdatetpiuserComponent', () => {
  let component: UpdatetpiuserComponent;
  let fixture: ComponentFixture<UpdatetpiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetpiuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatetpiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
