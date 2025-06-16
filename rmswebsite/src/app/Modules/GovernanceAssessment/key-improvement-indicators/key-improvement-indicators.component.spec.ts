import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyImprovementIndicatorsComponent } from './key-improvement-indicators.component';

describe('KeyImprovementIndicatorsComponent', () => {
  let component: KeyImprovementIndicatorsComponent;
  let fixture: ComponentFixture<KeyImprovementIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyImprovementIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyImprovementIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
