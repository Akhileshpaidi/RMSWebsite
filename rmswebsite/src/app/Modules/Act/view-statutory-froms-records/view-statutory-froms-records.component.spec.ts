import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatutoryFromsRecordsComponent } from './view-statutory-froms-records.component';

describe('ViewStatutoryFromsRecordsComponent', () => {
  let component: ViewStatutoryFromsRecordsComponent;
  let fixture: ComponentFixture<ViewStatutoryFromsRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStatutoryFromsRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStatutoryFromsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
