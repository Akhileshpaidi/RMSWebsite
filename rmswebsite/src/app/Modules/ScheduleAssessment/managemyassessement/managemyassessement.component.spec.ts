import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemyassessementComponent } from './managemyassessement.component';

describe('ManagemyassessementComponent', () => {
  let component: ManagemyassessementComponent;
  let fixture: ComponentFixture<ManagemyassessementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagemyassessementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagemyassessementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
