import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminViewActrulesRegulationsComponent } from './supadmin-view-actrules-regulations.component';

describe('SupadminViewActrulesRegulationsComponent', () => {
  let component: SupadminViewActrulesRegulationsComponent;
  let fixture: ComponentFixture<SupadminViewActrulesRegulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminViewActrulesRegulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminViewActrulesRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
