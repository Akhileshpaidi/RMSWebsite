import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEntityAttributesComponent } from './common-entity-attributes.component';

describe('CommonEntityAttributesComponent', () => {
  let component: CommonEntityAttributesComponent;
  let fixture: ComponentFixture<CommonEntityAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEntityAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEntityAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
