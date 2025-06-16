import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBridgeMasterComponent } from './edit-bridge-master.component';

describe('EditBridgeMasterComponent', () => {
  let component: EditBridgeMasterComponent;
  let fixture: ComponentFixture<EditBridgeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBridgeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBridgeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
