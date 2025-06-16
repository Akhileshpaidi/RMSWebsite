import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminFrequencyMasterComponent } from './supadmin-frequency-master.component';

describe('SupadminFrequencyMasterComponent', () => {
  let component: SupadminFrequencyMasterComponent;
  let fixture: ComponentFixture<SupadminFrequencyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminFrequencyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminFrequencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
