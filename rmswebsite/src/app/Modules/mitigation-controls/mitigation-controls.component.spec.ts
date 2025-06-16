import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationControlsComponent } from './mitigation-controls.component';

describe('MitigationControlsComponent', () => {
  let component: MitigationControlsComponent;
  let fixture: ComponentFixture<MitigationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitigationControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitigationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
