import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportComplianceControllerMasterComponent } from './import-compliance-controller-master.component';

describe('ImportComplianceControllerMasterComponent', () => {
  let component: ImportComplianceControllerMasterComponent;
  let fixture: ComponentFixture<ImportComplianceControllerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportComplianceControllerMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportComplianceControllerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
