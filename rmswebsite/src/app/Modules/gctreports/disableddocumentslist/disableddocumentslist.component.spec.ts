import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableddocumentslistComponent } from './disableddocumentslist.component';

describe('DisableddocumentslistComponent', () => {
  let component: DisableddocumentslistComponent;
  let fixture: ComponentFixture<DisableddocumentslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableddocumentslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableddocumentslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
