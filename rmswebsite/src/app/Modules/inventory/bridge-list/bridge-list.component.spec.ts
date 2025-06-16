import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeListComponent } from './bridge-list.component';

describe('BridgeListComponent', () => {
  let component: BridgeListComponent;
  let fixture: ComponentFixture<BridgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BridgeListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BridgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
