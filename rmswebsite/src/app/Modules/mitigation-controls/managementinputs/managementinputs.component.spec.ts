import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementinputsComponent } from './managementinputs.component';

describe('ManagementinputsComponent', () => {
  let component: ManagementinputsComponent;
  let fixture: ComponentFixture<ManagementinputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementinputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementinputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
