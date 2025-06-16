import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBridgeComponent } from './create-bridge.component';

describe('CreateBridgeComponent', () => {
  let component: CreateBridgeComponent;
  let fixture: ComponentFixture<CreateBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBridgeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
