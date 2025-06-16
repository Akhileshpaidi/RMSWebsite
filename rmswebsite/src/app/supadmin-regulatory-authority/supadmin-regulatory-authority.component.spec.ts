import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminRegulatoryAuthorityComponent } from './supadmin-regulatory-authority.component';

describe('SupadminRegulatoryAuthorityComponent', () => {
  let component: SupadminRegulatoryAuthorityComponent;
  let fixture: ComponentFixture<SupadminRegulatoryAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminRegulatoryAuthorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminRegulatoryAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
