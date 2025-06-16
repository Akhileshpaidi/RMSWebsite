import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherCommonSettingsComponent } from './create-other-common-settings.component';

describe('CreateOtherCommonSettingsComponent', () => {
  let component: CreateOtherCommonSettingsComponent;
  let fixture: ComponentFixture<CreateOtherCommonSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtherCommonSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtherCommonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
