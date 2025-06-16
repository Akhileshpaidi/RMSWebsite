import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardeddraftlistComponent } from './discardeddraftlist.component';

describe('DiscardeddraftlistComponent', () => {
  let component: DiscardeddraftlistComponent;
  let fixture: ComponentFixture<DiscardeddraftlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardeddraftlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscardeddraftlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
