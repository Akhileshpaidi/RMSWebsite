import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCTreportsComponent } from './gctreports.component';

describe('GCTreportsComponent', () => {
  let component: GCTreportsComponent;
  let fixture: ComponentFixture<GCTreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCTreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GCTreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
