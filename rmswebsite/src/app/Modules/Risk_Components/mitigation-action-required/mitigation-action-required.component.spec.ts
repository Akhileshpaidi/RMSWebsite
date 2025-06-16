import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationActionRequiredComponent } from './mitigation-action-required.component';

describe('MitigationActionRequiredComponent', () => {
  let component: MitigationActionRequiredComponent;
  let fixture: ComponentFixture<MitigationActionRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitigationActionRequiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitigationActionRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
