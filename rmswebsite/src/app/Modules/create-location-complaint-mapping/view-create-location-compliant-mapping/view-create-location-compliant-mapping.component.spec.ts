import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreateLocationCompliantMappingComponent } from './view-create-location-compliant-mapping.component';

describe('ViewCreateLocationCompliantMappingComponent', () => {
  let component: ViewCreateLocationCompliantMappingComponent;
  let fixture: ComponentFixture<ViewCreateLocationCompliantMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCreateLocationCompliantMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCreateLocationCompliantMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
