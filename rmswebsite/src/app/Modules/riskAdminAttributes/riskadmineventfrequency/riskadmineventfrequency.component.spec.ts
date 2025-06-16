import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskadmineventfrequencyComponent } from './riskadmineventfrequency.component';

describe('RiskadmineventfrequencyComponent', () => {
  let component: RiskadmineventfrequencyComponent;
  let fixture: ComponentFixture<RiskadmineventfrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskadmineventfrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskadmineventfrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
