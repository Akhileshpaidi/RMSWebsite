import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialBusinessImpactComponent } from './potential-business-impact.component';

describe('PotentialBusinessImpactComponent', () => {
  let component: PotentialBusinessImpactComponent;
  let fixture: ComponentFixture<PotentialBusinessImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialBusinessImpactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialBusinessImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
