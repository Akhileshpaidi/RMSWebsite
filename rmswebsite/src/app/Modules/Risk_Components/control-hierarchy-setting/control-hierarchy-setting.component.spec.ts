import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHierarchySettingComponent } from './control-hierarchy-setting.component';

describe('ControlHierarchySettingComponent', () => {
  let component: ControlHierarchySettingComponent;
  let fixture: ComponentFixture<ControlHierarchySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlHierarchySettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlHierarchySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
