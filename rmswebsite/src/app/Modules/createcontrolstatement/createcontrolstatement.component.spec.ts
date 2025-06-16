import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecontrolstatementComponent } from './createcontrolstatement.component';

describe('CreatecontrolstatementComponent', () => {
  let component: CreatecontrolstatementComponent;
  let fixture: ComponentFixture<CreatecontrolstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecontrolstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecontrolstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
