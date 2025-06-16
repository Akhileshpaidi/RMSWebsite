import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndusteryTypeListComponent } from './industery-type-list.component';

describe('IndusteryTypeListComponent', () => {
  let component: IndusteryTypeListComponent;
  let fixture: ComponentFixture<IndusteryTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndusteryTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndusteryTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
