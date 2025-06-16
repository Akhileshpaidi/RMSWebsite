import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivatePubDocComponent } from './reactivate-pub-doc.component';

describe('ReactivatePubDocComponent', () => {
  let component: ReactivatePubDocComponent;
  let fixture: ComponentFixture<ReactivatePubDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivatePubDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivatePubDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
