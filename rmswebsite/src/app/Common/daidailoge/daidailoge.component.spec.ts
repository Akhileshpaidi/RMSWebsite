import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaidailogeComponent } from './daidailoge.component';

describe('DaidailogeComponent', () => {
  let component: DaidailogeComponent;
  let fixture: ComponentFixture<DaidailogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaidailogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaidailogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
