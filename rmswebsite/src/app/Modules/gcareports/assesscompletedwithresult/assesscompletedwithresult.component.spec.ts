import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesscompletedwithresultComponent } from './assesscompletedwithresult.component';

describe('AssesscompletedwithresultComponent', () => {
  let component: AssesscompletedwithresultComponent;
  let fixture: ComponentFixture<AssesscompletedwithresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssesscompletedwithresultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssesscompletedwithresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
