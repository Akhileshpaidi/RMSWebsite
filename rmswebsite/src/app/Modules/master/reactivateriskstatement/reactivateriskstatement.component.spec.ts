import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateriskstatementComponent } from './reactivateriskstatement.component';

describe('ReactivateriskstatementComponent', () => {
  let component: ReactivateriskstatementComponent;
  let fixture: ComponentFixture<ReactivateriskstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivateriskstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivateriskstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
