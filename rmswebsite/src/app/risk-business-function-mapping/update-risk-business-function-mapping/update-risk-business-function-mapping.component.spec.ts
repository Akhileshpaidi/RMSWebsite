import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRiskBusinessFunctionMappingComponent } from './update-risk-business-function-mapping.component';

describe('UpdateRiskBusinessFunctionMappingComponent', () => {
  let component: UpdateRiskBusinessFunctionMappingComponent;
  let fixture: ComponentFixture<UpdateRiskBusinessFunctionMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRiskBusinessFunctionMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRiskBusinessFunctionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
