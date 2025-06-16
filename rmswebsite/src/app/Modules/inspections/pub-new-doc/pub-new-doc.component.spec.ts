import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubNewDocComponent } from './pub-new-doc.component';

describe('PubNewDocComponent', () => {
  let component: PubNewDocComponent;
  let fixture: ComponentFixture<PubNewDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubNewDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubNewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
