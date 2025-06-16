import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubNewVerComponent } from './pub-new-ver.component';

describe('PubNewVerComponent', () => {
  let component: PubNewVerComponent;
  let fixture: ComponentFixture<PubNewVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubNewVerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubNewVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
