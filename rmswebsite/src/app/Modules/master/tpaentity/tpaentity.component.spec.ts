import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPAEntityComponent } from './tpaentity.component';

describe('TPAEntityComponent', () => {
  let component: TPAEntityComponent;
  let fixture: ComponentFixture<TPAEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPAEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TPAEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
