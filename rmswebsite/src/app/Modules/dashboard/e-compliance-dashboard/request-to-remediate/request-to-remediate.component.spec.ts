import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToRemediateComponent } from './request-to-remediate.component';

describe('RequestForRemediateComponent', () => {
  let component: RequestToRemediateComponent;
  let fixture: ComponentFixture<RequestToRemediateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToRemediateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestToRemediateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
