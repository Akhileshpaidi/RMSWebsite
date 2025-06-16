import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryFormsRecordsComponent } from './statutory-forms-records.component';

describe('StatutoryFormsRecordsComponent', () => {
  let component: StatutoryFormsRecordsComponent;
  let fixture: ComponentFixture<StatutoryFormsRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutoryFormsRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatutoryFormsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
