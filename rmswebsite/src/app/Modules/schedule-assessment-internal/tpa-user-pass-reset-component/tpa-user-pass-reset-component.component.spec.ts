import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpaUserPassResetComponentComponent } from './tpa-user-pass-reset-component.component';

describe('TpaUserPassResetComponentComponent', () => {
  let component: TpaUserPassResetComponentComponent;
  let fixture: ComponentFixture<TpaUserPassResetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpaUserPassResetComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpaUserPassResetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
