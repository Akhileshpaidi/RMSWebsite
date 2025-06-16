import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCAreportsComponent } from './gcareports.component';

describe('GCAreportsComponent', () => {
  let component: GCAreportsComponent;
  let fixture: ComponentFixture<GCAreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCAreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GCAreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
