import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAccessMappingStatusListComponent } from './doc-access-mapping-status-list.component';

describe('DocAccessMappingStatusListComponent', () => {
  let component: DocAccessMappingStatusListComponent;
  let fixture: ComponentFixture<DocAccessMappingStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAccessMappingStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAccessMappingStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
