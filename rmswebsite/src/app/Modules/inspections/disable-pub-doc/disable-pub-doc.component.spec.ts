import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisablePubDocComponent } from './disable-pub-doc.component';

describe('DisablePubDocComponent', () => {
  let component: DisablePubDocComponent;
  let fixture: ComponentFixture<DisablePubDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisablePubDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisablePubDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
