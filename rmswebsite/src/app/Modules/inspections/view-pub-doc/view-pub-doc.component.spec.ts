import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPubDocComponent } from './view-pub-doc.component';

describe('ViewPubDocComponent', () => {
  let component: ViewPubDocComponent;
  let fixture: ComponentFixture<ViewPubDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPubDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPubDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
