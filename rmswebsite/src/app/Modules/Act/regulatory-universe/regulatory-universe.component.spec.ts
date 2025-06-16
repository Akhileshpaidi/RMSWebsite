import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryUniverseComponent } from './regulatory-universe.component';

describe('RegulatoryUniverseComponent', () => {
  let component: RegulatoryUniverseComponent;
  let fixture: ComponentFixture<RegulatoryUniverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulatoryUniverseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatoryUniverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
