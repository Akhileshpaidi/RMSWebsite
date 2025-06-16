import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinesubtypeComponent } from './definesubtype.component';

describe('DefinesubtypeComponent', () => {
  let component: DefinesubtypeComponent;
  let fixture: ComponentFixture<DefinesubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinesubtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinesubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
