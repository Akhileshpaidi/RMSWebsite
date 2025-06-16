import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocDailogeComponent } from './add-doc-dailoge.component';

describe('AddDocDailogeComponent', () => {
  let component: AddDocDailogeComponent;
  let fixture: ComponentFixture<AddDocDailogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocDailogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDocDailogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
