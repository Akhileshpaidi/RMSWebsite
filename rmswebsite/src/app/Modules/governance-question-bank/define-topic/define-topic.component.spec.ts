import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTopicComponent } from './define-topic.component';

describe('DefineTopicComponent', () => {
  let component: DefineTopicComponent;
  let fixture: ComponentFixture<DefineTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
