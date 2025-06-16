import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplainceContentComponent } from './create-complaince-content.component';

describe('CreateComplainceContentComponent', () => {
  let component: CreateComplainceContentComponent;
  let fixture: ComponentFixture<CreateComplainceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComplainceContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComplainceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
