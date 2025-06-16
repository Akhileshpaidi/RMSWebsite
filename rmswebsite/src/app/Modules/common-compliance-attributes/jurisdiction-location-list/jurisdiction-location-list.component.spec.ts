import { ComponentFixture, TestBed } from '@angular/core/testing';

import { jurisdictionlocationlist } from './jurisdiction-location-list.component';

describe('LocationMasterListComponent', () => {
  let component: jurisdictionlocationlist;
  let fixture: ComponentFixture<jurisdictionlocationlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ jurisdictionlocationlist ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(jurisdictionlocationlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
