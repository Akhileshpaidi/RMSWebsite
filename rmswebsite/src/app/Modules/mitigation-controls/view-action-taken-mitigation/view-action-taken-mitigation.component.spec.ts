import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActionTakenMitigationComponent } from './view-action-taken-mitigation.component';

describe('ViewActionTakenMitigationComponent', () => {
  let component: ViewActionTakenMitigationComponent;
  let fixture: ComponentFixture<ViewActionTakenMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActionTakenMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActionTakenMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
