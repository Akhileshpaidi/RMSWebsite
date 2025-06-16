import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtpiuserComponent } from './viewtpiuser.component';

describe('ViewtpiuserComponent', () => {
  let component: ViewtpiuserComponent;
  let fixture: ComponentFixture<ViewtpiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtpiuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtpiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
