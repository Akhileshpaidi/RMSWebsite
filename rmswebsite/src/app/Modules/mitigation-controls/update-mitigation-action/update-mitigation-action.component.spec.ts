import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMitigationActionComponent } from './update-mitigation-action.component';

describe('UpdateMitigationActionComponent', () => {
  let component: UpdateMitigationActionComponent;
  let fixture: ComponentFixture<UpdateMitigationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMitigationActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMitigationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
