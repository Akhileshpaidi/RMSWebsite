import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessDisabledTempListComponent } from './assess-disabled-temp-list.component';

describe('AssessDisabledTempListComponent', () => {
  let component: AssessDisabledTempListComponent;
  let fixture: ComponentFixture<AssessDisabledTempListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessDisabledTempListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessDisabledTempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
