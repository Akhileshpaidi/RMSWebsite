import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBusinessFunctionMappingComponent } from './risk-business-function-mapping.component';

describe('RiskBusinessFunctionMappingComponent', () => {
  let component: RiskBusinessFunctionMappingComponent;
  let fixture: ComponentFixture<RiskBusinessFunctionMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskBusinessFunctionMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskBusinessFunctionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
