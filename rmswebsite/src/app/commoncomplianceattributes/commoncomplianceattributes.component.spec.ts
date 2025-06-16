import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoncomplianceattributesComponent } from './commoncomplianceattributes.component';

describe('CommoncomplianceattributesComponent', () => {
  let component: CommoncomplianceattributesComponent;
  let fixture: ComponentFixture<CommoncomplianceattributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoncomplianceattributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommoncomplianceattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
