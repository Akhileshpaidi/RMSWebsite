import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessresulttaskownerComponent } from './assessresulttaskowner.component';

describe('AssessresulttaskownerComponent', () => {
  let component: AssessresulttaskownerComponent;
  let fixture: ComponentFixture<AssessresulttaskownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessresulttaskownerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessresulttaskownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
