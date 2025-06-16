import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminAddrulesRegulationsComponent } from './supadmin-addrules-regulations.component';

describe('SupadminAddrulesRegulationsComponent', () => {
  let component: SupadminAddrulesRegulationsComponent;
  let fixture: ComponentFixture<SupadminAddrulesRegulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminAddrulesRegulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminAddrulesRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
