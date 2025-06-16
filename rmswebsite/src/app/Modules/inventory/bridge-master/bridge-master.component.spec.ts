import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeMasterComponent } from './bridge-master.component';

describe('BridgeMasterComponent', () => {
  let component: BridgeMasterComponent;
  let fixture: ComponentFixture<BridgeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BridgeMasterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BridgeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
