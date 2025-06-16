import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActRegulatoryComponent } from './edit-act-regulatory.component';

describe('EditActRegulatoryComponent', () => {
  let component: EditActRegulatoryComponent;
  let fixture: ComponentFixture<EditActRegulatoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActRegulatoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActRegulatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
