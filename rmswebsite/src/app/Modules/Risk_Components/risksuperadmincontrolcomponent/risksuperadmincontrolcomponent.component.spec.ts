import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksuperadmincontrolcomponentComponent } from './risksuperadmincontrolcomponent.component';

describe('RisksuperadmincontrolcomponentComponent', () => {
  let component: RisksuperadmincontrolcomponentComponent;
  let fixture: ComponentFixture<RisksuperadmincontrolcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksuperadmincontrolcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksuperadmincontrolcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
