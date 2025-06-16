import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDependenciesComponent } from './control-dependencies.component';

describe('ControlDependenciesComponent', () => {
  let component: ControlDependenciesComponent;
  let fixture: ComponentFixture<ControlDependenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlDependenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
