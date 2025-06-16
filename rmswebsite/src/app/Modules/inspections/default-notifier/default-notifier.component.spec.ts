import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNotifierComponent } from './default-notifier.component';

describe('DefaultNotifierComponent', () => {
  let component: DefaultNotifierComponent;
  let fixture: ComponentFixture<DefaultNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultNotifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
