import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessTempListComponent } from './assess-temp-list.component';

describe('AssessTempListComponent', () => {
  let component: AssessTempListComponent;
  let fixture: ComponentFixture<AssessTempListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessTempListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessTempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
