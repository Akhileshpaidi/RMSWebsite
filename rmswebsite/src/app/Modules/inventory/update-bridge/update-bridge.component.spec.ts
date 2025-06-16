import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBridgeComponent } from './update-bridge.component';

describe('UpdateBridgeComponent', () => {
  let component: UpdateBridgeComponent;
  let fixture: ComponentFixture<UpdateBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBridgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
