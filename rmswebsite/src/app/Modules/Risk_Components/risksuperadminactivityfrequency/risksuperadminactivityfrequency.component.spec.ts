import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksuperadminactivityfrequencyComponent } from './risksuperadminactivityfrequency.component';

describe('RisksuperadminactivityfrequencyComponent', () => {
  let component: RisksuperadminactivityfrequencyComponent;
  let fixture: ComponentFixture<RisksuperadminactivityfrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksuperadminactivityfrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksuperadminactivityfrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
