import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatutoryFormsRecordComponent } from './edit-statutory-forms-record.component';

describe('EditStatutoryFormsRecordComponent', () => {
  let component: EditStatutoryFormsRecordComponent;
  let fixture: ComponentFixture<EditStatutoryFormsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStatutoryFormsRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStatutoryFormsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
