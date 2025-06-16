import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionPageComponent } from './terms-condition-page.component';

describe('TermsConditionPageComponent', () => {
  let component: TermsConditionPageComponent;
  let fixture: ComponentFixture<TermsConditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
