import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfLawComponent } from './nature-of-law.component';

describe('NatureOfLawComponent', () => {
  let component: NatureOfLawComponent;
  let fixture: ComponentFixture<NatureOfLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureOfLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureOfLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
