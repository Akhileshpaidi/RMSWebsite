import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalComplianceDailogeboxComponent } from './global-compliance-dailogebox.component';

describe('GlobalComplianceDailogeboxComponent', () => {
  let component: GlobalComplianceDailogeboxComponent;
  let fixture: ComponentFixture<GlobalComplianceDailogeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalComplianceDailogeboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalComplianceDailogeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
