import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksuperadmineventfrequencyComponent } from './risksuperadmineventfrequency.component';

describe('RisksuperadmineventfrequencyComponent', () => {
  let component: RisksuperadmineventfrequencyComponent;
  let fixture: ComponentFixture<RisksuperadmineventfrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksuperadmineventfrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksuperadmineventfrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
