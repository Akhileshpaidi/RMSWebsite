import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSpecificConfigurationSettingsComponent } from './app-specific-configuration-settings.component';

describe('AppSpecificConfigurationSettingsComponent', () => {
  let component: AppSpecificConfigurationSettingsComponent;
  let fixture: ComponentFixture<AppSpecificConfigurationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSpecificConfigurationSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSpecificConfigurationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
