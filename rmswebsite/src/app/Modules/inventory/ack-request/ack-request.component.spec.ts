import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckRequestComponent } from './ack-request.component';

describe('AckRequestComponent', () => {
  let component: AckRequestComponent;
  let fixture: ComponentFixture<AckRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AckRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AckRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
