import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessTempAccessMappingComponent } from './assess-temp-access-mapping.component';

describe('AssessTempAccessMappingComponent', () => {
  let component: AssessTempAccessMappingComponent;
  let fixture: ComponentFixture<AssessTempAccessMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessTempAccessMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessTempAccessMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
