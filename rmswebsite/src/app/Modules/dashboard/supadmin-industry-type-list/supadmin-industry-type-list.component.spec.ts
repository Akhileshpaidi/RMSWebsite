import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminIndustryTypeListComponent } from './supadmin-industry-type-list.component';

describe('SupadminIndustryTypeListComponent', () => {
  let component: SupadminIndustryTypeListComponent;
  let fixture: ComponentFixture<SupadminIndustryTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminIndustryTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminIndustryTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
