import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedDocListComponent } from './published-doc-list.component';

describe('PublishedDocListComponent', () => {
  let component: PublishedDocListComponent;
  let fixture: ComponentFixture<PublishedDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedDocListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
