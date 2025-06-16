import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubDocListComponent } from './pub-doc-list.component';

describe('PubDocListComponent', () => {
  let component: PubDocListComponent;
  let fixture: ComponentFixture<PubDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubDocListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
