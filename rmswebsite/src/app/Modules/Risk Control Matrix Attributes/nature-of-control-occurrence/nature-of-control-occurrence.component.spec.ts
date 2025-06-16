import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfControlOccurrenceComponent } from './nature-of-control-occurrence.component';

describe('NatureOfControlOccurrenceComponent', () => {
  let component: NatureOfControlOccurrenceComponent;
  let fixture: ComponentFixture<NatureOfControlOccurrenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureOfControlOccurrenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureOfControlOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
