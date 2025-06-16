import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateManufacturerComponent } from './create-update-manufacturer.component';

describe('CreateUpdateManufacturerComponent', () => {
  let component: CreateUpdateManufacturerComponent;
  let fixture: ComponentFixture<CreateUpdateManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateManufacturerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
