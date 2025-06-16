import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideAccessComponent } from './provide-access.component';

describe('ProvideAccessComponent', () => {
  let component: ProvideAccessComponent;
  let fixture: ComponentFixture<ProvideAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvideAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
