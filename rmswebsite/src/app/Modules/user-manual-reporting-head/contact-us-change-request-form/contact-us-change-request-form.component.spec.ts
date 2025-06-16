import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsChangeRequestFormComponent } from './contact-us-change-request-form.component';

describe('ContactUsChangeRequestFormComponent', () => {
  let component: ContactUsChangeRequestFormComponent;
  let fixture: ComponentFixture<ContactUsChangeRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsChangeRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsChangeRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
