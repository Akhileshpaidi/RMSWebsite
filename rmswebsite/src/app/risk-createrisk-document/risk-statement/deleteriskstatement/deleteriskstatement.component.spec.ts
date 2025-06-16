import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteriskstatementComponent } from './deleteriskstatement.component';

describe('DeleteriskstatementComponent', () => {
  let component: DeleteriskstatementComponent;
  let fixture: ComponentFixture<DeleteriskstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteriskstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteriskstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
