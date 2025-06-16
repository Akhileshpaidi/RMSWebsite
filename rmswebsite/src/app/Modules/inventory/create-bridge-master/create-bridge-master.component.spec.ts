import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBridgeMasterComponent } from './create-bridge-master.component';

describe('CreateBridgeMasterComponent', () => {
  let component: CreateBridgeMasterComponent;
  let fixture: ComponentFixture<CreateBridgeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBridgeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBridgeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
