import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeDetailComponent } from './bridge-detail.component';

describe('BridgeDetailComponent', () => {
  let component: BridgeDetailComponent;
  let fixture: ComponentFixture<BridgeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridgeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
