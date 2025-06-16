import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminNatureOfLawComponent } from './supadmin-nature-of-law.component';

describe('SupadminNatureOfLawComponent', () => {
  let component: SupadminNatureOfLawComponent;
  let fixture: ComponentFixture<SupadminNatureOfLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminNatureOfLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminNatureOfLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
