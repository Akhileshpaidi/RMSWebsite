import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActRegulatoryComponent } from './view-act-regulatory.component';

describe('ViewActRegulatoryComponent', () => {
  let component: ViewActRegulatoryComponent;
  let fixture: ComponentFixture<ViewActRegulatoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActRegulatoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActRegulatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
