import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProvideAccessComponent } from './view-provide-access.component';

describe('ViewProvideAccessComponent', () => {
  let component: ViewProvideAccessComponent;
  let fixture: ComponentFixture<ViewProvideAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProvideAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProvideAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
