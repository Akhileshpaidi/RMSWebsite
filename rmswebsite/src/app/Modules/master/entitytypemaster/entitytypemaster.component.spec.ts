import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitytypemasterComponent } from './entitytypemaster.component';

describe('EntitytypemasterComponent', () => {
  let component: EntitytypemasterComponent;
  let fixture: ComponentFixture<EntitytypemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitytypemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitytypemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
