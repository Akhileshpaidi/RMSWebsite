import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksuperadmincontrolmonitoringmechanismComponent } from './risksuperadmincontrolmonitoringmechanism.component';

describe('RisksuperadmincontrolmonitoringmechanismComponent', () => {
  let component: RisksuperadmincontrolmonitoringmechanismComponent;
  let fixture: ComponentFixture<RisksuperadmincontrolmonitoringmechanismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisksuperadmincontrolmonitoringmechanismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisksuperadmincontrolmonitoringmechanismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
