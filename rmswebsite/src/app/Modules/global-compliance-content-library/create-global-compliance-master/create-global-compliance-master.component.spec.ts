import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGlobalComplianceMasterComponent } from './create-global-compliance-master.component';

describe('CreateGlobalComplianceMasterComponent', () => {
  let component: CreateGlobalComplianceMasterComponent;
  let fixture: ComponentFixture<CreateGlobalComplianceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGlobalComplianceMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGlobalComplianceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
